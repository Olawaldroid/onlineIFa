import { NextRequest, NextResponse } from "next/server";
import { searchFacts } from "@/lib/odu/facts";

// GET /api/search?q= — unified search.
// Always searches the FACT layer (name, alt-name, slug, signature). When a DB
// is available it also searches proverbs, verses, contributors and sources.
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") ?? "").trim();
  if (!q) return NextResponse.json({ odu: [], proverbs: [], verses: [], sources: [], contributors: [] });

  const odu = searchFacts(q).slice(0, 50).map((o) => ({
    slug: o.slug,
    name: o.name,
    signature: o.signature,
    type: o.isPrimary ? "PRIMARY" : "COMBINED",
  }));

  let proverbs: unknown[] = [];
  let verses: unknown[] = [];
  let sources: unknown[] = [];
  let contributors: unknown[] = [];

  try {
    const { prisma } = await import("@/lib/db");
    const [pv, vs, sr, cb] = await Promise.all([
      prisma.proverb.findMany({
        where: { OR: [{ yoruba: { contains: q, mode: "insensitive" } }, { english: { contains: q, mode: "insensitive" } }] },
        take: 25,
      }),
      prisma.verse.findMany({
        where: { OR: [{ textYoruba: { contains: q, mode: "insensitive" } }, { textEnglish: { contains: q, mode: "insensitive" } }] },
        take: 25,
      }),
      prisma.source.findMany({
        where: { OR: [{ title: { contains: q, mode: "insensitive" } }, { author: { contains: q, mode: "insensitive" } }] },
        take: 25,
      }),
      prisma.contributor.findMany({
        where: { displayName: { contains: q, mode: "insensitive" } },
        take: 25,
      }),
    ]);
    proverbs = pv;
    verses = vs;
    sources = sr;
    contributors = cb;
  } catch {
    // DB unavailable — fact search still returns results.
  }

  return NextResponse.json({ odu, proverbs, verses, sources, contributors });
}
