import { C, Glyph, Tile } from "@/components/PageArt";

/* Navbar: the 64px bar (logo · search · bell), the unread count, search, its height, and the page header below. */
export function NavbarArt() {
  return (
    <>
      <Tile x={0} y={0} i={0} w={3} bg={C.cream}>
        {/* the bar: brand left, tools right */}
        <rect x="14" y="30" width="272" height="40" rx="6" fill="#fff" />
        <rect x="14" y="66" width="272" height="4" fill={C.tint} />
        <rect x="26" y="41" width="34" height="18" rx="3" fill={C.navy} />
        <rect x="150" y="42" width="84" height="16" rx="5" fill={C.tint} />
        <circle cx="162" cy="50" r="4" fill="none" stroke={C.navy} strokeWidth="1.8" />
        <rect x="244" y="38" width="26" height="24" rx="4" fill={C.tint} stroke={C.navy} strokeOpacity=".3" />
        <path d="M251 55 H263 C261 53 261 50 261 47 A4 4 0 0 0 253 47 C253 50 253 53 251 55 Z" fill={C.navy} />
        <circle cx="270" cy="38" r="6" fill={C.navy} stroke="#fff" strokeWidth="2" />
      </Tile>
      <Tile x={3} y={0} i={1} bg={C.navy}>
        {/* the bell and its count */}
        <path d="M30 66 H70 C64 60 64 52 64 42 A14 14 0 0 0 36 42 C36 52 36 60 30 66 Z" fill="#fff" />
        <path d="M44 72 A6 6 0 0 0 56 72" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        <circle className="pa-pulse" cx="68" cy="32" r="11" fill={C.coral} />
        <circle cx="68" cy="32" r="11" fill={C.coral} />
        <Glyph x={68} y={32} size={11} fill="#fff">
          3
        </Glyph>
      </Tile>
      <Tile x={0} y={1} i={2} bg={C.sun}>
        {/* global search */}
        <g className="pa-nudge">
          <circle className="hp-shape" cx="44" cy="44" r="20" fill="none" stroke={C.navy} strokeWidth="7" />
          <path d="M59 59 L78 78" stroke={C.navy} strokeWidth="8" strokeLinecap="round" />
        </g>
      </Tile>
      <Tile x={1} y={1} i={3} bg={C.tint}>
        {/* the height */}
        <path d="M24 20 V80 M16 20 H32 M16 80 H32" stroke={C.navy} strokeWidth="3" />
        <Glyph x={62} y={50} size={24} fill={C.navy}>
          64
        </Glyph>
      </Tile>
      <Tile x={2} y={1} i={4} bg={C.peach}>
        {/* page header: title and one primary action */}
        <rect x="12" y="34" width="76" height="32" rx="4" fill="#fff" />
        <rect x="20" y="46" width="28" height="7" rx="3" fill={C.navy} fillOpacity=".6" />
        <rect x="58" y="43" width="24" height="14" rx="3" fill={C.navy} />
      </Tile>
      <Tile x={3} y={1} i={5} bg={C.deep}>
        <path d="M0 0 H100 V100 A100 100 0 0 1 0 0 Z" fill="url(#pa-dots-white)" />
      </Tile>
    </>
  );
}
