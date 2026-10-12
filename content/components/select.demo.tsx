"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Ic } from "@/components/demo/Ic";

/* ---------------------------------------------------------------------------
   Live twin of NPD-FSM/entity-picker.js: the .entity-control select opens the
   searchable .menu.entity-menu instead of the native list. Same classes, same
   keys (Enter, Space, ArrowDown, ArrowUp, F4, Alt+ArrowDown open; Escape
   closes and returns focus; Tab closes), same "No entity matches" empty state.
   --------------------------------------------------------------------------- */

export const ENTITIES = [
  "All Entities (Esco Lifesciences Group)",
  "Esco Zimbabwe",
  "Esco Micro Pte. Ltd.",
  "PT Esco Utama",
  "PT Esco Bintan Indonesia",
  "Esco Micro (M) Sdn. Bhd.",
  "Esco Philippines, Inc.",
  "Esco Lifesciences (Thailand) Co., Ltd.",
  "Esco Vietnam Company Ltd.",
  "ELG Life Sciences India Private Limited",
  "Esco Technologies (Hong Kong) Ltd.",
  "Esco Lifesciences GmbH",
  "Esco GB Ltd.",
  "Esco Technologies, Inc.",
];

const OPEN_KEYS = ["Enter", " ", "ArrowDown", "ArrowUp", "F4"];

export function EntityPickerDemo() {
  const [value, setValue] = useState(ENTITIES[0]);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const selectRef = useRef<HTMLSelectElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const uid = useId();

  const ql = q.trim().toLowerCase();
  const shown = ENTITIES.filter((e) => !ql || e.toLowerCase().includes(ql));

  function close(restore: boolean) {
    setOpen(false);
    setQ("");
    if (restore) selectRef.current?.focus();
  }
  function choose(v: string) {
    setValue(v);
    close(true);
  }

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onDown = (e: Event) => {
      const path = e.composedPath();
      if (menuRef.current && !path.includes(menuRef.current) && !path.includes(selectRef.current!)) close(false);
    };
    document.addEventListener("mousedown", onDown, true);
    return () => document.removeEventListener("mousedown", onDown, true);
  }, [open]);

  function onMenuKey(e: React.KeyboardEvent) {
    const items = [...(menuRef.current?.querySelectorAll<HTMLButtonElement>(".sf-ent") ?? [])];
    const active = (menuRef.current?.getRootNode() as ShadowRoot | Document).activeElement as HTMLElement | null;
    const i = items.indexOf(active as HTMLButtonElement);
    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      close(true);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      (items[i + 1] || items[0])?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (i <= 0) inputRef.current?.focus();
      else items[i - 1].focus();
    } else if (e.key === "Enter" && active === inputRef.current) {
      e.preventDefault();
      if (items.length === 1) choose(shown[0]);
      else items[0]?.focus();
    } else if (e.key === "Tab") close(false);
  }

  return (
    <div style={{ position: "relative" }}>
      <label className={`entity-control${open ? " open" : ""}`}>
        <span className="sr-only">Esco entity</span>
        <Ic n="building" s={14} />
        <select
          ref={selectRef}
          aria-label="Esco entity"
          aria-haspopup="dialog"
          aria-expanded={open}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onMouseDown={(e) => {
            e.preventDefault();
            if (open) close(true);
            else setOpen(true);
          }}
          onKeyDown={(e) => {
            if (open) return;
            if (OPEN_KEYS.includes(e.key) || (e.altKey && e.key === "ArrowDown")) {
              e.preventDefault();
              setOpen(true);
            }
          }}
        >
          {ENTITIES.map((e) => (
            <option key={e} value={e}>
              {e === ENTITIES[0] ? "All entities" : e}
            </option>
          ))}
        </select>
        <Ic n="down" s={12} />
      </label>
      {open && (
        <div
          ref={menuRef}
          className="menu entity-menu"
          role="dialog"
          aria-label="Esco entity"
          style={{ position: "absolute", zIndex: 1000, top: "calc(100% + 6px)", left: 0 }}
          onKeyDown={onMenuKey}
        >
          <div className="em-search">
            <Ic n="search" s={14} />
            <input
              ref={inputRef}
              className="finp"
              placeholder="Search entity…"
              aria-label="Search entity"
              aria-controls={`${uid}-list`}
              autoComplete="off"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <div className="em-list" role="listbox" aria-label="Entities" id={`${uid}-list`}>
            {shown.map((e) => {
              const on = e === value;
              return (
                <button key={e} type="button" className={`sf-ent${on ? " on" : ""}`} role="option" aria-selected={on} onClick={() => choose(e)}>
                  <span>{e === ENTITIES[0] ? "All entities" : e}</span>
                  {on && <Ic n="check" s={14} />}
                </button>
              );
            })}
          </div>
          <div className="em-empty" hidden={shown.length > 0} role="status">
            No entity matches
          </div>
        </div>
      )}
    </div>
  );
}
