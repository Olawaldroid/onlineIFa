// One publication rule for search, AI retrieval, and editorial tests.
// Static corpus entries carry equivalent provenance in content/ese-ifa/.

import {
  LicenceType,
  PermissionStatus,
  Prisma,
  ReviewStatus,
} from "@prisma/client";

const PUBLIC_PERMISSION_STATUSES: PermissionStatus[] = [
  PermissionStatus.GRANTED,
  PermissionStatus.NOT_REQUIRED,
];

const NON_COMMERCIAL_LICENCES: LicenceType[] = [
  LicenceType.CC_BY_NC,
  LicenceType.CC_BY_NC_SA,
];

export interface VersePublicationState {
  reviewStatus: ReviewStatus;
  permissionStatus: PermissionStatus;
  licenceType: LicenceType;
}

export function licenceAllowsPublication(licenceType: LicenceType, commercial: boolean): boolean {
  return !commercial || !NON_COMMERCIAL_LICENCES.includes(licenceType);
}

export function verseIsPublishable(state: VersePublicationState, commercial = false): boolean {
  return (
    state.reviewStatus === ReviewStatus.APPROVED &&
    PUBLIC_PERMISSION_STATUSES.includes(state.permissionStatus) &&
    licenceAllowsPublication(state.licenceType, commercial)
  );
}

/** Prisma filter that prevents draft or permission-unclear text leaking. */
export function buildPublicVerseWhere(
  query?: string,
  commercial = process.env.NEXT_PUBLIC_SITE_COMMERCIAL === "true",
): Prisma.VerseWhereInput {
  return {
    reviewStatus: ReviewStatus.APPROVED,
    source: {
      permissionStatus: { in: PUBLIC_PERMISSION_STATUSES },
      ...(commercial ? { licenceType: { notIn: NON_COMMERCIAL_LICENCES } } : {}),
    },
    ...(query
      ? {
          OR: [
            { textYoruba: { contains: query, mode: "insensitive" as const } },
            { textEnglish: { contains: query, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };
}
