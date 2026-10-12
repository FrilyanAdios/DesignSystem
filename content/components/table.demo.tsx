"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Ic } from "@/components/demo/Ic";
import { SR_ROWS, STATE, fmt, type Row } from "./table.data";
import { FRAME_STYLE, SR_REGISTER_CSS } from "./table.styles";

/* ---------------------------------------------------------------------------
   Interactive Service Report register: sort by any column, pick rows, and
   the selection bar appears under the table, above the pager.
   Markup mirrors sr/sr-columns.js (srTh, srTickHead, srTickCell, cells) and
   sr/sr-list.js (srBulkBar, srPagination). Rows are the first transcribed
   rows of sr/sr-data.js.
   --------------------------------------------------------------------------- */

type Col = { k: keyof Row; label: string; w: number; center?: boolean; pin?: boolean; val: (r: Row) => string };

/* widths from sr/sr-columns.js › SR_COLUMNS */
const COLS: Col[] = [
  { k: "no", label: "Service Report No", w: 168, val: (r) => r.no.slice(-7) + r.no.slice(0, 4) },
  { k: "account", label: "Company Name", w: 260, val: (r) => r.account },
  { k: "safe", label: "Unit Safe To Use", w: 140, center: true, val: (r) => `${r.safe[0]}/${r.safe[1]}` },
  { k: "chargeable", label: "Chargeable", w: 118, center: true, val: (r) => (r.chargeable ? "1" : "0") },
  { k: "followUp", label: "Follow-up Required", w: 160, center: true, val: (r) => (r.followUp ? "1" : "0") },
  { k: "date", label: "Date of Service", w: 154, val: (r) => r.date },
  { k: "by", label: "Created By", w: 176, val: (r) => r.by },
  { k: "status", label: "Schedule Status", w: 168, center: true, pin: true, val: (r) => r.status },
];

const DESC_FIRST = new Set<keyof Row>(["no", "date"]);

function Yes({ v }: { v: boolean }) {
  return v ? (
    <span className="sr-tick yes" role="img" aria-label="Yes">
      <Ic n="checkmini" s={15} />
    </span>
  ) : (
    <span className="sr-tick no" role="img" aria-label="No">
      <Ic n="x" s={15} />
    </span>
  );
}

function Cell({ c, r }: { c: Col; r: Row }) {
  switch (c.k) {
    case "no":
      return <span className="sr-no">{r.no}</span>;
    case "account":
      return (
        <span className="sr-1line" title={r.account}>
          {r.account}
        </span>
      );
    case "safe": {
      const ok = r.safe[0] === r.safe[1];
      return (
        <span className={`sr-frac${ok ? "" : " short"}`} title={`${r.safe[0]} of ${r.safe[1]} unit${r.safe[1] === 1 ? "" : "s"} released back to the customer`}>
          {r.safe[0]}/{r.safe[1]}
        </span>
      );
    }
    case "chargeable":
      return <Yes v={r.chargeable} />;
    case "followUp":
      return <Yes v={r.followUp} />;
    case "date":
      return <span className="sr-nowrap">{fmt(r.date)}</span>;
    case "by":
      return <span title={r.by}>{r.by}</span>;
    case "status": {
      const s = STATE[r.status];
      return (
        <button
          type="button"
          className={`statectl b-${s.pill}`}
          aria-haspopup="dialog"
          aria-label={`Schedule status: ${s.label}. Open the schedule card`}
          onClick={(e) => e.stopPropagation()}
        >
          <span className="d" />
          {s.label}
          <Ic n="down" s={14} />
        </button>
      );
    }
  }
  return null;
}

function HeadCheckbox({ on, some, onChange }: { on: boolean; some: boolean; onChange: (v: boolean) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = some;
  }, [some]);
  return (
    <input
      ref={ref}
      type="checkbox"
      checked={on}
      data-some={some ? "1" : undefined}
      aria-label="Select every report on this page"
      onChange={(e) => onChange(e.target.checked)}
    />
  );
}

export function RegisterDemo({ initialPicked = [] as string[] }: { initialPicked?: string[] }) {
  const [sort, setSort] = useState<{ k: keyof Row; dir: "asc" | "desc" }>({ k: "no", dir: "desc" });
  const [picked, setPicked] = useState<Set<string>>(() => new Set(initialPicked));

  const rows = useMemo(() => {
    const col = COLS.find((c) => c.k === sort.k)!;
    const d = sort.dir === "asc" ? 1 : -1;
    return [...SR_ROWS].sort((a, b) => {
      const x = col.val(a).toLowerCase();
      const y = col.val(b).toLowerCase();
      return x < y ? -d : x > y ? d : 0;
    });
  }, [sort]);

  const sortBy = (k: keyof Row) =>
    setSort((s) => (s.k === k ? { k, dir: s.dir === "asc" ? "desc" : "asc" } : { k, dir: DESC_FIRST.has(k) ? "desc" : "asc" }));

  const pick = (no: string, on: boolean) =>
    setPicked((p) => {
      const n = new Set(p);
      if (on) n.add(no);
      else n.delete(no);
      return n;
    });

  const all = rows.every((r) => picked.has(r.no));
  const some = !all && rows.some((r) => picked.has(r.no));
  const n = picked.size;
  const minWidth = COLS.reduce((w, c) => w + c.w, 0) + 64;

  return (
    <div style={FRAME_STYLE}>
      <style>{SR_REGISTER_CSS}</style>
      <div className="sr-table-scroll" role="region" aria-label="Service reports, scrolls sideways" tabIndex={0} style={{ maxHeight: 360 }}>
        <table className="sr-table" aria-label="Service reports" style={{ minWidth }}>
          <colgroup>
            <col style={{ width: 64 }} />
            {COLS.map((c) => (
              <col key={c.k} style={{ width: c.w }} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <th scope="col" className="sr-tick">
                <label className="sr-ck">
                  <HeadCheckbox
                    on={all}
                    some={some}
                    onChange={(v) => setPicked((p) => {
                      const next = new Set(p);
                      rows.forEach((r) => (v ? next.add(r.no) : next.delete(r.no)));
                      return next;
                    })}
                  />
                </label>
              </th>
              {COLS.map((c) => {
                const on = sort.k === c.k;
                return (
                  <th
                    key={c.k}
                    scope="col"
                    className={`sortable${c.center ? " ctr" : ""}${c.pin ? " pin" : ""}${on ? " on" : ""}`}
                    aria-sort={on ? (sort.dir === "asc" ? "ascending" : "descending") : "none"}
                  >
                    <button
                      type="button"
                      className="th-in"
                      title={`Sort by ${c.label}`}
                      onClick={() => sortBy(c.k)}
                      style={{ width: "100%", font: "inherit", color: "inherit", textAlign: "inherit" }}
                    >
                      <span className="th-t">{c.label}</span>
                      <span className="sar">
                        <Ic n={on ? (sort.dir === "asc" ? "up" : "down") : "sort"} s={12} />
                      </span>
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.no} className={picked.has(r.no) ? "picked" : undefined}>
                <td className="sr-tick">
                  <label className="sr-ck" onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" checked={picked.has(r.no)} aria-label={`Select ${r.no}`} onChange={(e) => pick(r.no, e.target.checked)} />
                  </label>
                </td>
                {COLS.map((c) => (
                  <td key={c.k} className={`${c.center ? "ctr" : ""}${c.pin ? " pin" : ""}`.trim() || undefined}>
                    <Cell c={c} r={r} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {n > 0 && (
        <div className="sr-bulk" role="region" aria-label="Selected reports">
          <span className="sr-bulk-n" role="status">
            <Ic n="checkmini" s={14} />
            <b>{n}</b> report{n === 1 ? "" : "s"} selected
          </span>
          <div className="sp" />
          <button type="button" className="btn btn-sm">
            <Ic n="mail" s={14} />
            Email
          </button>
          <button type="button" className="btn btn-sm export-btn">
            <Ic n="download" s={14} />
            Export selected ({n})
          </button>
          <button type="button" className="btn btn-sm btn-primary">
            <Ic n="download" s={14} />
            Download {n} report{n === 1 ? "" : "s"}
          </button>
          <button type="button" className="sr-bulk-x" aria-label="Clear the selection" onClick={() => setPicked(new Set())}>
            <Ic n="x" s={14} />
          </button>
        </div>
      )}

      <div className="sr-foot">
        <span className="lbl">Rows per page</span>
        <select className="finp" aria-label="Rows per page" defaultValue="20">
          <option>20</option>
          <option>50</option>
          <option>100</option>
        </select>
        <div className="sr-pg">
          <button type="button" disabled aria-label="Previous page">
            <Ic n="cleft" s={15} />
          </button>
          <button type="button" className="on" aria-current="page">
            1
          </button>
          <button type="button" disabled aria-label="Next page">
            <Ic n="cright" s={15} />
          </button>
        </div>
        <label className="sr-goto">
          <span className="lbl">Go to</span>
          <input className="finp" inputMode="numeric" defaultValue="1" aria-label="Go to page" />
        </label>
        <div className="sp" />
        <span className="sr-total">
          Showing <b>1–{rows.length}</b> of <b>{rows.length}</b> · Esco Zimbabwe
        </span>
      </div>
    </div>
  );
}
