/* Geometric hero art: a 4 × 3 grid of 100-unit tiles, each clipped by its own
   nested <svg>. Bauhaus-style shapes in Esco navy plus a warm pastel accent set.
   Decorative only — hidden from assistive technology. */

const C = {
  navy: "#00467F",
  deep: "#003559",
  sky: "#8DBBE3",
  tint: "#DCE8F4",
  peach: "#F7D2B6",
  coral: "#EE8A78",
  sun: "#F6D365",
  mint: "#8ED1AE",
  cream: "#FBF1E8",
};

type TileProps = { x: number; y: number; i: number; children: React.ReactNode };

function Tile({ x, y, i, children }: TileProps) {
  return (
    <g className="hp-tile" style={{ "--i": i } as React.CSSProperties}>
      <svg x={x * 100} y={y * 100} width="100" height="100" viewBox="0 0 100 100" overflow="hidden">
        {children}
      </svg>
    </g>
  );
}

export function HeroPattern() {
  return (
    <svg
      className="hero-pattern"
      viewBox="0 0 400 300"
      preserveAspectRatio="xMinYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern id="hp-dots-coral" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.3" fill={C.coral} />
        </pattern>
        <pattern id="hp-dots-white" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.3" fill="#fff" />
        </pattern>
        <pattern id="hp-dots-navy" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill={C.navy} />
        </pattern>
        <pattern id="hp-stripes" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(-20)">
          <line x1="0" y1="0" x2="6" y2="0" stroke="#fff" strokeOpacity=".35" strokeWidth="1" />
        </pattern>
      </defs>

      {/* row 1 */}
      <Tile x={0} y={0} i={0}>
        <circle className="hp-shape" cx="50" cy="0" r="50" fill={C.navy} />
        <circle cx="50" cy="0" r="22" fill={C.sun} />
      </Tile>
      <Tile x={1} y={0} i={1}>
        <path className="hp-shape" d="M0 100 A100 100 0 0 1 100 0 L100 100 Z" fill={C.tint} />
        <circle cx="70" cy="70" r="22" fill={C.coral} />
      </Tile>
      <Tile x={2} y={0} i={2}>
        <rect width="100" height="100" fill={C.cream} />
        <path className="hp-shape" d="M0 0 H100 V100 Z" fill={C.coral} />
      </Tile>
      <Tile x={3} y={0} i={3}>
        <rect width="100" height="100" fill={C.peach} />
        <path className="hp-shape" d="M100 0 A100 100 0 0 0 0 100 L100 100 Z" fill={C.sky} />
      </Tile>

      {/* row 2 */}
      <Tile x={0} y={1} i={4}>
        <path className="hp-shape" d="M0 0 A100 100 0 0 1 100 100 L0 100 Z" fill="url(#hp-dots-coral)" />
        <path d="M0 50 A50 50 0 0 1 50 100 L0 100 Z" fill={C.sun} />
      </Tile>
      <Tile x={1} y={1} i={5}>
        <rect width="100" height="100" fill={C.coral} />
        <path className="hp-shape" d="M100 0 A100 100 0 0 0 0 100 L100 100 Z" fill="url(#hp-dots-white)" />
      </Tile>
      <Tile x={2} y={1} i={6}>
        <rect width="100" height="100" fill={C.peach} />
        <circle className="hp-shape" cx="50" cy="50" r="30" fill="none" stroke={C.navy} strokeWidth="8" />
      </Tile>
      <Tile x={3} y={1} i={7}>
        <rect width="100" height="100" fill={C.cream} />
        <circle className="hp-shape" cx="100" cy="50" r="38" fill={C.mint} />
      </Tile>

      {/* row 3 */}
      <Tile x={0} y={2} i={8}>
        <circle className="hp-shape" cx="100" cy="100" r="92" fill={C.navy} />
        <circle cx="100" cy="100" r="92" fill="url(#hp-stripes)" />
        <circle cx="100" cy="100" r="44" fill={C.sun} />
      </Tile>
      <Tile x={1} y={2} i={9}>
        <rect width="100" height="100" fill={C.peach} />
        <path className="hp-shape" d="M0 100 L50 0 L100 100 Z" fill={C.tint} />
      </Tile>
      <Tile x={2} y={2} i={10}>
        <rect width="100" height="100" fill={C.deep} />
        <path className="hp-shape" d="M0 100 A100 100 0 0 1 100 0 L100 100 Z" fill="url(#hp-dots-white)" />
      </Tile>
      <Tile x={3} y={2} i={11}>
        <rect width="100" height="100" fill={C.tint} />
        <path className="hp-shape" d="M100 0 V100 H0 Z" fill={C.coral} />
        <rect x="12" y="12" width="34" height="34" fill="url(#hp-dots-navy)" />
      </Tile>
    </svg>
  );
}
