"use client";

import { useEffect, useId, useRef, useState } from "react";

/* ---------------------------------------------------------------------------
   Live twins of the shared search (NPD-FSM/search-ui.js + sr/sr-list.js +
   the Service Schedule list composer in script.js):
   - .fsm-search-trigger collapses to / expands into .fsm-search-composer
   - the attached .search-recommendations.fsm-search-results tray shows at
     most six rows, an explicit empty state, Up/Down/Enter/Escape
   - the compound control puts the field scope (.tbs-list-fields) directly
     before the input; picked fields narrow the recommendations
   Focus stays in the input; aria-activedescendant names the highlighted row.
   --------------------------------------------------------------------------- */

/* search-ui.js keeps its own Lucide paths (a documented exception to ic()). */
const LUCIDE = {
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  filter: '<path d="M4 5h16l-6 7v5l-4 2v-7Z"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  chevronRight: '<path d="m9 18 6-6-6-6"/>',
  fileText:
    '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5Z"/><polyline points="14 2 14 8 20 8"/><path d="M8 13h8M8 17h8M8 9h2"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
};

export function SIcon({ n, s = 16 }: { n: keyof typeof LUCIDE; s?: number }) {
  return (
    <svg
      className="fsm-search-lucide"
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: LUCIDE[n] }}
    />
  );
}

type Rec = { id: string; title: string; meta: string; state: string; text: Record<string, string> };

const REPORTS: Rec[] = [
  ["ZWSE-26-0415", "Biological Safety Cabinet", "Aurora Dynamics", "4 Aug 2026", "09:00–11:30", "Open"],
  ["ZWSP-26-0414", "CO₂ Incubator", "Helix Biomed", "20 May 2026", "13:00–15:00", "Open"],
  ["ZWSE-26-0413", "ULT Freezer", "Pacific Genome Centre", "20 May 2026", "08:30–10:00", "Follow-up ongoing"],
  ["ZWSE-26-0412", "Laminar Flow Cabinet", "Medivance Pharma", "18 Dec 2025", "10:00–12:00", "Open"],
  ["ZWSE-26-0411", "Cytotoxic Cabinet", "Cellcore Diagnostics", "18 Dec 2025", "14:00–16:30", "Closed"],
  ["ZWSE-26-0410", "Biological Safety Cabinet", "Vertex Clinical Labs", "18 Dec 2025", "09:00–12:00", "Follow-up ongoing"],
  ["ZWSE-26-0409", "CO₂ Incubator", "Northfield University Hospital", "19 May 2026", "11:00–12:30", "Closed"],
  ["ZWSE-26-0408", "Biological Safety Cabinet", "Bio Vantis Technologies", "20 May 2026", "15:00–17:00", "Open"],
].map(([no, cat, account, date, time, state]) => ({
  id: no,
  title: `${no} · ${cat}`,
  meta: `${account} · ${date} · ${time}`,
  state,
  text: { all: `${no} ${cat} ${account} ${date}` },
}));

function useOutside(ref: React.RefObject<HTMLElement | null>, on: boolean, fn: () => void) {
  useEffect(() => {
    if (!on) return;
    const h = (e: Event) => {
      if (ref.current && !e.composedPath().includes(ref.current)) fn();
    };
    document.addEventListener("mousedown", h, true);
    return () => document.removeEventListener("mousedown", h, true);
  });
}

/* Shared tray: max six rows, head, explicit empty state. */
function Tray({
  id,
  kicker,
  count,
  countLabel,
  heading,
  empty,
  rows,
  active,
  onPick,
}: {
  id: string;
  kicker?: string;
  count: number;
  countLabel: string;
  heading: string;
  empty: string;
  rows: Rec[];
  active: number;
  onPick: (r: Rec) => void;
}) {
  return (
    <div className="search-recommendations fsm-search-results">
      {kicker && (
        <div className="fsm-search-meta">
          <b>{kicker}</b>
          <span>
            <strong>{count}</strong>
            {countLabel}
          </span>
        </div>
      )}
      <div className="search-rec-head" id={`${id}-head`}>
        {heading}
      </div>
      <div role="listbox" id={id} aria-labelledby={`${id}-head`}>
        {rows.map((r, i) => (
          <button
            key={r.id}
            id={`${id}-${i}`}
            type="button"
            tabIndex={-1}
            className="search-rec-row"
            role="option"
            aria-selected={i === active}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onPick(r)}
          >
            <span className="search-rec-icon">
              <SIcon n="fileText" s={15} />
            </span>
            <span className="search-rec-copy">
              <b>{r.title}</b>
              <small>{r.meta}</small>
            </span>
            <span className="search-rec-state">{r.state}</span>
            <SIcon n="chevronRight" s={14} />
          </button>
        ))}
      </div>
      {!rows.length && <div className="search-rec-empty">{empty}</div>}
    </div>
  );
}

function useListKeys(count: number, onEnter: (i: number) => void, onEscape: () => void) {
  const [active, setActive] = useState(-1);
  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      if (!count) return;
      e.preventDefault();
      setActive((a) => (a + 1 >= count ? 0 : a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a <= 0 ? -1 : a - 1));
    } else if (e.key === "Enter" && active >= 0) {
      e.preventDefault();
      onEnter(active);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onEscape();
    }
  }
  return { active, setActive, onKeyDown };
}

/* ---- recommendations ------------------------------------------------------ */

export function SearchRecommendationsDemo({ startOpen = true }: { startOpen?: boolean }) {
  const uid = useId();
  const [open, setOpen] = useState(startOpen);
  const [q, setQ] = useState("");
  const [picked, setPicked] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const restore = useRef(false);

  const ql = q.trim().toLowerCase();
  const matches = REPORTS.filter((r) => !ql || r.text.all.toLowerCase().includes(ql));
  const rows = matches.slice(0, 6);

  function done() {
    setOpen(false);
    setQ("");
    restore.current = true;
  }
  const keys = useListKeys(rows.length, (i) => pick(rows[i]), done);
  function pick(r: Rec) {
    setPicked(`Opened ${r.id}`);
    done();
  }

  useEffect(() => {
    if (open) inputRef.current?.focus();
    else if (restore.current) {
      restore.current = false;
      triggerRef.current?.focus();
    }
  }, [open]);

  return (
    <div style={{ width: "100%", maxWidth: 640 }}>
      <div className={`fsm-search${open ? " searching" : ""}`}>
        {open ? (
          <div className="fsm-search-composer" role="search" aria-label="Search service reports">
            <span className="fsm-search-input">
              <SIcon n="search" />
              <input
                ref={inputRef}
                placeholder="Search service reports…"
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  keys.setActive(-1);
                }}
                onKeyDown={keys.onKeyDown}
                role="combobox"
                aria-label="Search service reports"
                aria-autocomplete="list"
                aria-expanded="true"
                aria-controls={`${uid}-list`}
                aria-activedescendant={keys.active >= 0 ? `${uid}-list-${keys.active}` : undefined}
                autoComplete="off"
              />
              {q && (
                <button
                  type="button"
                  className="fsm-search-clear"
                  aria-label="Clear search"
                  onClick={() => {
                    setQ("");
                    keys.setActive(-1);
                    inputRef.current?.focus();
                  }}
                >
                  <SIcon n="x" s={14} />
                </button>
              )}
            </span>
            <button type="button" className="fsm-search-done" aria-label="Finish searching" onClick={done}>
              <SIcon n="x" s={14} />
              <span>Done</span>
            </button>
            <Tray
              id={`${uid}-list`}
              kicker="On-key service report search"
              count={matches.length}
              countLabel="reports in this view"
              heading="Recommended service reports"
              empty="No matching service reports. Try a report number, company, model, or serial number."
              rows={rows}
              active={keys.active}
              onPick={pick}
            />
          </div>
        ) : (
          <button
            ref={triggerRef}
            type="button"
            className="fsm-search-trigger"
            aria-expanded="false"
            onClick={() => {
              setPicked("");
              setOpen(true);
            }}
          >
            <SIcon n="search" />
            <span>Search service reports…</span>
          </button>
        )}
      </div>
      <p className={open ? "sr-only" : "fhelp"} role="status" style={open ? undefined : { minHeight: 18 }}>
        {open ? `${matches.length} matching report${matches.length === 1 ? "" : "s"}` : picked}
      </p>
    </div>
  );
}

/* ---- field scope + search ------------------------------------------------- */

const FIELDS: [string, string][] = [
  ["account", "Account name"],
  ["code", "Schedule code"],
  ["asset", "Asset"],
  ["site", "Site"],
  ["engineer", "Engineer"],
  ["reference", "PO / SVSO"],
  ["status", "Status"],
];

const SCHEDULES = [
  { code: "SCH-1042", account: "Aurora Dynamics", asset: "Biological Safety Cabinet", site: "Science Park Drive", engineer: "Alejandro Cruz", reference: "PO 4500123 SVSO 88120", status: "Confirmed" },
  { code: "SCH-1043", account: "Helix Biomed", asset: "CO₂ Incubator", site: "Ayer Rajah Crescent", engineer: "Aisha Al-Farsi", reference: "PO 4500188 SVSO 88131", status: "Tentative" },
  { code: "SCH-1047", account: "Pacific Genome Centre", asset: "ULT Freezer", site: "Biopolis Way", engineer: "Alejandro Cruz", reference: "PO 4500201 SVSO 88140", status: "Confirmed" },
  { code: "SCH-1051", account: "Medivance Pharma", asset: "Laminar Flow Cabinet", site: "Shah Alam, Selangor", engineer: "Aisha Al-Farsi", reference: "PO 4500219 SVSO 88152", status: "Closed" },
  { code: "SCH-1052", account: "Cellcore Diagnostics", asset: "Cytotoxic Cabinet", site: "Taguig, Metro Manila", engineer: "Alejandro Cruz", reference: "PO 4500230 SVSO 88160", status: "Rescheduled" },
  { code: "SCH-1058", account: "Vertex Clinical Labs", asset: "Biological Safety Cabinet", site: "Bangkok, Thailand", engineer: "Aisha Al-Farsi", reference: "PO 4500244 SVSO 88171", status: "Tentative" },
  { code: "SCH-1060", account: "Northfield University Hospital", asset: "CO₂ Incubator", site: "Novena Medical Campus", engineer: "Alejandro Cruz", reference: "PO 4500251 SVSO 88175", status: "Confirmed" },
  { code: "SCH-1063", account: "Bio Vantis Technologies", asset: "Biological Safety Cabinet", site: "Tuas Biomedical Park", engineer: "Aisha Al-Farsi", reference: "PO 4500266 SVSO 88183", status: "Cancelled" },
];

export function ScopedSearchDemo() {
  const uid = useId();
  const [q, setQ] = useState("");
  const [fields, setFields] = useState<Set<string>>(() => new Set(FIELDS.map(([k]) => k)));
  const [menu, setMenu] = useState(false);
  const [note, setNote] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scopeRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const all = fields.size === FIELDS.length;
  const picked = FIELDS.filter(([k]) => fields.has(k));
  const label = all ? "All fields" : picked.length === 1 ? picked[0][1] : `${picked.length} fields`;

  const ql = q.trim().toLowerCase();
  const matches = SCHEDULES.filter(
    (s) => !ql || [...fields].some((k) => String(s[k as keyof typeof s]).toLowerCase().includes(ql)),
  );
  const recs: Rec[] = matches.slice(0, 6).map((s) => ({
    id: s.code,
    title: `${s.code} · ${s.account}`,
    meta: `${s.asset} · ${s.site} · ${s.engineer}`,
    state: s.status,
    text: {},
  }));
  const keys = useListKeys(recs.length, (i) => setNote(`Opened ${recs[i].id}`), () => setQ(""));

  useOutside(wrapRef, menu, () => setMenu(false));
  useEffect(() => {
    if (menu) menuRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
  }, [menu]);

  function toggle(k: string) {
    setNote("");
    setFields((cur) => {
      const next = new Set(cur);
      if (next.has(k)) {
        if (next.size === 1) {
          setNote("Keep at least one search field");
          return cur;
        }
        next.delete(k);
      } else next.add(k);
      return next;
    });
  }

  function menuKey(e: React.KeyboardEvent) {
    const items = [...(menuRef.current?.querySelectorAll<HTMLButtonElement>("button") ?? [])];
    const act = (menuRef.current?.getRootNode() as ShadowRoot | Document).activeElement as HTMLButtonElement;
    const i = items.indexOf(act);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      (items[i + 1] || items[0]).focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      (items[i - 1] || items[items.length - 1]).focus();
    } else if (e.key === "Escape" || e.key === "Tab") {
      if (e.key === "Escape") e.preventDefault();
      setMenu(false);
      if (e.key === "Escape") scopeRef.current?.focus();
    }
  }

  return (
    <div ref={wrapRef} style={{ width: "100%", maxWidth: 640 }}>
      <div className="fsm-search searching">
        <div className="fsm-search-composer list-search-composer" role="search" aria-label="Search schedule list">
          <button
            ref={scopeRef}
            type="button"
            className="tbs-list-fields"
            aria-haspopup="menu"
            aria-expanded={menu}
            aria-label={`Search fields: ${label}`}
            onClick={() => setMenu((m) => !m)}
          >
            <span>{label}</span>
            <SIcon n="chevronDown" s={12} />
          </button>
          <span className="tbs-input fsm-search-input">
            <SIcon n="search" />
            <input
              ref={inputRef}
              placeholder="Search schedules…"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                keys.setActive(-1);
                setNote("");
              }}
              onKeyDown={keys.onKeyDown}
              role="combobox"
              aria-label="Search schedules"
              aria-autocomplete="list"
              aria-expanded={!menu}
              aria-controls={`${uid}-list`}
              aria-activedescendant={keys.active >= 0 ? `${uid}-list-${keys.active}` : undefined}
              autoComplete="off"
            />
            {q && (
              <button
                type="button"
                className="fsm-search-clear"
                aria-label="Clear search"
                onClick={() => {
                  setQ("");
                  inputRef.current?.focus();
                }}
              >
                <SIcon n="x" s={14} />
              </button>
            )}
          </span>
          {menu && (
            <div
              ref={menuRef}
              className="menu"
              role="menu"
              aria-label="Search fields"
              style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, zIndex: 90 }}
              onKeyDown={menuKey}
            >
              <button
                type="button"
                role="menuitemcheckbox"
                aria-checked={all}
                onClick={() => {
                  setNote("");
                  setFields(new Set(FIELDS.map(([k]) => k)));
                }}
              >
                <span style={{ width: 14, display: "inline-flex" }}>{all && <SIcon n="check" s={14} />}</span>
                All fields
              </button>
              {FIELDS.map(([k, t]) => (
                <button key={k} type="button" role="menuitemcheckbox" aria-checked={fields.has(k)} onClick={() => toggle(k)}>
                  <span style={{ width: 14, display: "inline-flex" }}>{fields.has(k) && <SIcon n="check" s={14} />}</span>
                  {t}
                </button>
              ))}
              {note && (
                <p className="fhelp" role="status" style={{ padding: "4px 10px 2px" }}>
                  {note}
                </p>
              )}
            </div>
          )}
          {!menu && (
            <Tray
              id={`${uid}-list`}
              count={matches.length}
              countLabel="schedules"
              heading={`Recommended schedules · ${label}`}
              empty="No matching schedules. Try a schedule code, account, asset, or engineer."
              rows={recs}
              active={keys.active}
              onPick={(r) => setNote(`Opened ${r.id}`)}
            />
          )}
        </div>
      </div>
      <p className="sr-only" role="status">
        {menu ? "" : note || `${matches.length} matching schedule${matches.length === 1 ? "" : "s"}`}
      </p>
    </div>
  );
}
