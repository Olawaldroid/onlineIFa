// ===========================================================================
// Interpretation gating + permission enforcement.
// ---------------------------------------------------------------------------
// Central place that decides whether a piece of meaning-content may be shown.
// Prevents unapproved or copyright-unclear content from ever being published.
// ===========================================================================

import { Interpretation, PermissionStatus, ReviewStatus, Source } from "@prisma/client";
import { PLACEHOLDER_INTERPRETATION } from "./placeholder";

export { PLACEHOLDER_INTERPRETATION };

export interface DisplayableInterpretation {
  isPlaceholder: boolean;
  contentMd: string;
  title: string | null;
  sourceTitle: string | null;
  licence: string | null;
  reviewStatus: ReviewStatus | null;
}

/** Is a source legally clear to publish from? */
export function sourceIsPublishable(source: Pick<Source, "permissionStatus"> | null | undefined): boolean {
  if (!source) return true; // original/contributor content with no external source
  return (
    source.permissionStatus === PermissionStatus.GRANTED ||
    source.permissionStatus === PermissionStatus.NOT_REQUIRED
  );
}

/** Is an interpretation showable to end users right now? */
export function interpretationIsVisible(
  interp: Pick<Interpretation, "reviewStatus" | "flagged">,
  source?: Pick<Source, "permissionStatus"> | null,
): boolean {
  if (interp.flagged) return false;
  if (interp.reviewStatus !== ReviewStatus.APPROVED) return false;
  return sourceIsPublishable(source);
}

/**
 * Resolve what to actually display for an Odù: the best approved interpretation,
 * or the safe placeholder. Never leaks unapproved content.
 */
export function resolveDisplay(
  interpretations: (Interpretation & { source?: Source | null })[],
): DisplayableInterpretation {
  const visible = interpretations.find((i) =>
    interpretationIsVisible(i, i.source),
  );

  if (!visible) {
    return {
      isPlaceholder: true,
      contentMd: PLACEHOLDER_INTERPRETATION,
      title: null,
      sourceTitle: null,
      licence: null,
      reviewStatus: null,
    };
  }

  return {
    isPlaceholder: false,
    contentMd: visible.contentMd,
    title: visible.title,
    sourceTitle: visible.source?.title ?? "Original app content",
    licence: visible.source?.licenceType ?? "ORIGINAL_APP_LICENCE",
    reviewStatus: visible.reviewStatus,
  };
}
