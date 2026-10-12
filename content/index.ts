import type { DocSection, GuideQuestion } from "@/components/DocSections";
import type { PageArtKind } from "@/components/PageArt";
import { introduction } from "./introduction";
import { principles } from "./principles";
import { designing } from "./designing";
import { developing } from "./developing";
import { react } from "./react";
import { flutter } from "./flutter";
import { ios } from "./ios";
import { contributing } from "./contributing";
import { color, typography, iconography, elevation, shape } from "./foundations-visual";
import { spacing, grid, responsive } from "./foundations-layout";
import { accessibility, interactionStates, motion, content } from "./foundations-experience";
import { designTokens } from "./design-tokens";

export type PageContent = {
  /** replaces the generic "Description … will be added here" lead */
  lead?: string;
  /** themed illustration beside the page title */
  art?: PageArtKind;
  /** full outline; a section without a body renders as a placeholder */
  sections: DocSection[];
  /** render as a learning guide: roadmap, parts, numbered chapters, takeaways */
  guide?: { meta?: string[]; questions?: GuideQuestion[] };
};

/** Written pages, keyed by href. Anything not listed renders the empty outline. */
export const CONTENT: Record<string, PageContent> = {
  "/get-started/introduction": introduction,
  "/get-started/principles": principles,
  "/get-started/designing": designing,
  "/get-started/developing": developing,
  "/get-started/contributing": contributing,
  "/get-started/react": react,
  "/get-started/flutter": flutter,
  "/get-started/ios": ios,
  "/foundations/color": color,
  "/foundations/typography": typography,
  "/foundations/iconography": iconography,
  "/foundations/elevation": elevation,
  "/foundations/shape": shape,
  "/foundations/spacing": spacing,
  "/foundations/grid": grid,
  "/foundations/responsive": responsive,
  "/foundations/accessibility": accessibility,
  "/foundations/interaction-states": interactionStates,
  "/foundations/motion": motion,
  "/foundations/content": content,
  "/foundations/design-tokens": designTokens,
};
