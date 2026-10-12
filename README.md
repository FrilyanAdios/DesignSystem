# Esco Design System — documentation site

Next.js 16 (App Router) · React 19 · TypeScript · lucide-react · Noto Sans.
Visual language mirrors the FSM prototype (`Prototype/SMS_FSM/NPD-FSM`): same tokens, navy sidebar, 64px navbar.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static pre-render of every page
```

## Structure

- `lib/nav.ts` — single source of navigation: sections, groups, pages, icons, and the section outline of each page. Add a page here and it appears in the sidebar, section gallery, search, and prev/next automatically.
- `app/globals.css` — design tokens + all component styles.
- `app/[section]/page.tsx` — section overview gallery.
- `app/[section]/[page]/[[...tab]]/page.tsx` — documentation page. `kind: "component"` pages get Usage / Style / Code / Accessibility tabs.
- `components/` — shell (Navbar, Sidebar, Footer), SearchDialog (⌘K or /), Toc, Breadcrumbs, PrevNext, Placeholder.

Content is intentionally empty: every section renders a `Placeholder` until written.
