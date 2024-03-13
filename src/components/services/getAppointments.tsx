import { supabase } from "../../services/supabaseClient";
import { Appointment } from "./types"; // Import the unified Appointment type

export async function getAppointments(
  business: string
): Promise<Appointment[]> {
  const { data, error } = await supabase
    .from("appointments")
    .select("id, time")
    .eq("business", business);

  if (error) {
    console.error("Error fetching appointments:", error);
    return [];
  }

  return data || [];
}
