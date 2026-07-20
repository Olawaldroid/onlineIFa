import assert from "node:assert/strict";
import test from "node:test";
import { LicenceType, PermissionStatus, ReviewStatus } from "@prisma/client";
import {
  buildPublicVerseWhere,
  licenceAllowsPublication,
  verseIsPublishable,
} from "./versePublication";

const clearVerse = {
  reviewStatus: ReviewStatus.APPROVED,
  permissionStatus: PermissionStatus.GRANTED,
  licenceType: LicenceType.CC_BY,
};

test("only approved, permission-clean verses are publishable", () => {
  assert.equal(verseIsPublishable(clearVerse), true);

  for (const reviewStatus of Object.values(ReviewStatus)) {
    if (reviewStatus === ReviewStatus.APPROVED) continue;
    assert.equal(verseIsPublishable({ ...clearVerse, reviewStatus }), false);
  }

  for (const permissionStatus of [
    PermissionStatus.PENDING,
    PermissionStatus.DENIED,
    PermissionStatus.EXPIRED,
  ]) {
    assert.equal(verseIsPublishable({ ...clearVerse, permissionStatus }), false);
  }

  assert.equal(
    verseIsPublishable({ ...clearVerse, permissionStatus: PermissionStatus.NOT_REQUIRED }),
    true,
  );
});

test("non-commercial licences are automatically blocked in commercial mode", () => {
  assert.equal(licenceAllowsPublication(LicenceType.CC_BY_NC, false), true);
  assert.equal(licenceAllowsPublication(LicenceType.CC_BY_NC_SA, false), true);
  assert.equal(licenceAllowsPublication(LicenceType.CC_BY_NC, true), false);
  assert.equal(licenceAllowsPublication(LicenceType.CC_BY_NC_SA, true), false);
  assert.equal(licenceAllowsPublication(LicenceType.CC_BY, true), true);
});

test("database search filter always carries review and permission gates", () => {
  const where = buildPublicVerseWhere("snake", false);
  assert.equal(where.reviewStatus, ReviewStatus.APPROVED);
  assert.deepEqual(where.source, {
    permissionStatus: {
      in: [PermissionStatus.GRANTED, PermissionStatus.NOT_REQUIRED],
    },
  });
  assert.ok(where.OR);

  const commercialWhere = buildPublicVerseWhere(undefined, true);
  assert.deepEqual(commercialWhere.source, {
    permissionStatus: {
      in: [PermissionStatus.GRANTED, PermissionStatus.NOT_REQUIRED],
    },
    licenceType: {
      notIn: [LicenceType.CC_BY_NC, LicenceType.CC_BY_NC_SA],
    },
  });
});
