"use client";

import { useState } from "react";
import { Ic, type IconName } from "@/components/demo/Ic";

/* Live .viewsw demos. Markup mirrors script.js (Schedule view switch), reports-fse.js
   (Group by) and sr/sr-list.js (Register / Split): a role="group" with a name, and
   toggle buttons that carry aria-pressed and the .on class together. */

type Seg = { id: string; label: string; icon?: IconName; title?: string };

export function ViewSwitch({
  label,
  items,
  initial,
  iconOnly = false,
  iconSize = 14,
}: {
  label: string;
  items: Seg[];
  initial?: string;
  iconOnly?: boolean;
  iconSize?: number;
}) {
  const [value, setValue] = useState(initial ?? items[0].id);
  return (
    <div className="viewsw" role="group" aria-label={label}>
      {items.map((it) => (
        <button
          key={it.id}
          type="button"
          className={value === it.id ? "on" : undefined}
          aria-pressed={value === it.id}
          aria-label={iconOnly ? it.label : undefined}
          title={it.title ?? (iconOnly ? it.label : undefined)}
          onClick={() => setValue(it.id)}
        >
          {it.icon && <Ic n={it.icon} s={iconSize} />}
          {!iconOnly && (it.icon ? <span className="lbl">{it.label}</span> : it.label)}
        </button>
      ))}
    </div>
  );
}

export const SCHEDULE_VIEWS: Seg[] = [
  { id: "calendar", label: "Calendar", icon: "grid", title: "Calendar view" },
  { id: "list", label: "List", icon: "list", title: "List view" },
  { id: "reports", label: "Reports", icon: "report", title: "Reports view" },
];

export const GROUP_BY: Seg[] = [
  { id: "none", label: "No grouping" },
  { id: "engineer", label: "Engineer" },
];

export const REGISTER_SHAPE: Seg[] = [
  { id: "table", label: "Register view", icon: "table", title: "Register — every column" },
  { id: "split", label: "Split view", icon: "panel", title: "Split — list beside the report" },
];

export function ScheduleViewSwitch() {
  return <ViewSwitch label="Schedule view" items={SCHEDULE_VIEWS} />;
}

export function GroupBySwitch() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span id="seg-group-l" style={{ fontSize: "var(--fs-sub)", color: "var(--fg-3)" }}>
        Group by
      </span>
      <GroupByGroup />
    </div>
  );
}

function GroupByGroup() {
  const [value, setValue] = useState("none");
  return (
    <div className="viewsw" role="group" aria-labelledby="seg-group-l">
      {GROUP_BY.map((it) => (
        <button
          key={it.id}
          type="button"
          className={value === it.id ? "on" : undefined}
          aria-pressed={value === it.id}
          onClick={() => setValue(it.id)}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}

export function RegisterShapeSwitch() {
  return <ViewSwitch label="View" items={REGISTER_SHAPE} iconOnly iconSize={16} />;
}
