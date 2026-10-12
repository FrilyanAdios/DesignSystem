import { C, Glyph, Tile } from "@/components/PageArt";

/* Status pill: the five families with their dot, the three geometries
   (pill, flag, state control with chevron), and the full round end. */
export function StatusPillArt() {
  const fam = [
    { bg: C.tint, fg: C.navy },
    { bg: C.mint, fg: C.deep },
    { bg: C.sun, fg: C.deep },
    { bg: C.coral, fg: "#fff" },
    { bg: "#fff", fg: C.navy },
  ];
  return (
    <>
      <Tile x={0} y={0} i={0} w={2} h={2} bg={C.cream}>
        {fam.map((f, k) => (
          <g key={k}>
            <rect x="30" y={22 + k * 32} width="140" height="22" rx="11" fill={f.bg} stroke={k === 4 ? C.navy : "none"} strokeOpacity=".25" strokeWidth="1.5" />
            <circle cx="44" cy={33 + k * 32} r="4" fill={f.fg} />
            <rect x="56" y={30 + k * 32} width={60 - k * 6} height="6" rx="3" fill={f.fg} />
          </g>
        ))}
      </Tile>
      <Tile x={2} y={0} i={1} bg={C.navy}>
        {/* state control: small corners and a chevron */}
        <rect x="12" y="36" width="76" height="28" rx="6" fill={C.sun} />
        <circle cx="24" cy="50" r="3.5" fill={C.deep} />
        <rect x="32" y="47" width="30" height="6" rx="3" fill={C.deep} />
        <path className="pa-float" d="M68 46 L74 52 L80 46" fill="none" stroke={C.deep} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </Tile>
      <Tile x={3} y={0} i={2} bg={C.mint}>
        {/* the dot */}
        <circle className="hp-shape" cx="50" cy="50" r="16" fill={C.deep} />
        <circle className="pa-pulse" cx="50" cy="50" r="16" fill="none" stroke={C.deep} strokeWidth="2" style={{ transformOrigin: "50px 50px" }} />
      </Tile>
      <Tile x={2} y={1} i={3} bg={C.tint}>
        {/* the flag: quieter, smaller */}
        <rect x="16" y="40" width="68" height="20" rx="10" fill="#fff" />
        <path d="M28 44 V56 M28 44 H36 L34 47 L36 50 H28" fill="none" stroke={C.navy} strokeWidth="1.8" strokeLinejoin="round" />
        <rect x="42" y="47" width="30" height="6" rx="3" fill={C.navy} fillOpacity=".6" />
      </Tile>
      <Tile x={3} y={1} i={4} bg={C.peach}>
        {/* round end: radius is half the height */}
        <path d="M100 26 H50 A24 24 0 0 0 50 74 H100" fill="none" stroke={C.navy} strokeWidth="7" />
        <Glyph x={66} y={50} size={14} fill={C.navy}>
          full
        </Glyph>
      </Tile>
    </>
  );
}
