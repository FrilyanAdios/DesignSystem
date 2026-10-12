import { C, Tile } from "@/components/PageArt";

/* Popover: a trigger in its open state with an anchored panel; a preview with one route to details; never nested. */
export function PopoverArt() {
  return (
    <>
      <Tile x={0} y={0} i={0} w={2} h={2} bg={C.cream}>
        {/* trigger, open */}
        <rect x="24" y="22" width="92" height="28" rx="7" fill={C.tint} stroke={C.navy} strokeWidth="2" />
        <rect x="36" y="33" width="44" height="6" rx="3" fill={C.navy} />
        <path d="M96 39 L101 33 L106 39" fill="none" stroke={C.navy} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* anchored panel, edge aligned */}
        <g className="pa-float">
          <rect x="24" y="60" width="148" height="116" rx="10" fill="#fff" stroke={C.sky} strokeWidth="1.5" />
          <rect x="36" y="72" width="16" height="16" rx="4" fill={C.tint} />
          <rect x="60" y="77" width="56" height="6" rx="3" fill={C.navy} />
          <rect x="146" y="71" width="18" height="18" rx="4" fill="none" stroke={C.sky} strokeWidth="1.5" />
          <path d="M24 98 H172" stroke={C.tint} strokeWidth="2" />
          {[0, 1, 2].map((k) => (
            <g key={k}>
              <circle cx="44" cy={116 + k * 20} r="6" fill={k === 0 ? C.navy : "none"} stroke={C.navy} strokeWidth={k === 0 ? 0 : 1.5} />
              <circle cx="44" cy={116 + k * 20} r="2.5" fill={k === 0 ? "#fff" : "none"} />
              <rect x="58" y={113 + k * 20} width={k === 0 ? 70 : 54} height="6" rx="3" fill={k === 0 ? C.navy : C.sky} />
            </g>
          ))}
        </g>
        <path d="M24 50 V60" stroke={C.coral} strokeWidth="2" strokeDasharray="3 3" />
      </Tile>
      <Tile x={2} y={0} i={1} bg={C.navy}>
        {/* the eye: preview */}
        <path className="hp-shape" d="M14 50 Q50 18 86 50 Q50 82 14 50 Z" fill="#fff" />
        <circle cx="50" cy="50" r="12" fill={C.navy} />
      </Tile>
      <Tile x={3} y={0} i={2} bg={C.mint}>
        {/* one route to details */}
        <rect x="16" y="36" width="68" height="28" rx="6" fill={C.navy} />
        <path className="pa-nudge" d="M60 44 L68 50 L60 56" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="26" y="47" width="26" height="6" rx="3" fill="#fff" />
      </Tile>
      <Tile x={2} y={1} i={3} w={2} bg={C.peach}>
        {/* never a popover inside a popover */}
        <rect x="24" y="24" width="64" height="52" rx="8" fill="#fff" />
        <rect x="64" y="40" width="56" height="44" rx="8" fill="#fff" stroke={C.coral} strokeWidth="2" strokeDasharray="4 3" />
        <path d="M84 52 L100 68 M100 52 L84 68" stroke={C.coral} strokeWidth="4" strokeLinecap="round" />
        <path d="M128 50 H176" stroke={C.deep} strokeWidth="2" strokeDasharray="2 5" strokeLinecap="round" />
        <circle className="pa-pulse" cx="176" cy="50" r="6" fill={C.deep} />
      </Tile>
    </>
  );
}
