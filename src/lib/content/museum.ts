// Static content for /museum — the five instruments. Photo URLs point at
// openly-licensed Wikimedia Commons sources (credited); two slots have no
// confirmed openly-licensed photo yet and render as placeholders.

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

export const MUSEUM_ITEMS: MuseumItem[] = [
  {
    slot: "mus-opon",
    name: "Ọpọn Ifá",
    role: "THE TRAY",
    placeholder: "Drop a photo / 360° capture of an Ọpọn Ifá",
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Brooklyn%20Museum%2075.147.1%20Divination%20Tray%20Opon%20Ifa.jpg?width=900",
    credit: "Brooklyn Museum — open licence, via Wikimedia Commons",
    creditHref: "https://commons.wikimedia.org/wiki/File:Brooklyn_Museum_75.147.1_Divination_Tray_Opon_Ifa.jpg",
    desc: "The carved wooden tray — often round, its border carved with faces and figures, the face of Èṣù at its head. The diviner traces marks in powder across its surface.",
  },
  {
    slot: "mus-opele",
    name: "Ọ̀pẹ̀lẹ̀",
    role: "THE CHAIN",
    placeholder: "Drop a photo of an Ọ̀pẹ̀lẹ̀ chain",
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Opele%20if%C3%A1%20MN%2001.jpg?width=900",
    credit: "Museu Nacional — via Wikimedia Commons",
    creditHref: "https://commons.wikimedia.org/wiki/File:Opele_if%C3%A1_MN_01.jpg",
    desc: "Eight half-pods on a chain in two strands of four. One throw shows each pod concave or convex — a complete figure in a single gesture.",
  },
  {
    slot: "mus-ikin",
    name: "Ìkín",
    role: "THE PALM NUTS",
    placeholder: "Drop a photo of ìkín palm nuts",
    src: "",
    credit: "",
    creditHref: "",
    desc: "Sixteen sacred palm nuts, the oldest and most prestigious instrument. Eight rounds of handling write one figure, mark by mark.",
  },
  {
    slot: "mus-iroke",
    name: "Ìrókè Ifá",
    role: "THE TAPPER",
    placeholder: "Drop a photo of an Ìrókè",
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Brooklyn%20Museum%2075.150.1%20Divination%20Tapper%20Iroke%20Ifa.jpg?width=900",
    credit: "Brooklyn Museum — open licence, via Wikimedia Commons",
    creditHref: "https://commons.wikimedia.org/wiki/File:Brooklyn_Museum_75.150.1_Divination_Tapper_Iroke_Ifa.jpg",
    desc: "A carved tapper — often ivory or wood — struck against the tray to invoke Ọ̀rúnmìlà and open the consultation.",
  },
  {
    slot: "mus-agere",
    name: "Agéré Ifá",
    role: "THE VESSEL",
    placeholder: "Drop a photo of an Agéré",
    src: "",
    credit: "",
    creditHref: "",
    desc: "A carved lidded vessel, frequently a mounted figure or caryatid, in which the ìkín are kept between consultations.",
  },
];
