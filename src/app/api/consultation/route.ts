import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { startConsultation } from "@/lib/consultation/service";

const Body = z.object({
  castingMode: z
    .enum(["SIMULATED", "MANUAL_BABALAWO", "USER_SELECTED", "LEARNING"])
    .optional(),
  guestToken: z.string().optional(),
  userId: z.string().optional(),
});

// POST /api/consultation — start a new consultation session.
export async function POST(req: NextRequest) {
  try {
    const json = await req.json().catch(() => ({}));
    const body = Body.parse(json);
    const consultation = await startConsultation(body);
    return NextResponse.json({ consultation }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Could not start consultation", details: `${err}` },
      { status: 400 },
    );
  }
}
