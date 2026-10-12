"use client";

import { useEffect, useRef, useState } from "react";
import { Ic } from "@/components/demo/Ic";
import { NOTIF_THEME_CSS, SAMPLE, type Notif } from "./notification.theme";

/* ---------------------------------------------------------------------------
   Notification demos. Markup mirrors notifCardHTML() and renderNotifPanel() in
   NPD-FSM/script.js; the look comes from styles.css plus the notif.css layer.
   --------------------------------------------------------------------------- */

/** The notif.css layer. Put it once inside every notification example. */
export function NotifTheme() {
  return <style>{NOTIF_THEME_CSS}</style>;
}

const desc = (n: Notif) => (n.wo ? `${n.wo} · ${n.cust}` : n.by ? `${n.by} at ${n.cust}` : n.cust);

/** One notification row, as notifCardHTML() renders it. */
export function NotifCard({
  n,
  ctx = "panel",
  selecting = false,
  picked = false,
  onActivate,
}: {
  n: Notif;
  ctx?: "panel" | "history";
  selecting?: boolean;
  picked?: boolean;
  onActivate?: () => void;
}) {
  const aria = `${n.unread ? "Unread. " : ""}${n.title}. ${desc(n)}. ${n.time}. ${
    selecting ? (picked ? "Selected. Press to deselect." : "Press to select.") : "Press to open."
  }`;
  const cls = ["ncard", n.unread && "unread", picked && "picked", selecting && "selecting"].filter(Boolean).join(" ");
  return (
    <div
      className={cls}
      tabIndex={0}
      role={selecting ? "checkbox" : "button"}
      aria-checked={selecting ? picked : undefined}
      aria-label={aria}
      onClick={onActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onActivate?.();
        }
      }}
    >
      {selecting && (
        <span className="ncard-pick">
          <input type="checkbox" tabIndex={-1} checked={picked} readOnly aria-hidden="true" />
        </span>
      )}
      <span className="ncard-ic">
        <Ic n={n.icon} s={17} />
      </span>
      <div className="ncard-main">
        <div className="ncard-t">{n.title}</div>
        <div className="ncard-desc">{desc(n)}</div>
        <div className="ncard-time">
          {n.time}
          {ctx === "history" && (
            <>
              <span className="ncard-sep">·</span>In history
            </>
          )}
        </div>
      </div>
      <span className="ncard-right">
        {n.unread && <span className="ncard-flag" aria-hidden="true" />}
        <button type="button" className="ncard-more" aria-label={`Actions for ${n.title}`} onClick={(e) => e.stopPropagation()}>
          <Ic n="more" s={15} />
        </button>
      </span>
    </div>
  );
}

/* the product toast: toast(m) in script.js, inline styles verbatim */
const TOAST_STYLE: React.CSSProperties = {
  position: "fixed",
  bottom: 24,
  left: "50%",
  transform: "translateX(-50%)",
  background: "#11202c",
  color: "#fff",
  padding: "11px 18px",
  borderRadius: 8,
  fontSize: 13,
  zIndex: 90,
  boxShadow: "var(--shadow-lg)",
  whiteSpace: "nowrap",
};

const PANEL_IN_PLACE: React.CSSProperties = { position: "absolute", top: 64, right: 0 };

/** Bell, panel, action bar, selecting mode, clear to history — the whole loop. */
export function NotificationPanelDemo() {
  const [open, setOpen] = useState(true);
  const [rows, setRows] = useState<Notif[]>(SAMPLE);
  const [history, setHistory] = useState(9);
  const [selMode, setSelMode] = useState(false);
  const [sel, setSel] = useState<Set<number>>(new Set());
  const [msg, setMsg] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const toast = (m: string) => {
    setMsg(m);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setMsg(""), 2200);
  };
  const plural = (n: number) => `${n} notification${n === 1 ? "" : "s"}`;
  const unread = rows.filter((r) => r.unread).length;
  const picked = sel.size;
  const allPicked = rows.length > 0 && picked === rows.length;

  const exitSel = () => {
    setSelMode(false);
    setSel(new Set());
  };
  const markAll = () => {
    setRows((r) => r.map((x) => ({ ...x, unread: false })));
    toast(unread ? `${plural(unread)} marked as read` : "Nothing unread");
  };
  const clearAll = () => {
    setHistory((h) => h + rows.length);
    toast(`${plural(rows.length)} moved to history`);
    setRows([]);
    exitSel();
  };
  const bulkRead = () => {
    setRows((r) => r.map((x) => (sel.has(x.id) ? { ...x, unread: false } : x)));
    toast(`${plural(picked)} marked as read`);
    exitSel();
  };
  const bulkClear = () => {
    setRows((r) => r.filter((x) => !sel.has(x.id)));
    setHistory((h) => h + picked);
    toast(`${plural(picked)} moved to history`);
    exitSel();
  };
  const toggle = (id: number) =>
    setSel((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  const openRow = (id: number) => setRows((r) => r.map((x) => (x.id === id ? { ...x, unread: false } : x)));

  return (
    <div style={{ position: "relative", width: "100%", minHeight: 600 }}>
      <NotifTheme />
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
        <button
          type="button"
          className="btn btn-sm"
          onClick={() => {
            setRows(SAMPLE);
            setHistory(9);
            exitSel();
            setOpen(true);
          }}
        >
          Reset demo
        </button>
        <button
          type="button"
          className="tb-bell"
          aria-label={unread ? `Notifications — ${unread} unread` : "Notifications"}
          aria-expanded={open}
          onClick={() => {
            setOpen((o) => !o);
            exitSel();
          }}
        >
          <span className={`bell-badge${unread ? " on" : ""}`} aria-hidden="true">
            {unread > 99 ? "99+" : unread}
          </span>
          <Ic n="bell" s={18} />
        </button>
      </div>

      {open && (
        <div className="notif-panel" role="dialog" aria-label="Notifications" style={PANEL_IN_PLACE}>
          <div className="notif-head">
            <span className="t">Notifications</span>
            {unread > 0 && <span className="notif-head-n">{unread} new</span>}
            <button type="button" className="notif-head-link" onClick={() => toast("History opens in the history view")}>
              View history{history ? ` (${history})` : ""}
            </button>
            <button type="button" className="sp-icn sm" aria-label="Close notifications" onClick={() => setOpen(false)}>
              <Ic n="x" s={15} />
            </button>
          </div>

          {selMode ? (
            <div className="notif-actions selecting" role="region" aria-label="Selection actions">
              <button
                type="button"
                className="notif-selall"
                aria-pressed={allPicked}
                onClick={() => setSel(allPicked ? new Set() : new Set(rows.map((r) => r.id)))}
              >
                <span className={`notif-selall-box${allPicked ? " on" : ""}`} aria-hidden="true">
                  {allPicked && <Ic n="checkmini" s={11} />}
                </span>
                {picked ? `${picked} selected` : "Select all"}
              </button>
              <span className="notif-actions-sp" />
              <button type="button" className="notif-act" disabled={!picked} aria-disabled={!picked || undefined} onClick={bulkRead}>
                <Ic n="checkmini" s={14} />
                <span>Mark as read</span>
              </button>
              <button type="button" className="notif-act" disabled={!picked} aria-disabled={!picked || undefined} onClick={bulkClear}>
                <Ic n="trash" s={14} />
                <span>Clear</span>
              </button>
              <button type="button" className="notif-act icon ghost tip" data-tip="Cancel selection" aria-label="Cancel selection" onClick={exitSel}>
                <Ic n="x" s={15} />
              </button>
            </div>
          ) : (
            <div className="notif-actions" role="region" aria-label="Notification actions">
              <button type="button" className="notif-act" disabled={!unread} aria-disabled={!unread || undefined} onClick={markAll}>
                <Ic n="checkmini" s={14} />
                <span>Mark all as read</span>
              </button>
              <button type="button" className="notif-act" disabled={!rows.length} aria-disabled={!rows.length || undefined} onClick={clearAll}>
                <Ic n="trash" s={14} />
                <span>Clear notifications</span>
              </button>
              <span className="notif-actions-sp" />
              <button
                type="button"
                className="notif-act icon ghost tip"
                data-tip="Select notifications"
                aria-label="Select notifications"
                disabled={!rows.length}
                onClick={() => {
                  setSelMode(true);
                  setSel(new Set());
                }}
              >
                <Ic n="checkmini" s={15} />
              </button>
            </div>
          )}

          <div className="notif-body">
            {rows.length ? (
              rows.map((n) => (
                <NotifCard
                  key={n.id}
                  n={n}
                  selecting={selMode}
                  picked={sel.has(n.id)}
                  onActivate={() => (selMode ? toggle(n.id) : openRow(n.id))}
                />
              ))
            ) : (
              <div className="notif-empty">
                <span className="notif-empty-ic">
                  <Ic n="bell" s={22} />
                </span>
                <h4>You&apos;re all caught up</h4>
                <p>New notifications show up here. Cleared ones stay in history.</p>
                {history > 0 && (
                  <button type="button" className="btn btn-sm" onClick={() => toast("History opens in the history view")}>
                    <Ic n="list" s={13} /> Open history ({history})
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div role="status" aria-live="polite" aria-atomic="true">
        {msg && <div style={TOAST_STYLE}>{msg}</div>}
      </div>
    </div>
  );
}
