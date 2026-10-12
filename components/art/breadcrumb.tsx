import { C, Glyph, Tile } from "@/components/PageArt";

/* Breadcrumb: page title, quiet chevrons, the current record in bold, the
   context after it, truncation, and the Back to List button beside it. */
export function BreadcrumbArt() {
  const chev = (x: number, y: number, o = 0.45) => (
    <path d={`M${x} ${y - 7} L${x + 7} ${y} L${x} ${y + 7}`} fill="none" stroke={C.navy} strokeOpacity={o} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  );
  return (
    <>
      <Tile x={0} y={0} i={0} w={3} bg={C.cream}>
        <rect x="18" y="40" width="96" height="16" rx="4" fill={C.navy} />
        {chev(130, 50)}
        <rect x="150" y="44" width="54" height="10" rx="5" fill={C.navy} fillOpacity=".8" />
        {chev(218, 50)}
        <rect x="238" y="45" width="46" height="8" rx="4" fill={C.navy} fillOpacity=".4" />
        <rect x="0" y="86" width="300" height="1.5" fill={C.navy} fillOpacity=".2" />
      </Tile>
      <Tile x={3} y={0} i={1} bg={C.navy}>
        {/* Back to List */}
        <rect x="16" y="34" width="68" height="32" rx="6" fill="#fff" />
        <g className="pa-nudge">
          <path d="M40 50 H28 M33 45 L28 50 L33 55" fill="none" stroke={C.navy} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <rect x="46" y="47" width="28" height="6" rx="3" fill={C.navy} />
      </Tile>
      <Tile x={0} y={1} i={2} bg={C.sun}>
        <path className="hp-shape" d="M36 22 L64 50 L36 78" fill="none" stroke={C.deep} strokeOpacity=".55" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      </Tile>
      <Tile x={1} y={1} i={3} bg={C.tint}>
        {/* long record numbers end in an ellipsis */}
        <rect x="12" y="45" width="52" height="10" rx="5" fill={C.navy} fillOpacity=".8" />
        <Glyph x={78} y={48} size={18} fill={C.navy}>
          …
        </Glyph>
      </Tile>
      <Tile x={2} y={1} i={4} bg={C.peach}>
        <g className="pa-float">
          <path d="M70 44 C70 58 52 72 50 74 C48 72 30 58 30 44 A20 20 0 0 1 70 44 Z" fill={C.navy} />
          <circle cx="50" cy="44" r="7" fill={C.peach} />
        </g>
      </Tile>
      <Tile x={3} y={1} i={5} bg={C.deep}>
        <path d="M0 0 H100 V100 A100 100 0 0 1 0 0 Z" fill="url(#pa-dots-white)" />
      </Tile>
    </>
  );
}
