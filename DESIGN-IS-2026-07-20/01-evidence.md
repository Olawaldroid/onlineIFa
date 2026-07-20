# Evidence

- `src/components/Nav.tsx` already groups destinations into two understandable journeys and keeps administration out of public navigation.
- `src/app/(full)/page.tsx` had polished hierarchy and culturally relevant glyphs, but publicly explained consultation anti-recasting rules.
- `src/app/globals.css` respected reduced motion but lacked a consistent keyboard focus treatment and disabled button feedback.
- `src/components/OduAssistant.tsx` exposed raw JSON-like citations; the API fallback described its configuration instead of showing the reviewed material.
- Both layout footers used the absolute phrase “never copied”, which did not accurately describe attributed licensed excerpts.
- The checked-in Odù corpus provides a database-free path, but `getOduDetail` still attempted Prisma when no database URL existed.
