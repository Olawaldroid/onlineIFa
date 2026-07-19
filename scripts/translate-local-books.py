import json
import os
import re
from pathlib import Path

from argostranslate.translate import get_translation_from_codes

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / ".local-research" / "book-index-source.json"
CACHE = ROOT / ".local-research" / "translations"
PORTUGUESE_NAMES = ("filosofia", "lucumi", "lucumí", "manual_de", "oraculos", "oráculos")


def is_portuguese(filename: str) -> bool:
    normalized = filename.casefold()
    return any(name in normalized for name in PORTUGUESE_NAMES)


def split_text(text: str) -> list[str]:
    sentences = re.split(r"(?<=[.!?])\s+", text)
    parts: list[str] = []
    for sentence in sentences:
        while len(sentence) > 450:
            cut = sentence.rfind(" ", 0, 450)
            cut = cut if cut > 100 else 450
            parts.append(sentence[:cut])
            sentence = sentence[cut:].lstrip()
        if sentence:
            parts.append(sentence)
    return parts


def fast_translate(package_translation, text: str) -> str:
    tokenizer = package_translation.pkg.tokenizer
    parts = split_text(text.replace("Ifá", "Ifa").replace("IFÁ", "IFA"))
    translated: list[str] = []
    for start in range(0, len(parts), 32):
        encoded = [tokenizer.encode(part) for part in parts[start:start + 32]]
        results = package_translation.translator.translate_batch(encoded, beam_size=1, max_batch_size=32)
        translated.extend(tokenizer.decode(result.hypotheses[0]).strip() for result in results)
    return " ".join(translated).replace("IFA", "Ifá").replace("Ifa", "Ifá")


def main() -> None:
    source = json.loads(SOURCE.read_text(encoding="utf-8"))
    translation = get_translation_from_codes("pt", "en")
    if translation is None:
        raise RuntimeError("Portuguese-to-English Argos model is not installed")
    # Initialize the sentence splitter before worker threads access it.
    translation.translate("Texto de inicialização.")
    package_translation = translation.underlying
    CACHE.mkdir(parents=True, exist_ok=True)

    for document in source["documents"]:
        if not is_portuguese(document["filename"]):
            continue
        output = CACHE / f'{document["id"]}.json'
        cached = {"chunks": {}}
        if output.exists():
            cached = json.loads(output.read_text(encoding="utf-8"))
        cached.update({
            "bookId": document["id"],
            "title": document["title"],
            "filename": document["filename"],
            "sourceLanguage": "pt",
            "displayLanguage": "en",
        })
        cached["displayTitle"] = fast_translate(package_translation, document["title"])
        chunks = cached.setdefault("chunks", {})
        total = len(document["chunks"])
        print(f'Translating {document["filename"]} ({len(chunks)}/{total} cached)', flush=True)
        for index, chunk in enumerate(document["chunks"], 1):
            if chunk["id"] not in chunks:
                chunks[chunk["id"]] = fast_translate(package_translation, chunk["content"])
                output.write_text(json.dumps(cached, ensure_ascii=False), encoding="utf-8")
            if index % 10 == 0 or index == total:
                print(f"  {index}/{total}", flush=True)
        output.write_text(json.dumps(cached, ensure_ascii=False), encoding="utf-8")


if __name__ == "__main__":
    main()
