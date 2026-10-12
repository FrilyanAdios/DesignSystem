import { C, Glyph, Tile } from "@/components/PageArt";

/* Radio button: round dots, one chosen; option rows with an 8 px corner; the choice
   gliding along a group; and option cards. */
export function RadioArt() {
  const row = (y: number, on: boolean, w: number) => (
    <>
      <rect x="16" y={y} width={w} height="34" rx="8" fill={on ? C.tint : "#fff"} stroke={on ? C.navy : C.sky} strokeWidth="2" />
      <circle cx="36" cy={y + 17} r="8" fill="#fff" stroke={on ? C.navy : C.sky} strokeWidth="2.5" />
      {on && <circle cx="36" cy={y + 17} r="4" fill={C.navy} />}
      <rect x="52" y={y + 14} width={w - 60} height="6" rx="3" fill={C.navy} fillOpacity={on ? 0.85 : 0.4} />
    </>
  );
  return (
    <>
      <Tile x={0} y={0} i={0} w={2} bg={C.cream}>
        {row(12, true, 120)}
        {row(54, false, 104)}
        <rect x="150" y="18" width="34" height="5" rx="2.5" fill={C.coral} />
        <rect x="150" y="30" width="22" height="5" rx="2.5" fill={C.coral} fillOpacity=".5" />
      </Tile>
      <Tile x={2} y={0} i={1} bg={C.navy}>
        <circle className="hp-shape" cx="50" cy="50" r="28" fill="none" stroke="#fff" strokeWidth="6" />
        <circle className="pa-pulse" cx="50" cy="50" r="13" fill="#fff" />
      </Tile>
      <Tile x={3} y={0} i={2} bg={C.mint}>
        {/* the radio is a circle */}
        <circle cx="50" cy="44" r="22" fill="none" stroke={C.deep} strokeWidth="5" />
        <Glyph x={50} y={82} size={13} fill={C.deep}>
          circle
        </Glyph>
      </Tile>
      <Tile x={0} y={1} i={3} w={2} bg={C.sun}>
        {/* one choice moves along the group */}
        <circle cx="20" cy="50" r="12" fill="#fff" stroke={C.navy} strokeWidth="3" />
        <circle cx="100" cy="50" r="12" fill="#fff" stroke={C.navy} strokeWidth="3" />
        <circle cx="180" cy="50" r="12" fill="#fff" stroke={C.navy} strokeWidth="3" />
        <circle className="pa-glide" cx="20" cy="50" r="6" fill={C.navy} />
      </Tile>
      <Tile x={2} y={1} i={4} bg={C.tint}>
        {/* option cards: the chosen one has the strong edge */}
        <rect x="14" y="20" width="72" height="18" rx="5" fill="#fff" stroke={C.sky} strokeWidth="2" />
        <rect x="14" y="42" width="72" height="18" rx="5" fill="#fff" stroke={C.navy} strokeWidth="3" />
        <rect x="14" y="64" width="72" height="18" rx="5" fill="#fff" stroke={C.sky} strokeWidth="2" />
        <circle cx="25" cy="51" r="3.5" fill={C.navy} />
      </Tile>
      <Tile x={3} y={1} i={5} bg={C.deep}>
        <path d="M0 0 H100 A100 100 0 0 1 0 100 Z" fill="url(#pa-dots-white)" />
      </Tile>
    </>
  );
}
