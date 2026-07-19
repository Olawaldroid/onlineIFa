// ===========================================================================
// File-backed contribution store — the no-database fallback.
// ---------------------------------------------------------------------------
// Lets the full contribute → review → approve loop run without Postgres:
// submissions land in a JSON file, admins review them at /admin, and approved
// content surfaces on the Odù detail page. The same review gates apply as in
// the DB path: only APPROVED, unflagged content is ever shown.
//
// Storage: data/contributions.json (override with CONTRIBUTIONS_FILE). If that
// path isn't writable — e.g. a serverless filesystem — it falls back to the OS
// temp dir, where data persists only per instance. This store is a
// convenience for local / single-server setups; production-scale review
// should still use Postgres. Server-side only (uses fs): import it from route
// handlers and server components, never client components.
// ===========================================================================

import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

export type SubmissionStatus = "SUBMITTED" | "APPROVED" | "REJECTED" | "CHANGES_REQUESTED";

export interface SubmissionEvent {
  at: string; // ISO timestamp
  action: string;
  comment?: string;
}

export interface FileSubmission {
  id: string; // "sub_…" — the prefix routes review calls to this store
  oduSlug: string;
  oduName: string;
  language: string;
  tradition?: string;
  title?: string;
  contentMd: string;
  notes?: string;
  sourceType: string;
  status: SubmissionStatus;
  flagged: boolean;
  createdAt: string;
  reviewedAt?: string;
  reviewComment?: string;
  events: SubmissionEvent[];
}

const PRIMARY_FILE =
  process.env.CONTRIBUTIONS_FILE || path.join(process.cwd(), "data", "contributions.json");
let resolvedFile: string | null = null;
let mutationQueue: Promise<void> = Promise.resolve();

/** Pick the durable storage file once. We deliberately do not fall back to an
 * OS temp directory: accepting a contribution without durable storage would
 * create a false promise that it survives restarts. */
async function resolveFile(): Promise<string> {
  if (resolvedFile) return resolvedFile;
  try {
    await fs.access(PRIMARY_FILE);
    resolvedFile = PRIMARY_FILE;
  } catch {
    try {
      await fs.mkdir(path.dirname(PRIMARY_FILE), { recursive: true });
      await fs.writeFile(PRIMARY_FILE, "[]", { flag: "wx" });
      resolvedFile = PRIMARY_FILE;
    } catch (error) {
      throw new Error(
        `Contribution storage is not writable at ${PRIMARY_FILE}. Configure CONTRIBUTIONS_FILE to persistent mounted storage. (${error})`,
      );
    }
  }
  return resolvedFile;
}

/** Where submissions are being stored (for display on the admin page). */
export async function storeLocation(): Promise<{ file: string; ephemeral: boolean }> {
  const file = await resolveFile();
  return { file, ephemeral: false };
}

async function serializedMutation<T>(operation: () => Promise<T>): Promise<T> {
  let result!: T;
  const queued = mutationQueue.then(async () => { result = await operation(); });
  mutationQueue = queued.catch(() => undefined);
  await queued;
  return result;
}

async function load(): Promise<FileSubmission[]> {
  const file = await resolveFile();
  try {
    const raw = await fs.readFile(file, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as FileSubmission[]) : [];
  } catch {
    return [];
  }
}

async function save(items: FileSubmission[]): Promise<void> {
  const file = await resolveFile();
  const tmp = `${file}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(items, null, 2));
  await fs.rename(tmp, file); // atomic on the same filesystem
}

/** All submissions, newest first. */
export async function listSubmissions(statuses?: SubmissionStatus[]): Promise<FileSubmission[]> {
  const items = await load();
  const filtered = statuses ? items.filter((s) => statuses.includes(s.status)) : items;
  return filtered.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function addSubmission(input: {
  oduSlug: string;
  oduName: string;
  language: string;
  tradition?: string;
  title?: string;
  contentMd: string;
  notes?: string;
  sourceType: string;
}): Promise<FileSubmission> {
  return serializedMutation(async () => {
    const now = new Date().toISOString();
    const submission: FileSubmission = {
      id: `sub_${randomUUID()}`,
      ...input,
      status: "SUBMITTED",
      flagged: false,
      createdAt: now,
      events: [{ at: now, action: "SUBMITTED" }],
    };
    const items = await load();
    items.push(submission);
    await save(items);
    return submission;
  });
}

/** Apply a review decision. Returns the updated submission, or null if the id
 *  is unknown. Mirrors the DB path's audit trail via the events list. */
export async function reviewSubmission(
  id: string,
  decision: SubmissionStatus,
  comment?: string,
): Promise<FileSubmission | null> {
  return serializedMutation(async () => {
    const items = await load();
    const submission = items.find((s) => s.id === id);
    if (!submission) return null;
    const now = new Date().toISOString();
    submission.status = decision;
    submission.reviewedAt = now;
    submission.reviewComment = comment;
    submission.events.push({ at: now, action: decision, comment });
    await save(items);
    return submission;
  });
}

/** Approved, unflagged submissions for one Odù, newest decision first — the
 *  only ones the Odù detail page may show (same gate as the DB path). */
export async function approvedForOdu(oduSlug: string): Promise<FileSubmission[]> {
  const items = await load();
  return items
    .filter((s) => s.oduSlug === oduSlug && s.status === "APPROVED" && !s.flagged)
    .sort((a, b) => (b.reviewedAt ?? b.createdAt).localeCompare(a.reviewedAt ?? a.createdAt));
}

export async function countsByStatus(): Promise<Record<SubmissionStatus, number> & { total: number }> {
  const items = await load();
  const counts = { SUBMITTED: 0, APPROVED: 0, REJECTED: 0, CHANGES_REQUESTED: 0, total: items.length };
  for (const s of items) counts[s.status] += 1;
  return counts;
}
