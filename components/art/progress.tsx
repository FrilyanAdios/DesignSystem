import { C, Glyph, Tile } from "@/components/PageArt";

/* Progress: the button spinner, the wizard stepper, the 4 dp track, and the skeleton shimmer. */
export function ProgressArt() {
  return (
    <>
      <Tile x={0} y={0} i={0} bg={C.navy}>
        {/* button spinner: 14 px ring, open at the top */}
        <circle cx="50" cy="50" r="18" fill="none" stroke="#fff" strokeOpacity=".3" strokeWidth="5" />
        <path className="pa-spin-sm" d="M50 32 A18 18 0 0 1 68 50" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
      </Tile>
      <Tile x={1} y={0} i={1} w={3} bg={C.cream}>
        {/* wizard stepper: done, current (ringed), next */}
        <path d="M70 40 H150" stroke={C.navy} strokeWidth="4" />
        <path d="M150 40 H230" stroke={C.navy} strokeOpacity=".3" strokeWidth="4" />
        <circle cx="70" cy="40" r="14" fill={C.navy} />
        <path d="M63 40 L68 45 L77 35" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle className="pa-pulse" cx="150" cy="40" r="22" fill={C.tint} />
        <circle cx="150" cy="40" r="14" fill={C.navy} />
        <Glyph x={150} y={40} size={13} fill="#fff">2</Glyph>
        <circle cx="230" cy="40" r="13" fill="#fff" stroke={C.navy} strokeOpacity=".4" strokeWidth="2" />
        <Glyph x={230} y={40} size={13} fill={C.navy}>3</Glyph>
        <rect x="52" y="70" width="36" height="5" rx="2.5" fill={C.navy} fillOpacity=".4" />
        <rect x="128" y="70" width="44" height="5" rx="2.5" fill={C.navy} />
        <rect x="212" y="70" width="36" height="5" rx="2.5" fill={C.navy} fillOpacity=".4" />
      </Tile>
      <Tile x={0} y={1} i={2} w={2} bg={C.tint}>
        {/* 4 dp determinate track */}
        <rect x="20" y="46" width="160" height="8" fill="#fff" />
        <rect className="pa-glide" x="20" y="46" width="106" height="8" rx="4" fill={C.navy} />
        <Glyph x={100} y={78} size={13} fill={C.navy}>4 dp</Glyph>
      </Tile>
      <Tile x={2} y={1} i={3} bg={C.peach}>
        {/* skeleton row */}
        <rect x="16" y="30" width="22" height="22" rx="6" fill="#fff" fillOpacity=".8" />
        <rect className="pa-blink" x="46" y="31" width="40" height="6" rx="3" fill="#fff" />
        <rect x="46" y="42" width="28" height="5" rx="2.5" fill="#fff" fillOpacity=".7" />
        <rect x="46" y="52" width="18" height="4" rx="2" fill="#fff" fillOpacity=".55" />
        <rect x="16" y="66" width="70" height="6" rx="3" fill="#fff" fillOpacity=".5" />
      </Tile>
      <Tile x={3} y={1} i={4} bg={C.deep}>
        <circle className="hp-shape" cx="50" cy="50" r="30" fill="url(#pa-dots-white)" />
      </Tile>
    </>
  );
}
