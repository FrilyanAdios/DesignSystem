"use client";

import { useState } from "react";
import { Ic } from "@/components/demo/Ic";

/* ---------------------------------------------------------------------------
   Live register pagination for the Pagination page.
   Markup and logic follow NPD-FSM/sr/sr-list.js › srPagination (page window,
   Go to, rows per page, total) and script.js › queuePaginationHTML (narrow
   rail). The footer rules live in sr/sr.css, which the demo stylesheet does
   not include, so SR_CSS carries them verbatim (final cascade) into the
   shadow root.
   Accessibility additions: the page controls are a labelled <nav>, the
   current page has aria-current="page" (as script.js's register footers do),
   and a polite status announces the new range.
   --------------------------------------------------------------------------- */

const SR_CSS = `
.sr-foot{display:flex;align-items:center;gap:8px;position:relative;min-height:58px;margin:0;padding:9px var(--gutter);border:0;border-top:1px solid var(--border);background:#fff;flex-wrap:wrap}
.sr-foot .sp{margin-left:auto}
.sr-pg{display:flex;align-items:center;gap:3px}
.sr-pg button{min-width:40px;height:var(--h-sm);min-height:40px;padding:0 8px;border-radius:var(--radius-control);font-size:12.5px;font-weight:500;color:var(--fg-2);border:1px solid transparent}
.sr-pg button:hover:not(:disabled){background:var(--muted-2)}
.sr-pg button.on{background:var(--primary);color:#fff}
.sr-pg button:disabled{opacity:.4;cursor:default}
.sr-foot .lbl{font-size:12px;color:var(--fg-3)}
.sr-foot select.finp{height:var(--h-sm);min-height:40px;font-size:12.5px;width:auto;padding:0 30px 0 10px}
.sr-goto{display:flex;align-items:center;gap:8px}
.sr-goto input.finp{width:60px;height:var(--h-sm);min-height:40px;font-size:12.5px;text-align:center;padding:0 6px;font-variant-numeric:tabular-nums}
.sr-total{font-size:11.5px;color:var(--fg-3);white-space:nowrap;font-variant-numeric:tabular-nums}
.sr-total b{font-weight:600;color:var(--fg-2)}
.sr-foot .sr-pg{margin-left:6px}.sr-foot .sr-total{margin-left:8px}
@media(max-width:900px){.sr-foot{flex-wrap:nowrap;overflow-x:auto;min-height:68px}}
@media(max-width:600px){.sr-goto{display:none}}
`;

/** sr/sr.css footer rules. Render once inside a demo that uses .sr-foot or .sr-pg. */
export const SrStyles = () => <style>{SR_CSS}</style>;

const SIZES = [10, 20, 25, 50, 100];

/** Service Report register footer. */
export function PaginationDemo({
  total = 415,
  startPage = 1,
  entity,
  goTo = true,
}: {
  total?: number;
  startPage?: number;
  entity?: string;
  goTo?: boolean;
}) {
  const [per, setPer] = useState(20);
  const [page, setPage] = useState(startPage);
  const [draft, setDraft] = useState(String(startPage));

  const pages = Math.max(1, Math.ceil(total / per));
  const p = Math.min(page, pages);
  const firstRow = total ? (p - 1) * per + 1 : 0;
  const lastRow = Math.min(p * per, total);
  const from = Math.max(1, Math.min(p - 3, pages - 6));
  const to = Math.min(pages, from + 6);
  const nums: number[] = [];
  for (let i = from; i <= to; i++) nums.push(i);

  const go = (n: number) => {
    const next = Math.min(Math.max(1, n), pages);
    setPage(next);
    setDraft(String(next));
  };
  const goDraft = () => {
    const n = parseInt(draft, 10);
    if (n) go(n);
    else setDraft(String(p));
  };
  const num = (n: number) => (
    <button
      key={n}
      type="button"
      className={n === p ? "on" : ""}
      aria-current={n === p ? "page" : undefined}
      onClick={() => go(n)}
    >
      {n}
    </button>
  );

  return (
    <div style={{ width: "100%" }}>
      <SrStyles />
      <div className="sr-foot">
        <span className="lbl" aria-hidden="true">
          Rows per page
        </span>
        <select
          className="finp"
          aria-label="Rows per page"
          value={per}
          onChange={(e) => {
            setPer(+e.target.value);
            go(1);
          }}
        >
          {SIZES.map((n) => (
            <option key={n}>{n}</option>
          ))}
        </select>
        <nav className="sr-pg" aria-label="Pagination">
          <button type="button" disabled={p === 1} aria-label="Previous page" onClick={() => go(p - 1)}>
            <Ic n="cleft" s={15} />
          </button>
          {from > 1 && (
            <>
              {num(1)}
              <span className="lbl" aria-hidden="true">
                …
              </span>
            </>
          )}
          {nums.map(num)}
          {to < pages && (
            <>
              <span className="lbl" aria-hidden="true">
                …
              </span>
              {num(pages)}
            </>
          )}
          <button type="button" disabled={p === pages} aria-label="Next page" onClick={() => go(p + 1)}>
            <Ic n="cright" s={15} />
          </button>
        </nav>
        {goTo && (
          <label className="sr-goto">
            <span className="lbl">Go to</span>
            <input
              className="finp"
              inputMode="numeric"
              aria-label="Go to page"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && goDraft()}
              onBlur={goDraft}
            />
          </label>
        )}
        <div className="sp" />
        <span className="sr-total">
          Showing{" "}
          <b>
            {firstRow}–{lastRow}
          </b>{" "}
          of <b>{total}</b>
          {entity ? ` · ${entity}` : ""}
        </span>
        <span className="sr-only" role="status" aria-live="polite">
          {`Page ${p} of ${pages}, rows ${firstRow} to ${lastRow} of ${total}`}
        </span>
      </div>
    </div>
  );
}

/** Narrow rail: visible range, current / total, previous and next. */
export function RailPaginationDemo({ total = 23, size = 5 }: { total?: number; size?: number }) {
  const [page, setPage] = useState(1);
  const pages = Math.max(1, Math.ceil(total / size));
  const start = total ? (page - 1) * size + 1 : 0;
  const end = Math.min(page * size, total);
  const go = (n: number) => setPage(Math.min(Math.max(1, n), pages));
  return (
    <div
      style={{
        width: 320,
        background: "#fff",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-card)",
        overflow: "hidden",
      }}
    >
      <SrStyles />
      <nav className="wo-queue-pagination" aria-label="Work order pagination">
        <span>
          {start}–{end} of {total}
        </span>
        <div className="sr-pg">
          <button
            type="button"
            disabled={page === 1}
            aria-label="Previous work order page"
            onClick={() => go(page - 1)}
          >
            <Ic n="cleft" s={15} />
          </button>
          <span className="wo-page-label">
            {page} / {pages}
          </span>
          <button
            type="button"
            disabled={page === pages}
            aria-label="Next work order page"
            onClick={() => go(page + 1)}
          >
            <Ic n="cright" s={15} />
          </button>
        </div>
      </nav>
    </div>
  );
}
