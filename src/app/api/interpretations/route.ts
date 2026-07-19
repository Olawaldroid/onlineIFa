import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { ReviewStatus } from "@prisma/client";
import { oduFactBySlug } from "@/lib/odu/facts";
import { addSubmission } from "@/lib/contributions/store";
import { getOduDetail } from "@/lib/odu/detail";

// GET /api/interpretations?oduSlug=... — one server-resolved display contract
// for consultations. It prefers approved DB content, then approved file-backed
// contributions, then original Online Ifá content covering all 256 Odù.
export async function GET(req: NextRequest) {
  const oduSlug = req.nextUrl.searchParams.get("oduSlug")?.trim();
  if (!oduSlug) return NextResponse.json({ error: "oduSlug is required" }, { status: 400 });
  const detail = await getOduDetail(oduSlug);
  if (!detail) return NextResponse.json({ error: "Unknown Odù" }, { status: 404 });
  return NextResponse.json({ display: { ...detail.meaning, reflectionQuestions: detail.reflectionQuestions } });
}

const Body = z.object({
  oduSlug: z.string(),
  language: z.string().default("en"),
  tradition: z.string().optional(),
  title: z.string().optional(),
  contentMd: z.string().min(1),
  notes: z.string().optional(),
  sourceType: z.enum([
    "ORIGINAL_APP", "CONTRIBUTOR", "PUBLIC_DOMAIN", "LICENSED", "ORAL_TRADITION", "ACADEMIC",
  ]),
  sourceId: z.string().optional(),
  contributorId: z.string().optional(),
  authorUserId: z.string().optional(),
});

// POST /api/interpretations — contributor submits an interpretation (DRAFT →
// SUBMITTED). Visibility requires admin approval AND a publishable source.
// Without a database the submission lands in the file-backed contribution
// store instead (src/lib/contributions/store.ts) — same review flow, no setup.
export async function POST(req: NextRequest) {
  try {
    const body = Body.parse(await req.json());

    let odu: { id: string } | null = null;
    let dbAvailable = true;
    try {
      odu = await prisma.odu.findUnique({ where: { slug: body.oduSlug } });
    } catch {
      dbAvailable = false;
    }

    if (!dbAvailable) {
      const fact = oduFactBySlug(body.oduSlug);
      if (!fact) return NextResponse.json({ error: "Unknown Odù" }, { status: 404 });
      const submission = await addSubmission({
        oduSlug: body.oduSlug,
        oduName: fact.name,
        language: body.language,
        tradition: body.tradition,
        title: body.title,
        contentMd: body.contentMd,
        notes: body.notes,
        sourceType: body.sourceType,
      });
      return NextResponse.json({ interpretation: submission, store: "file" }, { status: 201 });
    }

    if (!odu) return NextResponse.json({ error: "Unknown Odù" }, { status: 404 });

    const interp = await prisma.interpretation.create({
      data: {
        oduId: odu.id,
        language: body.language,
        tradition: body.tradition,
        title: body.title,
        contentMd: body.contentMd,
        notes: body.notes,
        sourceType: body.sourceType,
        sourceId: body.sourceId,
        contributorId: body.contributorId,
        authorUserId: body.authorUserId,
        reviewStatus: ReviewStatus.SUBMITTED,
      },
    });

    await prisma.interpretationVersion.create({
      data: {
        interpretationId: interp.id,
        version: 1,
        contentMd: interp.contentMd,
        reviewStatus: ReviewStatus.SUBMITTED,
        editedByUserId: body.authorUserId,
        changeNote: "Initial submission.",
      },
    });

    await prisma.auditLog.create({
      data: {
        actorUserId: body.authorUserId,
        action: "CREATE",
        entityType: "Interpretation",
        entityId: interp.id,
        summary: `Submitted interpretation for ${body.oduSlug}`,
      },
    });

    return NextResponse.json({ interpretation: interp }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: `${err}` }, { status: 400 });
  }
}
