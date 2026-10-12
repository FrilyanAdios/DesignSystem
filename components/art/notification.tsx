import { C, Tile } from "@/components/PageArt";

/* Notification: the bell with its red count, the panel rows with the unread dot, and clearing to history. */
export function NotificationArt() {
  return (
    <>
      <Tile x={0} y={0} i={0} bg={C.navy}>
        {/* bell + badge */}
        <path className="pa-nudge" d="M32 62 C36 58 36 52 36 44 A14 14 0 0 1 64 44 C64 52 64 58 68 62 Z" fill="#fff" />
        <path d="M45 68 A5 5 0 0 0 55 68" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        <circle className="pa-pulse" cx="66" cy="32" r="9" fill={C.coral} stroke={C.navy} strokeWidth="3" />
      </Tile>
      <Tile x={1} y={0} i={1} w={2} h={2} bg={C.cream}>
        {/* the panel: header, then three rows; unread rows carry the dot on the right */}
        <rect x="22" y="18" width="156" height="164" rx="10" fill="#fff" stroke={C.navy} strokeWidth="2" />
        <rect x="34" y="32" width="56" height="7" rx="3.5" fill={C.navy} />
        <rect x="96" y="30" width="26" height="11" rx="5.5" fill={C.coral} fillOpacity=".35" />
        <path d="M22 52 H178" stroke={C.tint} strokeWidth="2" />
        {[0, 1, 2].map((k) => (
          <g key={k} transform={`translate(0 ${62 + k * 38})`}>
            <rect x="34" y="0" width="24" height="24" rx="7" fill={k < 2 ? C.tint : "#EEF1F4"} />
            <rect x="66" y="4" width={k === 1 ? 62 : 74} height="6" rx="3" fill={C.navy} fillOpacity={k < 2 ? 1 : 0.55} />
            <rect x="66" y="15" width="50" height="4" rx="2" fill={C.navy} fillOpacity=".3" />
            {k < 2 && <circle className={k === 0 ? "pa-blink" : undefined} cx="164" cy="8" r="4" fill={C.coral} />}
          </g>
        ))}
      </Tile>
      <Tile x={3} y={0} i={2} bg={C.sun}>
        {/* the count chip: "3 new" */}
        <rect className="hp-shape" x="20" y="38" width="60" height="24" rx="12" fill="#fff" />
        <circle cx="36" cy="50" r="5" fill={C.coral} />
        <rect x="46" y="47" width="24" height="6" rx="3" fill={C.navy} />
      </Tile>
      <Tile x={0} y={1} i={3} bg={C.tint}>
        {/* selecting mode: a checked box */}
        <rect x="30" y="30" width="40" height="40" rx="6" fill={C.navy} />
        <path d="M40 50 L47 57 L61 43" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </Tile>
      <Tile x={3} y={1} i={4} bg={C.deep}>
        {/* cleared rows move to history, never deleted */}
        <rect className="pa-glide" x="18" y="30" width="44" height="12" rx="6" fill={C.sky} />
        <rect x="18" y="52" width="64" height="12" rx="6" fill="url(#pa-dots-white)" />
        <rect x="18" y="72" width="64" height="4" rx="2" fill="#fff" fillOpacity=".4" />
      </Tile>
    </>
  );
}
