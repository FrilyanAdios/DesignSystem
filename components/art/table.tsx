import { C, Glyph, Tile } from "@/components/PageArt";

/* Table: a register with its sticky header and checkbox column, a sort arrow,
   a picked row, the pinned status column, and a sideways scroll. */
export function TableArt() {
  const rows = [0, 1, 2];
  return (
    <>
      <Tile x={0} y={0} i={0} w={2} h={2} bg={C.cream}>
        {/* frame */}
        <rect x="16" y="20" width="168" height="160" rx="8" fill="#fff" stroke={C.navy} strokeWidth="2" />
        {/* sticky header */}
        <path d="M16 28 A8 8 0 0 1 24 20 H176 A8 8 0 0 1 184 28 V50 H16 Z" fill={C.tint} />
        <rect x="26" y="31" width="10" height="10" rx="2" fill="#fff" stroke={C.navy} strokeWidth="1.6" />
        <rect x="48" y="33" width="44" height="6" rx="3" fill={C.navy} />
        <rect x="104" y="33" width="34" height="6" rx="3" fill={C.navy} fillOpacity=".5" />
        <line x1="16" y1="50" x2="184" y2="50" stroke={C.navy} strokeWidth="1.5" />
        {rows.map((k) => {
          const y = 50 + k * 42;
          const picked = k === 1;
          return (
            <g key={k}>
              {picked && <rect x="17" y={y} width="166" height="42" fill={C.tint} />}
              <rect x="26" y={y + 16} width="10" height="10" rx="2" fill={picked ? C.navy : "#fff"} stroke={C.navy} strokeWidth="1.6" />
              {picked && <path d={`M28.5 ${y + 21} l2 2 l3.5 -4`} fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />}
              <rect x="48" y={y + 18} width="40" height="6" rx="3" fill={C.navy} fillOpacity=".75" />
              <rect x="100" y={y + 18} width="30" height="6" rx="3" fill={C.navy} fillOpacity=".3" />
              {k < 2 && <line x1="16" y1={y + 42} x2="184" y2={y + 42} stroke={C.tint} strokeWidth="1.5" />}
            </g>
          );
        })}
        {/* pinned status column */}
        <rect x="142" y="50" width="42" height="126" fill="#fff" />
        <line x1="142" y1="50" x2="142" y2="176" stroke={C.navy} strokeOpacity=".25" strokeWidth="1.5" />
        {rows.map((k) => (
          <rect key={k} x="150" y={50 + k * 42 + 14} width="26" height="14" rx="7" fill={k === 1 ? C.sky : C.mint} />
        ))}
      </Tile>
      <Tile x={2} y={0} i={1} bg={C.navy}>
        {/* sort */}
        <path d="M34 28 V72 M24 62 L34 72 L44 62" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path className="pa-float" d="M66 72 V28 M56 38 L66 28 L76 38" fill="none" stroke={C.sun} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </Tile>
      <Tile x={3} y={0} i={2} bg={C.sun}>
        {/* the checkbox */}
        <rect className="hp-shape" x="26" y="26" width="48" height="48" rx="8" fill={C.navy} />
        <path className="pa-blink" d="M37 51 L46 60 L64 40" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </Tile>
      <Tile x={2} y={1} i={3} bg={C.tint}>
        {/* scroll sideways, never shrink */}
        <rect x="12" y="40" width="76" height="20" rx="4" fill="#fff" stroke={C.navy} strokeWidth="2" />
        <rect className="pa-nudge" x="16" y="44" width="30" height="12" rx="3" fill={C.navy} />
        <path d="M22 76 H78 M70 70 L78 76 L70 82" fill="none" stroke={C.navy} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </Tile>
      <Tile x={3} y={1} i={4} bg={C.deep}>
        <path d="M0 100 A100 100 0 0 1 100 0 L100 100 Z" fill="url(#pa-dots-white)" />
        <Glyph x={50} y={50} size={18} fill="#fff">
          48
        </Glyph>
      </Tile>
    </>
  );
}
