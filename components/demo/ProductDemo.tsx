"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/* ---------------------------------------------------------------------------
   Renders children inside a shadow root that adopts the real FSM stylesheet
   (public/product/fsm.css, synced by scripts/sync-product.mjs). The product's
   `.btn`, `.navbar`, `.modal` … never meet the documentation site's classes.
   One CSSStyleSheet is shared by every demo on the page.
   --------------------------------------------------------------------------- */

const HOST_CSS = `
:host { display: block; --font: var(--font-noto), "Noto Sans", system-ui, -apple-system, sans-serif; }
.stage {
  position: relative;
  transform: translateZ(0);          /* contains position:fixed overlays */
  font-family: var(--font); color: var(--fg); font-size: 14px; line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  text-align: left;
}
.stage.pad { padding: 32px; }
.stage.center { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 12px; }
.stage.row { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
.stage.stack { display: flex; flex-direction: column; align-items: flex-start; gap: 16px; }
.stage.muted { background: var(--muted); }
.stage.white { background: #fff; }
`;

let cssText: Promise<string> | null = null;
/** The product stylesheet as text, fetched once per page. */
export function loadProductCss() {
  cssText ??= fetch("/product/fsm.css").then((r) => r.text());
  return cssText;
}

let sheets: Promise<CSSStyleSheet[]> | null = null;
function loadSheets() {
  sheets ??= loadProductCss()
    .then((text) => {
      const product = new CSSStyleSheet();
      product.replaceSync(text);
      const host = new CSSStyleSheet();
      host.replaceSync(HOST_CSS);
      return [product, host];
    });
  return sheets;
}

export type StageLayout = "center" | "row" | "stack" | "none";

export function ProductDemo({
  children,
  layout = "center",
  bg = "muted",
  pad = true,
  minHeight,
  label,
}: {
  children: React.ReactNode;
  layout?: StageLayout;
  bg?: "muted" | "white";
  pad?: boolean;
  minHeight?: number;
  /** names the region for assistive technology, e.g. "Primary button example" */
  label?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [mount, setMount] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const root = host.shadowRoot ?? host.attachShadow({ mode: "open" });
    let alive = true;
    loadSheets().then((s) => {
      if (!alive) return;
      root.adoptedStyleSheets = s;
      let el = root.querySelector<HTMLElement>(".stage");
      if (!el) {
        el = document.createElement("div");
        el.className = "stage"; // before children mount, so .stage-scoped rules apply on first measure
        root.appendChild(el);
      }
      setMount(el);
    });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!mount) return;
    mount.className = ["stage", layout !== "none" && layout, bg, pad && "pad"].filter(Boolean).join(" ");
    if (minHeight) mount.style.minHeight = `${minHeight}px`;
  }, [mount, layout, bg, pad, minHeight]);

  // A preview beside the page title shrinks to fit its box instead of clipping.
  // Examples in the page body keep real size and scroll, like the product.
  useEffect(() => {
    const host = hostRef.current;
    if (!mount || !host?.closest(".page-preview")) return;
    const fit = () => {
      mount.style.zoom = "";
      // fixed-position overlays don't count in scrollWidth, so measure every box
      const left = mount.getBoundingClientRect().left;
      let right = mount.scrollWidth;
      mount.querySelectorAll("*").forEach((el) => {
        right = Math.max(right, el.getBoundingClientRect().right - left);
      });
      const ratio = host.clientWidth / right;
      if (ratio < 1) mount.style.zoom = String(Math.max(ratio, 0.5));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(host);
    return () => ro.disconnect();
  }, [mount]);

  return (
    <div
      ref={hostRef}
      className="product-demo"
      role="region"
      aria-label={label}
      style={{ minHeight: minHeight ?? 96 }}
    >
      {mount && createPortal(children, mount)}
    </div>
  );
}
