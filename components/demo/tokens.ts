import { loadProductCss } from "./ProductDemo";

/* ---------------------------------------------------------------------------
   Reverse token lookup: a computed color from the product stylesheet back to
   the token name a developer should type. Built from the :host blocks of
   public/product/fsm.css (the product's :root, renamed for the shadow root).
   --------------------------------------------------------------------------- */

/** When several tokens share a value, the earliest name here wins. */
const PREFERRED = [
  "--primary", "--primary-700", "--primary-50", "--primary-75", "--primary-100",
  "--fg", "--fg-2", "--fg-3", "--fg-4",
  "--muted", "--muted-2", "--surface-2", "--row-hover", "--row-sel", "--row-sel-hover",
  "--border", "--border-2", "--border-input", "--border-hover", "--border-dash",
  "--issued-bg", "--issued-fg", "--approved-bg", "--approved-fg", "--revision-bg", "--revision-fg",
  "--rejected-bg", "--rejected-fg", "--pending-bg", "--pending-fg",
  "--error", "--error-bg", "--error-line", "--error-700", "--success", "--warning", "--info", "--neutral",
  "--navy", "--navy-2", "--navy-active", "--navy-border", "--ink", "--scrim", "--hairline", "--icon-quiet",
];

const norm = (v: string) => {
  let s = v.trim().toLowerCase().replace(/\s+/g, "");
  const short = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/.exec(s);
  if (short) s = `#${short[1]}${short[1]}${short[2]}${short[2]}${short[3]}${short[3]}`;
  return s.replace(/(,)0\./g, "$1.");
};

let map: Promise<Map<string, string[]>> | null = null;
export function loadTokenMap() {
  map ??= loadProductCss().then((css) => {
    const out = new Map<string, string[]>();
    for (const block of css.matchAll(/:host\s*\{([^}]*)\}/g)) {
      for (const [, name, value] of block[1].matchAll(/(--[\w-]+)\s*:\s*([^;]+)/g)) {
        const v = norm(value);
        if (!/^(#[0-9a-f]{6}|rgba?\()/.test(v)) continue;
        out.set(v, [...(out.get(v) ?? []), name]);
      }
    }
    for (const names of out.values()) {
      names.sort((a, b) => {
        const ia = PREFERRED.indexOf(a), ib = PREFERRED.indexOf(b);
        return (ia < 0 ? 999 : ia) - (ib < 0 ? 999 : ib) || a.localeCompare(b);
      });
    }
    return out;
  });
  return map;
}

export type Paint = { css: string; hex: string; alpha: number; token?: string; /** other tokens with the same value */ also?: string[] };

/** Turns a computed color ("rgb(0, 70, 127)") into hex plus its token, if any. */
export function readPaint(computed: string, tokens: Map<string, string[]>): Paint | null {
  const m = /rgba?\(([^)]+)\)/.exec(computed);
  if (!m) return null;
  const [r, g, b, a = "1"] = m[1].split(/[\s,/]+/).filter(Boolean);
  const alpha = parseFloat(a);
  if (alpha === 0) return null;
  const hex = "#" + [r, g, b].map((n) => Math.round(parseFloat(n)).toString(16).padStart(2, "0")).join("");
  const key = alpha < 1 ? norm(`rgba(${r},${g},${b},${a})`) : hex;
  const names = tokens.get(key) ?? [];
  const token = hex === "#ffffff" && alpha === 1 ? "white" : names[0];
  const also = names.filter((n) => n !== token).slice(0, 2);
  return { css: computed, hex: hex.toUpperCase(), alpha, token, also: also.length ? also : undefined };
}
