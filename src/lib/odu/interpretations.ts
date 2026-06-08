// ===========================================================================
// Original educational interpretations for the 16 principal Odù.
// ---------------------------------------------------------------------------
// IMPORTANT: This is ORIGINAL content written for Online Ifá. It is NOT copied
// from any book or proprietary source. It synthesises widely-shared, openly
// documented cultural THEMES (see docs/IFA_RESEARCH.md for the sources that
// informed the factual grounding) into plain-language, educational summaries
// for learning and reflection.
//
// These summaries are general and educational. They are NOT a substitute for
// divination performed by a trained Babalawo, and make no claim of spiritual
// authority. Each is seeded as an APPROVED interpretation from the
// ORIGINAL_APP source (permission NOT_REQUIRED).
// ===========================================================================

export interface OriginalInterpretation {
  oduSlug: string;
  title: string;
  /** Markdown body — original educational summary. */
  contentMd: string;
  /** Theme slugs (must exist in the seeded theme set). */
  themes: string[];
  /** Non-directive reflection prompts shown with results. */
  reflectionQuestions: string[];
}

const DISCLAIMER =
  "\n\n*This is original, educational content written for Online Ifá. It is a " +
  "general summary for learning and reflection, not a substitute for divination " +
  "by a trained Babalawo.*";

export const ORIGINAL_INTERPRETATIONS: OriginalInterpretation[] = [
  {
    oduSlug: "ogbe-meji",
    title: "Èjì Ogbè — light, beginnings, and clear potential",
    contentMd:
      "## Èjì Ogbè\n\n" +
      "Èjì Ogbè is the most senior of the sixteen principal Odù. Its signature is " +
      "four single marks on each leg — the simplest, most open pattern in the whole " +
      "corpus.\n\n" +
      "As a teaching theme, Èjì Ogbè is widely associated with **light, openness, and " +
      "new beginnings** — the moment when potential becomes possible. It points to " +
      "fresh starts, clarity of purpose, and the responsibility that comes with " +
      "leadership and good fortune. The lesson often drawn from it is that an open " +
      "road still has to be walked with patience and integrity." +
      DISCLAIMER,
    themes: ["beginnings", "leadership", "clarity", "abundance"],
    reflectionQuestions: [
      "What new beginning is asking for your attention right now?",
      "Where could acting with integrity open a clearer path?",
      "What would it look like to lead yourself well this week?",
    ],
  },
  {
    oduSlug: "oyeku-meji",
    title: "Ọ̀yẹ̀kú Méjì — endings, rest, and renewal",
    contentMd:
      "## Ọ̀yẹ̀kú Méjì\n\n" +
      "Ọ̀yẹ̀kú Méjì is the second principal Odù. Its signature is four double marks on " +
      "each leg — structurally the inverse of Èjì Ogbè.\n\n" +
      "Where Èjì Ogbè is associated with light, Ọ̀yẹ̀kú is often taught through the " +
      "theme of **endings and the close of a cycle** — darkness understood as rest, " +
      "stillness, and the ground from which new things grow. A common reflection is " +
      "that nothing is truly final: every ending makes room for a beginning, and " +
      "knowing when to let something rest is its own kind of wisdom." +
      DISCLAIMER,
    themes: ["transformation", "caution", "patience"],
    reflectionQuestions: [
      "What in your life may be reaching a natural ending?",
      "What would it free you to do if you allowed it to rest?",
      "Where might stillness serve you better than effort right now?",
    ],
  },
  {
    oduSlug: "iwori-meji",
    title: "Ìwòrì Méjì — insight, depth, and transformation",
    contentMd:
      "## Ìwòrì Méjì\n\n" +
      "Ìwòrì Méjì is the third principal Odù.\n\n" +
      "Its common teaching theme is **deep seeing** — perception, self-knowledge, and " +
      "the inner fire that drives change. Ìwòrì is associated with looking beneath the " +
      "surface of a situation and with the work of forming a clear identity. The " +
      "reflection often drawn from it is that real understanding takes effort and " +
      "honesty, and that passion is most useful when it is guided by insight." +
      DISCLAIMER,
    themes: ["transformation", "perseverance", "clarity"],
    reflectionQuestions: [
      "What situation are you only seeing on the surface?",
      "What does honest self-reflection reveal that you have been avoiding?",
      "Where is your energy best directed?",
    ],
  },
  {
    oduSlug: "odi-meji",
    title: "Òdí Méjì — foundations, security, and protection",
    contentMd:
      "## Òdí Méjì\n\n" +
      "Òdí Méjì is the fourth principal Odù.\n\n" +
      "It is widely taught through themes of **foundation, containment, and " +
      "protection** — the idea of sealing or securing something so it can take root " +
      "and last. Òdí is associated with the home, with family bonds, and with the " +
      "stability that makes growth possible. A frequent reflection is that strong " +
      "foundations and clear boundaries are not limitations but the conditions for " +
      "lasting things." +
      DISCLAIMER,
    themes: ["family", "community", "foundation", "protection"],
    reflectionQuestions: [
      "What in your life needs a stronger foundation before it can grow?",
      "Which relationships deserve your care and protection?",
      "Where would a clear boundary actually help you?",
    ],
  },
  {
    oduSlug: "irosun-meji",
    title: "Ìrosùn Méjì — memory, ancestry, and grounding",
    contentMd:
      "## Ìrosùn Méjì\n\n" +
      "Ìrosùn Méjì is the fifth principal Odù.\n\n" +
      "Its teaching theme often centres on **memory, ancestry, and what has come " +
      "before** — the stable ground of inheritance, lineage, and lessons already " +
      "learned. Ìrosùn invites attention to roots and to the steadying influence of " +
      "the past. A common reflection is that we stand on the work of those before us, " +
      "and that remembering where we come from can steady a present that feels " +
      "uncertain." +
      DISCLAIMER,
    themes: ["ancestry", "foundation", "patience"],
    reflectionQuestions: [
      "What inheritance — practical or emotional — are you carrying?",
      "What lesson from your past is relevant to your present choice?",
      "Who came before you that you could honour or learn from?",
    ],
  },
  {
    oduSlug: "owonrin-meji",
    title: "Ọ̀wọ́nrín Méjì — change, disruption, and renewal",
    contentMd:
      "## Ọ̀wọ́nrín Méjì\n\n" +
      "Ọ̀wọ́nrín Méjì is the sixth principal Odù.\n\n" +
      "It is widely taught through the theme of **change and the winds of " +
      "disruption** — instability that unsettles the familiar but can clear the way " +
      "for something new. Ọ̀wọ́nrín is associated with reversal and with the way " +
      "apparent chaos can, in time, reveal a deeper order. A frequent reflection is " +
      "that disruption is often the beginning of growth rather than only loss." +
      DISCLAIMER,
    themes: ["transformation", "conflict", "caution"],
    reflectionQuestions: [
      "What change are you resisting that might actually help you?",
      "Where could you find steadiness in the middle of disruption?",
      "What might this unsettled moment be clearing space for?",
    ],
  },
  {
    oduSlug: "obara-meji",
    title: "Ọ̀bàrà Méjì — speech, strength, and influence",
    contentMd:
      "## Ọ̀bàrà Méjì\n\n" +
      "Ọ̀bàrà Méjì is the seventh principal Odù.\n\n" +
      "Its common teaching themes are **strength, speech, and the power of words** — " +
      "the ability to influence, to lead, and to shape situations through " +
      "communication. Ọ̀bàrà is associated with eloquence and persuasion, and with " +
      "the responsibility that comes with them. A frequent reflection is that words " +
      "build or break, and that strength is most admirable when it serves rather than " +
      "dominates." +
      DISCLAIMER,
    themes: ["leadership", "abundance", "communication"],
    reflectionQuestions: [
      "Where could clearer, kinder words change a situation for you?",
      "Are you using your strength to serve or to force?",
      "What do you most need to say — or to stop saying?",
    ],
  },
  {
    oduSlug: "okanran-meji",
    title: "Ọ̀kànràn Méjì — focus, direction, and decisive change",
    contentMd:
      "## Ọ̀kànràn Méjì\n\n" +
      "Ọ̀kànràn Méjì is the eighth principal Odù.\n\n" +
      "It is often taught through themes of **focus and a decisive change of " +
      "direction** — a caution against scattering your attention across too many " +
      "things. Ọ̀kànràn is associated with new beginnings that must be deliberate and " +
      "directed toward a clear goal to be effective. A common reflection is that " +
      "energy without focus dissipates, while focused energy moves things." +
      DISCLAIMER,
    themes: ["clarity", "conflict", "leadership"],
    reflectionQuestions: [
      "Where is your attention too scattered to be effective?",
      "What single goal deserves your focus right now?",
      "What change of direction have you been postponing?",
    ],
  },
  {
    oduSlug: "ogunda-meji",
    title: "Ògúndá Méjì — clearing the path and decisive action",
    contentMd:
      "## Ògúndá Méjì\n\n" +
      "Ògúndá Méjì is the ninth principal Odù.\n\n" +
      "Its teaching theme often centres on **clearing a path and opening the road** — " +
      "the decisive, sometimes forceful action that removes obstacles and creates " +
      "progress. Ògúndá is associated with effort, courage, and the pursuit of one's " +
      "destiny. A frequent reflection is that some obstacles only yield to direct, " +
      "honest action, and that courage is needed to begin." +
      DISCLAIMER,
    themes: ["perseverance", "leadership", "transformation"],
    reflectionQuestions: [
      "What obstacle is asking for direct, honest action?",
      "Where do you need courage more than comfort right now?",
      "What path would open if you took the first real step?",
    ],
  },
  {
    oduSlug: "osa-meji",
    title: "Ọ̀sá Méjì — sudden change and resilience",
    contentMd:
      "## Ọ̀sá Méjì\n\n" +
      "Ọ̀sá Méjì is the tenth principal Odù.\n\n" +
      "It is widely taught through the theme of **sudden, unexpected change** — the " +
      "outside forces that can disrupt or transform a situation quickly, like a storm. " +
      "Ọ̀sá is associated with the need for resilience and adaptability. A common " +
      "reflection is that we cannot control every force around us, but we can choose " +
      "how steadily and wisely we respond." +
      DISCLAIMER,
    themes: ["transformation", "caution", "perseverance"],
    reflectionQuestions: [
      "What unexpected change are you being asked to adapt to?",
      "What can you control here, and what must you release?",
      "Where would steadiness serve you better than panic?",
    ],
  },
  {
    oduSlug: "ika-meji",
    title: "Ìká Méjì — discernment and the use of power",
    contentMd:
      "## Ìká Méjì\n\n" +
      "Ìká Méjì is the eleventh principal Odù.\n\n" +
      "Its common teaching themes are **discernment, care, and the ethical use of " +
      "power** — an awareness of how influence and knowledge can be used well or " +
      "badly. Ìká is associated with caution and with weighing the consequences of " +
      "one's actions. A frequent reflection is that capability carries responsibility, " +
      "and that wisdom shows in restraint as much as in action." +
      DISCLAIMER,
    themes: ["caution", "clarity", "protection"],
    reflectionQuestions: [
      "Where do you need more discernment before acting?",
      "How might your choices affect others around you?",
      "Where would restraint be wiser than force?",
    ],
  },
  {
    oduSlug: "oturupon-meji",
    title: "Òtúrúpọ̀n Méjì — endurance, courage, and burdens carried",
    contentMd:
      "## Òtúrúpọ̀n Méjì\n\n" +
      "Òtúrúpọ̀n Méjì is the twelfth principal Odù.\n\n" +
      "It is often taught through themes of **endurance and courage in the face of " +
      "difficulty** — the burdens we carry and the consequences of avoiding them. " +
      "Òtúrúpọ̀n is associated with patience, health, and perseverance through hard " +
      "seasons. A common reflection is that facing a difficulty squarely, with " +
      "courage, is usually lighter in the end than carrying it unaddressed." +
      DISCLAIMER,
    themes: ["perseverance", "patience", "protection"],
    reflectionQuestions: [
      "What burden have you been avoiding rather than facing?",
      "Where would a little more courage change things?",
      "What support would help you endure this season?",
    ],
  },
  {
    oduSlug: "otura-meji",
    title: "Òtúrá Méjì — peace, wisdom, and harmony",
    contentMd:
      "## Òtúrá Méjì\n\n" +
      "Òtúrá Méjì is the thirteenth principal Odù.\n\n" +
      "Its teaching theme often centres on **peace, harmony, and wisdom** — the " +
      "calming of mind and heart, and the search for understanding and right " +
      "relationship. Òtúrá is associated with reconciliation, faith, and the quiet " +
      "clarity that comes from inner balance. A frequent reflection is that peace is " +
      "not passivity but a steady ground from which wise action becomes possible." +
      DISCLAIMER,
    themes: ["clarity", "community", "patience"],
    reflectionQuestions: [
      "Where in your life are you being invited toward peace?",
      "What relationship could benefit from reconciliation?",
      "What would change if you acted from calm rather than fear?",
    ],
  },
  {
    oduSlug: "irete-meji",
    title: "Ìrẹtẹ̀ Méjì — vitality, hope, and the fullness of life",
    contentMd:
      "## Ìrẹtẹ̀ Méjì\n\n" +
      "Ìrẹtẹ̀ Méjì is the fourteenth principal Odù.\n\n" +
      "It is widely taught through themes of **vitality, long life, and the " +
      "exaltation of life** — prosperity, health, and the encouragement to commit " +
      "fully to one's path. Ìrẹtẹ̀ is associated with hope and with the fulfilment " +
      "that comes from dedication. A common reflection is that a life lived with " +
      "commitment and gratitude tends to flourish." +
      DISCLAIMER,
    themes: ["abundance", "beginnings", "clarity"],
    reflectionQuestions: [
      "What in your life is asking for fuller commitment?",
      "Where could gratitude shift how you see your situation?",
      "What would living wholeheartedly look like for you?",
    ],
  },
  {
    oduSlug: "ose-meji",
    title: "Ọ̀ṣẹ́ Méjì — fertility, increase, and sacrifice",
    contentMd:
      "## Ọ̀ṣẹ́ Méjì\n\n" +
      "Ọ̀ṣẹ́ Méjì is the fifteenth principal Odù.\n\n" +
      "Its common teaching themes are **fertility, increase, and the value of " +
      "sacrifice** — patient effort and giving that lead, in time, to growth in " +
      "family, relationship, and resources. Ọ̀ṣẹ́ is associated with renewal and with " +
      "the rewards of persistence. A frequent reflection is that meaningful increase " +
      "usually asks something of us first." +
      DISCLAIMER,
    themes: ["abundance", "family", "perseverance"],
    reflectionQuestions: [
      "What are you hoping will grow in your life?",
      "What patient effort or giving might it ask of you first?",
      "Where has persistence already begun to bear fruit?",
    ],
  },
  {
    oduSlug: "ofun-meji",
    title: "Òfún Méjì — wisdom, blessing, and origins",
    contentMd:
      "## Òfún Méjì\n\n" +
      "Òfún Méjì, also called Ọ̀ràngún Méjì, is the sixteenth principal Odù.\n\n" +
      "It is often taught through themes of **ancient wisdom, blessing, and " +
      "origins** — a sense of source, generosity, and the deep knowledge that " +
      "underlies things. Òfún is associated with spiritual authority understood as " +
      "responsibility, and with the giving of good things. A common reflection is " +
      "that wisdom is meant to be shared, and that blessings carry an obligation to " +
      "use them well." +
      DISCLAIMER,
    themes: ["spiritual", "abundance", "clarity"],
    reflectionQuestions: [
      "What wisdom have you been given that you could share?",
      "Where could you be more generous with what you have?",
      "What does using a blessing responsibly look like for you?",
    ],
  },
];
