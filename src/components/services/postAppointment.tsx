import { supabase } from "../../services/supabaseClient";
import { Appointment } from "./types"; // Import the unified Appointment type

export async function postAppointment(
  business: string,
  time: string // Assuming time is an ISO string with timezone
): Promise<Appointment | null> {
  const { data, error } = await supabase
    .from("appointments")
    .insert([{ business, time }])
    .select();

  if (error) {
    console.error("Error posting appointment:", error);
    return null;
  }

  return data ? data[0] : null;
}
