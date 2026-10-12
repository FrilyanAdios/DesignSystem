"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Ic } from "@/components/demo/Ic";

/* ---------------------------------------------------------------------------
   Live checkbox demos. Visuals come from styles.css (.chk, .btn, .export-btn).
   The selection bar rules are copied from NPD-FSM/wo/wo.css (.wo-actionbar,
   .wo-export-selection, .wo-export-instruction), because demos only load
   styles.css. The table layout is demo-only and composed from tokens.
   --------------------------------------------------------------------------- */

/** A native checkbox whose mixed state is set through the DOM property. */
function Box({
  checked,
  mixed = false,
  onChange,
  label,
  ariaLabel,
  inputRef,
}: {
  checked: boolean;
  mixed?: boolean;
  onChange: (next: boolean) => void;
  label?: React.ReactNode;
  ariaLabel?: string;
  inputRef?: React.Ref<HTMLInputElement>;
}) {
  const own = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (own.current) own.current.indeterminate = mixed;
  }, [mixed]);
  return (
    <label className="chk">
      <input
        ref={(el) => {
          own.current = el;
          if (typeof inputRef === "function") inputRef(el);
          else if (inputRef) (inputRef as React.RefObject<HTMLInputElement | null>).current = el;
        }}
        type="checkbox"
        checked={checked}
        aria-label={ariaLabel}
        onChange={(e) => onChange(e.target.checked)}
      />
      {label}
    </label>
  );
}

/* ---- select all with a mixed parent -------------------------------------- */

const SECTIONS = ["Service details", "Parts used", "Engineer notes"];

export function SelectAllGroup() {
  const uid = useId();
  const [on, setOn] = useState<Set<string>>(new Set(["Service details"]));
  const all = on.size === SECTIONS.length;
  const some = on.size > 0 && !all;
  return (
    <fieldset style={{ border: 0, padding: 0, margin: 0, minWidth: 220 }} aria-labelledby={`${uid}-l`}>
      <legend id={`${uid}-l`} style={{ fontSize: "var(--fs-label)", fontWeight: 600, color: "var(--fg-2)", padding: 0 }}>
        Sections to include
      </legend>
      <Box
        checked={all}
        mixed={some}
        onChange={() => setOn(all ? new Set() : new Set(SECTIONS))}
        label="Select all sections"
      />
      <div style={{ paddingLeft: 24 }}>
        {SECTIONS.map((s) => (
          <Box
            key={s}
            checked={on.has(s)}
            onChange={(v) =>
              setOn((prev) => {
                const next = new Set(prev);
                if (v) next.add(s);
                else next.delete(s);
                return next;
              })
            }
            label={s}
          />
        ))}
      </div>
    </fieldset>
  );
}

/* ---- contextual selection for export -------------------------------------- */

const WO_CSS = `
.wo-actionbar{position:sticky;bottom:0;z-index:14;display:flex;align-items:center;gap:var(--sp-2);flex-wrap:wrap;
  background:#fff;color:var(--fg);border:1px solid var(--border);border-radius:var(--radius-card);padding:var(--sp-2) var(--sp-4);box-shadow:var(--shadow-lg);
  margin:var(--sp-3) var(--gutter) 0}
.wo-actionbar .spacer{margin-left:auto}
.wo-actionbar .btn-ghost{color:var(--fg-2);border-color:var(--border)}
.wo-actionbar .btn-ghost:hover{background:var(--muted)}
.wo-export-selection{border-radius:0;margin:0;padding:var(--sp-3) var(--gutter);box-shadow:none;background:var(--primary-50)}
.wo-export-instruction{display:flex;align-items:center;gap:var(--sp-2);min-width:260px;color:var(--primary-700)}
.wo-export-instruction>span{display:flex;flex-direction:column;gap:2px}.wo-export-instruction b{font-size:var(--fs-sub);font-weight:600}.wo-export-instruction small{font-size:var(--fs-help);color:var(--fg-3)}
.wo-td-sel .chk,.wo-th-sel .chk{display:inline-flex;justify-content:center;vertical-align:middle;width:var(--h-lg);min-height:var(--h-lg);margin:0;cursor:pointer}
/* demo layout only */
.xd{background:#fff;border:1px solid var(--border);border-radius:var(--radius-card);overflow:hidden;width:100%}
.xd-tools{display:flex;align-items:center;gap:var(--sp-2);padding:var(--sp-3) var(--sp-4);border-bottom:1px solid var(--border)}
.xd-tools .t{font-size:var(--fs-card);font-weight:600;color:var(--fg)}
.xd-tools .spacer{margin-left:auto}
.xd table{width:100%;border-collapse:collapse;font-size:var(--fs-body)}
.xd th{height:40px;padding:0 var(--sp-3);background:var(--muted);font-size:var(--fs-label);font-weight:600;color:var(--fg-2);text-align:left;border-bottom:1px solid var(--border)}
.xd td{height:48px;padding:0 var(--sp-3);color:var(--fg-2);border-bottom:1px solid var(--border-2)}
.xd td b{color:var(--fg);font-weight:600}
.xd tr.sel td{background:var(--row-sel)}
.xd .wo-th-sel,.xd .wo-td-sel{width:64px;text-align:center;padding:0 var(--sp-3)}
`;

const ROWS = [
  { id: "WO-2415", unit: "Biosafety cabinet", cust: "Aurora Dynamics" },
  { id: "WO-2418", unit: "CO2 incubator", cust: "Bio Vantis Technologies" },
  { id: "WO-2421", unit: "Laminar flow cabinet", cust: "Helix Biomed" },
  { id: "WO-2424", unit: "Fume hood", cust: "Esco Research Labs" },
];

export function ContextualExport() {
  const [mode, setMode] = useState(false);
  const [sel, setSel] = useState<Set<string>>(new Set());
  const [msg, setMsg] = useState("");
  const firstBox = useRef<HTMLInputElement>(null);
  const exportBtn = useRef<HTMLButtonElement>(null);
  const n = sel.size;
  const all = n === ROWS.length;

  useEffect(() => {
    if (mode) firstBox.current?.focus();
  }, [mode]);

  function start() {
    setSel(new Set()); // stale selection is cleared
    setMsg("");
    setMode(true);
  }
  function rest(note: string) {
    setSel(new Set());
    setMode(false);
    setMsg(note);
    requestAnimationFrame(() => exportBtn.current?.focus());
  }
  function toggle(id: string, v: boolean) {
    setSel((prev) => {
      const next = new Set(prev);
      if (v) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  return (
    <div style={{ width: "100%" }}>
      <style>{WO_CSS}</style>
      <div className="xd">
        <div className="xd-tools">
          <span className="t">Work orders</span>
          <span className="spacer" />
          <button ref={exportBtn} type="button" className="btn btn-sm export-btn" onClick={start} disabled={mode}>
            <Ic n="download" s={14} />
            Export
          </button>
        </div>
        <table>
          <thead>
            <tr>
              {mode && (
                <th className="wo-th-sel">
                  <Box
                    checked={all}
                    mixed={n > 0 && !all}
                    onChange={() => setSel(all ? new Set() : new Set(ROWS.map((r) => r.id)))}
                    ariaLabel="Select all rows on this page"
                  />
                </th>
              )}
              <th scope="col">Work order</th>
              <th scope="col">Unit</th>
              <th scope="col">Customer</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r, i) => (
              <tr key={r.id} className={sel.has(r.id) ? "sel" : undefined}>
                {mode && (
                  <td className="wo-td-sel">
                    <Box
                      inputRef={i === 0 ? firstBox : undefined}
                      checked={sel.has(r.id)}
                      onChange={(v) => toggle(r.id, v)}
                      ariaLabel={`Select ${r.id}`}
                    />
                  </td>
                )}
                <td>
                  <b>{r.id}</b>
                </td>
                <td>{r.unit}</td>
                <td>{r.cust}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {mode && (
          <div className="wo-actionbar wo-export-selection" role="region" aria-label="Select work orders to export">
            <span className="wo-export-instruction">
              <Ic n="info" s={15} />
              <span>
                <b>Select work orders to export</b>
                <small>Use the checkboxes in the first column, then export the selected rows.</small>
              </span>
            </span>
            <div className="spacer" />
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => rest("Selection cleared.")}>
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm export-btn"
              disabled={n === 0}
              onClick={() => rest(`Exported ${n} work order${n === 1 ? "" : "s"}.`)}
            >
              <Ic n="download" s={14} />
              Export selected ({n})
            </button>
          </div>
        )}
      </div>
      <p role="status" className="sr-only">
        {msg}
      </p>
    </div>
  );
}

/* ---- spec sheets ------------------------------------------------------------ */

/* NPD-FSM/sr/sr.css: the register's own drawn checkbox (Service Report table). */
const SR_CK_CSS = `
.sr-table .sr-ck{display:inline-flex;width:40px;height:40px;min-height:40px;align-items:center;justify-content:center;vertical-align:middle;border-radius:6px}
.sr-table .sr-ck input{
  display:block;flex:0 0 18px;width:18px;height:18px;margin:0;
  -webkit-appearance:none;appearance:none;background:#fff;
  border:1.5px solid var(--border-input);border-radius:4px;cursor:pointer;
  background-position:center;background-repeat:no-repeat;background-size:12px 12px
}
.sr-table .sr-ck input:hover{border-color:var(--navy-active)}
.sr-table .sr-ck input:checked{
  border-color:var(--primary);background-color:var(--primary);
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='m3.3 8.2 3 3.1 6.4-6.5' fill='none' stroke='white' stroke-width='2.1' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
}
.sr-table .sr-ck input:focus-visible{outline:var(--focus-ring);outline-offset:2px}
`;

export function RegisterCheckboxSpec() {
  return (
    <div className="sr-table" style={{ display: "flex", gap: 24 }}>
      <style>{SR_CK_CSS}</style>
      <label className="sr-ck" data-s="off">
        <input type="checkbox" aria-label="Select SR-1042" />
      </label>
      <label className="sr-ck" data-s="on">
        <input type="checkbox" defaultChecked aria-label="Select SR-1043" />
      </label>
    </div>
  );
}

/* NPD-FSM/wo/wo.css: the selection cell target around a native .chk box. */
export function SelectionCellSpec() {
  return (
    <div>
      <style>{WO_CSS}</style>
      <div className="wo-td-sel">
        <label className="chk">
          <input type="checkbox" defaultChecked aria-label="Select WO-2418" />
        </label>
      </div>
    </div>
  );
}
