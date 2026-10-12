import { C, Glyph, Tile } from "@/components/PageArt";

/* Checkbox: square boxes with a small corner, checked, mixed and empty; the tick; the
   4 px corner; and selection for export with its count. */
export function CheckboxArt() {
  const box = (y: number, kind: "on" | "mixed" | "off") => (
    <>
      <rect x="22" y={y} width="22" height="22" rx="4" fill={kind === "off" ? "#fff" : C.navy} stroke={C.navy} strokeWidth="2.5" />
      {kind === "on" && <path d={`M27 ${y + 11} l4.5 4.5 l8 -9`} fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />}
      {kind === "mixed" && <rect x="27" y={y + 9.5} width="12" height="3" rx="1.5" fill="#fff" />}
      <rect x="56" y={y + 8} width={kind === "on" ? 96 : kind === "mixed" ? 74 : 110} height="6" rx="3" fill={C.navy} fillOpacity={kind === "off" ? 0.35 : 0.8} />
    </>
  );
  return (
    <>
      <Tile x={0} y={0} i={0} w={2} bg={C.cream}>
        {box(12, "on")}
        {box(40, "mixed")}
        {box(68, "off")}
      </Tile>
      <Tile x={2} y={0} i={1} bg={C.navy}>
        <rect className="hp-shape" x="24" y="24" width="52" height="52" rx="8" fill="#fff" />
        <path className="pa-pulse" d="M36 50 l9 9 l17 -19" fill="none" stroke={C.navy} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </Tile>
      <Tile x={3} y={0} i={2} bg={C.sun}>
        {/* the corner: almost square, r 4 */}
        <path d="M22 100 V36 A10 10 0 0 1 32 26 H100" fill="none" stroke={C.navy} strokeWidth="7" />
        <Glyph x={64} y={64} size={16} fill={C.navy}>
          r 4
        </Glyph>
      </Tile>
      <Tile x={0} y={1} i={3} bg={C.tint}>
        <g className="pa-float">
          <path d="M50 24 V60 M36 47 L50 61 L64 47" fill="none" stroke={C.navy} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M28 66 V76 H72 V66" fill="none" stroke={C.navy} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </Tile>
      <Tile x={1} y={1} i={4} w={2} bg={C.peach}>
        {/* selection bar: instruction, then Export selected (2) */}
        <rect x="14" y="30" width="172" height="40" rx="6" fill="#fff" />
        <circle cx="32" cy="50" r="6" fill="none" stroke={C.navy} strokeWidth="2.5" />
        <rect x="46" y="44" width="46" height="5" rx="2.5" fill={C.navy} fillOpacity=".7" />
        <rect x="46" y="53" width="32" height="4" rx="2" fill={C.navy} fillOpacity=".35" />
        <rect x="112" y="38" width="66" height="24" rx="5" fill={C.navy} />
        <rect x="121" y="47" width="32" height="6" rx="3" fill="#fff" />
        <Glyph x={166} y={50} size={11} fill="#fff">
          2
        </Glyph>
      </Tile>
      <Tile x={3} y={1} i={5} bg={C.deep}>
        <path d="M0 100 A100 100 0 0 1 100 0 L100 100 Z" fill="url(#pa-dots-white)" />
      </Tile>
    </>
  );
}
