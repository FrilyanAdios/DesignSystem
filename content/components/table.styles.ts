/* ---------------------------------------------------------------------------
   Register rules copied from NPD-FSM/sr/sr.css.

   The demo stage adopts NPD-FSM/styles.css only. Service Report's register
   lives in sr/sr.css, so the table demos add these rules inside their own
   shadow root with a <style> element. Copied from sr/sr.css with its later
   overrides folded into one rule each; keep in sync when the register changes.
   - Table: the "REGISTER TABLE" block (the 56px contract in DESIGN_SYSTEM.md),
     then the later alignment pass (48px head, 12px labels, 13px cells), so
     demos and measurements show what ships.
   - Selection column, checkbox, and bar: the alignment pass (64px tick track,
     40px hit box, 18px box).
   - Toolbar: the final "54px command row" rules.
   --------------------------------------------------------------------------- */

export const SR_REGISTER_CSS = `
.sr-tools{display:flex;align-items:center;flex-wrap:nowrap;background:#fff;border-bottom:1px solid var(--border);min-height:54px;padding:9px 16px;gap:8px;overflow-x:auto}
.sr-tools .icon-btn{width:var(--h-md);height:var(--h-md);min-height:var(--h-md);border-radius:var(--radius-field);flex-shrink:0;position:relative}

.sr-table-scroll{overflow:auto;background:#fff}
.sr-table{width:100%;table-layout:fixed;border-collapse:separate;border-spacing:0}
.sr-table thead th{position:sticky;top:0;z-index:2;background:var(--muted);color:var(--fg);font-weight:600;font-size:12.5px;letter-spacing:0;text-transform:none;border-bottom:1px solid var(--border);padding:0 16px;height:56px;vertical-align:middle;white-space:normal;line-height:1.3}
.sr-table thead th .th-in{display:flex;align-items:center;gap:8px;min-width:0}
.sr-table thead th.ctr .th-in{justify-content:center}
.sr-table thead th .th-t{min-width:0}
.sr-table th.sortable{cursor:pointer;user-select:none}
.sr-table th.sortable .sar{display:flex;flex-shrink:0;margin-left:auto;color:var(--icon-quiet);transition:color .12s}
.sr-table th.sortable.ctr .sar{margin-left:0}
.sr-table th.sortable:hover,.sr-table th.sortable.on{color:var(--primary)}
.sr-table th.sortable:hover .sar,.sr-table th.sortable.on .sar{color:var(--primary)}
.sr-table tbody td{padding:13px 16px;font-size:13.5px;color:var(--fg-2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;vertical-align:middle;border-bottom:1px solid var(--border-2);background:#fff}
.sr-table tbody tr:last-child td{border-bottom:none}
.sr-table thead th:first-child,.sr-table tbody td:first-child{padding-left:24px}
.sr-table th.ctr,.sr-table td.ctr{text-align:center}
.sr-table tbody tr{cursor:pointer}
.sr-table tbody tr:hover td{background:var(--row-hover)}
/* the later alignment pass in sr/sr.css, which is what Service Report ships today.
   The class is doubled only so it outranks the stage stylesheet: adopted sheets
   come after <style> in a shadow root, while in the product sr.css loads last. */
.sr-table.sr-table thead th{height:48px;padding:0 16px;background:var(--muted);font-size:12px;color:var(--fg-2)}
.sr-table.sr-table tbody td{height:52px;padding:12px 16px;font-size:13px}.sr-table.sr-table tbody tr:focus-within td{background:var(--primary-50)}
.sr-table.sr-table thead th:first-child,.sr-table.sr-table tbody td:first-child{padding-left:24px}
.sr-table.sr-table th.pin,.sr-table.sr-table td.pin{padding-left:var(--sp-3);padding-right:var(--sp-4)}

.sr-1line{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.sr-nowrap{white-space:nowrap}
.sr-null{color:var(--fg-4);font-style:italic}
.sr-na{color:var(--fg-4);font-style:italic;font-size:12.5px}
.sr-no{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12.5px;color:var(--navy-active);font-weight:600;white-space:nowrap}
span.sr-tick{display:inline-flex;align-items:center;justify-content:center}
span.sr-tick.yes{color:var(--success)}
span.sr-tick.no{color:var(--error)}
.sr-frac{display:inline-flex;align-items:center;justify-content:center;min-width:34px;height:var(--pill-h);padding:0 var(--sp-2);border-radius:var(--radius-pill);font-size:var(--pill-fs);font-weight:600;font-variant-numeric:tabular-nums;color:var(--fg-2);background:var(--muted-2)}
.sr-frac.short{background:var(--revision-bg);color:var(--revision-fg)}

.sr-table thead th.sr-tick:first-child,.sr-table tbody td.sr-tick:first-child{width:64px;padding-left:12px;padding-right:12px;text-align:center;overflow:visible}
.sr-table thead th.sr-tick:first-child .sr-ck,.sr-table tbody td.sr-tick:first-child .sr-ck{display:inline-flex;width:40px;height:40px;margin:0;align-items:center;justify-content:center;vertical-align:middle;border-radius:6px}
.sr-table .sr-ck:hover{background:var(--muted-2)}
.sr-table .sr-ck input{display:block;flex:0 0 18px;width:18px;height:18px;margin:0;-webkit-appearance:none;appearance:none;background:#fff;border:1.5px solid var(--border-input);border-radius:4px;cursor:pointer;background-position:center;background-repeat:no-repeat;background-size:12px 12px}
.sr-table .sr-ck input:hover{border-color:var(--navy-active)}
.sr-table .sr-ck input:checked{border-color:var(--primary);background-color:var(--primary);background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='m3.3 8.2 3 3.1 6.4-6.5' fill='none' stroke='white' stroke-width='2.1' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")}
.sr-table .sr-ck input[data-some]{opacity:1;border-color:var(--primary);background-color:var(--primary);background-image:linear-gradient(#fff,#fff);background-size:10px 2px}
.sr-table .sr-ck input:focus-visible{outline:var(--focus-ring);outline-offset:2px}
.sr-table tbody tr.picked td{background:var(--primary-50)}
.sr-table tbody tr.picked:hover td{background:#e3edf7}

.sr-bulk{display:flex;align-items:center;gap:10px;background:var(--primary-50);border-top:1px solid var(--primary-100);flex-shrink:0;animation:fade .12s ease;margin:0;min-height:52px;padding:var(--sp-2) var(--gutter)}
.sr-bulk .sp{flex:1 1 auto}
.sr-bulk-n{display:inline-flex;align-items:center;gap:8px;font-size:12.5px;color:var(--primary-700)}
.sr-bulk-n b{font-weight:700;color:var(--primary)}
.sr-bulk-n em{font-style:normal;color:var(--fg-3)}
.sr-bulk-n svg{color:var(--primary)}
.sr-bulk .btn{height:32px}
.sr-bulk-x{width:32px;height:32px;border-radius:6px;color:var(--fg-2);display:inline-flex;align-items:center;justify-content:center}
.sr-bulk-x:hover{background:#fff;color:var(--error)}

.sr-foot{display:flex;align-items:center;gap:8px;padding:9px var(--gutter);background:#fff;border-top:1px solid var(--border);flex-shrink:0;flex-wrap:wrap;min-height:58px}
.sr-foot .sp{margin-left:auto}
.sr-foot .lbl{font-size:12px;color:var(--fg-3)}
.sr-foot select.finp{height:var(--h-sm);min-height:40px;font-size:12.5px;width:auto;padding:0 30px 0 10px}
.sr-pg{display:flex;align-items:center;gap:3px;margin-left:6px}
.sr-pg button{min-width:40px;min-height:40px;padding:0 8px;border-radius:var(--radius-control);font-size:12.5px;font-weight:500;color:var(--fg-2);border:1px solid transparent}
.sr-pg button:hover:not(:disabled){background:var(--muted-2)}
.sr-pg button.on{background:var(--primary);color:#fff}
.sr-pg button:disabled{opacity:.4;cursor:default}
.sr-goto{display:flex;align-items:center;gap:8px}
.sr-goto input.finp{width:60px;height:var(--h-sm);min-height:40px;font-size:12.5px;text-align:center;padding:0 6px;font-variant-numeric:tabular-nums}
.sr-total{font-size:11.5px;color:var(--fg-3);white-space:nowrap;font-variant-numeric:tabular-nums;margin-left:8px}
.sr-total b{font-weight:600;color:var(--fg-2)}

.sr-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;min-height:240px;padding:48px 24px;gap:4px;background:#fff}
.sr-empty .ico{width:52px;height:52px;border-radius:var(--radius-card);background:var(--muted);color:var(--icon-quiet);display:flex;align-items:center;justify-content:center;margin-bottom:10px}
.sr-empty h4{font-size:14px;font-weight:600;color:var(--fg-2)}
.sr-empty p{font-size:12.5px;color:var(--fg-3);max-width:340px;line-height:1.6}
`;

/** The register frame: white, one border, card radius. Composes the stage like the product's .sr-wrap. */
export const FRAME_STYLE: React.CSSProperties = {
  background: "#fff",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-card)",
  overflow: "hidden",
  width: "100%",
};
