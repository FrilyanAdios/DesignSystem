import { C, Glyph, Tile } from "@/components/PageArt";

/* Text field: label above a field with a caret, helper text, the 8 corner, an error, a textarea. */
export function TextFieldArt() {
  return (
    <>
      <Tile x={0} y={0} i={0} w={2} bg={C.cream}>
        {/* label above, field below */}
        <rect x="22" y="22" width="56" height="7" rx="3.5" fill={C.navy} />
        <rect x="22" y="38" width="156" height="40" rx="8" fill="#fff" stroke={C.navy} strokeWidth="2.5" />
        <rect x="36" y="55" width="62" height="6" rx="3" fill={C.navy} fillOpacity=".55" />
        <rect className="pa-blink" x="104" y="48" width="2.5" height="20" fill={C.navy} />
      </Tile>
      <Tile x={2} y={0} i={1} bg={C.navy}>
        <Glyph x={50} y={52} size={34} fill="#fff">
          Aa
        </Glyph>
      </Tile>
      <Tile x={3} y={0} i={2} bg={C.sun}>
        {/* helper text under the field */}
        <rect x="14" y="26" width="72" height="26" rx="6" fill="#fff" stroke={C.navy} strokeWidth="2" />
        <rect x="14" y="62" width="58" height="5" rx="2.5" fill={C.navy} fillOpacity=".6" />
        <rect x="14" y="73" width="40" height="5" rx="2.5" fill={C.navy} fillOpacity=".4" />
      </Tile>
      <Tile x={0} y={1} i={3} bg={C.tint}>
        {/* the corner: rounded 8, not a pill */}
        <path d="M22 100 V46 A20 20 0 0 1 42 26 H100" fill="none" stroke={C.navy} strokeWidth="7" />
        <circle cx="42" cy="46" r="3" fill={C.coral} />
        <Glyph x={66} y={66} size={16} fill={C.navy}>
          r 8
        </Glyph>
      </Tile>
      <Tile x={1} y={1} i={4} bg={C.coral}>
        {/* error: border plus a message, never color alone */}
        <rect className="hp-shape" x="14" y="24" width="72" height="28" rx="6" fill="#fff" />
        <path d="M22 72 L29 60 L36 72 Z" fill="#fff" />
        <rect x="42" y="64" width="40" height="6" rx="3" fill="#fff" />
      </Tile>
      <Tile x={2} y={1} i={5} bg={C.peach}>
        {/* textarea with its resize grip */}
        <rect x="14" y="16" width="72" height="68" rx="7" fill="#fff" stroke={C.navy} strokeWidth="2" />
        {[30, 42, 54].map((y, k) => (
          <rect key={y} x="24" y={y} width={k === 2 ? 30 : 50} height="5" rx="2.5" fill={C.navy} fillOpacity=".45" />
        ))}
        <path d="M70 78 L80 68 M75 78 L80 73" stroke={C.navy} strokeWidth="2" strokeLinecap="round" />
      </Tile>
      <Tile x={3} y={1} i={6} bg={C.deep}>
        <path d="M0 100 A100 100 0 0 1 100 0 L100 100 Z" fill="url(#pa-dots-white)" />
      </Tile>
    </>
  );
}
