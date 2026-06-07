import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { ReviewStatus } from "@prisma/client";
import { sourceIsPublishable } from "@/lib/interpretation/gate";

const Body = z.object({
  reviewerUserId: z.string(),
  decision: z.enum(["APPROVED", "REJECTED", "CHANGES_REQUESTED"]),
  comment: z.string().optional(),
});

// PATCH /api/interpretations/:id/review — admin reviews a submission.
// Approval is BLOCKED if the linked source is not publishable (permission gate).
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = Body.parse(await req.json());
    const interp = await prisma.interpretation.findUnique({
      where: { id: params.id },
      include: { source: true, versions: true },
    });
    if (!interp) return NextResponse.json({ error: "Not found" }, { status: 404 });

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
          reviewerUserId: body.reviewerUserId,
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
          editedByUserId: body.reviewerUserId,
          changeNote: `Review decision: ${body.decision}`,
        },
      }),
      prisma.auditLog.create({
        data: {
          actorUserId: body.reviewerUserId,
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
