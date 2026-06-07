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

const prisma = new PrismaClient();

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

  // --- Attach a few themes to the principal Odù (illustrative facts) -------
  const sampleThemeMap: Record<string, string[]> = {
    "ogbe-meji": ["beginnings", "leadership"],
    "oyeku-meji": ["transformation", "caution"],
    "iwori-meji": ["perseverance"],
    "odi-meji": ["family", "community"],
    "irosun-meji": ["abundance"],
    "owonrin-meji": ["conflict", "caution"],
    "obara-meji": ["abundance", "patience"],
    "okanran-meji": ["conflict"],
  };
  for (const [slug, themes] of Object.entries(sampleThemeMap)) {
    const oduId = idBySlug.get(slug);
    if (!oduId) continue;
    for (const themeSlug of themes) {
      const themeId = themeBySlug.get(themeSlug);
      if (!themeId) continue;
      await prisma.oduTheme.upsert({
        where: { oduId_themeId: { oduId, themeId } },
        update: {},
        create: { oduId, themeId },
      });
    }
  }

  // --- One example APPROVED original interpretation (Èjì Ogbè) -------------
  const ogbeId = idBySlug.get("ogbe-meji")!;
  const existing = await prisma.interpretation.findFirst({
    where: { oduId: ogbeId, sourceId: originalSource.id },
  });
  if (!existing) {
    const interp = await prisma.interpretation.create({
      data: {
        oduId: ogbeId,
        language: "en",
        tradition: "General (educational summary)",
        title: "An introduction to Èjì Ogbè",
        contentMd:
          "## Èjì Ogbè\n\n" +
          "Èjì Ogbè is the most senior of the sixteen principal Odù. Its signature shows " +
          "four single marks on each leg.\n\n" +
          "*This is original, educational content written for Online Ifá. It is a general " +
          "summary intended for learning and reflection, not a substitute for divination " +
          "by a trained Babalawo.*\n\n" +
          "**Reflection:** Where in your life are you being invited to begin something new?",
        notes: "Seed example of approved original content.",
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
      data: [
        { interpretationId: interp.id, prompt: "What new beginning is asking for your attention?" },
        { interpretationId: interp.id, prompt: "What would acting with integrity look like here?" },
      ],
    });
  }

  // --- Sample admin + contributor accounts ---------------------------------
  const admin = await prisma.user.upsert({
    where: { email: "admin@online-ifa.local" },
    update: {},
    create: {
      email: "admin@online-ifa.local",
      name: "Seed Admin",
      role: UserRole.ADMIN,
      disclaimerAcceptedAt: new Date(),
    },
  });

  const contributorUser = await prisma.user.upsert({
    where: { email: "babalawo@online-ifa.local" },
    update: {},
    create: {
      email: "babalawo@online-ifa.local",
      name: "Seed Babalawo",
      role: UserRole.CONTRIBUTOR,
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
