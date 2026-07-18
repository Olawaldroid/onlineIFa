// Split out from gate.ts (which imports Prisma enum values and so can't be
// safely bundled for the client) so both the DB-gated and guest-mode local
// display paths show the exact same placeholder copy.
export const PLACEHOLDER_INTERPRETATION =
  "This Odù has not yet been reviewed by a contributor.";
