import { C, Tile } from "@/components/PageArt";

/* Menu: a kebab that opens a short list, a divider before the destructive item, a status selector, arrow keys. */
export function MenuArt() {
  return (
    <>
      <Tile x={0} y={0} i={0} bg={C.navy}>
        {/* kebab */}
        <rect className="hp-shape" x="30" y="20" width="40" height="60" rx="10" fill="#fff" />
        {[36, 50, 64].map((cy) => (
          <circle key={cy} cx="50" cy={cy} r="5" fill={C.navy} />
        ))}
      </Tile>
      <Tile x={1} y={0} i={1} w={2} h={2} bg={C.tint}>
        {/* the list */}
        <rect x="20" y="20" width="160" height="164" rx="10" fill="#fff" />
        <rect x="20" y="20" width="160" height="30" rx="10" fill={C.cream} />
        <rect x="20" y="40" width="160" height="10" fill={C.cream} />
        <rect x="34" y="32" width="64" height="6" rx="3" fill={C.deep} />
        <rect x="26" y="56" width="148" height="26" rx="5" fill={C.tint} />
        {[0, 1].map((k) => (
          <rect key={k} x="36" y={66 + k * 30} width={k ? 78 : 96} height="6" rx="3" fill={C.navy} />
        ))}
        <path d="M20 124 H180" stroke={C.sky} strokeWidth="2" />
        <rect x="36" y="138" width="70" height="6" rx="3" fill={C.navy} />
        <rect x="36" y="164" width="88" height="6" rx="3" fill={C.coral} />
      </Tile>
      <Tile x={3} y={0} i={2} bg={C.sun}>
        {/* status selector */}
        <rect x="14" y="36" width="72" height="28" rx="6" fill={C.peach} />
        <circle cx="28" cy="50" r="4" fill={C.deep} />
        <rect x="38" y="47" width="28" height="6" rx="3" fill={C.deep} />
        <path d="M70 47 L74 52 L78 47" fill="none" stroke={C.deep} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </Tile>
      <Tile x={0} y={1} i={3} bg={C.coral}>
        {/* destructive confirms first */}
        <rect className="hp-shape" x="22" y="22" width="56" height="56" rx="10" fill="#fff" />
        <path d="M38 40 H62 M58 40 V66 H42 V40 M46 34 H54" fill="none" stroke={C.coral} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </Tile>
      <Tile x={3} y={1} i={4} bg={C.deep}>
        {/* arrow keys */}
        <rect x="34" y="16" width="32" height="30" rx="6" fill="#fff" />
        <path d="M43 35 L50 27 L57 35" fill="none" stroke={C.deep} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <rect className="pa-pulse" x="34" y="54" width="32" height="30" rx="6" fill="none" stroke={C.sun} strokeWidth="3" />
        <rect x="34" y="54" width="32" height="30" rx="6" fill={C.sun} />
        <path d="M43 65 L50 73 L57 65" fill="none" stroke={C.deep} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </Tile>
    </>
  );
}
