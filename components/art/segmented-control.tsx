import { C, Glyph, Tile } from "@/components/PageArt";

/* Segmented control: a quiet track with r 8, segments with r 6 (never pills),
   the white selected segment, the icon-only switch, and the 36 / 28 heights. */
export function SegmentedControlArt() {
  return (
    <>
      <Tile x={0} y={0} i={0} w={2} bg={C.cream}>
        <rect x="14" y="30" width="172" height="40" rx="9" fill={C.tint} />
        <rect x="18" y="34" width="56" height="32" rx="6" fill="#fff" />
        <rect x="32" y="47" width="28" height="6" rx="3" fill={C.navy} />
        <rect x="92" y="47" width="28" height="6" rx="3" fill={C.navy} fillOpacity=".4" />
        <rect x="142" y="47" width="28" height="6" rx="3" fill={C.navy} fillOpacity=".4" />
      </Tile>
      <Tile x={2} y={0} i={1} bg={C.navy}>
        {/* one on at a time */}
        <rect x="20" y="36" width="60" height="28" rx="6" fill={C.sky} fillOpacity=".45" />
        <rect className="pa-toggle" x="52" y="40" width="24" height="20" rx="4" fill="#fff" />
      </Tile>
      <Tile x={3} y={0} i={2} bg={C.sun}>
        {/* icon only: register and split */}
        <rect x="14" y="32" width="72" height="36" rx="7" fill="#fff" fillOpacity=".6" />
        <rect className="hp-shape" x="18" y="36" width="32" height="28" rx="5" fill="#fff" />
        <path d="M26 43 H42 M26 50 H42 M26 57 H42" stroke={C.navy} strokeWidth="2.5" strokeLinecap="round" />
        <rect x="58" y="43" width="20" height="14" rx="2" fill="none" stroke={C.navy} strokeOpacity=".5" strokeWidth="2.5" />
        <path d="M66 43 V57" stroke={C.navy} strokeOpacity=".5" strokeWidth="2.5" />
      </Tile>
      <Tile x={0} y={1} i={3} bg={C.tint}>
        {/* track r 8, segment r 6 */}
        <path d="M16 100 V44 A26 26 0 0 1 42 18 H100" fill="none" stroke={C.navy} strokeWidth="6" />
        <path d="M34 100 V58 A20 20 0 0 1 54 38 H100" fill="none" stroke={C.navy} strokeOpacity=".45" strokeWidth="5" />
        <Glyph x={72} y={72} size={15} fill={C.navy}>
          8 · 6
        </Glyph>
      </Tile>
      <Tile x={1} y={1} i={4} bg={C.peach}>
        {/* 36 track, 28 segment */}
        <rect x="22" y="22" width="22" height="58" rx="4" fill={C.navy} fillOpacity=".4" />
        <rect x="56" y="34" width="22" height="46" rx="4" fill={C.navy} />
      </Tile>
      <Tile x={2} y={1} i={5} bg={C.mint}>
        <path className="pa-nudge" d="M34 22 V74 L47 61 L56 81 L65 77 L56 57 H74 Z" fill={C.deep} />
      </Tile>
      <Tile x={3} y={1} i={6} bg={C.deep}>
        <rect x="0" y="0" width="100" height="100" fill="url(#pa-stripes)" />
        <circle cx="50" cy="50" r="22" fill={C.deep} />
      </Tile>
    </>
  );
}
