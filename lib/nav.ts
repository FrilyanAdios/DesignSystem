import {
  Accessibility,
  AlignLeft,
  AppWindow,
  ArrowDownUp,
  BadgeCheck,
  Bell,
  BookOpen,
  Boxes,
  Calendar,
  ChevronsRight,
  CircleDot,
  Code2,
  Compass,
  Component,
  CopyCheck,
  Download,
  FileText,
  Filter,
  Fingerprint,
  FormInput,
  GitPullRequest,
  Globe,
  Grid3x3,
  HelpCircle,
  History,
  Inbox,
  Layers,
  LayoutGrid,
  LayoutPanelLeft,
  ListChecks,
  ListFilter,
  Loader,
  MessageSquare,
  MousePointerClick,
  Move,
  Navigation,
  Package,
  PaintBucket,
  Palette,
  PanelLeft,
  Pencil,
  PenTool,
  Puzzle,
  Rocket,
  Ruler,
  Search,
  Shapes,
  Smartphone,
  SlidersHorizontal,
  Sparkles,
  SquareCheck,
  SquareMousePointer,
  Table2,
  TabletSmartphone,
  Tag,
  TextCursorInput,
  ToggleRight,
  Type,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/** "component" pages get Usage / Style / Code / Accessibility tabs; "doc" pages are one page. */
export type PageKind = "doc" | "component";

export type NavItem = {
  slug: string;
  title: string;
  icon: LucideIcon;
  kind?: PageKind;
};

export type NavGroup = {
  title?: string;
  items: NavItem[];
};

export type Section = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  groups: NavGroup[];
};

export const SECTIONS: Section[] = [
  {
    slug: "get-started",
    title: "Get started",
    description: "Principles, setup, and how to work with the system.",
    icon: Rocket,
    groups: [
      {
        items: [
          { slug: "introduction", title: "Introduction", icon: BookOpen },
          { slug: "principles", title: "Design principles", icon: Compass },
          { slug: "designing", title: "For designers", icon: Pencil },
          { slug: "developing", title: "For developers", icon: Code2 },
          { slug: "contributing", title: "Contributing", icon: GitPullRequest },
          { slug: "whats-new", title: "What's new", icon: Sparkles },
          { slug: "faq", title: "FAQ", icon: HelpCircle },
        ],
      },
      {
        title: "Platform guides",
        items: [
          { slug: "react", title: "React and Next.js", icon: Globe },
          { slug: "flutter", title: "Flutter", icon: Smartphone },
          { slug: "ios", title: "iOS native", icon: TabletSmartphone },
        ],
      },
    ],
  },
  {
    slug: "foundations",
    title: "Foundations",
    description: "Color, type, spacing, and the tokens beneath every screen.",
    icon: Layers,
    groups: [
      {
        title: "Visual",
        items: [
          { slug: "color", title: "Color", icon: Palette },
          { slug: "typography", title: "Typography", icon: Type },
          { slug: "iconography", title: "Iconography", icon: Shapes },
          { slug: "elevation", title: "Elevation", icon: Layers },
          { slug: "shape", title: "Shape", icon: SquareMousePointer },
        ],
      },
      {
        title: "Layout",
        items: [
          { slug: "spacing", title: "Spacing", icon: Ruler },
          { slug: "grid", title: "Layout and grid", icon: Grid3x3 },
          { slug: "responsive", title: "Responsive behavior", icon: AppWindow },
        ],
      },
      {
        title: "Experience",
        items: [
          { slug: "accessibility", title: "Accessibility", icon: Accessibility },
          { slug: "interaction-states", title: "Interaction states", icon: MousePointerClick },
          { slug: "motion", title: "Motion", icon: Move },
          { slug: "content", title: "Content and writing", icon: AlignLeft },
          { slug: "design-tokens", title: "Design tokens", icon: PaintBucket },
        ],
      },
    ],
  },
  {
    slug: "components",
    title: "Components",
    description: "Reusable building blocks with usage, style, and code guidance.",
    icon: Component,
    groups: [
      {
        title: "Actions",
        items: [
          { slug: "button", title: "Button", icon: MousePointerClick, kind: "component" },
          { slug: "icon-button", title: "Icon button", icon: CircleDot, kind: "component" },
          { slug: "segmented-control", title: "Segmented control", icon: ToggleRight, kind: "component" },
        ],
      },
      {
        title: "Inputs",
        items: [
          { slug: "text-field", title: "Text field", icon: TextCursorInput, kind: "component" },
          { slug: "select", title: "Select", icon: ListFilter, kind: "component" },
          { slug: "checkbox", title: "Checkbox", icon: SquareCheck, kind: "component" },
          { slug: "radio", title: "Radio button", icon: CircleDot, kind: "component" },
          { slug: "switch", title: "Switch", icon: ToggleRight, kind: "component" },
          { slug: "search", title: "Search", icon: Search, kind: "component" },
          { slug: "date-picker", title: "Date picker", icon: Calendar, kind: "component" },
        ],
      },
      {
        title: "Navigation",
        items: [
          { slug: "navbar", title: "Navbar", icon: AppWindow, kind: "component" },
          { slug: "sidebar", title: "Sidebar", icon: PanelLeft, kind: "component" },
          { slug: "tabs", title: "Tabs", icon: LayoutPanelLeft, kind: "component" },
          { slug: "breadcrumb", title: "Breadcrumb", icon: ChevronsRight, kind: "component" },
          { slug: "pagination", title: "Pagination", icon: Navigation, kind: "component" },
        ],
      },
      {
        title: "Data display",
        items: [
          { slug: "table", title: "Table", icon: Table2, kind: "component" },
          { slug: "card", title: "Card", icon: LayoutGrid, kind: "component" },
          { slug: "status-pill", title: "Status pill", icon: BadgeCheck, kind: "component" },
          { slug: "tag", title: "Tag", icon: Tag, kind: "component" },
        ],
      },
      {
        title: "Feedback",
        items: [
          { slug: "notification", title: "Notification", icon: Bell, kind: "component" },
          { slug: "toast", title: "Toast", icon: MessageSquare, kind: "component" },
          { slug: "progress", title: "Progress and loading", icon: Loader, kind: "component" },
          { slug: "tooltip", title: "Tooltip", icon: HelpCircle, kind: "component" },
        ],
      },
      {
        title: "Overlays",
        items: [
          { slug: "dialog", title: "Dialog", icon: AppWindow, kind: "component" },
          { slug: "popover", title: "Popover", icon: MessageSquare, kind: "component" },
          { slug: "menu", title: "Menu", icon: ListChecks, kind: "component" },
        ],
      },
    ],
  },
  {
    slug: "patterns",
    title: "Patterns",
    description: "Proven solutions for recurring tasks across products.",
    icon: Puzzle,
    groups: [
      {
        items: [
          { slug: "forms", title: "Forms", icon: FormInput },
          { slug: "search-and-filter", title: "Search and filter", icon: Filter },
          { slug: "data-registers", title: "Data registers", icon: Table2 },
          { slug: "sorting", title: "Sorting and settings", icon: ArrowDownUp },
          { slug: "export", title: "Export", icon: Download },
          { slug: "confirmation", title: "Confirmation", icon: CopyCheck },
          { slug: "empty-states", title: "Empty states", icon: Inbox },
          { slug: "loading", title: "Loading", icon: Loader },
          { slug: "document-viewer", title: "Document viewer", icon: FileText },
          { slug: "workflows", title: "Multi-step workflows", icon: Workflow },
          { slug: "login", title: "Sign in", icon: Fingerprint },
        ],
      },
    ],
  },
  {
    slug: "resources",
    title: "Resources",
    description: "Design kits, code packages, icons, and brand assets.",
    icon: Boxes,
    groups: [
      {
        items: [
          { slug: "design-kit", title: "Figma design kit", icon: PenTool },
          { slug: "code-library", title: "Code library", icon: Package },
          { slug: "icon-library", title: "Icon library", icon: Shapes },
          { slug: "brand-assets", title: "Brand assets", icon: Palette },
          { slug: "tools", title: "Tools and plugins", icon: SlidersHorizontal },
          { slug: "changelog", title: "Changelog", icon: History },
        ],
      },
    ],
  },
];

export const COMPONENT_TABS = [
  { slug: "usage", title: "Usage" },
  { slug: "style", title: "Style" },
  { slug: "code", title: "Code" },
  { slug: "accessibility", title: "Accessibility" },
] as const;

export type TabSlug = (typeof COMPONENT_TABS)[number]["slug"];

/** Section headings rendered as empty placeholders until content is written. */
export const OUTLINES: Record<"doc" | TabSlug, string[]> = {
  doc: ["Overview", "Guidelines", "Examples", "Related"],
  usage: ["Overview", "When to use", "Anatomy", "Variants", "Behavior", "Related"],
  style: ["Color", "Typography", "Spacing", "Specifications"],
  code: ["Installation", "Basic usage", "Properties", "Examples"],
  accessibility: ["Keyboard interaction", "Screen readers", "Contrast and focus"],
};

export type FlatPage = NavItem & { section: Section; href: string; group?: string };

export const ALL_PAGES: FlatPage[] = SECTIONS.flatMap((section) =>
  section.groups.flatMap((group) =>
    group.items.map((item) => ({
      ...item,
      section,
      group: group.title,
      href: `/${section.slug}/${item.slug}`,
    })),
  ),
);

export const getSection = (slug: string) => SECTIONS.find((s) => s.slug === slug);

export const getPage = (section: string, page: string) =>
  ALL_PAGES.find((p) => p.section.slug === section && p.slug === page);

export const slugify = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** Decorative pastel tones for gallery/home cards, cycled by index. */
export const TONES = ["blue", "green", "amber", "rose", "violet", "teal", "peach", "sky"] as const;
export const toneAt = (i: number) => TONES[i % TONES.length];
