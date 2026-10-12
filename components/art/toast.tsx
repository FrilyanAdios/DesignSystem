import { C, Tile } from "@/components/PageArt";

/* Toast: a dark bar at the bottom center, a short message, a check, and a timer that runs out. */
export function ToastArt() {
  return (
    <>
      <Tile x={0} y={0} i={0} w={2} bg={C.cream}>
        {/* a screen with the toast floating at the bottom center */}
        <rect x="20" y="14" width="160" height="72" rx="8" fill="#fff" stroke={C.navy} strokeWidth="2" />
        <rect x="32" y="26" width="70" height="6" rx="3" fill={C.navy} fillOpacity=".35" />
        <rect x="32" y="38" width="96" height="6" rx="3" fill={C.navy} fillOpacity=".2" />
        <rect className="pa-float" x="56" y="58" width="88" height="20" rx="6" fill={C.deep} />
        <rect x="68" y="66" width="56" height="4" rx="2" fill="#fff" />
      </Tile>
      <Tile x={2} y={0} i={1} bg={C.mint}>
        {/* confirmed */}
        <circle cx="50" cy="50" r="26" fill="none" stroke={C.deep} strokeWidth="6" />
        <path className="pa-nudge" d="M38 51 L47 60 L63 42" fill="none" stroke={C.deep} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </Tile>
      <Tile x={3} y={0} i={2} bg={C.navy}>
        {/* it leaves on its own: the timer */}
        <circle cx="50" cy="50" r="24" fill="none" stroke="#fff" strokeOpacity=".3" strokeWidth="5" />
        <path className="pa-spin-sm" d="M50 26 A24 24 0 0 1 74 50" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
      </Tile>
      <Tile x={0} y={1} i={3} bg={C.tint}>
        {/* the corner: 8, rounded, not a pill */}
        <rect className="hp-shape" x="18" y="34" width="64" height="32" rx="8" fill={C.deep} />
        <rect x="30" y="47" width="40" height="6" rx="3" fill="#fff" />
      </Tile>
      <Tile x={1} y={1} i={4} w={2} bg={C.peach}>
        {/* mobile: the snackbar takes its own row above the bottom navigation */}
        <rect x="16" y="22" width="168" height="26" rx="13" fill={C.deep} />
        <circle cx="34" cy="35" r="6" fill="none" stroke={C.mint} strokeWidth="2.5" />
        <rect x="48" y="32" width="70" height="6" rx="3" fill="#fff" />
        <rect x="16" y="58" width="168" height="26" rx="13" fill="#fff" />
        {[0, 1, 2, 3].map((k) => (
          <circle key={k} cx={46 + k * 36} cy="71" r="5" fill={C.navy} fillOpacity={k === 0 ? 1 : 0.35} />
        ))}
      </Tile>
      <Tile x={3} y={1} i={5} bg={C.deep}>
        <path d="M0 0 H100 V100 Z" fill="url(#pa-stripes)" />
      </Tile>
    </>
  );
}
