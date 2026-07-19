import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { ReviewStatus } from "@prisma/client";
import { oduFactBySlug } from "@/lib/odu/facts";
import { addSubmission } from "@/lib/contributions/store";
import { getOduDetail } from "@/lib/odu/detail";
import { CONTENT_CATEGORIES, categoryNeedsCitation, categoryNeedsPermission } from "@/lib/content/provenance";
import { checkPrivateBookSimilarity } from "@/lib/research/similarity";

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
  contentCategory: z.enum(CONTENT_CATEGORIES).default("CONTRIBUTOR_ORIGINAL"),
  citation: z.string().trim().optional(),
  permissionConfirmed: z.boolean().default(false),
});

// POST /api/interpretations — contributor submits an interpretation (DRAFT →
// SUBMITTED). Visibility requires admin approval AND a publishable source.
// Without a database the submission lands in the file-backed contribution
// store instead (src/lib/contributions/store.ts) — same review flow, no setup.
export async function POST(req: NextRequest) {
  try {
    const body = Body.parse(await req.json());
    if (body.language.toLocaleLowerCase() !== "en") {
      return NextResponse.json({ error: "Public contributions must be submitted in English." }, { status: 400 });
    }
    if (categoryNeedsCitation(body.contentCategory) && !body.citation) {
      return NextResponse.json({ error: "This content category requires a source, page, or lineage citation." }, { status: 400 });
    }
    if (categoryNeedsPermission(body.contentCategory) && !body.permissionConfirmed) {
      return NextResponse.json({ error: "Licensed material requires confirmation that written permission is on file." }, { status: 400 });
    }
    const sourceTypeByCategory: Partial<Record<(typeof CONTENT_CATEGORIES)[number], string>> = {
      PUBLIC_DOMAIN_VERSE: "PUBLIC_DOMAIN",
      LICENSED_VERSE: "LICENSED",
      ORAL_TRADITION: "ORAL_TRADITION",
    };
    const requiredSourceType = sourceTypeByCategory[body.contentCategory];
    if (requiredSourceType && body.sourceType !== requiredSourceType) {
      return NextResponse.json({ error: `This category must use source type ${requiredSourceType}.` }, { status: 400 });
    }
    const similarity = await checkPrivateBookSimilarity(body.contentMd);
    if (similarity.blocked) {
      return NextResponse.json({ error: similarity.reason, similarity }, { status: 409 });
    }

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
        contentCategory: body.contentCategory,
        citation: body.citation,
        permissionConfirmed: body.permissionConfirmed,
        similarity,
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
        notes: [body.notes, `Category: ${body.contentCategory}`, body.citation ? `Citation: ${body.citation}` : null, `Similarity check: ${similarity.reason}`].filter(Boolean).join("\n"),
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
