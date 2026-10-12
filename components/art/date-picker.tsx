import { C, Glyph, Tile } from "@/components/PageArt";

/* Date picker: the range pill, the month grid with a range, week numbers, workload bars. */
export function DatePickerArt() {
  return (
    <>
      <Tile x={0} y={0} i={0} w={2} bg={C.cream}>
        {/* prev · Week · range · next */}
        <rect x="14" y="32" width="172" height="36" rx="8" fill="#fff" stroke={C.navy} strokeWidth="2.5" />
        <path d="M30 44 L24 50 L30 56" fill="none" stroke={C.navy} strokeWidth="2.5" strokeLinecap="round" />
        <rect x="40" y="39" width="34" height="22" rx="5" fill={C.tint} />
        <rect x="47" y="47" width="20" height="6" rx="3" fill={C.navy} />
        <rect x="84" y="47" width="72" height="6" rx="3" fill={C.navy} fillOpacity=".7" />
        <path d="M170 44 L176 50 L170 56" fill="none" stroke={C.navy} strokeWidth="2.5" strokeLinecap="round" />
      </Tile>
      <Tile x={2} y={0} i={1} h={2} bg={C.tint}>
        {/* month grid: start and end edged, days between tinted */}
        <rect x="10" y="14" width="80" height="172" rx="10" fill="#fff" />
        {Array.from({ length: 28 }, (_, k) => {
          const col = k % 4, row = Math.floor(k / 4);
          const x = 18 + col * 17, y = 26 + row * 22;
          const start = k === 9, end = k === 18, mid = k > 9 && k < 18;
          return (
            <rect
              key={k}
              x={x}
              y={y}
              width="13"
              height="16"
              rx="3"
              fill={mid ? C.tint : start || end ? C.tint : C.navy}
              fillOpacity={mid || start || end ? 1 : 0.12}
              stroke={start || end ? C.navy : "none"}
              strokeWidth="1.5"
            />
          );
        })}
      </Tile>
      <Tile x={3} y={0} i={2} bg={C.sun}>
        <path className="pa-nudge" d="M30 50 H66 M54 38 L66 50 L54 62" fill="none" stroke={C.navy} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      </Tile>
      <Tile x={0} y={1} i={3} bg={C.navy}>
        <Glyph x={50} y={50} size={26} fill="#fff">
          Wk
        </Glyph>
      </Tile>
      <Tile x={1} y={1} i={4} bg={C.peach}>
        {/* workload bars, split by status */}
        {[0, 1, 2].map((k) => (
          <g key={k}>
            <rect x="18" y={26 + k * 18} width={[64, 40, 52][k]} height="7" rx="3.5" fill={C.navy} fillOpacity=".25" />
            <rect x="18" y={26 + k * 18} width={[30, 22, 18][k]} height="7" rx="3.5" fill={C.navy} />
          </g>
        ))}
      </Tile>
      <Tile x={3} y={1} i={5} bg={C.deep}>
        <circle className="hp-shape" cx="50" cy="50" r="24" fill="none" stroke="#fff" strokeWidth="2" />
        <path d="M0 100 A100 100 0 0 1 100 0 L100 100 Z" fill="url(#pa-dots-white)" />
      </Tile>
    </>
  );
}
