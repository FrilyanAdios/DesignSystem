"use client";

import { useEffect, useRef, useState } from "react";
import { Ic } from "@/components/demo/Ic";

/* ---------------------------------------------------------------------------
   Live twin of the List / Reports date range control (script.js
   flexibleRangeControl, renderReportRangePicker) and the shared month picker
   (calendar.js: mcHeader, mcMonthPanel, mcStatusControl, mcGrid, mcGridKey,
   mcFootLine). Schedule counts are sample data; "today" is fixed so the demo
   reads the same every day.
   --------------------------------------------------------------------------- */

const TODAY_ISO = "2026-10-07";
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DOWSHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DOWLONG = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const STATUSES = [
  { k: "Confirmed", cls: "open" },
  { k: "Tentative", cls: "tentative" },
  { k: "Closed", cls: "closed" },
  { k: "Cancelled", cls: "cancelled" },
  { k: "Rescheduled", cls: "rescheduled" },
] as const;
type Day = Partial<Record<(typeof STATUSES)[number]["k"], number>>;

const pad = (n: number) => String(n).padStart(2, "0");
const isoOf = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parse = (iso: string) => new Date(iso + "T00:00:00");
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const startOfWeek = (d: Date) => addDays(d, -((d.getDay() + 6) % 7));
const fmtShort = (d: Date) => `${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)}`;
const fmtLong = (d: Date) => `${DOWLONG[(d.getDay() + 6) % 7]}, ${MONTHS[d.getMonth()]} ${d.getDate()} ${d.getFullYear()}`;
function isoWeek(d: Date) {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  t.setUTCDate(t.getUTCDate() + 4 - (t.getUTCDay() || 7));
  const y = t.getUTCFullYear();
  return Math.ceil(((+t - Date.UTC(y, 0, 1)) / 86400000 + 1) / 7);
}
const TODAY = parse(TODAY_ISO);
const CYCLE = { from: isoOf(startOfWeek(TODAY)), to: isoOf(addDays(startOfWeek(TODAY), 13)) };

/* deterministic sample workload: weekdays only */
function dayOf(iso: string): Day {
  const d = parse(iso);
  if (d.getDay() === 0 || d.getDay() === 6) return {};
  const n = d.getDate() + d.getMonth() * 3;
  return { Confirmed: (n * 7) % 4, Tentative: (n * 5) % 3, Closed: n % 4 === 0 ? 2 : n % 3 === 0 ? 1 : 0, Cancelled: n % 9 === 0 ? 1 : 0, Rescheduled: n % 7 === 0 ? 1 : 0 };
}
const total = (day: Day) => STATUSES.reduce((s, x) => s + (day[x.k] || 0), 0);
function rangeCount(from: string, to: string) {
  let n = 0;
  for (let d = parse(from); isoOf(d) <= to; d = addDays(d, 1)) n += total(dayOf(isoOf(d)));
  return n;
}
function rangeText(r: { from: string; to: string }) {
  const f = parse(r.from), t = parse(r.to), w1 = isoWeek(f), w2 = isoWeek(t);
  return `${fmtShort(f)} – ${fmtShort(t)} ${t.getFullYear()} · ${w1 === w2 ? `Wk ${w1}` : `Wk ${w1}–${w2}`}`;
}
const lengthOf = (r: { from: string; to: string }) => Math.round((+parse(r.to) - +parse(r.from)) / 86400000) + 1;
const lengthLabel = (days: number) => (days === 14 ? "Week" : days === 7 ? "1 week" : days === 28 ? "4 weeks" : "Custom");

function monthRows(month: Date) {
  const y = month.getFullYear(), m = month.getMonth(), days = new Date(y, m + 1, 0).getDate(), lead = (new Date(y, m, 1).getDay() + 6) % 7;
  const slots: (string | null)[] = [];
  for (let i = 0; i < lead; i++) slots.push(null);
  for (let d = 1; d <= days; d++) slots.push(isoOf(new Date(y, m, d)));
  while (slots.length % 7) slots.push(null);
  const rows: { cells: (string | null)[]; wk: number | "" }[] = [];
  for (let i = 0; i < slots.length; i += 7) {
    const cells = slots.slice(i, i + 7), a = cells.find(Boolean);
    rows.push({ cells, wk: a ? isoWeek(parse(a)) : "" });
  }
  return rows;
}

function useOutside(refs: React.RefObject<HTMLElement | null>[], on: boolean, fn: () => void) {
  useEffect(() => {
    if (!on) return;
    const h = (e: Event) => {
      const path = e.composedPath();
      if (!refs.some((r) => r.current && path.includes(r.current))) fn();
    };
    document.addEventListener("mousedown", h, true);
    return () => document.removeEventListener("mousedown", h, true);
  });
}

/* ---- month picker --------------------------------------------------------- */

type Draft = { from: string; to: string; phase: "end" | "done" };

function RangePicker({ initial, focusOnOpen, inline, onApply, onClose }: { initial: { from: string; to: string }; focusOnOpen: boolean; inline?: boolean; onApply: (r: { from: string; to: string }) => void; onClose: (restore: boolean) => void }) {
  const [draft, setDraft] = useState<Draft>({ ...initial, phase: "done" });
  const [month, setMonth] = useState(() => new Date(parse(initial.from).getFullYear(), parse(initial.from).getMonth(), 1));
  const [monthPick, setMonthPick] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [statusOpen, setStatusOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const focusNext = useRef<"first" | "last" | null>(null);

  useEffect(() => {
    if (focusOnOpen) gridRef.current?.querySelector<HTMLButtonElement>('.mcd[tabindex="0"]')?.focus();
  }, [focusOnOpen]);
  useEffect(() => {
    if (!focusNext.current || !gridRef.current) return;
    const cells = gridRef.current.querySelectorAll<HTMLButtonElement>(".mcd");
    (focusNext.current === "first" ? cells[0] : cells[cells.length - 1])?.focus();
    focusNext.current = null;
  }, [month]);

  const shift = (n: number) => setMonth((m) => new Date(m.getFullYear(), m.getMonth() + n, 1));
  const { from, to, phase } = draft;
  const picking = phase === "end";

  function pick(iso: string) {
    if (phase === "done") setDraft({ from: iso, to: "", phase: "end" });
    else if (iso < from) setDraft({ from: iso, to: from, phase: "done" });
    else setDraft({ from, to: iso, phase: "done" });
  }

  const t = TODAY;
  const presets = [
    { k: "cycle", label: "Current cycle", ...CYCLE },
    { k: "month", label: "This month", from: isoOf(new Date(t.getFullYear(), t.getMonth(), 1)), to: isoOf(new Date(t.getFullYear(), t.getMonth() + 1, 0)) },
    { k: "d30", label: "Last 30 days", from: isoOf(addDays(t, -29)), to: TODAY_ISO },
  ];

  const rows = monthRows(month);
  const all = rows.flatMap((r) => r.cells).filter(Boolean) as string[];
  const totals: Day = {};
  let max = 1;
  for (const iso of all) {
    const d = dayOf(iso);
    for (const s of STATUSES) totals[s.k] = (totals[s.k] || 0) + (d[s.k] || 0);
    max = Math.max(max, total(d));
  }
  const state = (iso: string) => ({ selected: iso === from || (!!to && iso === to), inRange: !!(from && to && iso > from && iso < to) });
  const tab = all.find((c) => state(c).selected) || all.find((c) => c === TODAY_ISO) || all[0];

  function gridKey(e: React.KeyboardEvent<HTMLDivElement>) {
    const map: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    if (!(e.key in map) && !["Home", "End", "PageUp", "PageDown"].includes(e.key)) return;
    e.preventDefault();
    e.stopPropagation();
    if (e.key === "PageUp" || e.key === "PageDown") {
      focusNext.current = e.key === "PageUp" ? "last" : "first";
      return shift(e.key === "PageUp" ? -1 : 1);
    }
    const slots = [...e.currentTarget.querySelectorAll<HTMLElement>(".mcd,.mcd-blank")];
    const active = (e.currentTarget.getRootNode() as ShadowRoot | Document).activeElement as HTMLElement;
    const cur = slots.indexOf(active);
    if (cur < 0) return;
    const next = e.key === "Home" ? cur - (cur % 7) : e.key === "End" ? cur - (cur % 7) + 6 : cur + map[e.key];
    if (next < 0 || next >= slots.length || !slots[next].classList.contains("mcd")) {
      if (e.key === "Home" || e.key === "End") return;
      const dir = map[e.key] < 0 ? -1 : 1;
      focusNext.current = dir < 0 ? "last" : "first";
      return shift(dir);
    }
    slots[next].focus();
  }

  const curStatus = STATUSES.find((s) => s.k === status);
  const allTotal = total(totals);
  const visibleTotal = status ? totals[status as keyof Day] || 0 : allTotal;
  const days = from && to ? lengthOf({ from, to }) : 0;
  const label = from ? `${fmtShort(parse(from))}${to ? ` – ${fmtShort(parse(to))} ${parse(to).getFullYear()}` : ""}` : "—";

  return (
    <div
      className="menu rangepick mcal-pop report-rangepick"
      role="dialog"
      aria-label="Choose list date range"
      style={inline ? { position: "static" } : { position: "absolute", top: "calc(100% + 8px)", left: 0 }}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.preventDefault();
          if (statusOpen) setStatusOpen(false);
          else onClose(true);
        }
      }}
    >
      <div className="mcal-head">
        <button type="button" className="sp-icn" aria-label="Previous month" onClick={() => shift(-1)}>
          <Ic n="cleft" s={14} />
        </button>
        <button
          type="button"
          className={`mcal-title${monthPick ? " open" : ""}`}
          aria-expanded={monthPick}
          aria-label={`Choose month and year, currently ${MONTHS[month.getMonth()]} ${month.getFullYear()}`}
          onClick={() => {
            setMonthPick((p) => !p);
            setStatusOpen(false);
          }}
        >
          <b>{MONTHS[month.getMonth()]}</b>
          <span>{month.getFullYear()}</span>
          <Ic n="down" s={12} />
        </button>
        <button type="button" className="sp-icn" aria-label="Next month" onClick={() => shift(1)}>
          <Ic n="cright" s={14} />
        </button>
      </div>

      {monthPick ? (
        <div className="mcal-months" role="group" aria-label="Choose month and year">
          <div className="mcal-yr">
            <button type="button" className="sp-icn" aria-label="Previous year" onClick={() => shift(-12)}>
              <Ic n="cleft" s={13} />
            </button>
            <b>{month.getFullYear()}</b>
            <button type="button" className="sp-icn" aria-label="Next year" onClick={() => shift(12)}>
              <Ic n="cright" s={13} />
            </button>
          </div>
          <div className="mcal-mgrid">
            {MONTHS.map((name, i) => {
              const on = i === month.getMonth();
              const now = i === TODAY.getMonth() && month.getFullYear() === TODAY.getFullYear();
              return (
                <button
                  key={name}
                  type="button"
                  className={`mcal-m${on ? " on" : ""}${now ? " now" : ""}`}
                  aria-pressed={on}
                  onClick={() => {
                    setMonth(new Date(month.getFullYear(), i, 1));
                    setMonthPick(false);
                  }}
                >
                  {name.slice(0, 3)}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <>
          <div className="mcal-presets" role="group" aria-label="Range presets">
            {presets.map((p) => {
              const on = p.from === from && p.to === to;
              return (
                <button
                  key={p.k}
                  type="button"
                  className={`mcal-preset${on ? " on" : ""}`}
                  aria-pressed={on}
                  onClick={() => {
                    setDraft({ from: p.from, to: p.to, phase: "done" });
                    setMonth(new Date(parse(p.from).getFullYear(), parse(p.from).getMonth(), 1));
                  }}
                >
                  {p.label}
                </button>
              );
            })}
          </div>

          <div className="mc-dd">
            <button
              type="button"
              className={`selbox mc-ddbtn${statusOpen ? " open" : ""}${status ? " has" : ""}`}
              aria-haspopup="menu"
              aria-expanded={statusOpen}
              onClick={() => setStatusOpen((o) => !o)}
            >
              <i className={`mc-status-swatch ${curStatus ? curStatus.cls : "all"}`} />
              <span className="lbl">{status || "All statuses"}</span>
              <b className="mc-ddn">
                {visibleTotal} schedule{visibleTotal === 1 ? "" : "s"}
              </b>
              <Ic n="down" s={12} />
            </button>
            {statusOpen && (
              <div className="mc-ddlist" role="menu">
                {[{ k: "", label: "All statuses", cls: "all", n: allTotal }, ...STATUSES.map((s) => ({ k: s.k, label: s.k, cls: s.cls, n: totals[s.k] || 0 }))].map((it) => {
                  const on = (status || "") === it.k;
                  return (
                    <button
                      key={it.label}
                      type="button"
                      className={`mc-dditem${on ? " on" : ""}`}
                      role="menuitemradio"
                      aria-checked={on}
                      onClick={() => {
                        setStatus(it.k || null);
                        setStatusOpen(false);
                      }}
                    >
                      <i className={`mc-status-swatch ${it.cls}`} />
                      <span>{it.label}</span>
                      <b>{it.n}</b>
                      {on && <Ic n="checkmini" s={13} />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div ref={gridRef} className="mcal" role="grid" aria-label={`${MONTHS[month.getMonth()]} ${month.getFullYear()}`} onKeyDown={gridKey}>
            <div className="mcal-row mcal-headrow" role="row">
              <span className="mcal-wk" role="columnheader" title="ISO week number">
                Wk
              </span>
              {DOWSHORT.map((d, i) => (
                <span key={d} className="mcal-dow" role="columnheader" title={DOWLONG[i]}>
                  {d}
                </span>
              ))}
            </div>
            {rows.map((r, ri) => (
              <div key={ri} className="mcal-row" role="row">
                <span className="mcal-wk" role="rowheader">
                  {r.wk}
                </span>
                {r.cells.map((iso, ci) => {
                  if (!iso) return <span key={ci} className="mcd-blank" role="gridcell" />;
                  const day = dayOf(iso), n = total(day), st = state(iso);
                  const present = STATUSES.filter((s) => day[s.k]);
                  const dim = !!(status && !day[status as keyof Day]);
                  const pct = n ? Math.round(32 + 68 * (n / Math.max(1, max))) : 0;
                  const count = n ? `${n} schedule${n === 1 ? "" : "s"}` : "No schedules";
                  const statusText = present.map((s) => `${s.k}: ${day[s.k]}`).join(", ");
                  const cls = ["mcd", st.selected && "on", st.inRange && "inrange", iso === TODAY_ISO && "today", dim && "dim"].filter(Boolean).join(" ");
                  return (
                    <button
                      key={iso}
                      type="button"
                      className={cls}
                      role="gridcell"
                      tabIndex={iso === tab ? 0 : -1}
                      title={n ? `${count} · ${statusText}` : count}
                      aria-label={`${fmtLong(parse(iso))}${iso === TODAY_ISO ? ", today" : ""}${st.selected ? ", selected" : ""}, ${count}${n ? `, ${statusText}` : ""}`}
                      aria-current={iso === TODAY_ISO ? "date" : undefined}
                      onClick={() => pick(iso)}
                    >
                      <span className="mcd-n">{parse(iso).getDate()}</span>
                      <span className="mcd-load" aria-hidden="true">
                        {n > 0 && (
                          <span className="mcd-fill" style={{ width: `${pct}%` }}>
                            {present.map((s) => (
                              <i key={s.k} className={`mcd-seg ${s.cls}`} style={{ flex: day[s.k] }} />
                            ))}
                          </span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {picking ? (
            <div className="mcal-foot picking" aria-live="polite">
              <span className="mcal-foot-main">
                <b>{fmtShort(parse(from))}</b>
                <span>Now pick the end date</span>
              </span>
            </div>
          ) : (
            <div className="mcal-foot" aria-live="polite">
              <span className="mcal-foot-main">
                <b>{label}</b>
                <span>
                  {days} day{days === 1 ? "" : "s"}
                </span>
              </span>
              <span className="mcal-foot-n">{rangeCount(from, to)} in range</span>
            </div>
          )}
        </>
      )}

      <div className="report-range-actions">
        <button
          type="button"
          className="btn btn-sm btn-ghost"
          onClick={() => {
            setDraft({ ...CYCLE, phase: "done" });
            setMonth(new Date(parse(CYCLE.from).getFullYear(), parse(CYCLE.from).getMonth(), 1));
          }}
        >
          Reset
        </button>
        <button type="button" className="btn btn-sm btn-primary" disabled={!(from && to)} onClick={() => onApply({ from, to })}>
          Apply range
        </button>
      </div>
    </div>
  );
}

/* ---- range control -------------------------------------------------------- */

export function DateRangeDemo({ startOpen = false }: { startOpen?: boolean }) {
  const [range, setRange] = useState(CYCLE);
  const [pickerOpen, setPickerOpen] = useState(startOpen);
  const [granOpen, setGranOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const rangeBtn = useRef<HTMLButtonElement>(null);
  const granBtn = useRef<HTMLButtonElement>(null);
  const granMenu = useRef<HTMLDivElement>(null);
  const byUser = useRef(false);

  useOutside([wrapRef], pickerOpen || granOpen, () => {
    setPickerOpen(false);
    setGranOpen(false);
  });
  useEffect(() => {
    if (granOpen) granMenu.current?.querySelector("button")?.focus();
  }, [granOpen]);

  const days = lengthOf(range);
  const shiftRange = (dir: number) => {
    const f = addDays(parse(range.from), days * dir);
    setRange({ from: isoOf(f), to: isoOf(addDays(f, days - 1)) });
  };
  const setLength = (n: number) => {
    setRange({ from: range.from, to: isoOf(addDays(parse(range.from), n - 1)) });
    setGranOpen(false);
    granBtn.current?.focus();
  };

  return (
    <div ref={wrapRef} style={{ position: "relative", display: "inline-block" }}>
      <div className="dpill flexible-range" role="group" aria-label="List date range">
        <button type="button" className="dp-nav" aria-label="Previous range" onClick={() => shiftRange(-1)}>
          <Ic n="cleft" s={15} />
        </button>
        <button
          ref={granBtn}
          type="button"
          className={`dp-gran${granOpen ? " trigger-open" : ""}`}
          aria-haspopup="menu"
          aria-expanded={granOpen}
          aria-label={`Range length: ${lengthLabel(days)}. Change`}
          onClick={() => {
            setPickerOpen(false);
            setGranOpen((o) => !o);
          }}
        >
          {lengthLabel(days)}
          <Ic n="down" s={11} />
        </button>
        <button
          ref={rangeBtn}
          type="button"
          className={`dp-range${pickerOpen ? " trigger-open" : ""}`}
          aria-haspopup="dialog"
          aria-expanded={pickerOpen}
          aria-label={`Period ${rangeText(range)}. Pick dates`}
          onClick={() => {
            setGranOpen(false);
            byUser.current = true;
            setPickerOpen((o) => !o);
          }}
        >
          {rangeText(range)}
        </button>
        <button type="button" className="dp-nav" aria-label="Next range" onClick={() => shiftRange(1)}>
          <Ic n="cright" s={15} />
        </button>
      </div>
      {granOpen && (
        <div
          ref={granMenu}
          className="menu"
          role="menu"
          aria-label="Range length"
          style={{ position: "absolute", top: "calc(100% + 6px)", left: 30 }}
          onKeyDown={(e) => {
            const items = [...(granMenu.current?.querySelectorAll<HTMLButtonElement>("button") ?? [])];
            const i = items.indexOf((granMenu.current?.getRootNode() as ShadowRoot | Document).activeElement as HTMLButtonElement);
            if (e.key === "ArrowDown") {
              e.preventDefault();
              (items[i + 1] || items[0]).focus();
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              (items[i - 1] || items[items.length - 1]).focus();
            } else if (e.key === "Escape") {
              e.preventDefault();
              setGranOpen(false);
              granBtn.current?.focus();
            }
          }}
        >
          {[
            ["Week · 2 weeks", 14],
            ["1 week", 7],
            ["4 weeks", 28],
          ].map(([l, n]) => (
            <button key={l} type="button" role="menuitem" onClick={() => setLength(n as number)}>
              {l}
            </button>
          ))}
        </div>
      )}
      {pickerOpen && (
        <RangePicker
          initial={range}
          focusOnOpen={byUser.current}
          onApply={(r) => {
            setRange(r);
            setPickerOpen(false);
            rangeBtn.current?.focus();
          }}
          onClose={(restore) => {
            setPickerOpen(false);
            if (restore) rangeBtn.current?.focus();
          }}
        />
      )}
    </div>
  );
}

/** The month picker on its own, in normal flow, for measuring. */
export function MonthPickerSheet() {
  return <RangePicker initial={CYCLE} focusOnOpen={false} inline onApply={() => {}} onClose={() => {}} />;
}
