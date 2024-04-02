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
  route: string;
}
export type { SideNav };

interface Business {
  $id?: string;
  name: string;
  // Add other business properties as needed
}

interface BusinessContextType {
  current: Business[];
  add: (business: Business) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

export type { Business, BusinessContextType };
