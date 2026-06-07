import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { performCast } from "@/lib/consultation/service";

const Body = z.object({
  signature: z.string().regex(/^[12]{4}\|[12]{4}$/).optional(),
  babalawoId: z.string().optional(),
  seed: z.string().optional(),
});

// POST /api/consultation/:id/cast — perform the cast for the session.
// The mode is whatever the consultation was created with (configurable).
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = Body.parse(await req.json().catch(() => ({})));
    const consultation = await performCast(params.id, body);
    return NextResponse.json({ consultation });
  } catch (err) {
    return NextResponse.json({ error: `${err}` }, { status: 400 });
  }
}
