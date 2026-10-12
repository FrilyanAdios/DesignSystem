import { C, Glyph, Tile } from "@/components/PageArt";

/* Icon button: a square with a 6 corner (not a circle), its tooltip, the three
   sizes, a row of record actions, and the destructive variant. */
export function IconButtonArt() {
  return (
    <>
      <Tile x={0} y={0} i={0} bg={C.cream}>
        {/* close: square 36 with r 6, scaled */}
        <rect className="hp-shape" x="22" y="22" width="56" height="56" rx="9" fill="#fff" stroke={C.navy} strokeWidth="2.5" />
        <path d="M40 40 L60 60 M60 40 L40 60" stroke={C.navy} strokeWidth="4" strokeLinecap="round" />
      </Tile>
      <Tile x={1} y={0} i={1} bg={C.navy}>
        {/* the tooltip that carries the name */}
        <g className="pa-float">
          <rect x="16" y="18" width="68" height="22" rx="5" fill="#fff" />
          <path d="M44 40 L50 47 L56 40 Z" fill="#fff" />
          <rect x="26" y="26" width="48" height="6" rx="3" fill={C.navy} />
        </g>
        <rect x="34" y="56" width="32" height="32" rx="6" fill={C.sky} />
      </Tile>
      <Tile x={2} y={0} i={2} w={2} bg={C.tint}>
        {/* record actions: edit, mail, delete */}
        {[0, 1].map((k) => (
          <rect key={k} x={28 + k * 54} y="28" width="44" height="44" rx="7" fill="#fff" stroke={C.navy} strokeWidth="2" />
        ))}
        <path d="M42 58 L44 51 L55 40 L60 45 L49 56 Z" fill="none" stroke={C.navy} strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="94" y="42" width="20" height="16" rx="2" fill="none" stroke={C.navy} strokeWidth="2.5" />
        <path d="M94 44 L104 52 L114 44" fill="none" stroke={C.navy} strokeWidth="2.5" />
        <rect x="136" y="28" width="44" height="44" rx="7" fill="#fff" stroke={C.coral} strokeWidth="2" />
        <path d="M150 44 H166 M163 44 V60 H153 V44 M155 40 H161" fill="none" stroke={C.coral} strokeWidth="2.5" strokeLinecap="round" />
      </Tile>
      <Tile x={0} y={1} i={3} bg={C.sun}>
        {/* 32 · 36 · 40, all square */}
        {[32, 36, 40].map((s, k) => (
          <rect key={s} x={[12, 38, 67][k]} y={84 - s * 0.62} width={s * 0.62} height={s * 0.62} rx="3" fill={C.navy} fillOpacity={0.4 + k * 0.3} />
        ))}
      </Tile>
      <Tile x={1} y={1} i={4} bg={C.peach}>
        {/* the corner: 6, not a circle */}
        <path d="M22 100 V50 A24 24 0 0 1 46 26 H100" fill="none" stroke={C.navy} strokeWidth="7" />
        <circle cx="46" cy="50" r="3" fill={C.coral} />
        <Glyph x={68} y={68} size={16} fill={C.navy}>
          r 6
        </Glyph>
      </Tile>
      <Tile x={2} y={1} i={5} bg={C.coral}>
        <rect className="hp-shape" x="26" y="26" width="48" height="48" rx="8" fill="#fff" />
        <path d="M41 43 H59 M56 43 V61 H44 V43 M46 39 H54" fill="none" stroke={C.coral} strokeWidth="3" strokeLinecap="round" />
      </Tile>
      <Tile x={3} y={1} i={6} bg={C.deep}>
        <path d="M0 0 H100 V100 A100 100 0 0 1 0 0 Z" fill="url(#pa-dots-white)" />
      </Tile>
    </>
  );
}
