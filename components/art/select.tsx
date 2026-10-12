import { C, Tile } from "@/components/PageArt";

/* Select: a field with a chevron, the entity building, the searchable menu with a check. */
export function SelectArt() {
  return (
    <>
      <Tile x={0} y={0} i={0} w={2} bg={C.cream}>
        <rect x="22" y="30" width="156" height="40" rx="8" fill="#fff" stroke={C.navy} strokeWidth="2.5" />
        <rect x="36" y="47" width="72" height="6" rx="3" fill={C.navy} fillOpacity=".7" />
        <path d="M150 45 L157 52 L164 45" fill="none" stroke={C.navy} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </Tile>
      <Tile x={2} y={0} i={1} bg={C.navy}>
        {/* entity: building */}
        <rect x="32" y="26" width="36" height="52" rx="3" fill="none" stroke="#fff" strokeWidth="3" />
        {[36, 48, 60].map((y) => (
          <g key={y}>
            <rect x="40" y={y} width="7" height="6" fill="#fff" />
            <rect x="53" y={y} width="7" height="6" fill="#fff" />
          </g>
        ))}
      </Tile>
      <Tile x={3} y={0} i={2} bg={C.sun}>
        <path className="pa-float" d="M28 40 L50 62 L72 40" fill="none" stroke={C.navy} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      </Tile>
      <Tile x={0} y={1} i={3} w={2} bg={C.tint}>
        {/* the open menu: search, rows, the current one checked */}
        <rect x="22" y="8" width="156" height="88" rx="10" fill="#fff" />
        <rect x="32" y="16" width="136" height="18" rx="6" fill="none" stroke={C.navy} strokeWidth="1.5" />
        <circle cx="42" cy="25" r="4" fill="none" stroke={C.navy} strokeWidth="1.5" />
        <rect className="pa-glide" x="32" y="40" width="136" height="16" rx="5" fill={C.tint} />
        <rect x="40" y="45" width="70" height="5" rx="2.5" fill={C.navy} />
        <path d="M150 44 L154 49 L161 42" fill="none" stroke={C.navy} strokeWidth="2" strokeLinecap="round" />
        <rect x="40" y="65" width="90" height="5" rx="2.5" fill={C.navy} fillOpacity=".45" />
        <rect x="40" y="81" width="60" height="5" rx="2.5" fill={C.navy} fillOpacity=".45" />
      </Tile>
      <Tile x={2} y={1} i={4} bg={C.peach}>
        <circle className="hp-shape" cx="50" cy="50" r="26" fill={C.navy} />
        <path d="M38 50 L47 59 L63 42" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </Tile>
      <Tile x={3} y={1} i={5} bg={C.deep}>
        <path d="M0 100 A100 100 0 0 1 100 0 L100 100 Z" fill="url(#pa-dots-white)" />
      </Tile>
    </>
  );
}
