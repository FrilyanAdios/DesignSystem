import { C, Glyph, Tile } from "@/components/PageArt";

/* Search: the open field with Done, the magnifier, six results at most, the attached list, arrow keys. */
export function SearchArt() {
  return (
    <>
      <Tile x={0} y={0} i={0} w={2} bg={C.cream}>
        <rect x="18" y="30" width="164" height="40" rx="8" fill="#fff" stroke={C.navy} strokeWidth="2.5" />
        <circle cx="38" cy="48" r="6" fill="none" stroke={C.navy} strokeWidth="2.5" />
        <path d="M42.5 52.5 L47 57" stroke={C.navy} strokeWidth="2.5" strokeLinecap="round" />
        <rect x="56" y="47" width="50" height="6" rx="3" fill={C.navy} fillOpacity=".6" />
        <rect className="pa-blink" x="110" y="40" width="2.5" height="20" fill={C.navy} />
        <path d="M140 31 V69" stroke={C.navy} strokeWidth="1.5" />
        <rect x="150" y="47" width="22" height="6" rx="3" fill={C.navy} />
      </Tile>
      <Tile x={2} y={0} i={1} bg={C.navy}>
        <g className="pa-pulse">
          <circle cx="45" cy="45" r="18" fill="none" stroke="#fff" strokeWidth="6" />
          <path d="M58 58 L74 74" stroke="#fff" strokeWidth="7" strokeLinecap="round" />
        </g>
      </Tile>
      <Tile x={3} y={0} i={2} bg={C.sun}>
        {/* at most six */}
        <Glyph x={50} y={50} size={48} fill={C.navy}>
          6
        </Glyph>
      </Tile>
      <Tile x={0} y={1} i={3} w={2} bg={C.tint}>
        {/* the attached recommendations */}
        <rect x="18" y="6" width="164" height="90" rx="10" fill="#fff" />
        {[14, 40, 66].map((y, k) => (
          <g key={y}>
            {k === 1 && <rect className="pa-glide" x="24" y={y - 2} width="152" height="24" rx="5" fill={C.tint} />}
            <rect x="30" y={y + 2} width="16" height="16" rx="4" fill={C.navy} fillOpacity=".2" />
            <rect x="54" y={y + 4} width="70" height="5" rx="2.5" fill={C.navy} />
            <rect x="54" y={y + 12} width="50" height="4" rx="2" fill={C.navy} fillOpacity=".45" />
            <path d={`M164 ${y + 5} L169 ${y + 10} L164 ${y + 15}`} fill="none" stroke={C.navy} strokeWidth="1.8" strokeLinecap="round" />
          </g>
        ))}
      </Tile>
      <Tile x={2} y={1} i={4} bg={C.coral}>
        {/* Up and Down */}
        <rect className="hp-shape" x="30" y="16" width="40" height="30" rx="6" fill="#fff" />
        <path d="M42 36 L50 27 L58 36" fill="none" stroke={C.coral} strokeWidth="3" strokeLinecap="round" />
        <rect x="30" y="54" width="40" height="30" rx="6" fill="#fff" />
        <path d="M42 64 L50 73 L58 64" fill="none" stroke={C.coral} strokeWidth="3" strokeLinecap="round" />
      </Tile>
      <Tile x={3} y={1} i={5} bg={C.deep}>
        <rect width="100" height="100" fill="url(#pa-stripes)" />
      </Tile>
    </>
  );
}
