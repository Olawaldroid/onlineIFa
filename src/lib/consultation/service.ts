// ===========================================================================
// Consultation service — orchestrates the consultation flow against the DB.
// Validates every state transition through the state machine.
// ===========================================================================

import { prisma } from "@/lib/db";
import { assertTransition } from "./stateMachine";
import { CastingMode, ConcernArea, ConsultationState } from "@prisma/client";
import {
  simulatedCast,
  learningCast,
  manualCast,
  userSelectedCast,
  CastResult,
} from "@/lib/casting/cast";
import { screenQuestion } from "@/lib/safety/guardrails";
import { resolveDisplay } from "@/lib/interpretation/gate";

export async function startConsultation(opts: {
  userId?: string;
  guestToken?: string;
  castingMode?: CastingMode;
}) {
  return prisma.consultation.create({
    data: {
      userId: opts.userId,
      guestToken: opts.guestToken,
      castingMode: opts.castingMode ?? "SIMULATED",
      state: "STARTED",
    },
  });
}

export async function selectArea(id: string, area: ConcernArea) {
  const c = await getOrThrow(id);
  assertTransition(c.state, "AREA_SELECTED");
  return prisma.consultation.update({
    where: { id },
    data: { concernArea: area, state: "AREA_SELECTED" },
  });
}

export async function enterQuestion(id: string, question: string) {
  const c = await getOrThrow(id);
  assertTransition(c.state, "QUESTION_ENTERED");
  const safety = screenQuestion(question);
  return prisma.consultation.update({
    where: { id },
    data: {
      question,
      state: "QUESTION_ENTERED",
      safetyFlags: safety.categories,
    },
  });
}

export async function acknowledgeSafety(id: string) {
  const c = await getOrThrow(id);
  assertTransition(c.state, "SAFETY_ACKNOWLEDGED");
  return prisma.consultation.update({
    where: { id },
    data: { safetyAcknowledged: true, state: "SAFETY_ACKNOWLEDGED" },
  });
}

export async function performCast(
  id: string,
  opts: { signature?: string; babalawoId?: string; seed?: string },
) {
  const c = await getOrThrow(id);
  assertTransition(c.state, "CASTING");
  await prisma.consultation.update({ where: { id }, data: { state: "CASTING" } });

  let result: CastResult;
  switch (c.castingMode) {
    case "MANUAL_BABALAWO":
      result = manualCast(opts.signature ?? "", opts.babalawoId ?? "unknown");
      break;
    case "USER_SELECTED":
      result = userSelectedCast(opts.signature ?? "");
      break;
    case "LEARNING":
      result = learningCast(opts.seed);
      break;
    case "SIMULATED":
    default:
      result = simulatedCast(opts.seed);
  }

  const odu = result.oduSlug
    ? await prisma.odu.findUnique({ where: { slug: result.oduSlug } })
    : null;

  return prisma.consultation.update({
    where: { id },
    data: {
      state: "ODU_SELECTED",
      oduId: odu?.id ?? null,
      castingDetail: result as unknown as object,
    },
    include: { odu: true },
  });
}

export async function interpret(id: string) {
  const c = await prisma.consultation.findUnique({
    where: { id },
    include: {
      odu: {
        include: {
          interpretations: { include: { source: true, reflectionQuestions: true } },
        },
      },
    },
  });
  if (!c) throw new Error("Consultation not found");
  assertTransition(c.state, "INTERPRETED");

  const display = c.odu ? resolveDisplay(c.odu.interpretations) : null;
  const shown = c.odu?.interpretations.find(
    (i) => !display?.isPlaceholder && i.contentMd === display?.contentMd,
  );

  await prisma.consultation.update({
    where: { id },
    data: { state: "INTERPRETED", shownInterpretationId: shown?.id ?? null },
  });

  return { consultation: c, display, shown };
}

export async function saveConsultation(id: string) {
  const c = await getOrThrow(id);
  assertTransition(c.state, "SAVED");
  return prisma.consultation.update({
    where: { id },
    data: { saved: true, state: "SAVED" },
  });
}

async function getOrThrow(id: string) {
  const c = await prisma.consultation.findUnique({ where: { id } });
  if (!c) throw new Error("Consultation not found");
  return c;
}
