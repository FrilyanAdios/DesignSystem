import { C, Glyph, Tile } from "@/components/PageArt";

/* Tooltip: a dark bubble under an icon-only button, the pointer resting, the delay, and keyboard focus. */
export function TooltipArt() {
  return (
    <>
      <Tile x={0} y={0} i={0} w={2} h={2} bg={C.cream}>
        {/* the icon button */}
        <rect x="80" y="36" width="40" height="40" rx="8" fill="#fff" stroke={C.navy} strokeWidth="2.5" />
        <circle cx="92" cy="56" r="3" fill={C.navy} />
        <circle cx="100" cy="56" r="3" fill={C.navy} />
        <circle cx="108" cy="56" r="3" fill={C.navy} />
        {/* the bubble, centered below, 8 away */}
        <g className="pa-float">
          <rect x="40" y="92" width="120" height="34" rx="8" fill={C.deep} />
          <rect x="54" y="106" width="92" height="6" rx="3" fill="#fff" />
        </g>
        <path className="pa-nudge" d="M118 64 V108 L128 98 L135 114 L142 111 L135 95 H149 Z" fill={C.navy} stroke="#fff" strokeWidth="2" />
        <rect x="40" y="150" width="120" height="6" rx="3" fill={C.navy} fillOpacity=".2" />
        <rect x="40" y="164" width="80" height="6" rx="3" fill={C.navy} fillOpacity=".2" />
      </Tile>
      <Tile x={2} y={0} i={1} bg={C.sun}>
        {/* 420 ms delay */}
        <circle cx="50" cy="50" r="28" fill="#fff" />
        <path d="M50 50 V30" stroke={C.navy} strokeWidth="4" strokeLinecap="round" />
        <path className="pa-spin-sm" d="M50 50 L66 58" stroke={C.coral} strokeWidth="4" strokeLinecap="round" />
        <Glyph x={50} y={90} size={10} fill={C.navy}>420 ms</Glyph>
      </Tile>
      <Tile x={3} y={0} i={2} bg={C.navy}>
        {/* keyboard focus: 2 px ring, tip at once */}
        <rect x="24" y="30" width="52" height="40" rx="8" fill="none" stroke="#fff" strokeWidth="3" />
        <rect className="hp-shape" x="32" y="38" width="36" height="24" rx="6" fill={C.sky} />
      </Tile>
      <Tile x={2} y={1} i={3} bg={C.tint}>
        {/* "i" info button with more detail */}
        <circle cx="50" cy="50" r="22" fill="#fff" stroke={C.navy} strokeWidth="2.5" />
        <Glyph x={50} y={51} size={22} fill={C.navy}>i</Glyph>
      </Tile>
      <Tile x={3} y={1} i={4} bg={C.coral}>
        <path d="M0 100 L100 0 V100 Z" fill="url(#pa-dots-white)" />
      </Tile>
    </>
  );
}
