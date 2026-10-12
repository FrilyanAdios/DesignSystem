"use client";

import { useState } from "react";
import { Ic } from "@/components/demo/Ic";

/* ---------------------------------------------------------------------------
   Live tag demos.
   - Counted service chips: styles.css › .report-svc-chip (+ .more), markup from
     script.js (Reports › Schedule Breakdown, toggleReportChips).
   - Mobile chip: rules copied from FSM-Mobile/css/components.css (.chip,
     .chip-row) and css/design-system-unification.css (.screen .chip), with
     mobile light-theme tokens on a wrapper. Demos only load styles.css.
   --------------------------------------------------------------------------- */

const SERVICES: [string, number][] = [
  ["Preventive Maintenance", 14],
  ["Certification", 9],
  ["Calibration Service", 4],
  ["Corrective Maintenance", 3],
  ["Decontamination Service", 1],
];

export function ServiceChips() {
  const [open, setOpen] = useState(false);
  const vis = open ? SERVICES : SERVICES.slice(0, 3);
  return (
    <div className="report-cat-svcs">
      {vis.map(([sv, n]) => (
        <span key={sv} className="report-svc-chip">
          {sv}
          <b>{n}</b>
        </span>
      ))}
      <button type="button" className="report-svc-chip more" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        {open ? "Show less" : `+${SERVICES.length - 3} more`}
      </button>
    </div>
  );
}

export const CHIP_CSS = `
.m-tokens{--esco-blue:#00467F;--esco-tint:#EAF1F7;--surface:#FFFFFF;--outline:#D8E1EA;--on-surface:#243342;--on-surface-var:#596B7C;
  --space-4:4px;--space-8:8px;--space-12:12px;--space-16:16px;--ds-radius-small:8px;--ds-icon-small:18px}
.chip{
  display:inline-flex;align-items:center;gap:var(--space-8);
  min-height:32px;max-width:100%;padding:var(--space-4) var(--space-12);
  border:1px solid var(--outline);border-radius:8px;background:var(--surface);
  color:var(--on-surface);font:500 .875rem var(--font);line-height:18px;
  cursor:pointer;position:relative;overflow:hidden;white-space:nowrap;
}
.chip>span{overflow:hidden;text-overflow:ellipsis}
.chip i[data-icon]>svg{width:18px;height:18px;flex:0 0 18px;color:var(--esco-blue)}
.chip i[data-icon=chev-down]>svg{color:var(--on-surface-var)}
.chip-action{color:var(--esco-blue)}
.chip[aria-pressed=true]{background:var(--esco-tint);border-color:var(--esco-blue);color:var(--esco-blue)}
.chip:disabled{opacity:.5;cursor:default}
@media(hover:hover){.chip:hover{background:var(--esco-tint)}}
.chip-row{
  display:flex;align-items:center;gap:var(--space-8);
  padding:var(--space-8) var(--space-16);
  background:var(--surface);overflow-x:auto;scrollbar-width:none;
}
.chip-row::-webkit-scrollbar{display:none}
.chip-row .chip{flex:0 1 auto;min-width:0}
.screen .chip{
  min-height:44px;
  padding:var(--space-8) var(--space-12);
  border-radius:var(--ds-radius-small);
}
.screen .chip i[data-icon],.screen .chip i[data-icon]>svg{width:var(--ds-icon-small);height:var(--ds-icon-small)}
`;

/** Coordinator View scope line: entity chip (opens a sheet) and Today. */
export function MobileScopeChips() {
  return (
    <div className="m-tokens screen" style={{ width: "100%", maxWidth: 390 }}>
      <style>{CHIP_CSS}</style>
      <div className="chip-row" role="group" aria-label="Schedule filters">
        <button type="button" className="chip" aria-haspopup="dialog">
          <i data-icon="filter" aria-hidden="true">
            <Ic n="filter" s={18} />
          </i>
          <span>All entities</span>
          <i data-icon="chev-down" aria-hidden="true">
            <Ic n="down" s={18} />
          </i>
        </button>
        <button type="button" className="chip">
          <i data-icon="calendar" aria-hidden="true">
            <Ic n="schedule" s={18} />
          </i>
          <span>Today</span>
        </button>
        <button type="button" className="chip chip-action" aria-haspopup="dialog">
          <i data-icon="settings" aria-hidden="true">
            <Ic n="settings" s={18} />
          </i>
          <span>Manage</span>
        </button>
      </div>
    </div>
  );
}

/** Test Report templates: two filter chips, one pressed. */
export function MobileFilterChips({ plain = false }: { plain?: boolean }) {
  const [group, setGroup] = useState<"cat" | "type">("cat");
  return (
    <div className={plain ? "m-tokens" : "m-tokens screen"} style={{ width: "100%", maxWidth: 390 }}>
      <style>{CHIP_CSS}</style>
      <div className="chip-row" role="group" aria-label="Group templates">
        <button type="button" className="chip" aria-pressed={group === "cat"} onClick={() => setGroup("cat")}>
          Product family
        </button>
        <button type="button" className="chip" aria-pressed={group === "type"} onClick={() => setGroup("type")}>
          Document type
        </button>
      </div>
    </div>
  );
}
