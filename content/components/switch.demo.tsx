"use client";

import { useState } from "react";

/* ---------------------------------------------------------------------------
   Live switch demos. The web product (NPD-FSM) has no switch, so these
   render the MOBILE switch: the rules below are copied from
   FSM-Mobile/css/components.css (.switch) and css/create-sr.css
   (.src-switch-row). Mobile tokens are mapped onto a wrapper with their
   resolved light values (FSM-Mobile/css, white theme). The only change to the
   product markup is role="switch" on the input.
   --------------------------------------------------------------------------- */

export const SWITCH_CSS = `
.m-tokens{--esco-blue:#00467F;--surface:#FFFFFF;--surface-2:#FFFFFF;--outline:#D8E1EA;--outline-strong:#7D8F9F;
  --on-surface:#243342;--on-surface-var:#596B7C;--danger:#C2362F;--touch:48px;
  --space-4:4px;--space-8:8px;--space-12:12px;--space-16:16px;color:var(--on-surface)}
.switch{position:relative;flex:0 0 52px;width:52px;height:32px;display:inline-flex;align-items:center}
.switch input{position:absolute;inset:0;width:100%;height:100%;margin:0;opacity:0;cursor:pointer}
.switch-track{pointer-events:none;width:52px;height:32px;border-radius:999px;background:var(--surface-2);
  border:2px solid var(--outline-strong);display:flex;align-items:center;padding:0 3px;
  transition:background-color 160ms ease,border-color 160ms ease}
.switch-knob{width:16px;height:16px;border-radius:50%;background:var(--outline-strong);
  transition:transform 160ms cubic-bezier(.2,.7,.3,1),width 160ms ease,height 160ms ease,background-color 160ms ease}
.switch input:checked+.switch-track{background:var(--esco-blue);border-color:var(--esco-blue)}
.switch input:checked+.switch-track .switch-knob{width:24px;height:24px;background:var(--surface);transform:translateX(21px)}
.switch input:focus-visible+.switch-track{outline:2px solid var(--esco-blue);outline-offset:3px}
.switch input:disabled+.switch-track{opacity:.45}
.src-switch-row{display:flex;align-items:center;gap:var(--space-12);min-height:var(--touch);
  padding:var(--space-12) 0;border-top:1px solid var(--outline);cursor:pointer}
.src-switch-row>span:first-child{flex:1;min-width:0;display:grid;gap:2px}
.src-switch-row strong{font-size:.9375rem;font-weight:500}
.src-switch-row small{font-size:.8125rem;color:var(--on-surface-var);line-height:1.5}
#page-createsr .src-switch-row{margin-top:var(--space-16);padding:var(--space-12) var(--space-16);border:1px solid var(--outline);border-radius:12px}
#page-createsr .src-switch-row.bad{border-color:var(--danger);background:var(--danger-tint,#fdecea)}
#page-createsr .src-switch-row small{font-size:.8125rem}
/* interaction-refinements.css: reduced motion removes every transition */
@media(prefers-reduced-motion:reduce){*,*::before,*::after{transition:none!important}}
`;

/** The bare switch, labelled by aria-label (it sits beside a heading that names the unit). */
export function BareSwitch({ label, initial = false, disabled = false }: { label: string; initial?: boolean; disabled?: boolean }) {
  const [on, setOn] = useState(initial);
  return (
    <span className="m-tokens" style={{ display: "inline-flex" }}>
      <style>{SWITCH_CSS}</style>
      <label className="switch" title={label}>
        <input
          type="checkbox"
          role="switch"
          checked={on}
          disabled={disabled}
          aria-label={label}
          onChange={(e) => setOn(e.target.checked)}
        />
        <span className="switch-track">
          <span className="switch-knob" />
        </span>
      </label>
    </span>
  );
}

/** Create service report › "Asset safe to use": the whole row is the label. */
export function SafeToUseRow({ framed = false }: { framed?: boolean }) {
  const [safe, setSafe] = useState(true);
  return (
    <div className="m-tokens" id={framed ? "page-createsr" : undefined} style={{ width: "100%", maxWidth: 360 }}>
      <style>{SWITCH_CSS}</style>
      <label className={`src-switch-row${framed && !safe ? " bad" : ""}`}>
        <span>
          <strong>Asset safe to use</strong>
          <small>{safe ? "Yes — the customer may use it" : "No — the customer is told in the report"}</small>
        </span>
        <span className="switch">
          <input type="checkbox" role="switch" checked={safe} onChange={(e) => setSafe(e.target.checked)} />
          <span className="switch-track">
            <span className="switch-knob" />
          </span>
        </span>
      </label>
    </div>
  );
}

/** Spec sheet: one switch off and one on, side by side. */
export function SwitchPairSpec() {
  return (
    <span className="m-tokens" style={{ display: "inline-flex", gap: 32 }}>
      <style>{SWITCH_CSS}</style>
      <label className="switch" data-s="off">
        <input type="checkbox" role="switch" aria-label="Include in this report, off" />
        <span className="switch-track">
          <span className="switch-knob" />
        </span>
      </label>
      <label className="switch" data-s="on">
        <input type="checkbox" role="switch" defaultChecked aria-label="Include in this report, on" />
        <span className="switch-track">
          <span className="switch-knob" />
        </span>
      </label>
    </span>
  );
}
