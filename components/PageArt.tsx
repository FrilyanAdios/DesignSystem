/* Page-head art: the home hero's Bauhaus tile language, themed per page.
   A 4 × 2 grid of 100-unit tiles (a tile may span more than one cell), each
   clipped by its own nested <svg>. Same palette as HeroPattern.
   Decorative only — hidden from assistive technology. */

export const C = {
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

export const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

type TileProps = { x: number; y: number; i: number; w?: number; h?: number; bg?: string; children?: React.ReactNode };

export function Tile({ x, y, i, w = 1, h = 1, bg, children }: TileProps) {
  return (
    <g className="hp-tile" style={{ "--i": i } as React.CSSProperties}>
      <svg x={x * 100} y={y * 100} width={w * 100} height={h * 100} viewBox={`0 0 ${w * 100} ${h * 100}`} overflow="hidden">
        {bg && <rect width={w * 100} height={h * 100} fill={bg} />}
        {children}
      </svg>
    </g>
  );
}

export const Glyph = ({ x = 50, y = 50, size, fill, children }: { x?: number; y?: number; size: number; fill: string; children: string }) => (
  <text x={x} y={y} fontFamily={MONO} fontSize={size} fontWeight={700} fill={fill} textAnchor="middle" dominantBaseline="central">
    {children}
  </text>
);

export const Dots = ({ id, color, r = 1.3 }: { id: string; color: string; r?: number }) => (
  <pattern id={id} width="7" height="7" patternUnits="userSpaceOnUse">
    <circle cx="2" cy="2" r={r} fill={color} />
  </pattern>
);

/* ---- Introduction: the system as building blocks ------------------------- */
function Introduction() {
  return (
    <>
      <Tile x={0} y={0} i={0} bg={C.navy}>
        <circle className="hp-shape" cx="0" cy="0" r="62" fill={C.sun} />
      </Tile>
      <Tile x={1} y={0} i={1} w={2} bg={C.cream}>
        {/* foundations, components, patterns — stacked blocks */}
        <g>
          <rect x="30" y="58" width="68" height="28" rx="3" fill={C.navy} />
          <rect x="102" y="58" width="68" height="28" rx="3" fill={C.coral} />
          <rect x="66" y="24" width="68" height="28" rx="3" fill={C.sky} />
          {[44, 64, 84, 116, 136, 156, 80, 100, 120].map((cx, k) => (
            <rect key={k} x={cx - 6} y={k < 6 ? 52 : 18} width="12" height="6" rx="1.5" fill={k < 3 ? C.navy : k < 6 ? C.coral : C.sky} />
          ))}
        </g>
      </Tile>
      <Tile x={3} y={0} i={2} bg={C.coral}>
        <path className="hp-shape" d="M100 0 A100 100 0 0 0 0 100 L100 100 Z" fill="url(#pa-dots-white)" />
      </Tile>
      <Tile x={0} y={1} i={3} bg={C.tint}>
        <path className="hp-shape" d="M0 100 L50 10 L100 100 Z" fill={C.navy} />
      </Tile>
      <Tile x={1} y={1} i={4} bg={C.sun}>
        <circle className="hp-shape" cx="50" cy="50" r="28" fill="none" stroke={C.navy} strokeWidth="8" />
      </Tile>
      <Tile x={2} y={1} i={5} bg={C.deep}>
        <path className="hp-shape" d="M0 100 A100 100 0 0 1 100 0 L100 100 Z" fill="url(#pa-dots-white)" />
      </Tile>
      <Tile x={3} y={1} i={6} bg={C.peach}>
        <circle className="hp-shape" cx="100" cy="50" r="40" fill={C.mint} />
      </Tile>
    </>
  );
}

/* ---- Principles: compass, balance, one primary --------------------------- */
function Principles() {
  return (
    <>
      <Tile x={0} y={0} i={0} w={2} h={2} bg={C.cream}>
        <circle cx="100" cy="100" r="72" fill={C.tint} stroke={C.navy} strokeWidth="6" />
        {[0, 90, 180, 270].map((a) => (
          <rect key={a} x="97" y="34" width="6" height="12" fill={C.navy} transform={`rotate(${a} 100 100)`} />
        ))}
        <g className="pa-sway">
          <path d="M100 44 L113 100 H87 Z" fill={C.coral} />
          <path d="M100 156 L113 100 H87 Z" fill={C.navy} />
          <circle cx="100" cy="100" r="7" fill="#fff" />
        </g>
      </Tile>
      <Tile x={2} y={0} i={1} bg={C.navy}>
        <circle cx="50" cy="50" r="30" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="4" />
        <path className="hp-shape" d="M34 51 L46 63 L68 38" fill="none" stroke="#fff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      </Tile>
      <Tile x={3} y={0} i={2} bg={C.peach}>
        <g className="hp-shape">
          <path d="M50 58 L62 82 H38 Z" fill={C.navy} />
          <rect x="14" y="52" width="72" height="6" rx="3" fill={C.navy} />
          <circle cx="24" cy="40" r="12" fill={C.sun} />
          <circle cx="76" cy="40" r="12" fill={C.coral} />
        </g>
      </Tile>
      <Tile x={2} y={1} i={3} bg={C.sun}>
        <rect x="18" y="22" width="64" height="16" rx="5" fill={C.navy} />
        <rect x="18" y="46" width="64" height="14" rx="5" fill="none" stroke={C.navy} strokeWidth="3" />
        <rect x="18" y="68" width="64" height="14" rx="5" fill="none" stroke={C.navy} strokeWidth="3" />
      </Tile>
      <Tile x={3} y={1} i={4} bg={C.tint}>
        {[0, 1, 2].flatMap((r) =>
          [0, 1, 2].map((c) => (
            <circle key={`${r}${c}`} cx={26 + c * 24} cy={26 + r * 24} r="6" fill={r === 1 && c === 1 ? C.coral : C.navy} />
          )),
        )}
      </Tile>
    </>
  );
}

/* ---- For designers: pen tool, swatches, cursor, artboard ----------------- */
function Designing() {
  return (
    <>
      <Tile x={0} y={0} i={0} bg={C.cream}>
        {/* pen nib */}
        <g className="hp-shape">
          <path d="M50 10 L80 52 L62 90 H38 L20 52 Z" fill={C.navy} />
          <path d="M50 18 V52" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          <circle cx="50" cy="56" r="6" fill="#fff" />
        </g>
      </Tile>
      <Tile x={1} y={0} i={1} w={2} bg={C.tint}>
        {/* bézier curve with handles */}
        <path d="M18 82 C 60 4, 140 4, 182 82" fill="none" stroke={C.navy} strokeWidth="4" />
        <line x1="18" y1="82" x2="60" y2="18" stroke={C.coral} strokeWidth="2" />
        <line x1="182" y1="82" x2="140" y2="18" stroke={C.coral} strokeWidth="2" />
        <circle cx="60" cy="18" r="5" fill={C.coral} />
        <circle cx="140" cy="18" r="5" fill={C.coral} />
        <rect x="12" y="76" width="12" height="12" fill="#fff" stroke={C.navy} strokeWidth="2.5" />
        <rect x="176" y="76" width="12" height="12" fill="#fff" stroke={C.navy} strokeWidth="2.5" />
        <rect x="94" y="27" width="12" height="12" fill={C.navy} />
      </Tile>
      <Tile x={3} y={0} i={2} bg={C.navy}>
        {/* cursor */}
        <path className="pa-nudge" d="M32 20 V76 L46 62 L56 84 L66 79 L56 58 H75 Z" fill="#fff" />
        <circle cx="100" cy="100" r="26" fill={C.coral} />
      </Tile>
      <Tile x={0} y={1} i={3} bg={C.sun}>
        {/* artboard with selection handles */}
        <circle className="hp-shape" cx="50" cy="50" r="17" fill={C.coral} />
        <rect x="22" y="22" width="56" height="56" fill="none" stroke={C.navy} strokeWidth="2" />
        {[
          [22, 22],
          [78, 22],
          [22, 78],
          [78, 78],
        ].map(([cx, cy]) => (
          <rect key={`${cx}${cy}`} x={cx - 5} y={cy - 5} width="10" height="10" fill="#fff" stroke={C.navy} strokeWidth="2" />
        ))}
      </Tile>
      <Tile x={1} y={1} i={4} bg={C.peach}>
        {/* swatch fan */}
        <g className="hp-shape">
          {[C.mint, C.coral, C.navy].map((fill, k) => (
            <rect key={fill} x="40" y="18" width="22" height="66" rx="6" fill={fill} stroke="#fff" strokeWidth="2" transform={`rotate(${(k - 1) * 22} 51 84)`} />
          ))}
          <circle cx="51" cy="76" r="3.5" fill="#fff" />
        </g>
      </Tile>
      <Tile x={2} y={1} i={5} bg={C.cream}>
        {/* ruler */}
        <rect width="100" height="22" fill={C.tint} />
        {Array.from({ length: 11 }, (_, k) => (
          <line key={k} x1={k * 10} y1="0" x2={k * 10} y2={k % 5 === 0 ? 16 : 9} stroke={C.navy} strokeWidth="1.5" />
        ))}
        <path className="hp-shape" d="M0 100 V44 A56 56 0 0 1 56 100 Z" fill={C.mint} />
      </Tile>
      <Tile x={3} y={1} i={6} bg={C.coral}>
        <path d="M100 0 A100 100 0 0 0 0 100 L100 100 Z" fill="url(#pa-dots-white)" />
        <text x="50" y="54" fontSize="44" fontWeight={700} fill="#fff" textAnchor="middle" dominantBaseline="central">
          Aa
        </text>
      </Tile>
    </>
  );
}

/* ---- For developers: editor, brackets, terminal, branches ---------------- */
function Developing() {
  const lines: [number, number, string][] = [
    [20, 54, C.sky],
    [34, 70, C.sun],
    [48, 40, C.mint],
    [34, 86, C.coral],
    [20, 30, C.sky],
  ];
  return (
    <>
      <Tile x={0} y={0} i={0} w={2} bg={C.deep}>
        {/* code editor */}
        <rect width="200" height="18" fill="#fff" fillOpacity=".08" />
        {[C.coral, C.sun, C.mint].map((fill, k) => (
          <circle key={fill} cx={12 + k * 12} cy="9" r="3.5" fill={fill} />
        ))}
        {lines.map(([x, w, fill], k) => (
          <g key={k}>
            <rect x="8" y={28 + k * 14} width="6" height="5" rx="1" fill="#fff" fillOpacity=".25" />
            <rect x={x + 6} y={28 + k * 14} width={w} height="5" rx="2.5" fill={fill} />
          </g>
        ))}
        <rect className="pa-blink" x="62" y="83" width="3" height="11" fill="#fff" />
      </Tile>
      <Tile x={2} y={0} i={1} bg={C.sun}>
        <Glyph size={34} fill={C.navy}>{"</>"}</Glyph>
      </Tile>
      <Tile x={3} y={0} i={2} bg={C.cream}>
        <circle className="hp-shape" cx="100" cy="0" r="40" fill={C.tint} />
        <Glyph size={46} fill={C.coral}>{"{}"}</Glyph>
      </Tile>
      <Tile x={0} y={1} i={3} bg={C.tint}>
        <text x="20" y="54" fontFamily={MONO} fontSize="34" fontWeight={700} fill={C.navy} dominantBaseline="central">
          {">"}
        </text>
        <rect className="pa-blink" x="46" y="64" width="26" height="6" fill={C.navy} />
      </Tile>
      <Tile x={1} y={1} i={4} bg={C.peach}>
        {/* git branch */}
        <path d="M32 0 V100" stroke={C.navy} strokeWidth="5" />
        <path d="M32 74 C32 52, 70 58, 70 36 V0" fill="none" stroke={C.coral} strokeWidth="5" />
        {[22, 52, 82].map((cy) => (
          <circle key={cy} cx="32" cy={cy} r="8" fill={C.navy} stroke="#fff" strokeWidth="3" />
        ))}
        <circle className="hp-shape" cx="70" cy="30" r="8" fill={C.coral} stroke="#fff" strokeWidth="3" />
      </Tile>
      <Tile x={2} y={1} i={5} bg={C.navy}>
        <path className="hp-shape" d="M0 100 A100 100 0 0 1 100 0 L100 100 Z" fill="url(#pa-dots-white)" />
        <circle cx="0" cy="0" r="34" fill={C.sun} />
      </Tile>
      <Tile x={3} y={1} i={6} bg={C.mint}>
        {["1 0 1", "0 1 1", "1 1 0"].map((row, k) => (
          <text key={k} x="50" y={30 + k * 20} fontFamily={MONO} fontSize="15" fontWeight={700} fill={C.navy} fillOpacity={0.8} textAnchor="middle" dominantBaseline="central">
            {row}
          </text>
        ))}
      </Tile>
    </>
  );
}

/* ---- React and Next.js: atom, browser, component tree -------------------- */
function ReactArt() {
  return (
    <>
      <Tile x={0} y={0} i={0} w={2} h={2} bg={C.deep}>
        <g className="pa-spin">
          {[0, 60, 120].map((a) => (
            <ellipse key={a} cx="100" cy="100" rx="78" ry="28" fill="none" stroke={C.sky} strokeWidth="5" transform={`rotate(${a} 100 100)`} />
          ))}
        </g>
        <circle cx="100" cy="100" r="13" fill={C.sun} />
      </Tile>
      <Tile x={2} y={0} i={1} bg={C.cream}>
        {/* browser window */}
        <g className="hp-shape">
          <rect x="14" y="20" width="72" height="60" rx="6" fill="#fff" stroke={C.navy} strokeWidth="3" />
          <path d="M14 34 H86" stroke={C.navy} strokeWidth="3" />
          {[22, 30, 38].map((cx) => (
            <circle key={cx} cx={cx} cy="27" r="2" fill={C.navy} />
          ))}
          <rect x="22" y="42" width="24" height="30" rx="2" fill={C.tint} />
          <rect x="52" y="42" width="26" height="6" rx="3" fill={C.coral} />
          <rect x="52" y="54" width="20" height="5" rx="2.5" fill={C.sky} />
          <rect x="52" y="64" width="24" height="5" rx="2.5" fill={C.sky} />
        </g>
      </Tile>
      <Tile x={3} y={0} i={2} bg={C.coral}>
        <Glyph size={20} fill="#fff">{"<App/>"}</Glyph>
      </Tile>
      <Tile x={2} y={1} i={3} bg={C.tint}>
        {/* component tree */}
        <path d="M50 30 V44 M24 44 H76 M24 44 V58 M76 44 V58 M50 44 V58" stroke={C.navy} strokeWidth="2.5" fill="none" />
        <rect x="36" y="14" width="28" height="16" rx="4" fill={C.navy} />
        {[10, 36, 62].map((x, k) => (
          <rect key={x} className={k === 1 ? "hp-shape" : undefined} x={x} y="58" width="28" height="16" rx="4" fill={k === 1 ? C.coral : "#fff"} stroke={C.navy} strokeWidth="2" />
        ))}
      </Tile>
      <Tile x={3} y={1} i={4} bg={C.sun}>
        <path className="hp-shape" d="M100 100 V30 A70 70 0 0 0 30 100 Z" fill={C.navy} />
        <path d="M100 100 V30 A70 70 0 0 0 30 100 Z" fill="url(#pa-stripes)" />
      </Tile>
    </>
  );
}

/* ---- Flutter: phone, widget tree, M3 switch and FAB ---------------------- */
function FlutterArt() {
  return (
    <>
      <Tile x={0} y={0} i={0} h={2} bg={C.navy}>
        {/* phone with app bar, cards, nav bar, FAB */}
        <rect x="18" y="14" width="64" height="172" rx="12" fill={C.cream} />
        <rect x="26" y="26" width="48" height="8" rx="4" fill={C.navy} />
        {[44, 74, 104].map((y) => (
          <rect key={y} x="26" y={y} width="48" height="24" rx="6" fill="#fff" stroke={C.tint} strokeWidth="2" />
        ))}
        <rect x="18" y="160" width="64" height="26" rx="0" fill={C.tint} />
        {[30, 44, 58, 72].map((cx, k) => (
          <circle key={cx} cx={cx} cy="172" r="3.5" fill={k === 0 ? C.navy : C.sky} />
        ))}
        <rect x="54" y="132" width="20" height="20" rx="6" fill={C.coral} />
      </Tile>
      <Tile x={1} y={0} i={1} bg={C.tint}>
        {/* layered chevrons */}
        <g className="hp-shape">
          <path d="M24 50 L58 16 H84 L50 50 Z" fill={C.sky} />
          <path d="M50 50 L84 84 H58 L37 63 Z" fill={C.deep} />
          <path d="M37 63 L50 50 L63 63 L50 76 Z" fill={C.navy} />
        </g>
      </Tile>
      <Tile x={2} y={0} i={2} w={2} bg={C.cream}>
        {/* widget tree */}
        <path d="M100 30 V44 M34 44 H166 M34 44 V60 M100 44 V60 M166 44 V60" stroke={C.navy} strokeWidth="2" fill="none" />
        <rect x="64" y="12" width="72" height="18" rx="4" fill={C.navy} />
        <text x="100" y="21" fontFamily={MONO} fontSize="9" fontWeight={700} fill="#fff" textAnchor="middle" dominantBaseline="central">
          Scaffold
        </text>
        {[
          [34, "AppBar"],
          [100, "Body"],
          [166, "NavBar"],
        ].map(([cx, label]) => (
          <g key={label}>
            <rect x={(cx as number) - 30} y="60" width="60" height="18" rx="4" fill="#fff" stroke={C.navy} strokeWidth="2" />
            <text x={cx} y="69" fontFamily={MONO} fontSize="9" fontWeight={700} fill={C.navy} textAnchor="middle" dominantBaseline="central">
              {label}
            </text>
          </g>
        ))}
      </Tile>
      <Tile x={1} y={1} i={3} bg={C.peach}>
        {/* M3 switch */}
        <rect x="18" y="36" width="64" height="28" rx="14" fill={C.navy} />
        <circle className="pa-toggle" cx="68" cy="50" r="10" fill="#fff" />
      </Tile>
      <Tile x={2} y={1} i={4} bg={C.mint}>
        <rect className="hp-shape" x="28" y="28" width="44" height="44" rx="12" fill={C.navy} />
        <path d="M50 40 V60 M40 50 H60" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      </Tile>
      <Tile x={3} y={1} i={5} bg={C.coral}>
        <path d="M0 0 A100 100 0 0 1 100 100 L0 100 Z" fill="url(#pa-dots-white)" />
        <rect x="16" y="34" width="44" height="16" rx="5" fill="none" stroke="#fff" strokeWidth="2.5" />
        <rect className="hp-shape" x="40" y="58" width="44" height="16" rx="5" fill="#fff" />
      </Tile>
    </>
  );
}

/* ---- iOS: iPhone, squircle icon, toggle, Dynamic Type, sheet, glass ------ */
function IosArt() {
  const icons = [C.coral, C.sun, C.mint, C.sky, C.navy, C.peach, C.tint, C.coral, C.sun];
  return (
    <>
      <Tile x={0} y={0} i={0} h={2} bg={C.deep}>
        <rect x="16" y="10" width="68" height="180" rx="18" fill={C.cream} />
        <rect x="38" y="18" width="24" height="8" rx="4" fill={C.deep} />
        {icons.map((fill, k) => (
          <rect key={k} x={26 + (k % 3) * 18} y={40 + Math.floor(k / 3) * 18} width="13" height="13" rx="4" fill={fill} />
        ))}
        <rect x="16" y="150" width="68" height="40" rx="18" fill="#fff" fillOpacity=".9" />
        {[30, 44, 58, 72].map((cx, k) => (
          <circle key={cx} cx={cx} cy="166" r="3.5" fill={k === 0 ? C.navy : C.sky} />
        ))}
        <rect x="36" y="180" width="28" height="3" rx="1.5" fill={C.deep} />
      </Tile>
      <Tile x={1} y={0} i={1} bg={C.tint}>
        <rect className="hp-shape" x="22" y="22" width="56" height="56" rx="16" fill={C.navy} />
        <path d="M37 51 L46 60 L64 41" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </Tile>
      <Tile x={2} y={0} i={2} bg={C.sun}>
        <rect x="22" y="34" width="56" height="32" rx="16" fill={C.mint} />
        <circle className="pa-toggle" cx="62" cy="50" r="13" fill="#fff" />
      </Tile>
      <Tile x={3} y={0} i={3} bg={C.cream}>
        {/* Dynamic Type: the same letter at three sizes */}
        {[
          [22, 16],
          [46, 26],
          [76, 40],
        ].map(([x, size]) => (
          <text key={x} x={x} y="66" fontSize={size} fontWeight={700} fill={C.navy} textAnchor="middle">
            A
          </text>
        ))}
      </Tile>
      <Tile x={1} y={1} i={4} w={2} bg={C.peach}>
        {/* bottom sheet with grabber */}
        <rect x="20" y="26" width="160" height="96" rx="18" fill="#fff" />
        <rect x="88" y="34" width="24" height="5" rx="2.5" fill={C.sky} />
        {[52, 68, 84].map((y, k) => (
          <g key={y}>
            <rect x="36" y={y} width={k === 0 ? 96 : 76} height="6" rx="3" fill={k === 0 ? C.navy : C.tint} />
            <path d={`M158 ${y} l5 3 l-5 3`} fill="none" stroke={C.sky} strokeWidth="2" strokeLinecap="round" />
          </g>
        ))}
      </Tile>
      <Tile x={3} y={1} i={5} bg={C.navy}>
        {/* glass over color */}
        <circle cx="38" cy="38" r="24" fill={C.coral} />
        <circle className="hp-shape" cx="58" cy="58" r="30" fill="#fff" fillOpacity=".28" stroke="#fff" strokeOpacity=".7" strokeWidth="2" />
      </Tile>
    </>
  );
}

/* ---- Design tokens: swatches, type, radius, spacing, elevation ----------- */
function TokensArt() {
  const swatches = [C.navy, C.sky, C.tint, C.sun, C.coral];
  return (
    <>
      <Tile x={0} y={0} i={0} w={2} bg={C.cream}>
        {swatches.map((fill, k) => (
          <g key={fill}>
            <rect x={14 + k * 36} y="18" width="30" height="50" rx="6" fill={fill} stroke={fill === C.tint ? C.sky : "none"} />
            <rect x={14 + k * 36} y="74" width={k % 2 ? 18 : 24} height="4" rx="2" fill={C.navy} fillOpacity=".5" />
          </g>
        ))}
      </Tile>
      <Tile x={2} y={0} i={1} bg={C.navy}>
        <text x="50" y="54" fontSize="44" fontWeight={700} fill="#fff" textAnchor="middle" dominantBaseline="central">
          Aa
        </text>
      </Tile>
      <Tile x={3} y={0} i={2} bg={C.peach}>
        {[0, 8, 16].map((rx, k) => (
          <rect key={rx} x={14 + k * 18} y={14 + k * 18} width="36" height="36" rx={rx} fill={k === 2 ? C.navy : "none"} stroke={C.navy} strokeWidth="3" />
        ))}
      </Tile>
      <Tile x={0} y={1} i={3} bg={C.tint}>
        {/* the 4px spacing scale */}
        {[4, 8, 12, 16, 24].map((s, k) => (
          <rect key={s} className={k === 4 ? "hp-shape" : undefined} x="18" y={16 + k * 14} width={s * 2.6} height="8" rx="2" fill={k === 4 ? C.coral : C.navy} />
        ))}
      </Tile>
      <Tile x={1} y={1} i={4} bg={C.sun}>
        <Glyph size={22} fill={C.navy}>{"--sp-4"}</Glyph>
      </Tile>
      <Tile x={2} y={1} i={5} bg={C.coral}>
        <path d="M100 0 A100 100 0 0 0 0 100 L100 100 Z" fill="url(#pa-dots-white)" />
        {/* elevation steps */}
        <rect x="30" y="34" width="44" height="34" rx="6" fill={C.deep} fillOpacity=".35" />
        <rect className="hp-shape" x="24" y="26" width="44" height="34" rx="6" fill="#fff" />
      </Tile>
      <Tile x={3} y={1} i={6} bg={C.deep}>
        <path className="hp-shape" d="M0 100 V20 A80 80 0 0 1 80 100 Z" fill={C.mint} />
      </Tile>
    </>
  );
}

/* ---- Contributing: merge, puzzle piece, conversation, review, version ---- */
function ContributingArt() {
  return (
    <>
      <Tile x={0} y={0} i={0} w={2} bg={C.cream}>
        {/* a branch that merges back into main */}
        <path d="M0 70 H200" stroke={C.navy} strokeWidth="5" />
        <path d="M44 70 C64 70, 64 30, 88 30 H118 C142 30, 142 70, 162 70" fill="none" stroke={C.coral} strokeWidth="5" />
        {[24, 44, 162, 184].map((cx) => (
          <circle key={cx} cx={cx} cy="70" r="8" fill={C.navy} stroke="#fff" strokeWidth="3" />
        ))}
        {[92, 116].map((cx) => (
          <circle key={cx} cx={cx} cy="30" r="8" fill={C.coral} stroke="#fff" strokeWidth="3" />
        ))}
        <circle className="pa-pulse" cx="162" cy="70" r="13" fill="none" stroke={C.navy} strokeWidth="2" />
      </Tile>
      <Tile x={2} y={0} i={1} bg={C.navy}>
        {/* puzzle piece: the contribution that fits */}
        <path
          className="hp-shape"
          d="M26 36 H42 A9 9 0 1 1 58 36 H74 V50 A9 9 0 1 1 74 66 V80 H26 Z"
          fill={C.sun}
        />
      </Tile>
      <Tile x={3} y={0} i={2} bg={C.sun}>
        {/* conversation */}
        <path d="M14 20 H62 A6 6 0 0 1 68 26 V48 A6 6 0 0 1 62 54 H32 L22 64 V54 H20 A6 6 0 0 1 14 48 V26 A6 6 0 0 1 20 20 Z" fill={C.navy} />
        <path className="hp-shape" d="M40 50 H82 A6 6 0 0 1 88 56 V76 A6 6 0 0 1 82 82 H80 V92 L70 82 H46 A6 6 0 0 1 40 76 V56 A6 6 0 0 1 46 50 Z" fill="#fff" />
        {[54, 64, 74].map((cx) => (
          <circle key={cx} cx={cx} cy="66" r="3" fill={C.navy} />
        ))}
      </Tile>
      <Tile x={0} y={1} i={3} bg={C.tint}>
        <circle className="hp-shape" cx="50" cy="50" r="30" fill={C.coral} />
        <path d="M50 36 V64 M36 50 H64" stroke="#fff" strokeWidth="7" strokeLinecap="round" />
      </Tile>
      <Tile x={1} y={1} i={4} bg={C.peach}>
        {/* review checklist */}
        {[24, 46, 68].map((y, k) => (
          <g key={y}>
            <rect x="18" y={y} width="14" height="14" rx="3" fill={k < 2 ? C.navy : "#fff"} stroke={C.navy} strokeWidth="2" />
            {k < 2 && <path d={`M21 ${y + 7} l3 3 l5 -6`} fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />}
            <rect x="40" y={y + 4} width={k === 1 ? 32 : 42} height="6" rx="3" fill={C.navy} fillOpacity={k < 2 ? 0.35 : 0.8} />
          </g>
        ))}
      </Tile>
      <Tile x={2} y={1} i={5} bg={C.mint}>
        {/* version tag */}
        <g className="hp-shape">
          <path d="M18 36 H66 L84 50 L66 64 H18 Z" fill="#fff" />
          <circle cx="70" cy="50" r="3.5" fill={C.mint} />
          <text x="40" y="51" fontFamily={MONO} fontSize="14" fontWeight={700} fill={C.navy} textAnchor="middle" dominantBaseline="central">
            v1.5
          </text>
        </g>
      </Tile>
      <Tile x={3} y={1} i={6} bg={C.deep}>
        <path d="M0 100 A100 100 0 0 1 100 0 L100 100 Z" fill="url(#pa-dots-white)" />
        <circle className="hp-shape" cx="100" cy="100" r="36" fill={C.sky} />
      </Tile>
    </>
  );
}

/* ===========================================================================
   Foundations
   =========================================================================== */

/* Color: palette wheel, mostly-white ratio, status dots */
function ColorArt() {
  const wheel = [C.navy, C.sky, C.mint, C.sun, C.peach, C.coral];
  return (
    <>
      <Tile x={0} y={0} i={0} w={2} h={2} bg={C.cream}>
        <g className="pa-spin">
          {wheel.map((fill, k) => (
            <path key={fill} d="M100 100 L100 26 A74 74 0 0 1 164.1 63 Z" fill={fill} transform={`rotate(${k * 60} 100 100)`} />
          ))}
        </g>
        <circle cx="100" cy="100" r="30" fill="#fff" />
        <circle cx="100" cy="100" r="12" fill={C.navy} />
      </Tile>
      <Tile x={2} y={0} i={1} bg={C.navy}>
        <rect className="hp-shape" x="22" y="22" width="56" height="56" rx="10" fill={C.sky} />
        <rect x="38" y="38" width="24" height="24" rx="6" fill="#fff" />
      </Tile>
      <Tile x={3} y={0} i={2} bg={C.tint}>
        {[C.navy, C.sky, "#fff"].map((fill, k) => (
          <rect key={k} x="18" y={18 + k * 22} width="64" height="18" rx="4" fill={fill} stroke={k === 2 ? C.sky : "none"} />
        ))}
      </Tile>
      <Tile x={2} y={1} i={3} bg="#fff">
        {/* mostly white, a little navy */}
        <rect x="0" y="0" width="100" height="100" fill="#fff" />
        <rect x="0" y="70" width="100" height="30" fill={C.tint} />
        <rect className="hp-shape" x="64" y="80" width="26" height="10" rx="3" fill={C.navy} />
      </Tile>
      <Tile x={3} y={1} i={4} bg={C.peach}>
        {["#15803D", "#0A5187", "#B45309", "#C2362F", "#4A5B69"].map((fill, k) => (
          <circle key={fill} cx={22 + (k % 3) * 28} cy={k < 3 ? 38 : 66} r="9" fill={fill} />
        ))}
      </Tile>
    </>
  );
}

/* Typography: big glyph, weight steps, baseline grid */
function TypographyArt() {
  return (
    <>
      <Tile x={0} y={0} i={0} w={2} h={2} bg={C.deep}>
        {[60, 100, 140].map((y) => (
          <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="#fff" strokeOpacity=".14" strokeWidth="1" />
        ))}
        <text x="100" y="140" fontSize="120" fontWeight={600} fill="#fff" textAnchor="middle">
          Ag
        </text>
        <line x1="0" y1="140" x2="200" y2="140" stroke={C.coral} strokeWidth="2" />
      </Tile>
      <Tile x={2} y={0} i={1} bg={C.cream}>
        {[400, 500, 600].map((w, k) => (
          <text key={w} x="50" y={30 + k * 24} fontSize="18" fontWeight={w} fill={C.navy} textAnchor="middle" dominantBaseline="central">
            Noto {w}
          </text>
        ))}
      </Tile>
      <Tile x={3} y={0} i={2} bg={C.sun}>
        <text className="hp-shape" x="50" y="54" fontSize="58" fontWeight={600} fill={C.navy} textAnchor="middle" dominantBaseline="central">
          a
        </text>
      </Tile>
      <Tile x={2} y={1} i={3} bg={C.tint}>
        {/* type scale bars */}
        {[19, 16, 14, 13.5, 12].map((s, k) => (
          <rect key={k} x="16" y={16 + k * 15} width={s * 3.6} height={s / 2.2} rx="2" fill={k === 0 ? C.navy : C.sky} />
        ))}
      </Tile>
      <Tile x={3} y={1} i={4} bg={C.coral}>
        <path d="M100 0 A100 100 0 0 0 0 100 L100 100 Z" fill="url(#pa-dots-white)" />
        <Glyph size={24} fill="#fff">
          {"09:30"}
        </Glyph>
      </Tile>
    </>
  );
}

/* Iconography: keyline grid with an outline icon */
function IconographyArt() {
  return (
    <>
      <Tile x={0} y={0} i={0} w={2} h={2} bg={C.cream}>
        {/* 24-unit keyline grid drawn at 7x */}
        {Array.from({ length: 13 }, (_, k) => (
          <g key={k} stroke={C.sky} strokeOpacity=".5" strokeWidth="1">
            <line x1={16 + k * 14} y1="16" x2={16 + k * 14} y2="184" />
            <line x1="16" y1={16 + k * 14} x2="184" y2={16 + k * 14} />
          </g>
        ))}
        <circle cx="100" cy="100" r="70" fill="none" stroke={C.coral} strokeDasharray="4 4" strokeWidth="1.5" />
        {/* search glyph */}
        <circle cx="90" cy="90" r="42" fill="none" stroke={C.navy} strokeWidth="13" />
        <path d="M122 122 L156 156" stroke={C.navy} strokeWidth="13" strokeLinecap="round" />
      </Tile>
      <Tile x={2} y={0} i={1} bg={C.navy}>
        <path className="hp-shape" d="M30 52 L44 66 L72 36" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      </Tile>
      <Tile x={3} y={0} i={2} bg={C.sun}>
        {/* bell */}
        <path d="M30 62 C34 56 34 50 34 42 A16 16 0 0 1 66 42 C66 50 66 56 70 62 Z" fill="none" stroke={C.navy} strokeWidth="5" strokeLinejoin="round" />
        <path d="M44 72 A6 6 0 0 0 56 72" fill="none" stroke={C.navy} strokeWidth="5" strokeLinecap="round" />
      </Tile>
      <Tile x={2} y={1} i={3} bg={C.tint}>
        {/* calendar */}
        <rect x="24" y="28" width="52" height="48" rx="6" fill="none" stroke={C.navy} strokeWidth="5" />
        <path d="M24 44 H76 M38 20 V34 M62 20 V34" stroke={C.navy} strokeWidth="5" strokeLinecap="round" />
        <circle className="hp-shape" cx="62" cy="62" r="5" fill={C.coral} />
      </Tile>
      <Tile x={3} y={1} i={4} bg={C.peach}>
        {/* download */}
        <path d="M50 22 V60 M34 46 L50 62 L66 46 M28 76 H72" fill="none" stroke={C.navy} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </Tile>
    </>
  );
}

/* Elevation: stacked layers casting shadows */
function ElevationArt() {
  return (
    <>
      <Tile x={0} y={0} i={0} w={2} h={2} bg={C.tint}>
        {[0, 1, 2].map((k) => (
          <g key={k} className={k === 2 ? "pa-float" : undefined}>
            <rect x={40 + k * 22 + 6} y={110 - k * 34 + 8} width="96" height="60" rx="10" fill={C.deep} fillOpacity={0.12 + k * 0.06} />
            <rect x={40 + k * 22} y={110 - k * 34} width="96" height="60" rx="10" fill={k === 2 ? C.navy : "#fff"} stroke={k === 2 ? "none" : C.sky} strokeWidth="1.5" />
          </g>
        ))}
      </Tile>
      <Tile x={2} y={0} i={1} bg={C.cream}>
        <ellipse cx="50" cy="80" rx="30" ry="6" fill={C.deep} fillOpacity=".18" />
        <circle className="hp-shape" cx="50" cy="44" r="24" fill={C.coral} />
      </Tile>
      <Tile x={3} y={0} i={2} bg={C.navy}>
        <rect x="0" y="0" width="100" height="100" fill="#11202c" fillOpacity=".42" />
        <rect className="hp-shape" x="20" y="28" width="60" height="44" rx="8" fill="#fff" />
      </Tile>
      <Tile x={2} y={1} i={3} bg={C.sun}>
        <path className="hp-shape" d="M0 100 L50 20 L100 100 Z" fill={C.peach} />
        <path d="M50 20 L100 100 H64 Z" fill={C.deep} fillOpacity=".15" />
      </Tile>
      <Tile x={3} y={1} i={4} bg={C.mint}>
        <path d="M0 0 A100 100 0 0 1 100 100 L0 100 Z" fill="url(#pa-dots-white)" />
      </Tile>
    </>
  );
}

/* Shape: corner radii from sharp to round */
function ShapeArt() {
  return (
    <>
      <Tile x={0} y={0} i={0} bg={C.cream}>
        <rect className="hp-shape" x="20" y="20" width="60" height="60" rx="0" fill={C.navy} />
      </Tile>
      <Tile x={1} y={0} i={1} bg={C.tint}>
        <rect className="hp-shape" x="20" y="20" width="60" height="60" rx="8" fill={C.sky} />
      </Tile>
      <Tile x={2} y={0} i={2} bg={C.peach}>
        <rect className="hp-shape" x="20" y="20" width="60" height="60" rx="18" fill={C.coral} />
      </Tile>
      <Tile x={3} y={0} i={3} bg={C.navy}>
        <rect className="hp-shape" x="14" y="36" width="72" height="28" rx="14" fill={C.sun} />
      </Tile>
      <Tile x={0} y={1} i={4} w={2} bg={C.sun}>
        {/* corner callout */}
        <path d="M40 100 V50 A30 30 0 0 1 70 20 H200" fill="none" stroke={C.navy} strokeWidth="6" />
        <circle cx="70" cy="50" r="3" fill={C.coral} />
        <path d="M70 50 L48.8 28.8" stroke={C.coral} strokeWidth="2" strokeDasharray="3 3" />
        <text x="120" y="62" fontFamily={MONO} fontSize="18" fontWeight={700} fill={C.navy}>
          r 10
        </text>
      </Tile>
      <Tile x={2} y={1} i={5} bg={C.mint}>
        <circle className="hp-shape" cx="50" cy="50" r="30" fill="#fff" />
      </Tile>
      <Tile x={3} y={1} i={6} bg={C.deep}>
        <path className="hp-shape" d="M100 100 H20 A80 80 0 0 1 100 20 Z" fill={C.coral} />
      </Tile>
    </>
  );
}

/* Spacing: dimension lines and the 4px steps */
function SpacingArt() {
  const steps = [4, 8, 12, 16, 24, 32];
  return (
    <>
      <Tile x={0} y={0} i={0} w={2} h={2} bg={C.cream}>
        {steps.map((s, k) => (
          <g key={s}>
            <rect x="20" y={20 + k * 28} width={s * 4.6} height="16" rx="2" fill={k === 4 ? C.coral : C.navy} fillOpacity={k === 4 ? 1 : 0.2 + k * 0.14} />
            <text x={30 + s * 4.6} y={28 + k * 28} fontFamily={MONO} fontSize="11" fontWeight={700} fill={C.navy} dominantBaseline="central">
              {s}
            </text>
          </g>
        ))}
      </Tile>
      <Tile x={2} y={0} i={1} bg={C.tint}>
        {/* two boxes and the gap between them */}
        <rect x="14" y="30" width="28" height="40" rx="4" fill={C.navy} />
        <rect x="58" y="30" width="28" height="40" rx="4" fill={C.navy} />
        <path d="M42 80 H58 M42 76 V84 M58 76 V84" stroke={C.coral} strokeWidth="2.5" />
      </Tile>
      <Tile x={3} y={0} i={2} bg={C.navy}>
        {/* padding inside a card */}
        <rect x="16" y="16" width="68" height="68" rx="8" fill="none" stroke="#fff" strokeOpacity=".4" strokeDasharray="4 3" />
        <rect className="hp-shape" x="30" y="30" width="40" height="40" rx="4" fill={C.sun} />
      </Tile>
      <Tile x={2} y={1} i={3} bg={C.peach}>
        {Array.from({ length: 6 }, (_, r) =>
          Array.from({ length: 6 }, (_, c) => <circle key={`${r}${c}`} cx={15 + c * 14} cy={15 + r * 14} r="2" fill={C.navy} fillOpacity=".5" />),
        )}
        <rect className="hp-shape" x="29" y="29" width="28" height="28" fill={C.coral} fillOpacity=".85" />
      </Tile>
      <Tile x={3} y={1} i={4} bg={C.mint}>
        <path d="M100 100 V0 A100 100 0 0 0 0 100 Z" fill="url(#pa-dots-white)" />
      </Tile>
    </>
  );
}

/* Layout and grid: the app shell wireframe */
function GridArt() {
  return (
    <>
      <Tile x={0} y={0} i={0} w={3} h={2} bg={C.tint}>
        <rect x="16" y="16" width="268" height="168" rx="8" fill="#fff" />
        <rect x="16" y="16" width="268" height="22" rx="8" fill={C.navy} />
        <rect x="16" y="30" width="268" height="8" fill={C.navy} />
        <rect x="16" y="38" width="56" height="146" fill={C.deep} />
        {[52, 70, 88, 106].map((y, k) => (
          <rect key={y} x="26" y={y} width={k === 1 ? 36 : 30} height="8" rx="3" fill="#fff" fillOpacity={k === 1 ? 0.9 : 0.35} />
        ))}
        <rect x="84" y="50" width="80" height="10" rx="3" fill={C.navy} fillOpacity=".7" />
        <rect className="hp-shape" x="236" y="48" width="38" height="14" rx="4" fill={C.coral} />
        <rect x="84" y="74" width="190" height="8" rx="3" fill={C.tint} />
        {[92, 108, 124, 140, 156].map((y) => (
          <rect key={y} x="84" y={y} width="190" height="10" rx="2" fill={C.cream} />
        ))}
      </Tile>
      <Tile x={3} y={0} i={1} bg={C.sun}>
        {[0, 1, 2].map((c) => (
          <rect key={c} x={16 + c * 24} y="16" width="20" height="68" rx="3" fill={C.navy} fillOpacity={0.25 + c * 0.2} />
        ))}
      </Tile>
      <Tile x={3} y={1} i={2} bg={C.peach}>
        <rect x="14" y="20" width="28" height="60" rx="4" fill={C.navy} />
        <rect className="hp-shape" x="48" y="20" width="38" height="60" rx="4" fill="#fff" />
      </Tile>
    </>
  );
}

/* Responsive: desktop, tablet, phone */
function ResponsiveArt() {
  return (
    <>
      <Tile x={0} y={0} i={0} w={2} h={2} bg={C.cream}>
        {/* desktop */}
        <rect x="14" y="30" width="172" height="110" rx="8" fill="#fff" stroke={C.navy} strokeWidth="4" />
        <rect x="14" y="30" width="34" height="110" rx="0" fill={C.tint} />
        <rect x="58" y="44" width="56" height="84" rx="4" fill={C.sky} fillOpacity=".5" />
        <rect x="120" y="44" width="56" height="84" rx="4" fill={C.peach} />
        <path d="M84 140 L78 162 H122 L116 140" fill={C.navy} />
      </Tile>
      <Tile x={2} y={0} i={1} h={2} bg={C.tint}>
        {/* tablet: panes stack */}
        <rect x="14" y="30" width="72" height="104" rx="8" fill="#fff" stroke={C.navy} strokeWidth="4" />
        <rect x="24" y="42" width="52" height="38" rx="3" fill={C.sky} fillOpacity=".5" />
        <rect x="24" y="86" width="52" height="38" rx="3" fill={C.peach} />
      </Tile>
      <Tile x={3} y={0} i={2} h={2} bg={C.navy}>
        {/* phone: one column */}
        <rect className="pa-float" x="28" y="44" width="44" height="80" rx="9" fill="#fff" />
        {[56, 72, 88, 104].map((y) => (
          <rect key={y} x="35" y={y} width="30" height="10" rx="2" fill={y === 56 ? C.coral : C.tint} />
        ))}
        <circle cx="0" cy="200" r="54" fill={C.sun} />
      </Tile>
    </>
  );
}

/* Accessibility: focus ring, contrast, keyboard */
function AccessibilityArt() {
  return (
    <>
      <Tile x={0} y={0} i={0} w={2} bg={C.cream}>
        {/* focused button with ring */}
        <rect x="40" y="30" width="120" height="40" rx="8" fill={C.navy} />
        <rect className="pa-pulse" x="34" y="24" width="132" height="52" rx="12" fill="none" stroke={C.navy} strokeWidth="3" />
        <rect x="64" y="46" width="72" height="8" rx="4" fill="#fff" />
      </Tile>
      <Tile x={2} y={0} i={1} bg={C.navy}>
        {/* contrast pair */}
        <text x="50" y="52" fontSize="40" fontWeight={700} fill="#fff" textAnchor="middle" dominantBaseline="central">
          4.5
        </text>
      </Tile>
      <Tile x={3} y={0} i={2} bg={C.sun}>
        {/* tab key */}
        <rect className="hp-shape" x="16" y="30" width="68" height="40" rx="8" fill="#fff" stroke={C.navy} strokeWidth="3" />
        <path d="M30 50 H62 M54 42 L62 50 L54 58 M68 40 V60" fill="none" stroke={C.navy} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </Tile>
      <Tile x={0} y={1} i={3} bg={C.tint}>
        {/* touch target */}
        <rect x="18" y="18" width="64" height="64" rx="8" fill="none" stroke={C.coral} strokeWidth="2" strokeDasharray="4 3" />
        <circle className="hp-shape" cx="50" cy="50" r="14" fill={C.navy} />
      </Tile>
      <Tile x={1} y={1} i={4} bg={C.peach}>
        {/* screen-reader sound waves */}
        <path d="M24 42 H34 L48 30 V70 L34 58 H24 Z" fill={C.navy} />
        <path d="M58 40 A14 14 0 0 1 58 60 M66 32 A24 24 0 0 1 66 68" fill="none" stroke={C.navy} strokeWidth="4" strokeLinecap="round" />
      </Tile>
      <Tile x={2} y={1} i={5} bg={C.mint}>
        <circle cx="50" cy="50" r="30" fill="#fff" />
        <path className="hp-shape" d="M36 51 L46 61 L66 40" fill="none" stroke={C.navy} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      </Tile>
      <Tile x={3} y={1} i={6} bg={C.deep}>
        <path d="M0 100 A100 100 0 0 1 100 0 L100 100 Z" fill="url(#pa-dots-white)" />
      </Tile>
    </>
  );
}

/* Interaction states: one button through its states */
function StatesArt() {
  const states = [
    { bg: "#fff", stroke: C.navy, op: 1 },
    { bg: C.tint, stroke: C.navy, op: 1 },
    { bg: C.navy, stroke: C.navy, op: 1 },
    { bg: "#fff", stroke: C.navy, op: 0.45 },
  ];
  return (
    <>
      <Tile x={0} y={0} i={0} w={4} bg={C.cream}>
        {states.map((s, k) => (
          <g key={k} opacity={s.op}>
            <rect x={22 + k * 96} y="34" width="76" height="32" rx="8" fill={s.bg} stroke={s.stroke} strokeWidth="2.5" />
            <rect x={40 + k * 96} y="47" width="40" height="6" rx="3" fill={k === 2 ? "#fff" : C.navy} />
          </g>
        ))}
        <rect x="114" y="28" width="88" height="44" rx="12" fill="none" stroke={C.coral} strokeWidth="2" strokeDasharray="4 3" />
      </Tile>
      <Tile x={0} y={1} i={1} bg={C.navy}>
        {/* pointer */}
        <path className="pa-nudge" d="M34 22 V74 L47 61 L56 81 L65 77 L56 57 H74 Z" fill="#fff" />
      </Tile>
      <Tile x={1} y={1} i={2} bg={C.tint}>
        {/* loading */}
        <circle cx="50" cy="50" r="22" fill="none" stroke={C.sky} strokeWidth="7" />
        <path className="pa-spin-sm" d="M50 28 A22 22 0 0 1 72 50" fill="none" stroke={C.navy} strokeWidth="7" strokeLinecap="round" />
      </Tile>
      <Tile x={2} y={1} i={3} bg={C.sun}>
        {/* selected checkbox */}
        <rect className="hp-shape" x="30" y="30" width="40" height="40" rx="6" fill={C.navy} />
        <path d="M39 51 L47 59 L62 42" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </Tile>
      <Tile x={3} y={1} i={4} bg={C.peach}>
        {/* empty state */}
        <rect x="24" y="30" width="52" height="40" rx="6" fill="none" stroke={C.navy} strokeWidth="3" strokeDasharray="5 4" />
        <circle className="hp-shape" cx="50" cy="50" r="6" fill={C.coral} />
      </Tile>
    </>
  );
}

/* Motion: easing curve and a moving dot */
function MotionArt() {
  return (
    <>
      <Tile x={0} y={0} i={0} w={2} h={2} bg={C.deep}>
        {[40, 80, 120, 160].map((v) => (
          <g key={v} stroke="#fff" strokeOpacity=".1">
            <line x1={v} y1="20" x2={v} y2="180" />
            <line x1="20" y1={v} x2="180" y2={v} />
          </g>
        ))}
        {/* cubic-bezier(.22, 1, .36, 1) in a 160 box */}
        <path d="M20 180 C55.2 20, 77.6 20, 180 20" fill="none" stroke={C.sun} strokeWidth="5" strokeLinecap="round" />
        <line x1="20" y1="180" x2="55.2" y2="20" stroke={C.coral} strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="180" y1="20" x2="77.6" y2="20" stroke={C.coral} strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="55.2" cy="20" r="5" fill={C.coral} />
        <circle cx="77.6" cy="20" r="5" fill={C.coral} />
      </Tile>
      <Tile x={2} y={0} i={1} w={2} bg={C.cream}>
        <line x1="20" y1="50" x2="180" y2="50" stroke={C.tint} strokeWidth="8" strokeLinecap="round" />
        <circle className="pa-glide" cx="20" cy="50" r="13" fill={C.navy} />
      </Tile>
      <Tile x={2} y={1} i={2} bg={C.tint}>
        {/* bottom sheet rising */}
        <rect className="pa-float" x="14" y="44" width="72" height="70" rx="14" fill="#fff" />
        <rect x="40" y="52" width="20" height="4" rx="2" fill={C.sky} />
      </Tile>
      <Tile x={3} y={1} i={3} bg={C.coral}>
        {/* stopwatch */}
        <circle cx="50" cy="54" r="26" fill="none" stroke="#fff" strokeWidth="5" />
        <path d="M44 22 H56 M50 22 V28" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
        <path className="pa-spin-sm" style={{ transformOrigin: "50px 54px" }} d="M50 54 V38" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
      </Tile>
    </>
  );
}

/* Content and writing: speech, text lines, quote */
function ContentArt() {
  return (
    <>
      <Tile x={0} y={0} i={0} w={2} bg={C.cream}>
        {/* a short, clear message */}
        <rect x="18" y="22" width="164" height="56" rx="10" fill="#fff" stroke={C.sky} strokeWidth="2" />
        <rect x="32" y="36" width="96" height="8" rx="4" fill={C.navy} />
        <rect x="32" y="52" width="130" height="6" rx="3" fill={C.sky} />
        <rect x="32" y="64" width="80" height="6" rx="3" fill={C.sky} />
        <rect x="140" y="32" width="30" height="16" rx="4" fill={C.coral} />
      </Tile>
      <Tile x={2} y={0} i={1} bg={C.navy}>
        <text x="50" y="62" fontSize="72" fontWeight={700} fill={C.sun} textAnchor="middle">
          “
        </text>
      </Tile>
      <Tile x={3} y={0} i={2} bg={C.tint}>
        <text className="hp-shape" x="50" y="52" fontSize="34" fontWeight={600} fill={C.navy} textAnchor="middle" dominantBaseline="central">
          Aa
        </text>
      </Tile>
      <Tile x={0} y={1} i={3} bg={C.sun}>
        {/* verb-first label */}
        <rect x="14" y="36" width="72" height="28" rx="7" fill={C.navy} />
        <text x="50" y="51" fontSize="11" fontWeight={600} fill="#fff" textAnchor="middle" dominantBaseline="central">
          Save schedule
        </text>
      </Tile>
      <Tile x={1} y={1} i={4} bg={C.peach}>
        {/* writing pen */}
        <path className="hp-shape" d="M28 72 L32 58 L64 26 L74 36 L42 68 Z" fill={C.navy} />
        <path d="M24 80 H76" stroke={C.navy} strokeWidth="3" strokeLinecap="round" />
      </Tile>
      <Tile x={2} y={1} i={5} bg={C.mint}>
        {/* speech bubble */}
        <path d="M18 24 H82 A6 6 0 0 1 88 30 V62 A6 6 0 0 1 82 68 H40 L26 80 V68 H18 A6 6 0 0 1 12 62 V30 A6 6 0 0 1 18 24 Z" fill="#fff" />
        {[38, 50, 62].map((cx) => (
          <circle key={cx} cx={cx} cy="46" r="4" fill={C.navy} />
        ))}
      </Tile>
      <Tile x={3} y={1} i={6} bg={C.deep}>
        <path d="M0 0 A100 100 0 0 1 100 100 L0 100 Z" fill="url(#pa-dots-white)" />
      </Tile>
    </>
  );
}

const ART = {
  color: ColorArt,
  typography: TypographyArt,
  iconography: IconographyArt,
  elevation: ElevationArt,
  shape: ShapeArt,
  spacing: SpacingArt,
  grid: GridArt,
  responsive: ResponsiveArt,
  accessibility: AccessibilityArt,
  states: StatesArt,
  motion: MotionArt,
  content: ContentArt,
  contributing: ContributingArt,
  introduction: Introduction,
  principles: Principles,
  designing: Designing,
  developing: Developing,
  react: ReactArt,
  flutter: FlutterArt,
  ios: IosArt,
  tokens: TokensArt,
};

export type PageArtKind = keyof typeof ART;

export function PageArt({ kind }: { kind: PageArtKind }) {
  const Art = ART[kind];
  return (
    <ArtFrame>
      <Art />
    </ArtFrame>
  );
}

/** The 400 × 200 tile canvas, shared by page art and component art. */
export function ArtFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-art">
      <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        <defs>
          <Dots id="pa-dots-white" color="#fff" />
          <pattern id="pa-stripes" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(-20)">
            <line x1="0" y1="0" x2="6" y2="0" stroke="#fff" strokeOpacity=".35" strokeWidth="1" />
          </pattern>
        </defs>
        {children}
      </svg>
    </div>
  );
}
