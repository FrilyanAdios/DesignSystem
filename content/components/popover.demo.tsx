"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Ic } from "@/components/demo/Ic";

/* ---------------------------------------------------------------------------
   Interactive popover demos, rendered inside the ProductDemo shadow root.
   - `.sr-pop` lives in NPD-FSM/sr/sr.css, which the demo stage does not load,
     so <SrPopStyle /> injects those rules verbatim (sr.css lines 183–194, 622).
     Adopted sheets cascade after <style>, which matches the product: styles.css
     loads after sr.css, so its .sr-pop-h header rules win there too.
   - Behavior follows DESIGN_SYSTEM.md › Popovers and menus and sr-core.js srMenu():
     anchored to the trigger, trigger stays visibly open, click outside and
     Escape close, focus returns to the trigger.
   - Positions are inline, as in the product; `absolute` replaces the product's
     `fixed` so the panel sits next to its trigger inside the demo.
   --------------------------------------------------------------------------- */

const SR_POP_CSS = `
.sr-pop { position: fixed; z-index: 75; background: #fff; border: 1px solid var(--border); border-radius: var(--radius-card); box-shadow: var(--shadow-lg); overflow: hidden; display: flex; flex-direction: column; animation: fade 0.12s ease; }
.sr-pop-h { display: flex; align-items: center; gap: 8px; padding: var(--sp-3) var(--sp-4); border-bottom: 1px solid var(--border); font-size: 12.5px; font-weight: 600; color: var(--fg); flex-shrink: 0; }
.sr-pop-clear { margin-left: auto; font-size: 11.5px; font-weight: 600; color: var(--primary); background: none; }
.sr-pop-clear:hover { text-decoration: underline; }
.sr-pop-b { padding: 8px; overflow-y: auto; display: flex; flex-direction: column; gap: 2px; }
.sr-opt { display: flex; align-items: flex-start; gap: 11px; width: 100%; text-align: left; padding: 11px 12px; border-radius: var(--radius-field); }
.sr-opt:hover { background: var(--muted); }
.sr-radio { width: 16px; height: 16px; border-radius: 50%; border: 1.5px solid var(--border-dash); flex-shrink: 0; margin-top: 1px; }
.sr-opt.on .sr-radio { border-color: var(--primary); border-width: 5px; }
.sr-opt-t b { display: block; font-size: 13px; font-weight: 500; color: var(--fg); }
.sr-opt-t em { display: block; font-style: normal; font-size: 11.5px; color: var(--fg-3); margin-top: 3px; line-height: 1.5; }
.sr-opt.on .sr-opt-t b { font-weight: 600; }
.sr-pop{border-radius:10px;box-shadow:var(--shadow-lg)}.sr-pop-h{min-height:48px;padding:12px 16px;font-size:13px}.sr-opt{min-height:44px}
.sr-opt:focus-visible{outline:2px solid var(--primary);outline-offset:-2px}
`;

/** The Service Report popover rules from sr/sr.css, for demos only. */
export function SrPopStyle() {
  return <style>{SR_POP_CSS}</style>;
}

/** open state, outside-click close, focus back to the trigger */
function useAnchored() {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (wrap.current && !e.composedPath().includes(wrap.current)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  const close = () => {
    setOpen(false);
    trigger.current?.focus();
  };
  const onPanelKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  };
  return { open, setOpen, wrap, trigger, panel, close, onPanelKey };
}

/* ---- quick choice: Report template (sr-detail.js srTemplatePop) ----------- */

const TEMPLATES = ["Default Template", "Template with Test Summary", "UK / Europe Template", "Customer Copy (no pricing)"];

export function TemplatePopoverDemo() {
  const { open, setOpen, wrap, trigger, panel, close, onPanelKey } = useAnchored();
  const [template, setTemplate] = useState(TEMPLATES[0]);
  const titleId = useId();
  const panelId = useId();

  useEffect(() => {
    if (open) panel.current?.querySelector<HTMLElement>(".sr-opt.on")?.focus();
  }, [open, panel]);

  return (
    <div ref={wrap} style={{ position: "relative", display: "inline-block" }}>
      <SrPopStyle />
      <button
        ref={trigger}
        type="button"
        className={`selbox${open ? " trigger-open" : ""}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen(!open)}
      >
        <Ic n="report" s={14} />
        <span>{template}</span>
        <Ic n="down" s={14} />
      </button>
      {open && (
        <div
          ref={panel}
          id={panelId}
          className="sr-pop"
          role="dialog"
          aria-labelledby={titleId}
          style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, width: 280 }}
          onKeyDown={onPanelKey}
        >
          <div className="sr-pop-h">
            <Ic n="report" s={14} />
            <b id={titleId}>Report template</b>
            <button type="button" className="popover-close" aria-label="Close popover" onClick={close}>
              <Ic n="x" s={14} />
            </button>
          </div>
          <div className="sr-pop-b">
            {TEMPLATES.map((t) => (
              <button
                key={t}
                type="button"
                className={`sr-opt${t === template ? " on" : ""}`}
                aria-pressed={t === template}
                onClick={() => {
                  setTemplate(t);
                  close();
                }}
              >
                <span className="sr-radio" />
                <span className="sr-opt-t">
                  <b>{t}</b>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---- preview: Schedule preview (script.js openJobQuickCompare) ------------ */

export function PreviewPopoverDemo() {
  const { open, setOpen, wrap, trigger, panel, close, onPanelKey } = useAnchored();
  const titleId = useId();
  const panelId = useId();

  useEffect(() => {
    if (open) panel.current?.querySelector<HTMLElement>(".jdqp-head button")?.focus();
  }, [open, panel]);

  return (
    <div ref={wrap} style={{ position: "relative", display: "inline-block", alignSelf: "flex-start" }}>
      <button
        ref={trigger}
        type="button"
        className="icon-btn"
        aria-label="Preview Helix Biomed"
        title="Preview schedule"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        style={open ? { background: "var(--primary-50)", borderColor: "var(--navy-active)", color: "var(--primary)" } : undefined}
        onClick={() => setOpen(!open)}
      >
        <Ic n="eye" s={14} />
      </button>
      {open && (
        <aside
          ref={panel}
          id={panelId}
          className="jd-quick-pop shared-schedule-preview"
          role="dialog"
          aria-labelledby={titleId}
          style={{ position: "absolute", left: "calc(100% + 10px)", top: 0 }}
          onKeyDown={onPanelKey}
        >
          <div className="jdqp-head">
            <span id={titleId}>Schedule preview</span>
            <span className="pill b-issued">
              <span className="d" />
              Confirmed
            </span>
            <button type="button" aria-label="Close quick view" onClick={close}>
              <Ic n="x" s={14} />
            </button>
          </div>
          <div className="jdqp-body">
            <div className="jdqp-title">
              <b>Helix Biomed</b>
              <small>SCH-2431</small>
            </div>
            <div className="jdqp-time">
              <Ic n="clock" s={14} />
              <span>
                <b>Mon 12 Jan · 09:00 to 12:00</b>
                <small>3 hours</small>
              </span>
            </div>
            <div className="jdqp-grid">
              <div>
                <span>Engineer</span>
                <b>Alejandro Cruz</b>
              </div>
              <div>
                <span>Work orders</span>
                <b>3</b>
              </div>
            </div>
            <div className="jdqp-sec">
              Work orders <span>3</span>
            </div>
            <div className="jdqp-wos">
              <div>
                <span>
                  <Ic n="wo" s={12} />
                  WO-2418
                </span>
                <b>Biological Safety Cabinet</b>
              </div>
              <div>
                <span>
                  <Ic n="wo" s={12} />
                  WO-2421
                </span>
                <b>CO₂ Incubator</b>
              </div>
            </div>
          </div>
          <div className="jdqp-foot">
            <button type="button" className="btn btn-primary btn-sm jdqp-open" onClick={close}>
              Open this schedule
              <Ic n="cright" s={12} />
            </button>
          </div>
        </aside>
      )}
    </div>
  );
}
