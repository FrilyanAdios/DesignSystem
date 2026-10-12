"use client";

import { useEffect, useRef, useState } from "react";
import { Ic } from "@/components/demo/Ic";
import { SNACK_STYLE, TOAST_STYLE } from "./toast.styles";

/* ---------------------------------------------------------------------------
   Toast demos. Web: toast(m) in NPD-FSM/script.js — its inline styles are
   copied verbatim. Mobile: snack(msg) in FSM-Mobile/js/ui.js with the
   .snackbar rules from FSM-Mobile/css/styles.css (not in the demo stylesheet,
   so they are written inline here).
   --------------------------------------------------------------------------- */

function useTimedMessage(ms: number) {
  const [msg, setMsg] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);
  const show = (m: string) => {
    setMsg(m);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setMsg(""), ms);
  };
  return [msg, show] as const;
}

/** Web: press an action, read the toast for 2.2 seconds. */
export function ToastDemo() {
  const [msg, show] = useTimedMessage(2200);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", alignItems: "flex-start", width: "100%", minHeight: 150 }}>
      <button type="button" className="btn btn-primary" onClick={() => show("Schedule note saved")}>
        Save note
      </button>
      <button type="button" className="btn" onClick={() => show("12 records exported")}>
        <Ic n="download" s={14} />
        Export all
      </button>
      <button type="button" className="btn" onClick={() => show("3 notifications moved to history")}>
        Clear notifications
      </button>
      {/* the live region exists before the message, so screen readers announce it */}
      <div role="status" aria-live="polite" aria-atomic="true">
        {msg && <div style={TOAST_STYLE}>{msg}</div>}
      </div>
    </div>
  );
}

const PHONE: React.CSSProperties = {
  width: 320,
  height: 460,
  margin: "0 auto",
  border: "1px solid var(--border)",
  borderRadius: 24,
  background: "#fff",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
};

/** Mobile: the snackbar takes its own row above the bottom navigation. */
export function SnackbarDemo() {
  const [msg, show] = useTimedMessage(2600);
  return (
    <div style={PHONE}>
      <div style={{ padding: "16px 16px 8px", fontSize: 18, fontWeight: 600, color: "var(--fg)" }}>Schedule</div>
      <div style={{ flex: 1, minHeight: 0, overflow: "auto", padding: "0 16px", display: "flex", flexDirection: "column", gap: 8 }}>
        {["WO-2422 · Lumière Innovations", "WO-2415 · Lumière Innovations", "WO-2402 · Bio Vantis Technologies", "WO-2396 · Helix Biomed"].map((t) => (
          <div key={t} style={{ border: "1px solid var(--border)", borderRadius: 12, padding: "12px 14px", fontSize: 13, color: "var(--fg-2)" }}>
            {t}
          </div>
        ))}
        <button type="button" className="btn btn-primary" style={{ marginTop: 4 }} onClick={() => show("Schedule note saved")}>
          Save note
        </button>
      </div>
      <div role="status" aria-live="polite" aria-atomic="true">
        {msg && (
          <div style={SNACK_STYLE}>
            <span style={{ color: "#7FD1A8", display: "flex" }}>
              <Ic n="check" s={19} />
            </span>
            <span>{msg}</span>
          </div>
        )}
      </div>
      <nav
        aria-label="Main navigation"
        style={{ display: "flex", justifyContent: "space-around", borderTop: "1px solid var(--border)", padding: "8px 8px 12px", fontSize: 12, color: "var(--fg-3)" }}
      >
        <span>Today</span>
        <span>Modules</span>
        <span>Notifications</span>
        <span>Profile</span>
      </nav>
    </div>
  );
}
