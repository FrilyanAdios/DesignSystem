"use client";

import { useEffect, useRef, useState } from "react";

/* ---------------------------------------------------------------------------
   Progress demos.
   - Loading button: .btn.loading from NPD-FSM/styles.css.
   - Wizard stepper and 4dp progress: FSM-Mobile js/wizard-stepper.js,
     css/wizard-stepper.css and css/create-sr.css. Those rules are not in the
     demo stylesheet, so the values are written inline with the matching web
     tokens (--esco-blue = --primary, --esco-tint = --primary-50,
     --outline-strong = --border-input).
   --------------------------------------------------------------------------- */

/** Press to save: the button keeps its size and shows the spinner. */
export function LoadingButtonDemo() {
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);
  const save = () => {
    if (saving) return;
    setSaving(true);
    setDone("");
    timer.current = setTimeout(() => {
      setSaving(false);
      setDone("Schedule saved");
    }, 1600);
  };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <button type="button" className="btn">
        Discard
      </button>
      <button type="button" className={`btn btn-primary${saving ? " loading" : ""}`} aria-busy={saving || undefined} onClick={save}>
        Save schedule
      </button>
      <span role="status" aria-live="polite" style={{ fontSize: 12.5, color: "var(--fg-3)", minWidth: 110 }}>
        {saving ? "Saving…" : done}
      </span>
    </div>
  );
}

export function StepperView({ names, current }: { names: string[]; current: number }) {
  return (
    <nav
      aria-label="Steps"
      style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", width: "100%", padding: 16, borderBottom: "1px solid var(--border)", background: "#fff" }}
    >
      {names.map((name, i) => {
        const active = i === current;
        const complete = i < current;
        return (
          <span key={name} style={{ display: "contents" }}>
            <div
              aria-current={active ? "step" : undefined}
              style={{ display: "flex", flex: "0 1 96px", flexDirection: "column", alignItems: "center", gap: 8, minWidth: 48, textAlign: "center" }}
            >
              <span
                style={{
                  display: "grid",
                  placeItems: "center",
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  border: `1.5px solid ${active || complete ? "var(--primary)" : "var(--border-input)"}`,
                  background: active || complete ? "var(--primary)" : "#fff",
                  color: active || complete ? "#fff" : "var(--fg-3)",
                  boxShadow: active ? "0 0 0 4px var(--primary-50)" : "none",
                  fontSize: 13,
                  fontWeight: 600,
                  lineHeight: 1,
                }}
              >
                {i + 1}
              </span>
              <span style={{ fontSize: 13, lineHeight: 1.35, color: active ? "var(--primary)" : complete ? "var(--fg)" : "var(--fg-3)", fontWeight: active ? 600 : 400 }}>
                {name}
              </span>
            </div>
            {i < names.length - 1 && (
              <span
                aria-hidden="true"
                style={{ flex: "1 1 auto", minWidth: 4, height: 2, margin: "13px 2px 0", borderRadius: 2, background: i < current ? "var(--primary)" : "var(--border-input)" }}
              />
            )}
          </span>
        );
      })}
    </nav>
  );
}

export function LinearProgressView({ value, max, label, valueText }: { value: number; max: number; label: string; valueText?: string }) {
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={1}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={valueText}
      style={{ height: 4, width: "100%", background: "var(--primary-50)", overflow: "hidden" }}
    >
      <div
        style={{
          height: "100%",
          width: `${(value / max) * 100}%`,
          background: "var(--primary)",
          borderRadius: "0 999px 999px 0",
          transition: "width 320ms cubic-bezier(.22,1,.36,1)",
        }}
      />
    </div>
  );
}

const STEPS = ["Customer", "Delivery", "Problem"];

/** A three-step mobile wizard: stepper, 4dp progress, Back and Next. */
export function WizardDemo() {
  const [step, setStep] = useState(0);
  const last = step === STEPS.length - 1;
  return (
    <div style={{ width: 340, margin: "0 auto", border: "1px solid var(--border)", borderRadius: 20, overflow: "hidden", background: "#fff" }}>
      <div style={{ padding: "14px 16px", fontSize: 17, fontWeight: 600, color: "var(--fg)" }}>Defect report</div>
      <LinearProgressView value={step + 1} max={STEPS.length} label="Defect report progress" valueText={`Step ${step + 1} of ${STEPS.length}, ${STEPS[step]}`} />
      <StepperView names={STEPS} current={step} />
      <p role="status" style={{ padding: "16px", fontSize: 13, color: "var(--fg-3)", minHeight: 72 }}>
        Step {step + 1} of {STEPS.length} · {STEPS[step]}
      </p>
      <div style={{ display: "flex", gap: 8, padding: 12, borderTop: "1px solid var(--border)" }}>
        {step > 0 && (
          <button type="button" className="btn" style={{ minWidth: 88 }} onClick={() => setStep((s) => s - 1)}>
            Back
          </button>
        )}
        <button type="button" className="btn btn-primary" style={{ flex: 1 }} onClick={() => setStep((s) => (last ? 0 : s + 1))}>
          {last ? "Start over" : "Next"}
        </button>
      </div>
    </div>
  );
}
