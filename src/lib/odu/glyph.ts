// ===========================================================================
// Presentation-only glyph helpers for rendering a signature ("right|left",
// 4 chars of "1"/"2" each) as Ifá marks. No interpretation content lives
// here — see src/lib/interpretation/gate.ts for the gated meaning layer.
// ===========================================================================

/** Single mark ǀ for "1", double mark ǁ for "2". */
export const markGlyph = (c: string) => (c === "1" ? "ǀ" : "ǁ");

export const rightLegOf = (signature: string) => signature.slice(0, 4);
export const leftLegOf = (signature: string) => signature.slice(5);

/** 4-line glyph block: left column then right column, matching tray layout. */
export function glyphOf(signature: string): string {
  const R = rightLegOf(signature);
  const L = leftLegOf(signature);
  return [0, 1, 2, 3].map((i) => `${markGlyph(L[i])}  ${markGlyph(R[i])}`).join("\n");
}

/** Signature in 1/0 binary notation, space-separated legs: "1111 0000". */
export function binOf(signature: string): string {
  return signature.replace(/2/g, "0").replace("|", " ");
}

/** 4-bit number → vertical leg glyph, 1 = ǀ, 0 = ǁ. */
export function legGlyphOfNumber(n: number): string {
  return n
    .toString(2)
    .padStart(4, "0")
    .split("")
    .map((b) => (b === "1" ? "ǀ" : "ǁ"))
    .join("\n");
}
