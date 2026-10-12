import type { ComponentContent } from "./types";
import { button } from "./button";
import { iconButton } from "./icon-button";
import { segmentedControl } from "./segmented-control";
import { tabs } from "./tabs";
import { breadcrumb } from "./breadcrumb";
import { navbar } from "./navbar";
import { sidebar } from "./sidebar";
import { pagination } from "./pagination";
import { notification } from "./notification";
import { toast } from "./toast";
import { progress } from "./progress";
import { tooltip } from "./tooltip";
import { checkbox } from "./checkbox";
import { radio } from "./radio";
import { switchComponent } from "./switch";
import { tag } from "./tag";
import { dialog } from "./dialog";
import { popover } from "./popover";
import { menu } from "./menu";
import { table } from "./table";
import { card } from "./card";
import { statusPill } from "./status-pill";
import { textField } from "./text-field";
import { select } from "./select";
import { search } from "./search";
import { datePicker } from "./date-picker";

/** Written component pages, keyed by href. */
export const COMPONENTS: Record<string, ComponentContent> = {
  "/components/button": button,
  "/components/icon-button": iconButton,
  "/components/segmented-control": segmentedControl,
  "/components/tabs": tabs,
  "/components/breadcrumb": breadcrumb,
  "/components/navbar": navbar,
  "/components/sidebar": sidebar,
  "/components/pagination": pagination,
  "/components/notification": notification,
  "/components/toast": toast,
  "/components/progress": progress,
  "/components/tooltip": tooltip,
  "/components/checkbox": checkbox,
  "/components/radio": radio,
  "/components/switch": switchComponent,
  "/components/tag": tag,
  "/components/dialog": dialog,
  "/components/popover": popover,
  "/components/menu": menu,
  "/components/table": table,
  "/components/card": card,
  "/components/status-pill": statusPill,
  "/components/text-field": textField,
  "/components/select": select,
  "/components/search": search,
  "/components/date-picker": datePicker,
};
