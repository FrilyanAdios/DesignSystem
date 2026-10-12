"use client";

import { useId, useState } from "react";

/* ---------------------------------------------------------------------------
   Live radio demos. Demos only load styles.css, so the module rules they
   need are copied here verbatim:
   - NPD-FSM/tr/tr.css   › .trf-radio, .trf-radio-row, .trf-rad (Test Report form)
   - NPD-FSM/wo/wo.css   › .wo-export-scopes, .wo-export-scope (export dialog)
   .card comes from styles.css.
   --------------------------------------------------------------------------- */

export const RADIO_CSS = `
.trf-radio { border: none; padding: 0; margin: 0; min-width: 0; }
.trf-radio legend { font-size: var(--fs-label); font-weight: 500; color: var(--fg-2); margin-bottom: var(--sp-2); padding: 0; }
.trf-radio legend i { color: var(--error); font-style: normal; font-weight: 700; }
.trf-radio-row { display: flex; gap: 8px; flex-wrap: wrap; }
.trf-rad { display: inline-flex; align-items: center; gap: 8px; height: var(--h-lg); padding: 0 14px 0 10px; border: 1px solid var(--border); border-radius: var(--radius-field); background: #fff; font-size: 13px; color: var(--fg-2); cursor: pointer; transition: 0.12s; }
.trf-rad:hover { background: var(--muted); }
.trf-rad input { width: 16px; height: 16px; accent-color: var(--primary); }
.trf-rad.on { background: var(--primary-50); border-color: var(--primary-100); color: var(--primary); font-weight: 600; }
.wo-export-scopes{border:0;padding:0;margin:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--sp-3)}
.wo-export-scopes legend{margin-bottom:var(--sp-2);font-size:var(--fs-card);font-weight:600}
/* scoped one level deeper than wo.css so it beats .card from the adopted product sheet, as it does in the product */
.wo-export-scopes .wo-export-scope{display:flex;align-items:flex-start;gap:var(--sp-2);padding:var(--sp-3);cursor:pointer;box-shadow:none}
.wo-export-scope:has(:checked){background:var(--primary-50);border-color:var(--primary)}
.wo-export-scope:hover{background:var(--muted)}
.wo-export-scope input{accent-color:var(--primary);flex-shrink:0}
.wo-export-scope small{display:block;margin-top:var(--sp-1);font-size:var(--fs-help);color:var(--fg-3)}
@media(max-width:600px){.wo-export-scopes{grid-template-columns:1fr}}
`;

/** Test Report form question: a fieldset of option rows. */
export function RadioRow({
  legend,
  options,
  initial,
  required = false,
  disabled = false,
}: {
  legend: string;
  options: string[];
  initial?: string;
  required?: boolean;
  disabled?: boolean;
}) {
  const name = useId();
  const [value, setValue] = useState(initial ?? options[0]);
  return (
    <>
      <style>{RADIO_CSS}</style>
      <fieldset className="trf-radio" disabled={disabled}>
        <legend>
          {legend}
          {required && <i aria-hidden="true">*</i>}
        </legend>
        <div className="trf-radio-row">
          {options.map((o) => (
            <label key={o} className={`trf-rad${value === o ? " on" : ""}`}>
              <input type="radio" name={name} value={o} checked={value === o} onChange={() => setValue(o)} />
              {o}
            </label>
          ))}
        </div>
      </fieldset>
    </>
  );
}

const SCOPES: [string, string, number, string][] = [
  ["page", "Current page", 20, "records on this page"],
  ["selected", "Selected rows", 3, "selected records"],
  ["full", "Full result", 1284, "records matching filters"],
];

/** Export dialog: records to export, as radio cards with counts. */
export function ExportScopes() {
  const name = useId();
  const [scope, setScope] = useState("full");
  return (
    <div style={{ width: "100%" }}>
      <style>{RADIO_CSS}</style>
      <fieldset className="wo-export-scopes">
        <legend className="field-label">Records to export</legend>
        {SCOPES.map(([k, t, n, h]) => (
          <label key={k} className="card wo-export-scope">
            <input type="radio" name={name} value={k} checked={scope === k} onChange={() => setScope(k)} />
            <span>
              <b>{t}</b>
              <small>
                {n.toLocaleString()} {h}
              </small>
            </span>
          </label>
        ))}
      </fieldset>
    </div>
  );
}
