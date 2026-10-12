import type { DocSection } from "@/components/DocSections";

/** A component page: one section list per tab. A tab left empty shows its outline. */
export type ComponentContent = {
  lead: string;
  /** tile illustration beside the title, drawn on the shared ArtFrame canvas */
  art?: React.ComponentType;
  /** fallback: small live preview beside the title */
  preview?: React.ReactNode;
  usage?: DocSection[];
  style?: DocSection[];
  code?: DocSection[];
  accessibility?: DocSection[];
};
