// Static content for /museum. Photo URLs point at openly-licensed sources on
// Wikimedia Commons (each credited and linked). Three collections:
//   MUSEUM_ITEMS   — the five instruments of divination
//   GALLERY_ITEMS  — artefacts held in museum collections around the world
//   LIVING_ITEMS   — the tradition as it is practised today
// The <Photo> component falls back to a labelled placeholder if a remote
// image ever fails to load, so a broken URL degrades gracefully.

export interface MuseumItem {
  slot: string;
  name: string;
  role: string;
  placeholder: string;
  src: string;
  credit: string;
  creditHref: string;
  desc: string;
}

const filePath = (name: string, width = 900) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(name)}?width=${width}`;

const fileHref = (name: string) =>
  `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(name.replace(/ /g, "_"))}`;

export const MUSEUM_ITEMS: MuseumItem[] = [
  {
    slot: "mus-opon",
    name: "Ọpọn Ifá",
    role: "THE TRAY",
    placeholder: "Photo of an Ọpọn Ifá",
    src: filePath("Brooklyn Museum 75.147.1 Divination Tray Opon Ifa.jpg"),
    credit: "Brooklyn Museum — open licence, via Wikimedia Commons",
    creditHref: fileHref("Brooklyn Museum 75.147.1 Divination Tray Opon Ifa.jpg"),
    desc: "The carved wooden tray. Its border divides into nine named sections: the ojú ọpọn (\"face of the tray\") at the head always bears Èṣù's face, and the ẹsẹ̀ ọpọn (\"foot\") sits nearest the diviner, who traces the marks in powder across the open centre.",
  },
  {
    slot: "mus-opele",
    name: "Ọ̀pẹ̀lẹ̀",
    role: "THE CHAIN",
    placeholder: "Photo of an Ọ̀pẹ̀lẹ̀ chain",
    src: filePath("Opele ifá MN 01.jpg"),
    credit: "Museu Nacional — via Wikimedia Commons",
    creditHref: fileHref("Opele ifá MN 01.jpg"),
    desc: "Eight half-pods on a chain in two strands of four. One throw shows each pod concave or convex — a complete figure in a single gesture.",
  },
  {
    slot: "mus-ikin",
    name: "Ìkín",
    role: "THE PALM NUTS",
    placeholder: "Photo of ìkín palm nuts",
    src: filePath("Jogo de Ikin Orossi.JPG"),
    credit: "Via Wikimedia Commons",
    creditHref: fileHref("Jogo de Ikin Orossi.JPG"),
    desc: "Sixteen sacred palm nuts, the oldest and most prestigious instrument. Eight rounds of handling write one figure, mark by mark.",
  },
  {
    slot: "mus-iroke",
    name: "Ìrókè Ifá",
    role: "THE TAPPER",
    placeholder: "Photo of an Ìrókè",
    src: filePath("Brooklyn Museum 75.150.1 Divination Tapper Iroke Ifa.jpg"),
    credit: "Brooklyn Museum — open licence, via Wikimedia Commons",
    creditHref: fileHref("Brooklyn Museum 75.150.1 Divination Tapper Iroke Ifa.jpg"),
    desc: "A carved tapper — often ivory or wood — struck against the tray to invoke Ọ̀rúnmìlà and open the consultation.",
  },
  {
    slot: "mus-agere",
    name: "Agéré Ifá",
    role: "THE VESSEL",
    placeholder: "Photo of an Agéré",
    src: filePath("Àgéré Ifá (Ifá divination vessel) with kneeling woman (MET 1991.17.127) DP-31157-001.jpg"),
    credit: "The Metropolitan Museum of Art — CC0, via Wikimedia Commons",
    creditHref: fileHref("Àgéré Ifá (Ifá divination vessel) with kneeling woman (MET 1991.17.127) DP-31157-001.jpg"),
    desc: "A carved lidded vessel, frequently a mounted figure or caryatid, in which the ìkín are kept between consultations.",
  },
];

export interface GalleryItem {
  slot: string;
  name: string;
  origin: string;
  desc: string;
  src: string;
  credit: string;
  creditHref: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    slot: "gal-tray-ng",
    name: "Carved divination tray",
    origin: "NIGERIAN MUSEUM COLLECTION",
    desc: "A working ọpọn photographed in a Nigerian collection — the carved border framing the smooth central field where the marks are drawn.",
    src: filePath("Ifa divination tray ( Opele Ifa).jpg"),
    credit: "Via Wikimedia Commons",
    creditHref: fileHref("Ifa divination tray ( Opele Ifa).jpg"),
  },
  {
    slot: "gal-iroke-owo",
    name: "Ivory ìrókè from Ọ̀wọ̀",
    origin: "18TH CENTURY · BROOKLYN MUSEUM",
    desc: "A finely carved ivory tapper from the Ọ̀wọ̀ carving tradition of Ondo State — among the oldest surviving Ifá ivories.",
    src: filePath("Divination tapper (iroke ifa), Yoruba, Owo,Ondo state, Nigeria, probably 18th century, ivory - Brooklyn Museum - Brooklyn, NY - DSC08504.JPG"),
    credit: "Brooklyn Museum — via Wikimedia Commons",
    creditHref: fileHref("Divination tapper (iroke ifa), Yoruba, Owo,Ondo state, Nigeria, probably 18th century, ivory - Brooklyn Museum - Brooklyn, NY - DSC08504.JPG"),
  },
  {
    slot: "gal-iroke-cologne",
    name: "Ivory ìrókè",
    origin: "19TH CENTURY · RAUTENSTRAUCH-JOEST-MUSEUM, COLOGNE",
    desc: "A nineteenth-century ivory tapper held in Cologne — the kneeling figure at its centre is a recurring motif of devotion.",
    src: filePath("Divination tapper, Yoruba, Nigeria, 1800s, ivory - Rautenstrauch-Joest-Museum - DSC00262.jpg"),
    credit: "Rautenstrauch-Joest-Museum — via Wikimedia Commons",
    creditHref: fileHref("Divination tapper, Yoruba, Nigeria, 1800s, ivory - Rautenstrauch-Joest-Museum - DSC00262.jpg"),
  },
  {
    slot: "gal-eshu",
    name: "Figure of Èṣù",
    origin: "LATE 19TH CENTURY · MUSEUM FÜNF KONTINENTE, MUNICH",
    desc: "Èṣù, the divine messenger, carries every consultation between worlds — his face watches from the head of most trays.",
    src: filePath("Figure of deity Eshu, Yoruba, Nigeria, end of 19th century - Staatliches Museum für Völkerkunde München - DSC08551.JPG"),
    credit: "Museum Fünf Kontinente — via Wikimedia Commons",
    creditHref: fileHref("Figure of deity Eshu, Yoruba, Nigeria, end of 19th century - Staatliches Museum für Völkerkunde München - DSC08551.JPG"),
  },
  {
    slot: "gal-esu-ng",
    name: "Èṣù figure",
    origin: "YORÙBÁ CARVING TRADITION",
    desc: "Another face of the trickster-messenger, carved in the round — no two workshops render him alike.",
    src: filePath("Esu Figure ( The Yoruba trickster god ).jpg"),
    credit: "Via Wikimedia Commons",
    creditHref: fileHref("Esu Figure ( The Yoruba trickster god ).jpg"),
  },
  {
    slot: "gal-opon-brooklyn2",
    name: "The tray's carved border",
    origin: "BROOKLYN MUSEUM",
    desc: "Border carvings are a language of their own — snakes, birds and bush rats each trace back to a specific Odù story, and regional styles (Ijebu, Osogbo, Ọ̀yọ́) render Èṣù's face differently.",
    src: filePath("Brooklyn Museum 75.147.1 Divination Tray Opon Ifa.jpg", 1200),
    credit: "Brooklyn Museum — open licence, via Wikimedia Commons",
    creditHref: fileHref("Brooklyn Museum 75.147.1 Divination Tray Opon Ifa.jpg"),
  },
];

export const LIVING_ITEMS: GalleryItem[] = [
  {
    slot: "liv-babalawo",
    name: "A babaláwo at work",
    origin: "THE PRACTICE TODAY",
    desc: "Ifá is not a museum piece — it is practised daily across West Africa and the diaspora, by diviners trained over many years.",
    src: filePath("Babalawo ifa.jpg"),
    credit: "Via Wikimedia Commons",
    creditHref: fileHref("Babalawo ifa.jpg"),
  },
  {
    slot: "liv-osun-arc",
    name: "Divination arc, Sacred Grove of Ọ̀ṣun",
    origin: "OSUN-OSOGBO, NIGERIA",
    desc: "Ifá imagery built into the architecture of the Osun-Osogbo Sacred Grove, a UNESCO World Heritage Site on the banks of the Ọ̀ṣun river.",
    src: filePath("Ifa Divination arc at the Sacred Grove Of Osun.jpg"),
    credit: "Via Wikimedia Commons",
    creditHref: fileHref("Ifa Divination arc at the Sacred Grove Of Osun.jpg"),
  },
  {
    slot: "liv-osun-grove",
    name: "The Sacred Grove",
    origin: "OSUN-OSOGBO, NIGERIA",
    desc: "The forest sanctuary of Osun-Osogbo — one of the last of the sacred groves that once stood beside every Yorùbá town.",
    src: filePath("Osun Osogbo forest, river and sacred groove 08.jpg"),
    credit: "Via Wikimedia Commons",
    creditHref: fileHref("Osun Osogbo forest, river and sacred groove 08.jpg"),
  },
];
