/* Shared by toast.tsx (server) and toast.demo.tsx (client). */

/* toast(m) in NPD-FSM/script.js: its inline styles, verbatim */
export const TOAST_STYLE: React.CSSProperties = {
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
};

/* .snackbar after its later overrides in FSM-Mobile/css/styles.css: in flow, above the navigation */
export const SNACK_STYLE: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  flexShrink: 0,
  margin: "8px 12px",
  padding: "12px 16px",
  borderRadius: 16,
  background: "#2B3947",
  color: "#F1F4F7",
  fontSize: 14,
};
