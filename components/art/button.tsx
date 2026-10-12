import { C, Glyph, Tile } from "@/components/PageArt";

/* Button: a primary and secondary pair, the three heights, a click, and the corner radius. */
export function ButtonArt() {
  return (
    <>
      <Tile x={0} y={0} i={0} w={2} bg={C.cream}>
        <rect x="18" y="34" width="74" height="32" rx="7" fill="#fff" stroke={C.navy} strokeWidth="2.5" />
        <rect x="34" y="47" width="42" height="6" rx="3" fill={C.navy} />
        <rect className="hp-shape" x="104" y="34" width="80" height="32" rx="7" fill={C.navy} />
        <rect x="120" y="47" width="48" height="6" rx="3" fill="#fff" />
      </Tile>
      <Tile x={2} y={0} i={1} bg={C.navy}>
        <path className="pa-nudge" d="M34 22 V74 L47 61 L56 81 L65 77 L56 57 H74 Z" fill="#fff" />
      </Tile>
      <Tile x={3} y={0} i={2} bg={C.sun}>
        {/* 32 · 36 · 40 */}
        {[32, 36, 40].map((h, k) => (
          <rect key={h} x={16 + k * 24} y={86 - h * 1.6} width="18" height={h * 1.6} rx="4" fill={k === 2 ? C.navy : C.navy} fillOpacity={0.35 + k * 0.3} />
        ))}
      </Tile>
      <Tile x={0} y={1} i={3} bg={C.tint}>
        {/* the corner: rounded 8, not a pill */}
        <path d="M22 100 V46 A20 20 0 0 1 42 26 H100" fill="none" stroke={C.navy} strokeWidth="7" />
        <circle cx="42" cy="46" r="3" fill={C.coral} />
        <Glyph x={66} y={66} size={16} fill={C.navy}>
          r 8
        </Glyph>
      </Tile>
      <Tile x={1} y={1} i={4} bg={C.peach}>
        {/* loading */}
        <rect x="14" y="36" width="72" height="28" rx="7" fill={C.navy} />
        <circle cx="50" cy="50" r="7" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="2.5" />
        <path className="pa-spin-sm" d="M50 43 A7 7 0 0 1 57 50" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      </Tile>
      <Tile x={2} y={1} i={5} bg={C.coral}>
        {/* destructive */}
        <rect className="hp-shape" x="14" y="36" width="72" height="28" rx="7" fill="#fff" />
        <path d="M30 46 H42 M40 46 V58 H32 V46 M34 43 H38" fill="none" stroke={C.coral} strokeWidth="2" strokeLinecap="round" />
        <rect x="48" y="47" width="28" height="6" rx="3" fill={C.coral} />
      </Tile>
      <Tile x={3} y={1} i={6} bg={C.deep}>
        <path d="M0 100 A100 100 0 0 1 100 0 L100 100 Z" fill="url(#pa-dots-white)" />
      </Tile>
    </>
  );
}
