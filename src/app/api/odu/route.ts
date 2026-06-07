import { NextRequest, NextResponse } from "next/server";
import { allOduFacts, searchFacts } from "@/lib/odu/facts";

// GET /api/odu?q=&type= — list/search the corpus (facts; no DB required).
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";
  const type = searchParams.get("type");

  let items = q ? searchFacts(q) : allOduFacts();
  if (type === "primary") items = items.filter((o) => o.isPrimary);
  if (type === "combined") items = items.filter((o) => !o.isPrimary);

  return NextResponse.json({
    count: items.length,
    items: items.map((o) => ({
      slug: o.slug,
      name: o.name,
      rank: o.rank,
      signature: o.signature,
      type: o.isPrimary ? "PRIMARY" : "COMBINED",
    })),
  });
}
