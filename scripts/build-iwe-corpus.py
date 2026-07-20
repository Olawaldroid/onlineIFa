"""Build the permission-cleared Ìwé fún Odù Ifá consultation corpus.

The source PDF remains local-only. This script emits a compact, page-cited
selection of numbered Èsè for public use after project-owner permission.
"""

from __future__ import annotations

import bisect
import hashlib
import json
import re
import unicodedata
from pathlib import Path

from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
SOURCE_CANDIDATES = [
    ROOT / "docs" / "originals" / "pdfcoffee.com_iwe-fun-odu-ifa-4-pdf-free.pdf",
    Path(r"C:\Users\info\Documents\Wiki\originals\pdfcoffee.com_iwe-fun-odu-ifa-4-pdf-free.pdf"),
]
OUTPUT = ROOT / "content" / "ese-ifa" / "iwe-fun-odu-ifa.json"
ROOTS = [
    "ogbe", "oyeku", "iwori", "odi", "irosun", "owonrin", "obara", "okanran",
    "ogunda", "osa", "ika", "oturupon", "otura", "irete", "ose", "ofun",
]
ALIASES = {"idi": "odi", "okanaran": "okanran"}

# These headings use contracted names in the source. The page is the printed
# page and PDF page; the scan's numbering is aligned.
MANUAL_START_PAGES = {
    "ogbe-odi": 50,
    "ogbe-osa": 84,
    "ogbe-ofun": 104,
    "oyeku-irosun": 136,
    "odi-irosun": 204,
    "owonrin-irosun": 285,
    "okanran-meji": 345,
    "okanran-irosun": 364,
    "okanran-owonrin": 365,
    "ogunda-ogbe": 404,
    "oturupon-irosun": 507,
    "otura-oyeku": 549,
    "irete-irosun": 601,
    "ose-odi": 638,
    "ofun-irosun": 684,
}

ESE_MARKER = re.compile(r"(?im)^\s*Ese\s*\.?\s*(\d+)[^\n]*\n")
ACTIONABLE = re.compile(
    r"(ifa medicine|medicine\s*:|chant to|\bspell\b|\brape\b|\bsuicid\w*\b|"
    r"\bmurder\w*\b|kill themselves|how to (?:kill|harm)|\bpoison(?:ing)?\b)",
    re.IGNORECASE,
)
PRESCRIPTION = re.compile(r"\b(sacrif\w*|ebo|rubo|offering\w*)\b", re.IGNORECASE)


def normalize(value: str) -> str:
    value = value.lower().translate(str.maketrans({"ş": "s", "ṣ": "s", "ọ": "o", "ẹ": "e", "ɔ": "o"}))
    value = unicodedata.normalize("NFKD", value)
    value = "".join(char for char in value if not unicodedata.combining(char))
    return re.sub(r"[^a-z]+", " ", value).strip()


def heading_slug(line: str) -> str | None:
    parts = [ALIASES.get(part, part) for part in normalize(line).split()]
    if len(parts) == 2 and parts[0] == "eji" and parts[1] in ROOTS:
        return f"{parts[1]}-meji"
    if len(parts) == 2 and parts[1] == "meji" and parts[0] in ROOTS:
        return f"{parts[0]}-meji"
    if len(parts) == 2 and all(part in ROOTS for part in parts):
        return f"{parts[0]}-{parts[1]}"
    return None


def expected_slugs() -> list[str]:
    result: list[str] = []
    for right in ROOTS:
        result.append(f"{right}-meji")
        result.extend(f"{right}-{left}" for left in ROOTS if left != right)
    return result


def clean_passage(value: str) -> str:
    lines: list[str] = []
    for raw_line in value.replace("\f", "\n").splitlines():
        line = re.sub(r"\s+", " ", raw_line).strip()
        if not line or line == "Ìwé fún Odù Ifá" or line.isdigit():
            if lines and lines[-1] != "":
                lines.append("")
            continue
        lines.append(line)
    text = "\n".join(lines).strip()
    return re.sub(r"\n{3,}", "\n\n", text)


def page_for_offset(offsets: list[int], offset: int) -> int:
    return bisect.bisect_right(offsets, offset)


def main() -> None:
    source = next((path for path in SOURCE_CANDIDATES if path.exists()), None)
    if source is None:
        raise FileNotFoundError("Place the permission-cleared Ìwé fún Odù Ifá PDF in docs/originals first.")

    source_bytes = source.read_bytes()
    pages = [(page.extract_text() or "") for page in PdfReader(source).pages]
    offsets: list[int] = []
    cursor = 0
    for page in pages:
        offsets.append(cursor)
        cursor += len(page) + 1
    joined = "\f".join(pages)

    starts: dict[str, tuple[int, int]] = {}
    for page_number, page in enumerate(pages, 1):
        position = 0
        for line in page.splitlines(keepends=True):
            slug = heading_slug(line.strip())
            if slug and slug not in starts:
                starts[slug] = (page_number, position + len(line))
            position += len(line)
    for slug, page_number in MANUAL_START_PAGES.items():
        starts[slug] = (page_number, 0)

    ordered: list[tuple[str, int, int]] = []
    for slug in expected_slugs():
        if slug not in starts:
            continue
        page_number, position = starts[slug]
        ordered.append((slug, offsets[page_number - 1] + position, page_number))
    if any(ordered[index][1] <= ordered[index - 1][1] for index in range(1, len(ordered))):
        raise RuntimeError("Odù section starts are not in canonical source order.")

    sections = []
    for index, (slug, section_start, start_page) in enumerate(ordered):
        section_end = ordered[index + 1][1] if index + 1 < len(ordered) else len(joined)
        section = joined[section_start:section_end]
        markers = list(ESE_MARKER.finditer(section))
        candidates = []
        for marker_index, marker in enumerate(markers):
            raw_start = section_start + marker.end()
            raw_end = section_start + (markers[marker_index + 1].start() if marker_index + 1 < len(markers) else len(section))
            text = clean_passage(joined[raw_start:raw_end])
            if not 80 <= len(text) <= 8000 or ACTIONABLE.search(text):
                continue
            number = int(marker.group(1))
            first_page = page_for_offset(offsets, raw_start)
            last_page = page_for_offset(offsets, max(raw_start, raw_end - 1))
            candidates.append({
                "id": f"iwe-{slug}-ese-{number}-p{first_page}-{marker_index + 1}",
                "number": number,
                "pdfPages": str(first_page) if first_page == last_page else f"{first_page}–{last_page}",
                "printedPages": str(first_page) if first_page == last_page else f"{first_page}–{last_page}",
                "text": text,
                "excerpt": False,
                "prescriptionMentions": len(PRESCRIPTION.findall(text)),
            })
        candidates.sort(key=lambda item: (item["prescriptionMentions"], len(item["text"]), item["number"]))
        if candidates:
            sections.append({"oduSlug": slug, "sectionStartPage": start_page, "verses": candidates[:3]})

    corpus = {
        "schemaVersion": 1,
        "generatedFrom": source.name,
        "source": {
            "id": "iwe-fun-odu-ifa-agbovi-2018",
            "title": "Ìwé fún Odù Ifá — Ancient Afrikan Sacred Text",
            "compiler": "Ayinon (His Royal Majesty) Axɔsú Àgèlògbàgàn Àgbɔ̀vì I",
            "publisher": "Kilombo Productions",
            "copyrightYears": "2011–2018",
            "permission": {
                "status": "GRANTED",
                "confirmedBy": "Project owner",
                "confirmedAt": "2026-07-20",
                "scope": "Public display of source-attributed Èsè passages in Online Ifá consultation and Odù pages.",
            },
            "localCopy": {
                "sha256": hashlib.sha256(source_bytes).hexdigest(),
                "pageCount": len(pages),
            },
            "transcriptionNote": "Extracted from the permission-cleared PDF with line-flow cleanup only; source spelling is retained.",
        },
        "coverage": {
            "oduSectionsInSource": len(ordered),
            "oduSectionsPublished": len(sections),
            "note": "Òfún–Ogbè has no independently identified section in this scan and is not inferred from another Odù.",
        },
        "sections": sections,
    }
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(corpus, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {sum(len(section['verses']) for section in sections)} verses across {len(sections)} Odù to {OUTPUT}")


if __name__ == "__main__":
    main()
