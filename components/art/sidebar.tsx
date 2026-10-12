import { C, Glyph, Tile } from "@/components/PageArt";

/* Sidebar: the navy column with its user, active item and chevron, expanded vs collapsed, the avatar, and the drawer. */
export function SidebarArt() {
  return (
    <>
      <Tile x={0} y={0} i={0} h={2} bg={C.navy}>
        {/* user block */}
        <circle cx="26" cy="26" r="10" fill={C.tint} />
        <rect x="42" y="20" width="40" height="6" rx="3" fill="#fff" />
        <rect x="42" y="30" width="26" height="4" rx="2" fill="#fff" fillOpacity=".5" />
        <rect x="0" y="46" width="100" height="1.5" fill={C.sky} fillOpacity=".5" />
        {/* items, the second one current */}
        {[62, 84, 106, 128, 150].map((y, k) => (
          <g key={y}>
            {k === 1 && <rect x="10" y={y - 7} width="80" height="18" rx="4" fill={C.sky} fillOpacity=".45" />}
            <rect x="18" y={y - 1} width="8" height="8" rx="2" fill="#fff" fillOpacity={k === 1 ? 1 : 0.6} />
            <rect
              x="32"
              y={y}
              width={k === 1 ? 46 : 36}
              height="6"
              rx="3"
              fill="#fff"
              fillOpacity={k === 1 ? 1 : 0.6}
            />
          </g>
        ))}
        {/* collapse chevron */}
        <path
          d="M54 174 L46 182 L54 190"
          fill="none"
          stroke="#fff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Tile>
      <Tile x={1} y={0} i={1} w={2} bg={C.cream}>
        {/* 240 expanded, 72 collapsed */}
        <rect x="16" y="18" width="80" height="64" rx="4" fill={C.navy} />
        <rect x="108" y="18" width="24" height="64" rx="4" fill={C.navy} />
        {[30, 44, 58].map((y) => (
          <g key={y}>
            <rect x="24" y={y} width="7" height="7" rx="2" fill="#fff" />
            <rect x="36" y={y + 1} width="40" height="5" rx="2.5" fill="#fff" fillOpacity=".6" />
            <rect x="116.5" y={y} width="7" height="7" rx="2" fill="#fff" />
          </g>
        ))}
        <Glyph x={160} y={38} size={14} fill={C.navy}>
          240
        </Glyph>
        <Glyph x={160} y={62} size={14} fill={C.coral}>
          72
        </Glyph>
      </Tile>
      <Tile x={3} y={0} i={2} bg={C.sun}>
        {/* the collapse control */}
        <rect className="hp-shape" x="26" y="26" width="48" height="48" rx="8" fill={C.navy} />
        <path
          className="pa-nudge"
          d="M56 40 L46 50 L56 60"
          fill="none"
          stroke="#fff"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Tile>
      <Tile x={1} y={1} i={3} bg={C.tint}>
        {/* the avatar */}
        <circle className="hp-shape" cx="50" cy="50" r="28" fill="#fff" stroke={C.navy} strokeWidth="3" />
        <Glyph x={50} y={50} size={18} fill={C.navy}>
          FA
        </Glyph>
      </Tile>
      <Tile x={2} y={1} i={4} bg={C.peach}>
        {/* below 900px: a drawer over the scrim */}
        <rect x="0" y="0" width="100" height="100" fill={C.deep} fillOpacity=".25" />
        <g className="pa-toggle">
          <rect x="24" y="0" width="44" height="100" fill={C.navy} />
          {[22, 38, 54].map((y) => (
            <rect key={y} x="32" y={y} width="26" height="5" rx="2.5" fill="#fff" fillOpacity=".7" />
          ))}
        </g>
      </Tile>
      <Tile x={3} y={1} i={5} bg={C.coral}>
        <path d="M0 100 V0 A100 100 0 0 1 100 100 Z" fill="url(#pa-dots-white)" />
      </Tile>
    </>
  );
}
