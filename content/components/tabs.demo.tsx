"use client";

import { useId, useRef, useState } from "react";

/* Live .tabs demos. Visuals come from styles.css (.tabs, .tabs button.on, .rp-tools .tabs b).
   Semantics follow the tab pattern the design system asks for: tablist, tab with
   aria-selected and aria-controls, one tab in the Tab order, arrows move between tabs. */

type TabItem = { id: string; label: string; count?: number; panel?: React.ReactNode };

export function Tabs({
  label,
  items,
  initial,
  inToolbar = false,
}: {
  label: string;
  items: TabItem[];
  initial?: string;
  inToolbar?: boolean;
}) {
  const uid = useId();
  const [value, setValue] = useState(initial ?? items[0].id);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % items.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + items.length) % items.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = items.length - 1;
    if (next < 0) return;
    e.preventDefault();
    setValue(items[next].id);
    refs.current[next]?.focus();
  }

  const list = (
    <div className="tabs" role="tablist" aria-label={label}>
      {items.map((it, i) => {
        const on = value === it.id;
        return (
          <button
            key={it.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${uid}-tab-${it.id}`}
            aria-selected={on}
            aria-controls={`${uid}-panel`}
            tabIndex={on ? 0 : -1}
            className={on ? "on" : undefined}
            onClick={() => setValue(it.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            {it.label}
            {it.count !== undefined && <> <b>{it.count}</b></>}
          </button>
        );
      })}
    </div>
  );

  const current = items.find((it) => it.id === value) ?? items[0];
  return (
    <div style={{ width: "100%" }}>
      {inToolbar ? <div className="rp-tools">{list}</div> : list}
      <div
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-tab-${current.id}`}
        tabIndex={0}
        className="card"
        style={{ padding: 16, fontSize: "var(--fs-body)", color: "var(--fg-2)" }}
      >
        {current.panel ?? `${current.label} records appear here.`}
      </div>
    </div>
  );
}

export function FieldOpsTabs() {
  return (
    <Tabs
      label="Field operations"
      items={[
        { id: "map", label: "Map", panel: "Engineer locations on the map." },
        { id: "list", label: "Engineer", panel: "Engineer status, one row per engineer." },
        { id: "att", label: "Check-in / out", panel: "Check-in and check-out times for today." },
      ]}
    />
  );
}

export function TestReportTabs() {
  return (
    <Tabs
      label="Test report status"
      inToolbar
      items={[
        { id: "all", label: "All", count: 24 },
        { id: "pass", label: "Pass", count: 17 },
        { id: "conditional", label: "Conditional", count: 4 },
        { id: "fail", label: "Fail", count: 3 },
        { id: "expiring", label: "Expiring", count: 2 },
      ]}
    />
  );
}
