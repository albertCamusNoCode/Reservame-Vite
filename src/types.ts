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
  created_at?: number;
  business_id: string;
  client_phone?: string;
  client_id?: string;
  appt_time: number;
  appt_duration: number;
  business_service_id: string;
}
export type { Appointment };

interface BusinessPublic {
  id: string;
  business_id: string;
  days_open: number[];
  appt_interval: number;
  is_active: boolean;
  business_name: string;
}
export type { BusinessPublic };

type Client = {
  id: string;
  created_at: number;
  business_id: string;
  phone_number: string;
  email: string;
  user_id: string | null;
}
export type { Client };

type User = {
  id: string;
  email: string;
  name: string;
  createdAt: Date; // Assuming created_at is a timestamp, change the type if necessary
  phone?: string; // Optional since the example response has an empty phone
  googleOauth?: string; // Optional, adjust according to actual usage
  active_business: string; // Assuming active_business is a number
} | null;
export type { User };

// Type for the response from initiating Google login
interface GoogleInitiateLoginResponse {
  authUrl?: string;
}

// Type for the response from continuing with Google login
interface GoogleContinueLoginResponse {
  token?: string;
  name?: string;
  email?: string;
}

export type { GoogleInitiateLoginResponse, GoogleContinueLoginResponse };


