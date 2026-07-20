// ===========================================================================
// Seed data.
// ---------------------------------------------------------------------------
// Populates the FACT layer (all 256 Odù, themes, relations) and a minimal,
// SAFE meaning layer:
//   * one ORIGINAL_APP source (permission NOT_REQUIRED),
//   * a single approved original interpretation for Èjì Ogbè as an example,
//   * every other Odù intentionally left WITHOUT an approved interpretation,
//     so the app shows the placeholder until contributors add original content.
//
// No copyrighted text is seeded. Verses are left empty by design.
// ===========================================================================

import {
  PrismaClient,
  OduType,
  SourceType,
  LicenceType,
  PermissionStatus,
  ReviewStatus,
  ContributorRole,
  UserRole,
  SafetyCategory,
} from "@prisma/client";
import { generateAllOdu } from "../src/lib/odu/combine";
import { ORIGINAL_INTERPRETATIONS } from "../src/lib/odu/interpretations";
import { PUBLIC_DOMAIN_BOOKS } from "../src/lib/sources/publicDomain";
import { hashPassword } from "../src/lib/auth/password";
import { ESE_SOURCE, ESE_VERSES, validateEseCorpus } from "../src/lib/content/verses";

const prisma = new PrismaClient();

// Reference sources used for FACTUAL grounding (see docs/IFA_RESEARCH.md).
// These exercise the permission flow: CC BY-SA is GRANTED with attribution;
// copyrighted academic works stay PENDING and cannot back published verse text.
const REFERENCE_SOURCES = [
  {
    id: "src-wikipedia-ifa",
    title: "Wikipedia — Ifá / Odu Ifa",
    author: "Wikipedia contributors",
    sourceType: SourceType.ACADEMIC,
    licenceType: LicenceType.CC_BY_SA,
    permissionStatus: PermissionStatus.GRANTED,
    permissionDocUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    attributionText:
      "Factual structure adapted from Wikipedia (CC BY-SA 4.0). No interpretation text copied.",
  },
  {
    id: "src-unesco-ich",
    title: "UNESCO — Ifa divination system (Intangible Cultural Heritage, 00146)",
    author: "UNESCO",
    sourceType: SourceType.ACADEMIC,
    licenceType: LicenceType.ALL_RIGHTS_RESERVED,
    permissionStatus: PermissionStatus.PENDING,
    attributionText: "Heritage context referenced; text not stored.",
  },
  {
    id: "src-abimbola-corpus",
    title: "Abimbola — Ifá: An Exposition of Ifá Literary Corpus (1976)",
    author: "Wande Abimbola",
    year: 1976,
    sourceType: SourceType.ACADEMIC,
    licenceType: LicenceType.ALL_RIGHTS_RESERVED,
    permissionStatus: PermissionStatus.PENDING,
    attributionText: "Cited for facts/attribution only; no text copied.",
  },
];

const THEMES = [
  { slug: "beginnings", label: "Beginnings", category: "life-stage" },
  { slug: "leadership", label: "Leadership", category: "virtue" },
  { slug: "patience", label: "Patience", category: "virtue" },
  { slug: "family", label: "Family", category: "relationship" },
  { slug: "perseverance", label: "Perseverance", category: "virtue" },
  { slug: "transformation", label: "Transformation", category: "life-stage" },
  { slug: "conflict", label: "Conflict", category: "challenge" },
  { slug: "abundance", label: "Abundance", category: "fortune" },
  { slug: "caution", label: "Caution", category: "challenge" },
  { slug: "community", label: "Community", category: "relationship" },
  { slug: "clarity", label: "Clarity", category: "virtue" },
  { slug: "foundation", label: "Foundation", category: "life-stage" },
  { slug: "protection", label: "Protection", category: "fortune" },
  { slug: "ancestry", label: "Ancestry", category: "relationship" },
  { slug: "communication", label: "Communication", category: "virtue" },
  { slug: "spiritual", label: "Spiritual", category: "life-stage" },
];

const SAFETY_RESOURCES = [
  {
    category: SafetyCategory.MENTAL_HEALTH_CRISIS,
    region: "GLOBAL",
    title: "Find a crisis line near you",
    description:
      "If you are in crisis, please contact a local crisis line or emergency services immediately.",
    url: "https://findahelpline.com",
  },
  {
    category: SafetyCategory.MEDICAL_EMERGENCY,
    region: "GLOBAL",
    title: "Seek emergency medical care",
    description: "For medical emergencies, contact your local emergency number or a doctor.",
  },
  {
    category: SafetyCategory.ABUSE_OR_COERCION,
    region: "GLOBAL",
    title: "Support for abuse or coercion",
    description: "Contact local authorities or a domestic-violence support organisation.",
  },
];

const PRODUCTS = [
  { slug: "free-learning", name: "Learning mode", kind: "free_learning", priceCents: 0 },
  { slug: "free-basic", name: "Basic consultation", kind: "free_basic", priceCents: 0 },
  {
    slug: "reviewed-consultation",
    name: "Babalawo-reviewed consultation",
    kind: "reviewed_consultation",
    priceCents: 1500,
  },
  {
    slug: "babalawo-session",
    name: "Live Babalawo session",
    kind: "babalawo_session",
    priceCents: 9000,
  },
  { slug: "donation", name: "Contributor donation", kind: "donation", priceCents: 0 },
];

async function main() {
  console.log("Seeding Online Ifá…");

  // --- Themes --------------------------------------------------------------
  const themeBySlug = new Map<string, string>();
  for (const t of THEMES) {
    const row = await prisma.theme.upsert({
      where: { slug: t.slug },
      update: { label: t.label, category: t.category },
      create: t,
    });
    themeBySlug.set(t.slug, row.id);
  }

  // --- Original app source (permission NOT_REQUIRED) -----------------------
  const originalSource = await prisma.source.upsert({
    where: { id: "src-original-app" },
    update: {},
    create: {
      id: "src-original-app",
      title: "Online Ifá — original editorial content",
      author: "Online Ifá contributors",
      sourceType: SourceType.ORIGINAL_APP,
      licenceType: LicenceType.ORIGINAL_APP_LICENCE,
      permissionStatus: PermissionStatus.NOT_REQUIRED,
      attributionText: "© Online Ifá. Original content, written for this app.",
      notes: "Default home for original interpretations authored in-app.",
    },
  });

  // --- All 256 Odù (facts) -------------------------------------------------
  const all = generateAllOdu();
  const idBySlug = new Map<string, string>();

  // First pass: create every Odù without leg links.
  for (const o of all) {
    const row = await prisma.odu.upsert({
      where: { slug: o.slug },
      update: {
        name: o.name,
        altNames: o.altNames,
        type: o.isPrimary ? OduType.PRIMARY : OduType.COMBINED,
        rank: o.rank,
        signature: o.signature,
        factualSummary: o.factualSummary,
      },
      create: {
        slug: o.slug,
        name: o.name,
        altNames: o.altNames,
        type: o.isPrimary ? OduType.PRIMARY : OduType.COMBINED,
        rank: o.rank,
        signature: o.signature,
        factualSummary: o.factualSummary,
      },
    });
    idBySlug.set(o.slug, row.id);
  }

  // Second pass: wire right/left legs for combined Odù.
  for (const o of all) {
    if (o.isPrimary) continue;
    await prisma.odu.update({
      where: { slug: o.slug },
      data: {
        rightOduId: idBySlug.get(o.rightSlug),
        leftOduId: idBySlug.get(o.leftSlug),
      },
    });
  }

  // --- Reference sources (exercise the permission flow) --------------------
  for (const s of REFERENCE_SOURCES) {
    await prisma.source.upsert({ where: { id: s.id }, update: s, create: s });
  }

  // --- Public-domain books (permission NOT_REQUIRED) -----------------------
  // Bibliographic facts + links; contributors extract cited passages later.
  for (const b of PUBLIC_DOMAIN_BOOKS) {
    const data = {
      id: b.id,
      title: b.title,
      author: b.author,
      year: b.year,
      sourceType: SourceType.PUBLIC_DOMAIN,
      licenceType: LicenceType.PUBLIC_DOMAIN,
      permissionStatus: PermissionStatus.NOT_REQUIRED,
      permissionDocUrl: b.archiveUrl,
      attributionText: `${b.author}, ${b.title} (${b.year}). Public domain.`,
      notes: b.note,
    };
    await prisma.source.upsert({ where: { id: b.id }, update: data, create: data });
  }

  // --- Source-verified Ẹsẹ passages ----------------------------------------
  // Static rendering and Prisma use the same checked-in provenance record.
  // The site is explicitly non-commercial; this source must be withdrawn or
  // separately licensed before any commercial mode is enabled.
  const corpusErrors = validateEseCorpus();
  if (corpusErrors.length) {
    throw new Error(`Ẹsẹ corpus validation failed:\n${corpusErrors.join("\n")}`);
  }

  const eseSource = await prisma.source.upsert({
    where: { id: ESE_SOURCE.id },
    update: {
      title: ESE_SOURCE.title,
      author: ESE_SOURCE.authors.join(" & "),
      year: ESE_SOURCE.year,
      sourceType: SourceType.LICENSED,
      licenceType: LicenceType.CC_BY_NC_SA,
      permissionStatus: PermissionStatus.GRANTED,
      permissionDocUrl: ESE_SOURCE.licence.policyUrl,
      attributionText: `${ESE_SOURCE.authors.join(" & ")} (${ESE_SOURCE.year}), “${ESE_SOURCE.title}”, ${ESE_SOURCE.journal} ${ESE_SOURCE.issue}, ${ESE_SOURCE.articlePages}. https://doi.org/${ESE_SOURCE.doi}. ${ESE_SOURCE.licence.label}.`,
      notes: `${ESE_SOURCE.licence.scopeNote} Local source SHA-256: ${ESE_SOURCE.localCopy.sha256}. ${ESE_SOURCE.transcriptionNote}`,
    },
    create: {
      id: ESE_SOURCE.id,
      title: ESE_SOURCE.title,
      author: ESE_SOURCE.authors.join(" & "),
      year: ESE_SOURCE.year,
      sourceType: SourceType.LICENSED,
      licenceType: LicenceType.CC_BY_NC_SA,
      permissionStatus: PermissionStatus.GRANTED,
      permissionDocUrl: ESE_SOURCE.licence.policyUrl,
      attributionText: `${ESE_SOURCE.authors.join(" & ")} (${ESE_SOURCE.year}), “${ESE_SOURCE.title}”, ${ESE_SOURCE.journal} ${ESE_SOURCE.issue}, ${ESE_SOURCE.articlePages}. https://doi.org/${ESE_SOURCE.doi}. ${ESE_SOURCE.licence.label}.`,
      notes: `${ESE_SOURCE.licence.scopeNote} Local source SHA-256: ${ESE_SOURCE.localCopy.sha256}. ${ESE_SOURCE.transcriptionNote}`,
    },
  });

  for (const verse of ESE_VERSES) {
    const oduId = idBySlug.get(verse.oduSlug);
    if (!oduId) throw new Error(`Unknown Odù slug in Ẹsẹ corpus: ${verse.oduSlug}`);
    await prisma.verse.upsert({
      where: { id: verse.id },
      update: {
        oduId,
        language: "yo-en",
        textYoruba: verse.yoruba.join("\n"),
        textEnglish: verse.english.join("\n"),
        sourceId: eseSource.id,
        reviewStatus: ReviewStatus.APPROVED,
      },
      create: {
        id: verse.id,
        oduId,
        language: "yo-en",
        textYoruba: verse.yoruba.join("\n"),
        textEnglish: verse.english.join("\n"),
        sourceId: eseSource.id,
        reviewStatus: ReviewStatus.APPROVED,
      },
    });
  }

  // --- Original APPROVED interpretations for the 16 principal Odù ----------
  // Drives theme links + reflection questions from the content module. All are
  // ORIGINAL_APP content (permission NOT_REQUIRED) — original, not copied.
  for (const entry of ORIGINAL_INTERPRETATIONS) {
    const oduId = idBySlug.get(entry.oduSlug);
    if (!oduId) continue;

    // Link themes (facts) for this Odù.
    for (const themeSlug of entry.themes) {
      const themeId = themeBySlug.get(themeSlug);
      if (!themeId) continue;
      await prisma.oduTheme.upsert({
        where: { oduId_themeId: { oduId, themeId } },
        update: {},
        create: { oduId, themeId },
      });
    }

    // Idempotent: skip if an original interpretation already exists for this Odù.
    const existing = await prisma.interpretation.findFirst({
      where: { oduId, sourceId: originalSource.id },
    });
    if (existing) continue;

    const interp = await prisma.interpretation.create({
      data: {
        oduId,
        language: "en",
        tradition: "General (original educational summary)",
        title: entry.title,
        contentMd: entry.contentMd,
        notes: "Original educational content seeded for the principal Odù.",
        sourceType: SourceType.ORIGINAL_APP,
        sourceId: originalSource.id,
        reviewStatus: ReviewStatus.APPROVED,
        publishedAt: new Date(),
      },
    });
    await prisma.interpretationVersion.create({
      data: {
        interpretationId: interp.id,
        version: 1,
        contentMd: interp.contentMd,
        reviewStatus: ReviewStatus.APPROVED,
        changeNote: "Initial seed version.",
      },
    });
    await prisma.reflectionQuestion.createMany({
      data: entry.reflectionQuestions.map((prompt) => ({ interpretationId: interp.id, prompt })),
    });
  }

  // --- Sample admin + contributor accounts ---------------------------------
  // Dev passwords (override via env for anything shared). Hashed with scrypt.
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || "changeme-admin-123";
  const contributorPassword = process.env.SEED_CONTRIBUTOR_PASSWORD || "changeme-baba-123";

  const admin = await prisma.user.upsert({
    where: { email: "admin@online-ifa.local" },
    update: { passwordHash: await hashPassword(adminPassword) },
    create: {
      email: "admin@online-ifa.local",
      name: "Seed Admin",
      role: UserRole.ADMIN,
      passwordHash: await hashPassword(adminPassword),
      disclaimerAcceptedAt: new Date(),
    },
  });

  const contributorUser = await prisma.user.upsert({
    where: { email: "babalawo@online-ifa.local" },
    update: { passwordHash: await hashPassword(contributorPassword) },
    create: {
      email: "babalawo@online-ifa.local",
      name: "Seed Babalawo",
      role: UserRole.CONTRIBUTOR,
      passwordHash: await hashPassword(contributorPassword),
      disclaimerAcceptedAt: new Date(),
    },
  });
  await prisma.contributor.upsert({
    where: { userId: contributorUser.id },
    update: {},
    create: {
      userId: contributorUser.id,
      role: ContributorRole.BABALAWO,
      displayName: "Seed Babalawo",
      lineage: "Example lineage (placeholder)",
      verified: true,
    },
  });

  // --- Safety resources ----------------------------------------------------
  for (const r of SAFETY_RESOURCES) {
    const found = await prisma.safetyResource.findFirst({
      where: { category: r.category, title: r.title },
    });
    if (!found) await prisma.safetyResource.create({ data: r });
  }

  // --- Payment products (inactive flow until PAYMENTS_ENABLED) -------------
  for (const p of PRODUCTS) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: { name: p.name, kind: p.kind, priceCents: p.priceCents },
      create: p,
    });
  }

  const oduCount = await prisma.odu.count();
  console.log(`Done. ${oduCount} Odù seeded (expected 256).`);
  console.log(`Admin: ${admin.email} · Contributor: ${contributorUser.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
