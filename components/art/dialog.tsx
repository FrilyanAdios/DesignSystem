import { C, Glyph, Tile } from "@/components/PageArt";

/* Dialog: a modal with icon tile, title, close, body and footer over the scrim; a confirmation; four exits. */
export function DialogArt() {
  return (
    <>
      <Tile x={0} y={0} i={0} w={2} h={2} bg={C.deep}>
        {/* the scrim and the modal */}
        <rect width="200" height="200" fill="url(#pa-dots-white)" opacity=".35" />
        <g className="pa-float">
          <rect x="26" y="34" width="148" height="132" rx="10" fill="#fff" />
          <rect x="38" y="46" width="20" height="20" rx="4" fill={C.tint} />
          <rect x="43" y="51" width="10" height="10" rx="2" fill={C.navy} />
          <rect x="66" y="52" width="58" height="8" rx="4" fill={C.navy} />
          <rect x="140" y="45" width="22" height="22" rx="5" fill="none" stroke={C.sky} strokeWidth="2" />
          <path d="M146 51 L156 61 M156 51 L146 61" stroke={C.navy} strokeWidth="2" strokeLinecap="round" />
          <path d="M26 78 H174 M26 132 H174" stroke={C.tint} strokeWidth="2" />
          <rect x="38" y="92" width="110" height="6" rx="3" fill={C.sky} />
          <rect x="38" y="106" width="84" height="6" rx="3" fill={C.sky} />
          <rect x="86" y="142" width="34" height="14" rx="4" fill="#fff" stroke={C.sky} strokeWidth="1.5" />
          <rect x="126" y="142" width="38" height="14" rx="4" fill={C.navy} />
        </g>
      </Tile>
      <Tile x={2} y={0} i={1} bg={C.tint}>
        {/* the 30 px icon tile */}
        <rect className="hp-shape" x="25" y="25" width="50" height="50" rx="10" fill={C.navy} />
        <rect x="38" y="38" width="24" height="24" rx="3" fill="none" stroke="#fff" strokeWidth="3" />
      </Tile>
      <Tile x={3} y={0} i={2} bg={C.coral}>
        {/* confirmation: cannot be undone */}
        <path className="hp-shape" d="M50 18 L86 80 H14 Z" fill="#fff" />
        <rect x="47" y="40" width="6" height="22" rx="3" fill={C.coral} />
        <circle cx="50" cy="70" r="3.5" fill={C.coral} />
      </Tile>
      <Tile x={2} y={1} i={3} bg={C.sun}>
        {/* Escape */}
        <rect className="pa-pulse" x="18" y="30" width="64" height="40" rx="8" fill="none" stroke="#fff" strokeWidth="3" />
        <rect x="18" y="30" width="64" height="40" rx="8" fill="#fff" stroke={C.navy} strokeWidth="2.5" />
        <Glyph x={50} y={56} size={16} fill={C.navy}>
          Esc
        </Glyph>
      </Tile>
      <Tile x={3} y={1} i={4} bg={C.cream}>
        {/* focus returns to the trigger */}
        <path d="M74 34 A26 26 0 1 0 76 62" fill="none" stroke={C.navy} strokeWidth="5" strokeLinecap="round" />
        <path d="M66 26 L76 34 L66 42" fill="none" stroke={C.navy} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <circle className="pa-blink" cx="50" cy="50" r="7" fill={C.coral} />
      </Tile>
    </>
  );
}
