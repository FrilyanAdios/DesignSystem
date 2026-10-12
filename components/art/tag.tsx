import { C, Glyph, Tile } from "@/components/PageArt";

/* Tag: quiet capsule flags of different lengths, a counted chip, the flag glyph, and
   the mobile chip with its 8 px corner (not a pill). */
export function TagArt() {
  const flag = (x: number, y: number, w: number, fill: string, ink: string) => (
    <>
      <rect x={x} y={y} width={w} height="20" rx="10" fill={fill} />
      <rect x={x + 10} y={y + 7.5} width={w - 20} height="5" rx="2.5" fill={ink} />
    </>
  );
  return (
    <>
      <Tile x={0} y={0} i={0} w={2} bg={C.cream}>
        {flag(16, 18, 58, "#fff", C.deep)}
        {flag(82, 18, 88, "#fff", C.deep)}
        {flag(16, 46, 96, C.sun, C.deep)}
        {flag(120, 46, 50, C.tint, C.navy)}
        {flag(16, 74, 72, "#fff", C.deep)}
      </Tile>
      <Tile x={2} y={0} i={1} bg={C.navy}>
        <g className="pa-nudge">
          <path d="M34 80 V22 H70 L60 36 L70 50 H34" fill="none" stroke="#fff" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" />
        </g>
      </Tile>
      <Tile x={3} y={0} i={2} bg={C.sun}>
        {/* counted chip */}
        <rect x="12" y="38" width="76" height="24" rx="12" fill="#fff" stroke={C.navy} strokeOpacity=".35" strokeWidth="1.5" />
        <rect x="22" y="47.5" width="34" height="5" rx="2.5" fill={C.navy} fillOpacity=".6" />
        <Glyph x={72} y={50} size={12} fill={C.navy}>
          9
        </Glyph>
      </Tile>
      <Tile x={0} y={1} i={3} bg={C.tint}>
        {/* the pill: radius is half the height */}
        <rect className="hp-shape" x="14" y="36" width="72" height="28" rx="14" fill={C.navy} />
        <Glyph x={50} y={82} size={11} fill={C.navy}>
          pill
        </Glyph>
      </Tile>
      <Tile x={1} y={1} i={4} w={2} bg={C.peach}>
        {/* mobile chips: rounded 8, not a pill; one pressed */}
        <rect x="16" y="30" width="80" height="40" rx="8" fill="#fff" stroke={C.navy} strokeOpacity=".3" strokeWidth="2" />
        <circle cx="34" cy="50" r="6" fill="none" stroke={C.navy} strokeWidth="2.5" />
        <rect x="46" y="47" width="38" height="6" rx="3" fill={C.deep} />
        <rect x="106" y="30" width="78" height="40" rx="8" fill={C.tint} stroke={C.navy} strokeWidth="2.5" />
        <rect x="120" y="47" width="50" height="6" rx="3" fill={C.navy} />
      </Tile>
      <Tile x={3} y={1} i={5} bg={C.deep}>
        <path d="M0 100 A100 100 0 0 1 100 0 L100 100 Z" fill="url(#pa-stripes)" />
      </Tile>
    </>
  );
}
