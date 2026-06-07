// ===========================================================================
// Shared TypeScript types for Online Ifá.
// ---------------------------------------------------------------------------
// Domain enums mirror the Prisma schema; DTOs shape API responses. Keep these
// in sync with prisma/schema.prisma.
// ===========================================================================

export type OduType = "PRIMARY" | "COMBINED";

export type ConcernArea =
  | "GENERAL"
  | "HEALTH"
  | "FAMILY"
  | "MARRIAGE"
  | "MONEY"
  | "WORK"
  | "TRAVEL"
  | "CONFLICT"
  | "SPIRITUAL"
  | "PERSONAL_DECISION";

export type CastingMode =
  | "SIMULATED"
  | "MANUAL_BABALAWO"
  | "USER_SELECTED"
  | "LEARNING";

export type ConsultationState =
  | "STARTED"
  | "AREA_SELECTED"
  | "QUESTION_ENTERED"
  | "SAFETY_ACKNOWLEDGED"
  | "CASTING"
  | "ODU_SELECTED"
  | "INTERPRETED"
  | "SAVED"
  | "ABANDONED";

export type ReviewStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "IN_REVIEW"
  | "CHANGES_REQUESTED"
  | "APPROVED"
  | "REJECTED"
  | "ARCHIVED";

export type ContributorRole =
  | "BABALAWO"
  | "RESEARCHER"
  | "TRANSLATOR"
  | "EDITOR"
  | "ADMIN";

export type SourceType =
  | "ORIGINAL_APP"
  | "CONTRIBUTOR"
  | "PUBLIC_DOMAIN"
  | "LICENSED"
  | "ORAL_TRADITION"
  | "ACADEMIC";

export type LicenceType =
  | "ORIGINAL_APP_LICENCE"
  | "PUBLIC_DOMAIN"
  | "CC0"
  | "CC_BY"
  | "CC_BY_SA"
  | "CC_BY_NC"
  | "ALL_RIGHTS_RESERVED"
  | "CUSTOM_PERMISSION"
  | "UNKNOWN";

export type PermissionStatus =
  | "NOT_REQUIRED"
  | "PENDING"
  | "GRANTED"
  | "DENIED"
  | "EXPIRED";

export type SafetyCategory =
  | "MEDICAL_EMERGENCY"
  | "MENTAL_HEALTH_CRISIS"
  | "LEGAL"
  | "FINANCIAL"
  | "HARMFUL_RITUAL"
  | "ABUSE_OR_COERCION"
  | "MINOR";

// --- DTOs ------------------------------------------------------------------

export interface OduSummaryDTO {
  id: string;
  slug: string;
  name: string;
  signature: string;
  rank: number;
  type: OduType;
  themes: string[];
}

export interface OduDetailDTO extends OduSummaryDTO {
  altNames: string[];
  factualSummary: string | null;
  leftOdu: { slug: string; name: string } | null;
  rightOdu: { slug: string; name: string } | null;
  related: { slug: string; name: string; kind: string }[];
  proverbs: { yoruba: string; english: string | null }[];
  verseCount: number;
  interpretation: {
    isPlaceholder: boolean;
    title: string | null;
    contentMd: string;
    sourceTitle: string | null;
    licence: string | null;
    reviewStatus: ReviewStatus | null;
  };
}

export interface ConsultationResultDTO {
  consultationId: string;
  state: ConsultationState;
  concernArea: ConcernArea | null;
  question: string | null;
  castingMode: CastingMode;
  odu: OduSummaryDTO | null;
  signature: string | null;
  factualMeaning: string | null;
  interpretationMd: string;
  isPlaceholder: boolean;
  reflectionQuestions: string[];
  relatedVerseCount: number;
  sourceNotes: string | null;
}

export interface ApiError {
  error: string;
  details?: unknown;
}
