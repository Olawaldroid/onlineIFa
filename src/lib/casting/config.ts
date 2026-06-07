// ===========================================================================
// Casting configuration.
// ---------------------------------------------------------------------------
// The casting logic is CONFIGURABLE and makes NO claim of spiritual authority.
// A simulated cast is explicitly labelled as a learning/illustrative tool.
// Real divination is performed by a trained Babalawo — see MANUAL_BABALAWO.
// ===========================================================================

import { CastingMode } from "@prisma/client";

export interface CastingModeConfig {
  mode: CastingMode;
  label: string;
  /** Plain-language description shown to the user before casting. */
  description: string;
  /** Honest disclaimer about what this mode is and is NOT. */
  disclaimer: string;
  /** Whether this mode requires a verified Babalawo account. */
  requiresBabalawo: boolean;
  enabled: boolean;
}

export const CASTING_MODES: Record<CastingMode, CastingModeConfig> = {
  SIMULATED: {
    mode: "SIMULATED",
    label: "Simulated digital cast",
    description:
      "The app draws an Odù using a transparent pseudo-random process so you can explore the corpus.",
    disclaimer:
      "This is a digital simulation for learning and reflection. It is not a substitute for divination performed by a trained Babalawo and carries no spiritual authority.",
    requiresBabalawo: false,
    enabled: true,
  },
  MANUAL_BABALAWO: {
    mode: "MANUAL_BABALAWO",
    label: "Manual entry by a Babalawo",
    description:
      "A verified Babalawo enters the Odù produced by a physical casting (Ìkín or Ọ̀pẹ̀lẹ̀).",
    disclaimer:
      "This records the result of a casting performed by a qualified practitioner. The app stores and presents it but does not perform the divination itself.",
    requiresBabalawo: true,
    enabled: true,
  },
  USER_SELECTED: {
    mode: "USER_SELECTED",
    label: "Select a known Odù",
    description:
      "You already know which Odù you want to study, and choose it directly.",
    disclaimer:
      "You are selecting an Odù to study. No casting or divination is implied.",
    requiresBabalawo: false,
    enabled: true,
  },
  LEARNING: {
    mode: "LEARNING",
    label: "Learning mode",
    description:
      "The app walks you through how a casting is traditionally performed, step by step.",
    disclaimer:
      "This is an educational walkthrough of the casting process. It demonstrates the method and makes no claim of producing a genuine divinatory result.",
    requiresBabalawo: false,
    enabled: true,
  },
};

export function getCastingDefaultMode(): CastingMode {
  const raw = (process.env.CASTING_DEFAULT_MODE || "simulated").toUpperCase();
  return (raw in CASTING_MODES ? raw : "SIMULATED") as CastingMode;
}
