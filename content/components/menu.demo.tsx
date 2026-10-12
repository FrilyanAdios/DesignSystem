"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Ic } from "@/components/demo/Ic";

/* ---------------------------------------------------------------------------
   Interactive menu demos, rendered inside the ProductDemo shadow root.
   - Markup follows NPD-FSM/script.js: openScheduleMenu() and openStatusMenu()
     (.mgmt-menu), openEntityMenu() (.menu.entity-menu), and wo/wo-list.js
     woOpenTableMenu() (.menu.wo-menu). The `.wo-menu` rules live in wo/wo.css,
     which the demo stage does not load, so <WoMenuStyle /> injects them verbatim.
     Adopted sheets cascade after <style>, which matches the product: styles.css
     loads after wo.css, so .menu wins on equal specificity there too.
   - Keyboard follows the WAI-ARIA menu button pattern: arrows move, Home/End
     jump, Escape closes and returns focus to the trigger, Tab closes.
   - Positions are inline as in the product; `absolute` replaces `fixed` so the
     panel sits next to its trigger inside the demo.
   --------------------------------------------------------------------------- */

const WO_MENU_CSS = `
.wo-menu{min-width:220px;max-width:320px;max-height:70vh;overflow-y:auto}
.wo-menu button{display:flex;align-items:center;gap:var(--wo-s2);width:100%;text-align:left}
.wo-menu button.on{color:var(--primary);font-weight:600}
.wo-menu-sep{height:1px;background:var(--border-2);margin:var(--wo-s1) 0}
.wo-menu-head{font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--fg-4);padding:8px 12px 4px}
`;

const FOCUS_CSS = `
.menu button:focus-visible,.mgmt-menu button:focus-visible{outline:2px solid var(--primary);outline-offset:-2px}
`;

const ITEM = '[role^="menuitem"]:not([hidden]):not([disabled])';

type Target = "first" | "last" | "checked" | null;

function useMenu() {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const target = useRef<Target>(null);

  const items = () => [...(menu.current?.querySelectorAll<HTMLElement>(ITEM) ?? [])];
  const activeEl = () => (menu.current?.getRootNode() as ShadowRoot | Document | undefined)?.activeElement;

  useEffect(() => {
    if (!open) return;
    const list = items();
    const t = target.current;
    const el =
      t === "last" ? list[list.length - 1] : t === "checked" ? list.find((x) => x.getAttribute("aria-checked") === "true") ?? list[0] : list[0];
    if (t) el?.focus();
    const onDown = (e: PointerEvent) => {
      if (wrap.current && !e.composedPath().includes(wrap.current)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  const show = (t: Target) => {
    target.current = t;
    setOpen(true);
  };
  const close = (refocus = true) => {
    setOpen(false);
    if (refocus) trigger.current?.focus();
  };

  const onTriggerClick = (initial: Target = "first") => (open ? close(false) : show(initial));
  const onTriggerKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      show("first");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      show("last");
    }
  };

  /** keyboard inside the menu; `from` limits arrow movement to one list */
  const onMenuKey = (e: React.KeyboardEvent) => {
    const list = items();
    const i = list.indexOf(activeEl() as HTMLElement);
    const go = (n: number) => {
      e.preventDefault();
      list[(n + list.length) % list.length]?.focus();
    };
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "Tab") close(false);
    else if (e.key === "ArrowDown") go(i + 1);
    else if (e.key === "ArrowUp") go(i < 0 ? list.length - 1 : i - 1);
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(list.length - 1);
  };

  return { open, wrap, trigger, menu, close, onTriggerClick, onTriggerKey, onMenuKey, items };
}

const anchor: React.CSSProperties = { position: "relative", display: "inline-block" };

/* ---- kebab: Manage schedule (script.js openScheduleMenu) ------------------ */

export function ScheduleMenuDemo() {
  const m = useMenu();
  const menuId = useId();
  const run = () => m.close();

  return (
    <div ref={m.wrap} style={anchor}>
      <style>{FOCUS_CSS}</style>
      <button
        ref={m.trigger}
        type="button"
        className="sp-icn sm"
        aria-label="Manage schedule"
        title="Manage schedule"
        aria-haspopup="menu"
        aria-expanded={m.open}
        aria-controls={m.open ? menuId : undefined}
        onClick={() => m.onTriggerClick()}
        onKeyDown={m.onTriggerKey}
      >
        <Ic n="more" s={15} />
      </button>
      {m.open && (
        <div
          ref={m.menu}
          id={menuId}
          className="mgmt-menu"
          role="menu"
          aria-label="Manage schedule"
          style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, width: 250 }}
          onKeyDown={m.onMenuKey}
        >
          <div className="mgmt-h" aria-hidden="true">
            Manage schedule
          </div>
          <button type="button" role="menuitem" tabIndex={-1} onClick={run}>
            Add work order
          </button>
          <button type="button" role="menuitem" tabIndex={-1} onClick={run}>
            Email schedule details
          </button>
          <div className="mgmt-div" role="separator" />
          <button type="button" role="menuitem" tabIndex={-1} onClick={run}>
            Close schedule
          </button>
          <button type="button" className="danger" role="menuitem" tabIndex={-1} onClick={run}>
            Cancel schedule
          </button>
        </div>
      )}
    </div>
  );
}

/* ---- status selector (DESIGN_SYSTEM .statectl + script.js openStatusMenu) - */

const STATUSES = [
  { k: "Tentative", tone: "revision" },
  { k: "Confirmed", tone: "issued" },
] as const;

export function StatusMenuDemo() {
  const m = useMenu();
  const menuId = useId();
  const [status, setStatus] = useState<(typeof STATUSES)[number]>(STATUSES[0]);

  return (
    <div ref={m.wrap} style={anchor}>
      <style>{FOCUS_CSS}</style>
      <button
        ref={m.trigger}
        type="button"
        className={`statectl b-${status.tone}`}
        aria-haspopup="menu"
        aria-expanded={m.open}
        aria-controls={m.open ? menuId : undefined}
        aria-label={`Schedule status: ${status.k}. Change status`}
        onClick={() => m.onTriggerClick("checked")}
        onKeyDown={m.onTriggerKey}
      >
        <span className="d" />
        {status.k}
        <Ic n="down" s={12} />
      </button>
      {m.open && (
        <div
          ref={m.menu}
          id={menuId}
          className="mgmt-menu stm"
          role="menu"
          aria-label="Schedule status"
          style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, width: 232 }}
          onKeyDown={m.onMenuKey}
        >
          <div className="mgmt-h" aria-hidden="true">
            Schedule status
          </div>
          {STATUSES.map((s) => {
            const on = s.k === status.k;
            return (
              <button
                key={s.k}
                type="button"
                role="menuitemradio"
                aria-checked={on}
                tabIndex={-1}
                className={on ? "on" : undefined}
                onClick={() => {
                  setStatus(s);
                  m.close();
                }}
              >
                <span className={`stm-dot st-${s.tone}`} />
                {s.k}
                {on && <Ic n="checkmini" s={13} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ---- table overflow (wo/wo-list.js woOpenTableMenu) ----------------------- */

export function TableOverflowDemo() {
  const m = useMenu();
  const menuId = useId();
  const headId = useId();
  const [density, setDensity] = useState<"comfortable" | "compact">("comfortable");
  const [filterRow, setFilterRow] = useState(false);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <style>{WO_MENU_CSS + FOCUS_CSS}</style>
      <button type="button" className="btn btn-sm export-btn">
        <Ic n="download" s={14} />
        Export all
      </button>
      <button type="button" className="icon-btn" aria-label="Table settings" title="Table settings">
        <Ic n="gear" s={16} />
      </button>
      <div ref={m.wrap} style={anchor}>
        <button
          ref={m.trigger}
          type="button"
          className="icon-btn"
          aria-label="More table options"
          title="More table options"
          aria-haspopup="menu"
          aria-expanded={m.open}
          aria-controls={m.open ? menuId : undefined}
          onClick={() => m.onTriggerClick()}
          onKeyDown={m.onTriggerKey}
        >
          <Ic n="more" s={16} />
        </button>
        {m.open && (
          <div
            ref={m.menu}
            id={menuId}
            className="menu wo-menu"
            role="menu"
            aria-label="More table options"
            style={{ position: "absolute", top: "calc(100% + 6px)", right: 0 }}
            onKeyDown={m.onMenuKey}
          >
            <div role="group" aria-labelledby={headId}>
              <div className="wo-menu-head" id={headId}>
                Row height
              </div>
              {(
                [
                  ["comfortable", "Comfortable", "grid"],
                  ["compact", "Compact", "list"],
                ] as const
              ).map(([k, label, icon]) => (
                <button
                  key={k}
                  type="button"
                  role="menuitemradio"
                  aria-checked={density === k}
                  tabIndex={-1}
                  className={density === k ? "on" : undefined}
                  onClick={() => {
                    setDensity(k);
                    m.close();
                  }}
                >
                  <Ic n={icon} s={14} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
            <div className="wo-menu-sep" role="separator" />
            <button
              type="button"
              role="menuitem"
              tabIndex={-1}
              onClick={() => {
                setFilterRow(!filterRow);
                m.close();
              }}
            >
              <Ic n="table" s={14} />
              <span>{filterRow ? "Hide column filter row" : "Show column filter row"}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---- entity menu with type-to-narrow (script.js openEntityMenu) ----------- */

const ENTITIES = [
  "Esco Micro Pte. Ltd.",
  "PT Esco Utama",
  "Esco Micro (M) Sdn. Bhd.",
  "Esco Philippines, Inc.",
  "Esco Lifesciences (Thailand) Co., Ltd.",
  "Esco Vietnam Company Ltd.",
  "Esco Lifesciences GmbH",
  "Esco GB Ltd.",
  "Esco Technologies, Inc.",
];

export function EntityMenuDemo() {
  const m = useMenu();
  const [entity, setEntity] = useState(ENTITIES[0]);
  const [q, setQ] = useState("");
  const panelId = useId();
  const search = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (m.open) search.current?.focus();
    else setQ("");
  }, [m.open]);

  const shown = ENTITIES.filter((n) => n.toLowerCase().includes(q.trim().toLowerCase()));

  return (
    <div ref={m.wrap} style={anchor}>
      <style>{FOCUS_CSS}</style>
      <button
        ref={m.trigger}
        type="button"
        className={`selbox${m.open ? " trigger-open" : ""}`}
        aria-haspopup="dialog"
        aria-expanded={m.open}
        aria-controls={m.open ? panelId : undefined}
        aria-label={`Entity: ${entity}. Change entity`}
        onClick={() => m.onTriggerClick(null)}
      >
        <Ic n="building" s={14} />
        <span>{entity}</span>
        <Ic n="down" s={12} />
      </button>
      {m.open && (
        <div
          ref={m.menu}
          id={panelId}
          className="menu entity-menu"
          role="dialog"
          aria-label="Entity"
          style={{ position: "absolute", top: "calc(100% + 6px)", left: 0 }}
          onKeyDown={(e) => {
            const inSearch = e.target === search.current;
            if (inSearch && e.key === "ArrowDown") {
              e.preventDefault();
              m.items()[0]?.focus();
            } else if (!inSearch || e.key === "Escape" || e.key === "Tab") m.onMenuKey(e);
          }}
        >
          <div className="em-search">
            <Ic n="search" s={14} />
            <input
              ref={search}
              className="finp"
              placeholder="Search entity…"
              aria-label="Search entity"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <div className="em-list" role="menu" aria-label="Entities">
            {ENTITIES.map((n) => {
              const on = n === entity;
              return (
                <button
                  key={n}
                  type="button"
                  className={`sf-ent${on ? " on" : ""}`}
                  role="menuitemradio"
                  aria-checked={on}
                  tabIndex={-1}
                  hidden={!shown.includes(n)}
                  onClick={() => {
                    setEntity(n);
                    m.close();
                  }}
                >
                  <span>{n}</span>
                  {on && <Ic n="checkmini" s={14} />}
                </button>
              );
            })}
          </div>
          <div className="em-empty" role="status" hidden={shown.length > 0}>
            No entity matches
          </div>
        </div>
      )}
    </div>
  );
}

/** The `.wo-menu` rules from wo/wo.css, for static examples and measurements. */
export function WoMenuStyle() {
  return <style>{WO_MENU_CSS}</style>;
}
