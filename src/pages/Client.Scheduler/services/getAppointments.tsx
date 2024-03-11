import { useState, useEffect } from "react";
import { supabase } from "../../../services/supabaseClient";

export default function getAppointments(business: string) {
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const { data, error } = await supabase
        .from("appointments") // Assuming your table is named 'appointments'
        .select("*")
        .eq("business", business);

      if (error) {
        console.error("Error fetching appointments:", error);
        return;
      }

      setAppointments(data || []);
    };

    fetchAppointments();
  }, [business]);

  return appointments;
}
