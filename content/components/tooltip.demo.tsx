"use client";

import { cloneElement, useEffect, useId, useRef, useState } from "react";

/* ---------------------------------------------------------------------------
   Tooltip demo. Mirrors queueTip/showTip/hideTip in NPD-FSM/script.js:
   420ms hover delay, no delay on focus, hidden on pointer down,
   click, scroll and blur. The bubble is the product's .tip-pop. In the product
   it is fixed in #tipHost; here it is placed under its anchor in the demo.
   Escape is added here: WCAG 1.4.13 asks for a way to dismiss it.
   --------------------------------------------------------------------------- */

const TIP_DELAY = 420;

type AnchorProps = {
  className?: string;
  "aria-describedby"?: string;
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
  onFocus?: React.FocusEventHandler;
  onBlur?: React.FocusEventHandler;
  onMouseDown?: React.MouseEventHandler;
  onClick?: React.MouseEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
};

/**
 * Wraps one control. `tip` is the bubble text. Set `describes` when the tip
 * adds to the control's name; leave it off when the tip repeats the name.
 */
export function Tip({
  tip,
  describes = false,
  open: forced,
  children,
}: {
  tip: string;
  describes?: boolean;
  open?: boolean;
  children: React.ReactElement<AnchorProps>;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clear = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };
  const hide = () => {
    clear();
    setOpen(false);
  };
  useEffect(() => {
    if (!open) return;
    const onScroll = () => hide();
    window.addEventListener("scroll", onScroll, true);
    return () => window.removeEventListener("scroll", onScroll, true);
  }, [open]);
  useEffect(() => clear, []);

  const anchor = cloneElement(children, {
    className: [children.props.className, "tip"].filter(Boolean).join(" "),
    "aria-describedby": describes ? id : undefined,
    onMouseEnter: () => {
      clear();
      timer.current = setTimeout(() => setOpen(true), TIP_DELAY);
    },
    onMouseLeave: hide,
    onFocus: () => {
      clear();
      setOpen(true);
    },
    onClick: (e: React.MouseEvent) => {
      hide();
      children.props.onClick?.(e);
    },
    onBlur: hide,
    onMouseDown: hide,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Escape") hide();
    },
  });

  const shown = forced ?? open;
  return (
    <span style={{ position: "relative", display: "inline-flex" }}>
      {anchor}
      <span
        id={id}
        role="tooltip"
        className={`tip-pop${shown ? " on" : ""}`}
        style={{ position: "absolute", top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)", width: "max-content", zIndex: 5 }}
      >
        {tip}
      </span>
    </span>
  );
}
