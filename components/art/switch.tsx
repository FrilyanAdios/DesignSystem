import { C, Glyph, Tile } from "@/components/PageArt";

/* Switch: the 52 × 32 track with a knob that grows when on, the off state, a setting
   row, the 48 dp touch row, and the phone it lives on. */
export function SwitchArt() {
  return (
    <>
      <Tile x={0} y={0} i={0} w={2} bg={C.navy}>
        {/* on: full track, big knob on the right; it slides off and back */}
        <rect x="35" y="10" width="130" height="80" rx="40" fill={C.sky} />
        <circle className="pa-toggle" cx="125" cy="50" r="30" fill="#fff" />
      </Tile>
      <Tile x={2} y={0} i={1} bg={C.cream}>
        {/* off: outlined track, small knob on the left */}
        <rect x="18" y="34" width="64" height="40" rx="20" fill="#fff" stroke={C.navy} strokeWidth="3" />
        <circle cx="38" cy="54" r="9" fill={C.navy} fillOpacity=".55" />
      </Tile>
      <Tile x={3} y={0} i={2} bg={C.sun}>
        <Glyph x={50} y={40} size={18} fill={C.navy}>
          52
        </Glyph>
        <Glyph x={50} y={66} size={13} fill={C.navy}>
          × 32
        </Glyph>
      </Tile>
      <Tile x={0} y={1} i={3} bg={C.tint}>
        {/* the phone */}
        <rect x="30" y="14" width="40" height="72" rx="8" fill="#fff" stroke={C.navy} strokeWidth="3" />
        <rect x="38" y="30" width="24" height="12" rx="6" fill={C.navy} />
        <circle cx="56" cy="36" r="4" fill="#fff" />
        <rect x="38" y="50" width="24" height="12" rx="6" fill="none" stroke={C.navy} strokeWidth="2" />
      </Tile>
      <Tile x={1} y={1} i={4} w={2} bg={C.peach}>
        {/* setting row: label and state line, then the switch */}
        <rect x="14" y="26" width="172" height="48" rx="10" fill="#fff" />
        <rect x="28" y="40" width="70" height="7" rx="3.5" fill={C.navy} />
        <rect x="28" y="54" width="96" height="5" rx="2.5" fill={C.navy} fillOpacity=".4" />
        <rect x="136" y="38" width="38" height="24" rx="12" fill={C.navy} />
        <circle cx="162" cy="50" r="8" fill="#fff" />
      </Tile>
      <Tile x={3} y={1} i={5} bg={C.coral}>
        <circle className="hp-shape" cx="50" cy="50" r="24" fill="#fff" />
        <circle cx="50" cy="50" r="36" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="2" strokeDasharray="4 5" />
      </Tile>
    </>
  );
}
