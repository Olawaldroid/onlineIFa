import type { SVGProps } from "react";

/**
 * Original, simplified drawings informed by museum-held examples rather than
 * traced from photographs. Structural references:
 * - Brooklyn Museum divination tray 75.147.1 (ọ̀pọ́n Ifá)
 * - Museu Nacional / UFRJ collection photograph Opele_ifá_MN_01
 * - Brooklyn Museum divination tapper 75.150.1 (ìrọ̀kẹ́ Ifá)
 * - Wikimedia Commons photograph Jogo_de_Ikin_Orossi (ìkín)
 *
 * The asymmetry, joins and incised details are intentional: these should read
 * as worked ritual objects, not as radial technology icons or clip art.
 */

type ArtifactSvgProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  label?: string;
};

type OponIfaEmblemProps = ArtifactSvgProps & {
  showSignature?: boolean;
};

const SIGNATURE_ROWS = [1, 2, 1, 2] as const;
const SIGNATURE_COLUMNS = [142, 218] as const;

const OPELE_PLATES = [
  { x: 24, y: 67, r: -19, fill: "#5A3922" },
  { x: 36, y: 49, r: -15, fill: "#83562F" },
  { x: 49, y: 33, r: -12, fill: "#654126" },
  { x: 63, y: 21, r: -6, fill: "#8A5A33" },
  { x: 79, y: 22, r: 8, fill: "#704729" },
  { x: 93, y: 36, r: 13, fill: "#8C603A" },
  { x: 106, y: 53, r: 16, fill: "#5F3D25" },
  { x: 117, y: 72, r: 20, fill: "#795033" },
] as const;

const IKIN_NUTS = [
  { x: 33, y: 44, r: -26, s: 1 },
  { x: 51, y: 31, r: -8, s: 0.92 },
  { x: 70, y: 35, r: 17, s: 1.05 },
  { x: 88, y: 47, r: 30, s: 0.9 },
  { x: 45, y: 57, r: 9, s: 1.02 },
  { x: 66, y: 59, r: -14, s: 0.95 },
  { x: 80, y: 67, r: 24, s: 0.82 },
] as const;

function accessibility(label?: string) {
  return label
    ? { role: "img" as const, "aria-label": label }
    : { "aria-hidden": true as const };
}

/** A broad-rimmed, asymmetrical ọ̀pọ́n Ifá with an integrated carved border. */
export function OponIfaEmblem({
  label,
  showSignature = true,
  ...props
}: OponIfaEmblemProps) {
  return (
    <svg
      viewBox="0 0 360 360"
      fill="none"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      {...accessibility(label)}
      {...props}
    >
      {/* Hand-worked outer silhouette and stepped rim. */}
      <path
        d="M181 9C232 7 280 26 316 62c34 34 43 82 36 130-7 52-30 101-72 132-39 29-94 35-145 23-49-12-91-40-113-82C1 224 4 173 14 126 24 80 53 43 94 23 119 11 150 11 181 9Z"
        fill="#291C12"
        stroke="#B17A3C"
        strokeWidth="3"
      />
      <path
        d="M181 17c48-2 92 16 126 48 32 31 40 76 34 121-7 49-28 94-67 123-37 27-87 32-135 21-45-11-84-36-104-75-19-38-16-84-7-126 9-43 35-77 74-95 23-11 51-11 79-17Z"
        fill="#654426"
        stroke="#3A2817"
        strokeWidth="3"
      />
      <path
        d="M179 27c43-1 84 15 113 43 29 28 37 68 31 108-6 44-25 84-60 110-34 24-78 29-121 19-40-10-75-32-93-67-17-34-14-75-6-113 8-38 31-68 65-84 21-10 46-10 71-16Z"
        fill="#795433"
        stroke="#A8783F"
        strokeWidth="2"
      />

      {/* The powder field remains generous; ornament belongs to the rim. */}
      <path
        d="M183 76c42-1 80 12 105 40 24 27 28 65 20 101-8 37-30 68-63 83-36 16-79 15-116 1-35-14-61-41-72-75-12-37-8-77 12-108 22-32 67-41 114-42Z"
        fill="#E5D2A6"
        stroke="#39271A"
        strokeWidth="5"
      />
      <path
        d="M181 84c39-1 74 11 96 36 22 24 25 59 18 91-7 34-27 61-57 75-32 14-72 13-106 0-31-13-54-36-64-67-10-33-7-68 11-96 20-29 60-38 102-39Z"
        fill="#EADAB5"
        stroke="#F3E7C8"
        strokeWidth="2"
      />
      <path
        d="M86 126c38-28 123-35 185 1M72 223c46 45 154 62 219-2"
        stroke="#B79A65"
        strokeWidth="2"
        strokeLinecap="round"
        opacity=".35"
      />
      <g fill="#9A7C4E" opacity=".34">
        <circle cx="107" cy="153" r="1.7" />
        <circle cx="256" cy="148" r="1.4" />
        <circle cx="92" cy="204" r="1.2" />
        <circle cx="271" cy="232" r="1.8" />
        <circle cx="151" cy="277" r="1.3" />
        <circle cx="228" cy="101" r="1.1" />
        <circle cx="202" cy="263" r="1.5" />
        <circle cx="128" cy="111" r="1.2" />
      </g>

      {/* Central face motif is carved into the rim, not attached as a badge. */}
      <g stroke="#2A1C12" strokeLinecap="round" strokeLinejoin="round">
        <path d="M159 27c7-8 17-12 27-11 12 1 22 8 27 18l-5 30c-8 7-17 11-27 10-10 0-19-5-25-13l3-34Z" fill="#6D4828" strokeWidth="2.4" />
        <path d="M164 37c12-7 31-7 43 2M169 47l10-2m13 1 10 3M184 43l-2 14 6 3M174 65c7-3 16-2 22 2" strokeWidth="2.2" />
        <path d="M157 35l-10 8 8 10m56-13 9 8-10 9" strokeWidth="2" />
        <path d="M171 28c7 4 20 4 28-1" strokeWidth="3" />
      </g>

      {/* Unequal incised panels: serpent, bird-like form, masks and hatching. */}
      <g stroke="#302015" strokeLinecap="round" strokeLinejoin="round">
        <path d="M55 80c-13 13-18 31-13 48 4 14 18 18 19 32 1 12-10 20-19 27" strokeWidth="5" />
        <path d="M52 81l-8-1m18 18-10 4m14 17-11 5m9 20-10 2m4 18-10-3" strokeWidth="1.8" />
        <path d="M288 78c17 4 28 14 34 28-12-5-23-3-32 5l-3 28-14-19 7-19 8-23Z" fill="#6D492A" strokeWidth="2.5" />
        <circle cx="304" cy="99" r="2.4" fill="#302015" stroke="none" />
        <path d="M283 142c12 8 21 20 25 35m-28-26 27 7m-30 4 29 8m-32 4 30 8" strokeWidth="2" />
        <path d="M37 205c13-10 28-12 39-4l-2 29c-11 8-25 6-35-5l-2-20Z" fill="#6B4729" strokeWidth="2.4" />
        <path d="M43 207l9-2m11 1 7 3m-16-5v12l5 4m-13 3c7-3 15-2 21 2" strokeWidth="1.8" />
        <path d="M301 207c13 7 20 20 17 34-4 13-15 21-28 20-9-11-9-25-2-37l13-17Z" fill="#684527" strokeWidth="2.4" />
        <path d="M290 229c7-5 17-4 24 2m-23 12c7 3 14 3 21-1" strokeWidth="2" />
        <path d="M79 277l12 33m-3-39 13 34m-3-39 13 34m-2-39 13 34m-39-9 34-14m-30 27 34-14" strokeWidth="1.8" />
        <path d="M246 290c8-13 24-19 38-13-1 16-12 28-28 31l-10-18Z" fill="#6B4729" strokeWidth="2.2" />
        <path d="M251 291c9-2 18 1 24 8m-12-19-1 25" strokeWidth="1.7" />
        <path d="M146 319c23 6 47 7 70 2m-62 9c18 3 36 3 54 0" strokeWidth="2.3" />
      </g>
      <g fill="#2D1E14">
        <circle cx="31" cy="178" r="3" />
        <circle cx="326" cy="192" r="3" />
        <circle cx="128" cy="39" r="2.5" />
        <circle cx="231" cy="42" r="2.5" />
      </g>

      {showSignature && (
        <g stroke="#5B3D26" strokeWidth="8" strokeLinecap="round" opacity=".9">
          {SIGNATURE_COLUMNS.map((x) => (
            <g key={x}>
              {SIGNATURE_ROWS.map((count, row) => {
                const y = 122 + row * 43;
                return count === 1 ? (
                  <path key={row} d={`M${x} ${y}v24`} />
                ) : (
                  <g key={row}>
                    <path d={`M${x - 7} ${y}v24`} />
                    <path d={`M${x + 7} ${y}v24`} />
                  </g>
                );
              })}
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}

/** Eight unequal plates threaded on one continuous ọ̀pẹ̀lẹ̀ chain. */
export function OpeleGlyph({ label, ...props }: ArtifactSvgProps) {
  return (
    <svg
      viewBox="0 0 142 100"
      fill="none"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      {...accessibility(label)}
      {...props}
    >
      <path
        d="M12 91c7-18 15-31 27-47 11-15 21-23 33-31 12 8 22 17 33 32 11 15 19 29 25 47"
        stroke="#9C7449"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path d="M72 8v10" stroke="#C39A58" strokeWidth="4" strokeLinecap="round" />
      <circle cx="72" cy="15" r="4.5" fill="#4A3020" stroke="#BE8E4C" strokeWidth="1.5" />
      {OPELE_PLATES.map((plate, index) => (
        <g
          key={`${plate.x}-${plate.y}`}
          className="opele-plate"
          style={{ transformOrigin: `${plate.x}px ${plate.y}px`, animationDelay: `${index * 55}ms` }}
          transform={`translate(${plate.x} ${plate.y}) rotate(${plate.r})`}
        >
          <path
            d="M-8-10c4-2 11-2 16 1l1 17c-5 4-12 4-18 0l1-18Z"
            fill={plate.fill}
            stroke="#342116"
            strokeWidth="1.4"
          />
          <path d="M-5-6c3-2 7-2 10 0M-5 4c3 2 7 2 10 0" stroke="#C19860" strokeWidth="1" opacity=".58" />
          <circle cx="0" cy="-7" r="1.4" fill="#241710" />
          <circle cx="0" cy="7" r="1.4" fill="#241710" />
        </g>
      ))}
      <g className="opele-free-end" stroke="#A77D4E" strokeLinecap="round">
        <path d="M12 89v7m-4-4 4 5 4-5" strokeWidth="1.7" />
        <path d="M130 89v7m-4-4 4 5 4-5" strokeWidth="1.7" />
      </g>
    </svg>
  );
}

/** Ridged sacred palm nuts, clustered without making them mechanically equal. */
export function IkinGlyph({ label, ...props }: ArtifactSvgProps) {
  return (
    <svg
      viewBox="0 0 120 88"
      fill="none"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      {...accessibility(label)}
      {...props}
    >
      {IKIN_NUTS.map((nut, index) => (
        <g key={`${nut.x}-${nut.y}`} transform={`translate(${nut.x} ${nut.y}) rotate(${nut.r}) scale(${nut.s})`}>
          <path
            d="M0-13c7 0 11 6 10 14C9 10 4 14-2 13-9 12-12 5-10-3c2-7 5-10 10-10Z"
            fill={index % 3 === 0 ? "#7B4A27" : "#93613A"}
            stroke="#3C2618"
            strokeWidth="1.5"
          />
          <path d="M-5-9c2 7 2 14 0 19M0-11c1 8 1 16-1 23M5-8c1 6 0 12-2 18" stroke="#C08A50" strokeWidth="1" opacity=".72" />
        </g>
      ))}
    </svg>
  );
}

/** A tapered ìrọ̀kẹ́ with carved grip, neck and striking end. */
export function IrokeGlyph({ label, ...props }: ArtifactSvgProps) {
  return (
    <svg
      viewBox="0 0 120 88"
      fill="none"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      {...accessibility(label)}
      {...props}
    >
      <g transform="rotate(-27 61 45)" stroke="#382317" strokeLinejoin="round">
        <path d="M54 9c4-5 10-5 14 0l-2 13H56L54 9Z" fill="#B47B45" strokeWidth="1.7" />
        <path d="M55 21h12l3 16-5 9h-8l-5-9 3-16Z" fill="#875632" strokeWidth="1.7" />
        <path d="M57 27l4-3 4 3m-8 8 4 3 5-3" stroke="#D0A46B" strokeWidth="1.3" />
        <path d="M57 46h8l4 26c-5 4-11 4-16 0l4-26Z" fill="#A76F3E" strokeWidth="1.8" />
        <path d="M56 51h10m-9 6h10m-9 6h10" stroke="#54331F" strokeWidth="1.4" />
        <path d="M53 72c5 3 11 3 16 0l7 6c-8 7-23 7-31 0l8-6Z" fill="#755036" strokeWidth="2" />
        <path d="M50 80c7 2 15 2 22 0" stroke="#C6955A" strokeWidth="1.2" />
      </g>
      <path d="M19 70c16 7 34 7 51 1" stroke="#9A744A" strokeWidth="1.5" strokeLinecap="round" opacity=".55" />
    </svg>
  );
}

export type IboGlyphVariant = "pair" | "cowries" | "bone";

/** Organic cowries and a small bone fragment used as clear, non-cartoon ìbò. */
export function IboGlyph({
  label,
  variant = "pair",
  ...props
}: ArtifactSvgProps & { variant?: IboGlyphVariant }) {
  const showCowries = variant === "pair" || variant === "cowries";
  const showBone = variant === "pair" || variant === "bone";

  return (
    <svg
      viewBox="0 0 120 82"
      fill="none"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      {...accessibility(label)}
      {...props}
    >
      {showCowries && (
        <g transform={variant === "pair" ? "translate(2 3) scale(.78)" : "translate(7 1)"}>
          <g transform="rotate(-13 33 39)">
            <path d="M11 39C10 20 20 9 35 8c15-1 25 12 24 29-1 19-11 32-27 33-14 0-20-12-21-31Z" fill="#E9D7AD" stroke="#835B37" strokeWidth="2" />
            <path d="M32 15c-8 9-8 37 1 48 9-12 10-38-1-48Z" fill="#6F4B30" stroke="#A8794A" strokeWidth="1.3" />
            <path d="M25 21l7 5 8-6m-16 14 8 4 9-5M24 47l8 3 9-4m-15 12 7-3 7 3" stroke="#F2E3C4" strokeWidth="1.2" strokeLinecap="round" />
          </g>
          {variant === "cowries" && (
            <g transform="translate(47 -2) rotate(11 33 39) scale(.92)">
              <path d="M11 39C10 20 20 9 35 8c15-1 25 12 24 29-1 19-11 32-27 33-14 0-20-12-21-31Z" fill="#F0DFC0" stroke="#835B37" strokeWidth="2" />
              <path d="M32 15c-8 9-8 37 1 48 9-12 10-38-1-48Z" fill="#755138" stroke="#A8794A" strokeWidth="1.3" />
              <path d="M25 21l7 5 8-6m-16 14 8 4 9-5M24 47l8 3 9-4m-15 12 7-3 7 3" stroke="#F5E7CB" strokeWidth="1.2" strokeLinecap="round" />
            </g>
          )}
        </g>
      )}
      {showBone && (
        <g transform={variant === "pair" ? "translate(65 8) rotate(9 25 30)" : "translate(22 7) scale(1.25)"}>
          <path
            d="M12 17c-5-6-1-13 6-12 5 0 7 4 8 8l17 29c5-2 9 0 10 5 2 7-5 12-11 8-3-2-4-6-4-9L21 19c-4 2-7 1-9-2Z"
            fill="#D6C6A7"
            stroke="#71543A"
            strokeWidth="2"
          />
          <path d="M22 15c4 10 10 19 16 28" stroke="#F2E8D5" strokeWidth="2" strokeLinecap="round" opacity=".8" />
          <circle cx="17" cy="11" r="1.5" fill="#9A8465" />
          <circle cx="46" cy="49" r="1.3" fill="#9A8465" />
        </g>
      )}
    </svg>
  );
}
