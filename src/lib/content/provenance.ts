export const CONTENT_CATEGORIES = [
  "ORIGINAL_SYNTHESIS",
  "CONTRIBUTOR_ORIGINAL",
  "PUBLIC_DOMAIN_VERSE",
  "LICENSED_VERSE",
  "ORAL_TRADITION",
] as const;

export type ContentCategory = (typeof CONTENT_CATEGORIES)[number];

export function categoryNeedsCitation(category: ContentCategory) {
  return category === "PUBLIC_DOMAIN_VERSE" || category === "LICENSED_VERSE" || category === "ORAL_TRADITION";
}

export function categoryNeedsPermission(category: ContentCategory) {
  return category === "LICENSED_VERSE";
}

export function categoryLabel(category: ContentCategory) {
  return category.replaceAll("_", " ").toLocaleLowerCase().replace(/^./, (letter) => letter.toLocaleUpperCase());
}
