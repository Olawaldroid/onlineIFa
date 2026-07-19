// ===========================================================================
// Ẹsẹ Ifá — recorded verses, quoted with full attribution. FACTS + QUOTATION.
// ---------------------------------------------------------------------------
// Every verse here is quoted verbatim from an OPEN-ACCESS scholarly source:
//   Pogoson, O. I. & Akande, A. O. (2011), "Ifa Divination Trays from
//   Isale-Oyo", Cadernos de Estudos Africanos 21, 15–41 (open access:
//   https://journals.openedition.org/cea/196), which records the verses from
//   named Isale-Ọyọ diviners (2009–2011 fieldwork).
// The Yorùbá is reproduced as printed there (the journal prints it without
// full tone marks); translations are the article's own. Do NOT add verses
// from the private (copyrighted) reference shelf — new verses arrive either
// from open/public-domain sources with exact citations like this one, or
// through the contributor review flow.
// ===========================================================================

export interface EseVerse {
  oduSlug: string;
  /** Whose recitation the source records. */
  recordedFrom: string;
  /** What the verse is about / why it matters (our original summary). */
  context: string;
  yoruba: string[];
  english: string[];
  excerpt: boolean;
  source: string;
  sourceHref: string;
}

const SOURCE =
  "Recorded in Pogoson & Akande (2011), “Ifa Divination Trays from Isale-Oyo”, Cadernos de Estudos Africanos 21, open access";
const SOURCE_HREF = "https://journals.openedition.org/cea/196";

export const ESE_VERSES: EseVerse[] = [
  {
    oduSlug: "oyeku-meji",
    recordedFrom: "Ojebode Fabiyi, diviner, Isale-Ọyọ (2011)",
    context:
      "A verse of Ọ̀yẹ̀kú Méjì about the killing of a great leopard and the sharing of its body between kings. Diviners recite it to explain the big cats carved on divination trays.",
    yoruba: [
      "Oni ni won roko leti opon",
      "Ola ni won sakaa lagbe …",
      "Oni la o kun Ifa Olukorokorobojo",
      "Ola la o kun Ifa Olukorokorobojo",
      "Ani won o kun, Won kun",
      "Won pa Ekun kan minijo-minijo",
      "Ti nbe ni abe iti",
      "Won gbe ori re fun Oba Ido",
      "Omo Ejiworogbe Ile Ido",
      "Won gbe yegese ara re fun Oba Eleyo Geji",
      "Omo ajoju ebo gbara",
    ],
    english: [
      "Today we shall clear the forest on the edges of the tray",
      "Tomorrow we shall fry bean cake in a gourd (impossibilities) …",
      "Today we will divide it, a divination of Olukorokorobojo",
      "Tomorrow we will cut it to pieces, a divination of Olukorokorobojo",
      "We asked them to butcher it, they did",
      "They killed a big tiger",
      "They cover it and kept it under the plantain trees",
      "They gave its head to the king of Ido",
      "The son of Ejiworogbe of Ido",
      "Another part was given to King Eleyo Geji",
      "The one that thrives on sacrifice",
    ],
    excerpt: true,
    source: SOURCE,
    sourceHref: SOURCE_HREF,
  },
  {
    oduSlug: "ogbe-ofun",
    recordedFrom: "Fatokun Morakinyo, Oba Edu (Ifá chief) of Isale-Ọyọ (2011)",
    context:
      "The opening of the Ogbè Òfún story, where Èṣù tests Ọ̀rúnmìlà with a borrowed monkey. This story explains why Èṣù's face watches from the head of every divination tray.",
    yoruba: [
      "Ogbefohun folohun",
      "Nko fohun folohun",
      "Adia fun Esu on gbogbo irunmole ti won jo nsore",
      "Adia fun Orunmila oun Esu odara ti won jo nsore",
    ],
    english: [
      "Ogbe return what was kept in your custody to the owner",
      "No, I will not return it",
      "The same performed divination for Esu and all other divinities who were friends",
      "It also performed divination for Orunmila and Esu who were friends",
    ],
    excerpt: true,
    source: SOURCE,
    sourceHref: SOURCE_HREF,
  },
  {
    oduSlug: "okanran-osa",
    recordedFrom: "Fasakin, diviner, Isale-Ọyọ (2009)",
    context:
      "The verse of the Snake: harmless at creation and used for tying firewood, the snake sacrifices and receives its venom. Diviners recite it to explain the snakes carved on tray borders.",
    yoruba: [
      "Okaran Osa, awo Ejo",
      "Adia fun ejo",
      "Ejo nbe laarin ota",
      "Nigba iwase",
      "Ejo ko loro",
      "Itakun ni ejo, won fi ndigi lati oko wale",
      "Ejo to awon babalawo lo",
      "Won ni ko bo ori",
      "Ejo bo ori",
      "Won ni ko rubo okini",
      "O rubo",
      "Ejo di oloro",
      "Ejo di ohun iberu",
      "Ori kan ti ejo ni",
      "Nii fi tugba ori ka",
    ],
    english: [
      "Okaran Osa is the divination for the Snake",
      "The Snake consulted ifa for solution",
      "He was amidst enemies",
      "At the time of creation",
      "Snake was harmless",
      "Snake was used for tying firewood",
      "Snake could no longer contain this insult, he went to the diviner",
      "He was asked to sacrifice in honour of his head",
      "He performed the sacrifice",
      "He was asked to sacrifice needle",
      "He did",
      "Snake became poisonous with venom",
      "It became frightful",
      "A snake has only one head",
      "Yet, its appearance sends several heads restless",
    ],
    excerpt: false,
    source: SOURCE,
    sourceHref: SOURCE_HREF,
  },
  {
    oduSlug: "ogunda-owonrin",
    recordedFrom: "Ojebode Fabiyi, diviner, Isale-Ọyọ (2011)",
    context:
      "From Ògúndá Ọ̀wọ́nrín (also called Ogundanlare): a pilgrim's plea to Ifá for the prosperity given to others, ending with the honour of a horse. This is the verse behind the horsemen carved in Ifá art.",
    yoruba: [
      "Emi ko ri eni ti nrele Alara",
      "Ko ba mi ki gbogbo omo won nile Alara",
      "Emi o ri eni tin lo si ode Ejigbo",
      "Ko ba mi ki Orisatalabi ara ode Ejigbo …",
      "Ifa ise re ni mo je kiri, n go je ngo mu",
      "Ti mo fi de Oke Ijeti ile Agboniregun",
      "Won ni iwo lo se fun Olu ti Olu fi lowo",
      "Ifa ire ni ko se fun mi ki nlowo …",
      "Ojo ti Owarangun Aga ku",
      "Esin ni won fi ru oku Owarangun Aga wale",
      "Ti mo ba gbogbogbo, ti mo ba tototo",
      "Esin ni ki omo o fi ru oku mi dan dan dan",
    ],
    english: [
      "Whoever is going to Alara",
      "Should salute inhabitants of Alara",
      "Whoever is going to Ejigbo",
      "Should salute Orisatalabi the son of Ejigbo …",
      "Ifa it is your instructions that I am carrying out, that made me not eat nor drink",
      "Till I got to Oke Ijeti the abode of Agboniregun",
      "I overheard that you (Ifa) helped Olu to make plenty money",
      "Ifa favour me also to make money …",
      "The day Owarangun died",
      "His corpse was transported home on a horse",
      "Ifa, when I am old and aged",
      "Let my children carry my corpse with horses",
    ],
    excerpt: true,
    source: SOURCE,
    sourceHref: SOURCE_HREF,
  },
];

/** The traditional closing pattern of an ẹsẹ recitation — how chants end once
 *  the sacrifice has been performed. Not tied to one Odù. */
export const CLOSING_CHANT: Omit<EseVerse, "oduSlug"> = {
  recordedFrom: "The common closing pattern, as recorded in Isale-Ọyọ",
  context: "Many ẹsẹ end with these lines once the person in the story has performed the prescribed sacrifice.",
  yoruba: [
    "Igba ti o dafa",
    "Won ni ebo ni o waa ru.",
    "O si ru u.",
    "Igba o rubo tan…",
    "Lo ba dipe ohun gbogbo nlo deede.",
    "Orin awo wa bo si lenu…",
  ],
  english: [
    "He took his problems to ifa",
    "He was told to perform sacrifice,",
    "And he performed it.",
    "After he performed the sacrifice",
    "He became a happy man.",
    "He started to sing the song of ifa priests…",
  ],
  excerpt: true,
  source: SOURCE,
  sourceHref: SOURCE_HREF,
};

export function versesForOdu(oduSlug: string): EseVerse[] {
  return ESE_VERSES.filter((v) => v.oduSlug === oduSlug);
}
