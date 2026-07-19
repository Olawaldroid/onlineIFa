import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { ReviewStatus } from "@prisma/client";
import { sourceIsPublishable } from "@/lib/interpretation/gate";
import { getSession, authEnforced } from "@/lib/auth/session";
import { reviewSubmission } from "@/lib/contributions/store";
import { listSubmissions } from "@/lib/contributions/store";
import { categoryNeedsCitation, categoryNeedsPermission } from "@/lib/content/provenance";
import { checkPrivateBookSimilarity } from "@/lib/research/similarity";

const Body = z.object({
  decision: z.enum(["APPROVED", "REJECTED", "CHANGES_REQUESTED"]),
  comment: z.string().optional(),
});

/** Resolve the reviewing admin: the session user if enforced; otherwise fall
 *  back to the first ADMIN in the DB (dev convenience). */
async function resolveReviewer(): Promise<string | null> {
  const session = getSession();
  if (session && session.role === "ADMIN" && session.userId !== "dev") {
    return session.userId;
  }
  if (authEnforced()) return null; // must be a real admin session
  const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
  return admin?.id ?? null;
}

// PATCH /api/interpretations/:id/review — admin reviews a submission.
// Approval is BLOCKED if the linked source is not publishable (permission gate).
// Ids prefixed "sub_" live in the file-backed contribution store (no database
// needed); they have no external source, so the permission gate passes by
// construction (contributor-original content = permission NOT_REQUIRED).
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = Body.parse(await req.json());

    if (params.id.startsWith("sub_")) {
      const session = getSession();
      const isAdmin = session?.role === "ADMIN";
      if (authEnforced() && !isAdmin) {
        return NextResponse.json({ error: "Admin session required" }, { status: 403 });
      }
      if (body.decision === "APPROVED") {
        const submission = (await listSubmissions()).find((item) => item.id === params.id);
        if (!submission) return NextResponse.json({ error: "Not found" }, { status: 404 });
        if (categoryNeedsCitation(submission.contentCategory) && !submission.citation) {
          return NextResponse.json({ error: "Cannot approve: citation is required for this category." }, { status: 409 });
        }
        if (categoryNeedsPermission(submission.contentCategory) && !submission.permissionConfirmed) {
          return NextResponse.json({ error: "Cannot approve: written permission has not been confirmed." }, { status: 409 });
        }
        const similarity = await checkPrivateBookSimilarity(submission.contentMd);
        if (!similarity.checked || similarity.blocked) {
          return NextResponse.json({ error: `Cannot approve: ${similarity.reason}`, similarity }, { status: 409 });
        }
      }
      const updated = await reviewSubmission(params.id, body.decision, body.comment);
      if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json({ interpretation: updated, store: "file" });
    }

    const reviewerUserId = await resolveReviewer();
    if (!reviewerUserId) {
      return NextResponse.json({ error: "Admin session required" }, { status: 403 });
    }

    const interp = await prisma.interpretation.findUnique({
      where: { id: params.id },
      include: { source: true, versions: true },
    });
    if (!interp) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (body.decision === "APPROVED") {
      const similarity = await checkPrivateBookSimilarity(interp.contentMd);
      if (!similarity.checked || similarity.blocked) {
        return NextResponse.json({ error: `Cannot approve: ${similarity.reason}`, similarity }, { status: 409 });
      }
    }

    if (body.decision === "APPROVED" && !sourceIsPublishable(interp.source)) {
      return NextResponse.json(
        { error: "Cannot approve: source permission is not GRANTED/NOT_REQUIRED." },
        { status: 409 },
      );
    }

    const nextVersion = (interp.versions.at(-1)?.version ?? 0) + 1;

    const [updated] = await prisma.$transaction([
      prisma.interpretation.update({
        where: { id: params.id },
        data: {
          reviewStatus: body.decision as ReviewStatus,
          publishedAt: body.decision === "APPROVED" ? new Date() : null,
        },
      }),
      prisma.review.create({
        data: {
          interpretationId: params.id,
          reviewerUserId: reviewerUserId,
          decision: body.decision as ReviewStatus,
          comment: body.comment,
        },
      }),
      prisma.interpretationVersion.create({
        data: {
          interpretationId: params.id,
          version: nextVersion,
          contentMd: interp.contentMd,
          reviewStatus: body.decision as ReviewStatus,
          editedByUserId: reviewerUserId,
          changeNote: `Review decision: ${body.decision}`,
        },
      }),
      prisma.auditLog.create({
        data: {
          actorUserId: reviewerUserId,
          action:
            body.decision === "APPROVED"
              ? "APPROVE"
              : body.decision === "REJECTED"
                ? "REJECT"
                : "REQUEST_CHANGES",
          entityType: "Interpretation",
          entityId: params.id,
          summary: body.comment,
        },
      }),
    ]);

    return NextResponse.json({ interpretation: updated });
  } catch (err) {
    return NextResponse.json({ error: `${err}` }, { status: 400 });
  }
}
