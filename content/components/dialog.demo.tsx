"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Ic } from "@/components/demo/Ic";

/* ---------------------------------------------------------------------------
   Interactive dialog demos. Rendered inside the ProductDemo shadow root, so:
   - the product's `.ov > .modal` chrome applies (`#modalHost` gives the 30px tile);
   - document.activeElement is the shadow host, so focus is read from the root node;
   - behavior mirrors script.js modal()/closeModal(): Escape and a scrim click
     close, Tab is trapped, focus returns to the trigger.
   --------------------------------------------------------------------------- */

const FOCUSABLE =
  'button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[href],[tabindex]:not([tabindex="-1"])';

function activeIn(el: Element) {
  return (el.getRootNode() as Document | ShadowRoot).activeElement;
}

function DialogFrame({
  labelId,
  className,
  onClose,
  children,
}: {
  labelId: string;
  className?: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
      return;
    }
    if (e.key !== "Tab" || !ref.current) return;
    const items = [...ref.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => el.getClientRects().length);
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    const active = activeIn(ref.current);
    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div id="modalHost">
      <div className="ov" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div
          ref={ref}
          className={["modal", className].filter(Boolean).join(" ")}
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelId}
          tabIndex={-1}
          onKeyDown={onKeyDown}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/** open/close state, initial focus on open, focus back to the trigger on close */
function useDialog<T extends HTMLElement>() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const initial = useRef<T>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (open) initial.current?.focus();
    else if (wasOpen.current) trigger.current?.focus();
    wasOpen.current = open;
  }, [open]);

  return { open, setOpen, trigger, initial };
}

/* ---- default dialog: Export schedules (script.js, List view export) ------- */

export function ExportDialogDemo() {
  const { open, setOpen, trigger, initial } = useDialog<HTMLSelectElement>();
  const titleId = useId();
  const close = () => setOpen(false);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className="btn btn-sm export-btn"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        <Ic n="download" s={14} />
        Export all
      </button>
      {open && (
        <DialogFrame labelId={titleId} onClose={close}>
          <div className="mh">
            <span className="mi">
              <Ic n="download" s={17} />
            </span>
            <h3 id={titleId}>Export schedules</h3>
            <button type="button" className="x" aria-label="Close dialog" onClick={close}>
              <Ic n="x" s={17} />
            </button>
          </div>
          <div className="mb list-export-body">
            <div className="state-summary">
              <b>128 filtered records</b>
              <span>The current entity, date range, engineer and status filters will be applied.</span>
            </div>
            <label className="field">
              <span>Columns</span>
              <select ref={initial} className="finp" defaultValue="visible">
                <option value="visible">Visible table columns</option>
                <option value="all">All available fields</option>
              </select>
            </label>
            <p className="modal-help">The file will be downloaded in CSV format.</p>
          </div>
          <div className="mf">
            <button type="button" className="btn" onClick={close}>
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={close}>
              <Ic n="download" s={14} />
              Export CSV
            </button>
          </div>
        </DialogFrame>
      )}
    </>
  );
}

/* ---- confirmation: Cancel schedule (script.js openCancelSchedule) --------- */

export function CancelScheduleDemo() {
  const { open, setOpen, trigger, initial } = useDialog<HTMLTextAreaElement>();
  const [error, setError] = useState(false);
  const titleId = useId();
  const reasonId = useId();
  const errorId = useId();

  const close = () => {
    setOpen(false);
    setError(false);
  };
  const confirm = () => {
    if (!initial.current?.value.trim()) {
      setError(true);
      initial.current?.focus();
      return;
    }
    close();
  };

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className="btn btn-danger"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        <Ic n="calx" s={14} />
        Cancel schedule
      </button>
      {open && (
        <DialogFrame labelId={titleId} className="cancel-prompt-modal" onClose={close}>
          <div className="mh state-danger">
            <span className="mi">
              <Ic n="calx" s={17} />
            </span>
            <h3 id={titleId}>Cancel schedule?</h3>
            <button type="button" className="x" aria-label="Close dialog" onClick={close}>
              <Ic n="x" s={17} />
            </button>
          </div>
          <div className="mb cancel-prompt">
            <div className="cancel-context">
              <b>Helix Biomed</b>
              <span>SCH-2431 · 3 work orders</span>
            </div>
            <p>
              <b>All work orders (3)</b> in this schedule will return to <b>Pending</b>. They will need to be scheduled
              again.
            </p>
            <div className="cancel-warning">
              <Ic n="alert" s={15} />
              <span>
                <b>You cannot undo this action.</b>
                <small>The schedule will be marked Cancelled.</small>
              </span>
            </div>
            <label className="nt-lbl" htmlFor={reasonId}>
              Reason for cancellation <span aria-hidden="true">*</span>
            </label>
            <textarea
              ref={initial}
              className="ftext"
              id={reasonId}
              rows={3}
              maxLength={500}
              placeholder="Why is this schedule being cancelled?"
              required
              aria-describedby={errorId}
              aria-invalid={error || undefined}
              onInput={() => setError(false)}
            />
            <p className="nt-err" id={errorId} role="alert" hidden={!error}>
              Enter a reason for cancellation.
            </p>
          </div>
          <div className="mf">
            <button type="button" className="btn" onClick={close}>
              Keep schedule
            </button>
            <button type="button" className="btn btn-solid-danger" onClick={confirm}>
              <Ic n="calx" s={15} />
              Cancel schedule
            </button>
          </div>
        </DialogFrame>
      )}
    </>
  );
}
