import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { screenQuestion } from "@/lib/safety/guardrails";

const Body = z.object({ text: z.string().max(2000) });

// POST /api/safety/screen — screen free text for safety concerns.
export async function POST(req: NextRequest) {
  try {
    const { text } = Body.parse(await req.json());
    return NextResponse.json(screenQuestion(text));
  } catch (err) {
    return NextResponse.json({ error: `${err}` }, { status: 400 });
  }
}
