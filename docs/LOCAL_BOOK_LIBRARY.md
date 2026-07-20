# Local book library

Online Ifá can build a private, local-only searchable index from PDF and EPUB
books without committing those books or the extracted text to Git.

## Setup

1. Put books in `C:\Users\info\Documents\Wiki\originals`, or set
   `IFA_BOOKS_PATH` to another absolute directory.
2. Run `npm run books:index` after adding or replacing books. Scanned PDFs are
   OCRed automatically and cached locally; the first pass can take several minutes.
3. Portuguese sources are translated offline into a resumable local cache.
4. The website receives only the English index at `.local-research/book-index.json`.
   Original extracted text stays in `.local-research/book-index-source.json`.

Both `docs/originals/` and `.local-research/` are ignored by Git. The importer
marks every book `LOCAL_RESEARCH_ONLY` with permission `PENDING`. This index is
for private research and drafting; it does not bypass the existing approval,
source-permission, citation, or publication gates. Copyrighted book text must
not be displayed publicly or copied into approved interpretations without the
necessary permission.

## Priority Èsè lead: Ìwé fún Odù Ifá

The local shelf includes *Ìwé fún Odù Ifá — Ancient Afrikan Sacred Text*,
researched and compiled by Ayinon (His Royal Majesty) Axɔsú Àgèlògbàgàn
Àgbɔ̀vì I and published by Kilombo Productions. The 711-page scan is a useful
Odù-to-Èsè research lead: the local index finds material under all 16 principal
Odù names. Its SHA-256 is
`149cea153e8c4f2b5be29c6f626b80cd20bc0431c8a6f231b28156473724b450`.

The book's PDF page 4 claims copyright for 2011–2018 and says that no part may
be reproduced without author or publisher permission. It therefore remains
`LOCAL_RESEARCH_ONLY` / `PENDING`: use it to locate candidate passages and
compare Odù assignments, but do not show its text in a public consultation.
Before a candidate verse can appear on the site, record its exact printed and
PDF pages, confirm its Odù and Yorùbá with a practitioner, document translation
and orthography, and obtain written publication permission from the rights
holder.

## Canonical open-source shelf

Reusable and candidate source documents are kept separately under
`docs/originals/open-sources/`. The tracked
`content/ese-ifa/source-catalog.json` records each download URL, rights posture,
local filename, byte size, page count, SHA-256 hash, and review state. This
keeps a public-domain or Creative Commons document distinct from private books
while still preventing multi-megabyte PDFs from entering the repository.

The current local shelf contains:

- Pogoson & Akande (2011), the source for the four public, page-cited passages;
- E. M. Lijadu (1908), public-domain underlying Yorùbá text in transcription review;
- Ofuasia (2023), CC BY 4.0, awaiting performer/practitioner clearance; and
- Olomu & Lawal-Dosumu (2023), CC BY 4.0, awaiting practitioner review.

Local availability never changes publication status. A passage reaches the
site only through a checked-in file under `content/ese-ifa/` and the same
approval/permission gates used by search and AI retrieval.

## Durable no-database content

Community submissions, review decisions, reviewer comments, and file-backed
consultations are stored in `IFA_DATA_PATH/online-ifa-store.json`. Use a folder
on persistent mounted storage in production. A server's temporary filesystem
(including `/tmp` and most serverless deployment filesystems) cannot provide
permanent storage across redeployments. The default local `data/` folder is
ignored by Git.
