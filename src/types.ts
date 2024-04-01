import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

interface SideNav {
  id: number;
  label: "Appointments" | "Clients" | "Services" | "Scheduler" | "Integrations";
  icon:
    | typeof CalendarIcon
    | typeof UsersIcon
    | typeof FolderIcon
    | typeof ChartPieIcon
    | typeof DocumentDuplicateIcon;
  current: boolean;
}
export type { SideNav };
