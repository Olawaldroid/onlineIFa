import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import {
  selectArea,
  enterQuestion,
  acknowledgeSafety,
  interpret,
  saveConsultation,
} from "@/lib/consultation/service";
import { screenQuestion } from "@/lib/safety/guardrails";

const Patch = z.discriminatedUnion("action", [
  z.object({
    action: z.literal("select-area"),
    area: z.enum([
      "GENERAL", "HEALTH", "FAMILY", "MARRIAGE", "MONEY", "WORK",
      "TRAVEL", "CONFLICT", "SPIRITUAL", "PERSONAL_DECISION",
    ]),
  }),
  z.object({ action: z.literal("enter-question"), question: z.string().min(1).max(2000) }),
  z.object({ action: z.literal("acknowledge-safety") }),
  z.object({ action: z.literal("interpret") }),
  z.object({ action: z.literal("save") }),
]);

// GET /api/consultation/:id — fetch session state.
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const consultation = await prisma.consultation.findUnique({
    where: { id: params.id },
    include: { odu: true, notes: true },
  });
  if (!consultation) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ consultation });
}

// PATCH /api/consultation/:id — drive the state machine.
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = Patch.parse(await req.json());
    switch (body.action) {
      case "select-area":
        return NextResponse.json({ consultation: await selectArea(params.id, body.area) });
      case "enter-question": {
        const safety = screenQuestion(body.question);
        const consultation = await enterQuestion(params.id, body.question);
        return NextResponse.json({ consultation, safety });
      }
      case "acknowledge-safety":
        return NextResponse.json({ consultation: await acknowledgeSafety(params.id) });
      case "interpret": {
        const result = await interpret(params.id);
        return NextResponse.json(result);
      }
      case "save":
        return NextResponse.json({ consultation: await saveConsultation(params.id) });
    }
  } catch (err) {
    return NextResponse.json({ error: `${err}` }, { status: 400 });
  }
}

// DELETE /api/consultation/:id — user deletes their data.
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  await prisma.consultation.delete({ where: { id: params.id } }).catch(() => {});
  return NextResponse.json({ ok: true });
}
