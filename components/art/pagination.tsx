import { C, Glyph, Tile } from "@/components/PageArt";

/* Pagination: page buttons with the current one filled, the narrow rail, rows per page, Go to, and the next arrow. */
export function PaginationArt() {
  return (
    <>
      <Tile x={0} y={0} i={0} w={3} bg={C.cream}>
        {/* ‹ 1 2 3 4 5 … 21 › with the filled current page gliding */}
        <rect className="pa-glide" x="44" y="34" width="32" height="32" rx="6" fill={C.navy} />
        <path
          d="M24 42 L16 50 L24 58"
          fill="none"
          stroke={C.navy}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {[1, 2, 3, 4, 5, 6].map((n, k) => (
          <rect
            key={n}
            x={44 + k * 32}
            y="34"
            width="32"
            height="32"
            rx="6"
            fill="none"
            stroke={C.navy}
            strokeOpacity=".18"
          />
        ))}
        {[1, 2, 3, 4, 5, 6].map((n, k) => (
          <rect key={`b${n}`} x={56 + k * 32} y="46" width="8" height="8" rx="2" fill={C.navy} fillOpacity=".35" />
        ))}
        <circle cx="252" cy="50" r="2.5" fill={C.navy} />
        <circle cx="260" cy="50" r="2.5" fill={C.navy} />
        <path
          d="M276 42 L284 50 L276 58"
          fill="none"
          stroke={C.navy}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Tile>
      <Tile x={3} y={0} i={1} bg={C.navy}>
        {/* next */}
        <path
          className="pa-nudge"
          d="M40 28 L62 50 L40 72"
          fill="none"
          stroke="#fff"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Tile>
      <Tile x={0} y={1} i={2} bg={C.sun}>
        {/* narrow rail: current / total */}
        <Glyph x={50} y={50} size={22} fill={C.navy}>
          1/5
        </Glyph>
      </Tile>
      <Tile x={1} y={1} i={3} bg={C.tint}>
        {/* rows per page */}
        <rect
          className="hp-shape"
          x="18"
          y="34"
          width="64"
          height="32"
          rx="8"
          fill="#fff"
          stroke={C.navy}
          strokeOpacity=".4"
          strokeWidth="2"
        />
        <Glyph x={40} y={50} size={14} fill={C.navy}>
          20
        </Glyph>
        <path
          d="M60 46 L65 52 L70 46"
          fill="none"
          stroke={C.navy}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Tile>
      <Tile x={2} y={1} i={4} bg={C.peach}>
        {/* Go to, with a caret */}
        <rect className="hp-shape" x="26" y="34" width="48" height="32" rx="8" fill="#fff" />
        <Glyph x={46} y={50} size={14} fill={C.navy}>
          9
        </Glyph>
        <rect className="pa-blink" x="55" y="41" width="2.5" height="18" fill={C.navy} />
      </Tile>
      <Tile x={3} y={1} i={5} bg={C.deep}>
        <path d="M100 100 H0 A100 100 0 0 1 100 0 Z" fill="url(#pa-stripes)" />
        <circle cx="70" cy="70" r="14" fill={C.coral} />
      </Tile>
    </>
  );
}
