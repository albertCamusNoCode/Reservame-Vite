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
  id: string;
  name: string;
  phone: string;
}

export type { Business };

interface Appointment {
  id?: string;
  created_at?: Date;
  business_id: string;
  client_phone?: string;
  client_id?: string;
  appt_time: Date;
  appt_duration: number;
}
export type { Appointment };

interface BusinessPublic {
  id: string;
  business_id: string;
  days_open: number[];
  appt_interval: number;
  is_active: boolean;
}
export type { BusinessPublic };

type User = {
  id: string;
  email: string;
  name: string;
  createdAt: Date; // Assuming created_at is a timestamp, change the type if necessary
  phone?: string; // Optional since the example response has an empty phone
  googleOauth?: string; // Optional, adjust according to actual usage
  activeBusiness: number; // Assuming active_business is a number
} | null;
export type { User };

