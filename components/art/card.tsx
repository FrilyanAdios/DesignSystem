import { C, Glyph, Tile } from "@/components/PageArt";

/* Card: a record card (identity, status on the right, metadata, outlined card
   action), the selected tint with its edge, a drag grip, and the 10 radius. */
export function CardArt() {
  return (
    <>
      <Tile x={0} y={0} i={0} w={2} h={2} bg={C.tint}>
        <rect x="24" y="22" width="152" height="156" rx="10" fill="#fff" stroke={C.navy} strokeOpacity=".3" strokeWidth="2" />
        {/* number + identity */}
        <rect x="40" y="40" width="16" height="16" rx="3" fill={C.navy} />
        <rect x="64" y="44" width="50" height="8" rx="4" fill={C.navy} />
        {/* status on the right, with its dot */}
        <rect x="122" y="40" width="40" height="16" rx="8" fill={C.mint} />
        <circle cx="132" cy="48" r="3" fill={C.deep} />
        {/* time, customer, location */}
        <rect x="64" y="66" width="80" height="6" rx="3" fill={C.navy} fillOpacity=".5" />
        <rect x="64" y="80" width="64" height="6" rx="3" fill={C.navy} fillOpacity=".3" />
        <rect x="64" y="94" width="72" height="6" rx="3" fill={C.navy} fillOpacity=".3" />
        {/* outlined, full-width card action */}
        <rect x="40" y="124" width="120" height="34" rx="8" fill="none" stroke={C.navy} strokeWidth="2.5" />
        <rect x="74" y="138" width="52" height="6" rx="3" fill={C.navy} />
      </Tile>
      <Tile x={2} y={0} i={1} bg={C.cream}>
        {/* selected: tint with an accent edge */}
        <rect x="16" y="24" width="68" height="52" rx="8" fill={C.tint} stroke={C.navy} strokeWidth="2.5" />
        <rect x="28" y="40" width="34" height="6" rx="3" fill={C.navy} />
        <rect x="28" y="54" width="24" height="5" rx="2.5" fill={C.navy} fillOpacity=".4" />
      </Tile>
      <Tile x={3} y={0} i={2} bg={C.navy}>
        {/* drag grip */}
        <g className="pa-float" fill="#fff">
          {[0, 1, 2].map((r) => [0, 1].map((c) => <circle key={`${r}${c}`} cx={40 + c * 20} cy={30 + r * 20} r="5" />))}
        </g>
      </Tile>
      <Tile x={2} y={1} i={3} bg={C.peach}>
        {/* the corner: 10, a card, not a pill */}
        <path d="M22 100 V48 A22 22 0 0 1 44 26 H100" fill="none" stroke={C.navy} strokeWidth="7" />
        <circle cx="44" cy="48" r="3" fill={C.coral} />
        <Glyph x={68} y={66} size={16} fill={C.navy}>
          r 10
        </Glyph>
      </Tile>
      <Tile x={3} y={1} i={4} bg={C.sun}>
        {/* whole card is the route */}
        <rect className="hp-shape" x="18" y="30" width="64" height="40" rx="8" fill="#fff" />
        <path className="pa-nudge" d="M46 44 V74 L54 66 L60 80 L66 77 L60 63 H71 Z" fill={C.navy} />
      </Tile>
    </>
  );
}
