// ===========================================================================
// Consultation state machine.
// ---------------------------------------------------------------------------
// Defines the legal transitions for a consultation. The API layer validates
// every transition against this map so a session can't skip safety steps.
//
//   STARTED → AREA_SELECTED → QUESTION_ENTERED → SAFETY_ACKNOWLEDGED
//           → CASTING → ODU_SELECTED → INTERPRETED → SAVED
//
// Any state may transition to ABANDONED.
// ===========================================================================

import { ConsultationState } from "@prisma/client";

export const TRANSITIONS: Record<ConsultationState, ConsultationState[]> = {
  STARTED: ["AREA_SELECTED", "ABANDONED"],
  AREA_SELECTED: ["QUESTION_ENTERED", "AREA_SELECTED", "ABANDONED"],
  QUESTION_ENTERED: ["SAFETY_ACKNOWLEDGED", "QUESTION_ENTERED", "ABANDONED"],
  SAFETY_ACKNOWLEDGED: ["CASTING", "ABANDONED"],
  CASTING: ["ODU_SELECTED", "ABANDONED"],
  ODU_SELECTED: ["INTERPRETED", "ABANDONED"],
  INTERPRETED: ["SAVED", "INTERPRETED", "ABANDONED"],
  SAVED: ["SAVED", "ABANDONED"],
  ABANDONED: [],
};

export function canTransition(from: ConsultationState, to: ConsultationState): boolean {
  return TRANSITIONS[from]?.includes(to) ?? false;
}

export function assertTransition(from: ConsultationState, to: ConsultationState): void {
  if (!canTransition(from, to)) {
    throw new Error(`Illegal consultation transition: ${from} → ${to}`);
  }
}

/** Ordered happy-path states, for progress UI. */
export const HAPPY_PATH: ConsultationState[] = [
  "STARTED",
  "AREA_SELECTED",
  "QUESTION_ENTERED",
  "SAFETY_ACKNOWLEDGED",
  "CASTING",
  "ODU_SELECTED",
  "INTERPRETED",
  "SAVED",
];
