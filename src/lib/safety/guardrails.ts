// ===========================================================================
// Safety guardrails.
// ---------------------------------------------------------------------------
// Detects high-risk concerns in a user's question and surfaces appropriate
// professional resources. The app NEVER provides medical, legal, financial,
// or crisis advice, and never instructs harmful rituals. It redirects.
// ===========================================================================

// Type-only import: erased at compile time, so this module (pure regex
// screening, no I/O) stays safe to import from client components.
import type { SafetyCategory } from "@prisma/client";

interface SafetyRule {
  category: SafetyCategory;
  patterns: RegExp[];
  message: string;
}

// Keyword heuristics. Intentionally broad and erring toward caution. A real
// deployment should layer a classifier on top; these patterns are the floor.
const RULES: SafetyRule[] = [
  {
    category: "MENTAL_HEALTH_CRISIS",
    patterns: [
      /\bsuicid(e|al)\b/i,
      /\bkill myself\b/i,
      /\bend my life\b/i,
      /\bself[-\s]?harm\b/i,
      /\bdon'?t want to live\b/i,
    ],
    message:
      "It sounds like you may be going through a very difficult time. Ifá study cannot help in a crisis — please reach out to a mental health professional or a crisis line right now.",
  },
  {
    category: "MEDICAL_EMERGENCY",
    patterns: [
      /\bchest pain\b/i,
      /\bcan'?t breathe\b/i,
      /\bbleeding\b/i,
      /\boverdose\b/i,
      /\bemergency\b/i,
      /\b(cancer|tumou?r|stroke|heart attack)\b/i,
    ],
    message:
      "Health emergencies need a medical professional. Please contact a doctor or emergency services. This app is educational and cannot give medical advice.",
  },
  {
    category: "LEGAL",
    patterns: [/\blawsuit\b/i, /\barrest(ed)?\b/i, /\bcourt case\b/i, /\bdeportation\b/i],
    message:
      "Legal matters need a qualified lawyer. This app cannot provide legal advice.",
  },
  {
    category: "FINANCIAL",
    patterns: [/\binvest(ment)?\b/i, /\bloan\b/i, /\bdebt\b/i, /\bbankrupt/i],
    message:
      "Financial decisions should be discussed with a licensed financial advisor. This app cannot provide financial advice.",
  },
  {
    category: "HARMFUL_RITUAL",
    patterns: [/\bcurse\b/i, /\bharm (someone|him|her|them)\b/i, /\bpoison\b/i, /\brevenge\b/i],
    message:
      "This app does not provide instructions for rituals intended to harm anyone, and will not assist with this request.",
  },
  {
    category: "ABUSE_OR_COERCION",
    patterns: [/\babuse\b/i, /\bbeing hurt\b/i, /\bthreaten(ed|ing)?\b/i, /\bdomestic violence\b/i],
    message:
      "If you are being hurt or threatened, please contact local authorities or a support organisation. Your safety matters more than a reading.",
  },
  {
    category: "MINOR",
    patterns: [/\bi am \d{1,2}\b/i, /\bi'?m \d{1,2}\b/i, /\bunder 18\b/i, /\bminor\b/i],
    message:
      "Some features are intended for adults. If you are under 18, please use the app with a parent or guardian.",
  },
];

export interface SafetyScreenResult {
  triggered: boolean;
  categories: SafetyCategory[];
  messages: string[];
  /** Blocking categories prevent the consultation from proceeding. */
  blocking: boolean;
}

const BLOCKING: SafetyCategory[] = [
  "MENTAL_HEALTH_CRISIS",
  "MEDICAL_EMERGENCY",
  "HARMFUL_RITUAL",
  "ABUSE_OR_COERCION",
];

/** Screen free-text for safety concerns. */
export function screenQuestion(text: string): SafetyScreenResult {
  const categories: SafetyCategory[] = [];
  const messages: string[] = [];
  for (const rule of RULES) {
    if (rule.patterns.some((p) => p.test(text))) {
      categories.push(rule.category);
      messages.push(rule.message);
    }
  }
  return {
    triggered: categories.length > 0,
    categories,
    messages,
    blocking: categories.some((c) => BLOCKING.includes(c)),
  };
}

/** Standard disclaimer shown before every consultation. */
export const CONSULTATION_DISCLAIMER =
  "Online Ifá is an educational and cultural tool. It is not a substitute for professional medical, legal, financial, or mental-health advice, and does not replace consultation with a trained Babalawo. For emergencies, contact the appropriate professional services.";
