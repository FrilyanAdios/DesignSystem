import { C, Glyph, Tile } from "@/components/PageArt";

/* Tabs: labels on a hairline divider, a 2px underline that moves to the
   selected tab, the count, the panel below, and arrow-key movement. */
export function TabsArt() {
  return (
    <>
      <Tile x={0} y={0} i={0} w={2} bg={C.cream}>
        {[8, 88, 168].map((x, k) => (
          <rect key={x} x={x} y="44" width="28" height="7" rx="3.5" fill={C.navy} fillOpacity={k === 0 ? 1 : 0.4} />
        ))}
        <rect x="0" y="65" width="200" height="1.5" fill={C.navy} fillOpacity=".25" />
        <rect className="pa-glide" x="4" y="62" width="36" height="4" fill={C.navy} />
      </Tile>
      <Tile x={2} y={0} i={1} bg={C.navy}>
        {/* label plus count */}
        <rect x="16" y="46" width="34" height="8" rx="4" fill="#fff" fillOpacity=".7" />
        <Glyph x={70} y={50} size={20} fill="#fff">
          24
        </Glyph>
      </Tile>
      <Tile x={3} y={0} i={2} bg={C.sun}>
        {/* the underline: 2px, square ends */}
        <rect x="0" y="70" width="100" height="2" fill={C.navy} fillOpacity=".3" />
        <rect className="hp-shape" x="20" y="64" width="60" height="8" fill={C.navy} />
        <Glyph x={50} y={38} size={16} fill={C.navy}>
          2px
        </Glyph>
      </Tile>
      <Tile x={0} y={1} i={3} bg={C.tint}>
        {/* the panel the tab controls */}
        <rect x="16" y="18" width="68" height="64" rx="7" fill="#fff" />
        <rect x="26" y="32" width="40" height="6" rx="3" fill={C.navy} />
        <rect x="26" y="46" width="48" height="5" rx="2.5" fill={C.navy} fillOpacity=".35" />
        <rect x="26" y="58" width="32" height="5" rx="2.5" fill={C.navy} fillOpacity=".35" />
      </Tile>
      <Tile x={1} y={1} i={4} w={2} bg={C.peach}>
        {/* arrow keys move between tabs */}
        {[52, 112].map((x) => (
          <rect key={x} x={x} y="28" width="40" height="40" rx="7" fill="#fff" stroke={C.navy} strokeWidth="2" />
        ))}
        <path d="M80 48 H64 M70 41 L63 48 L70 55" fill="none" stroke={C.navy} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M124 48 H140 M134 41 L141 48 L134 55" fill="none" stroke={C.navy} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <rect className="pa-blink" x="108" y="24" width="48" height="48" rx="10" fill="none" stroke={C.navy} strokeWidth="2" />
      </Tile>
      <Tile x={3} y={1} i={5} bg={C.deep}>
        <path d="M0 100 A100 100 0 0 1 100 0 L100 100 Z" fill="url(#pa-dots-white)" />
      </Tile>
    </>
  );
}
