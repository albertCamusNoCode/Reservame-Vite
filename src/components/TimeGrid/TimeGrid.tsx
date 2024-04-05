import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { getAppointments } from "../../data-actions/appointment"; // Updated import path
import { Appointment } from "../../types"; // Updated import path

type TimeSlot = {
  label: string;
  start: Date;
};

type TimeSlots = TimeSlot[];

interface TimeGridProps {
  selectedToD: string;
  selectedDate: Date;
  selectedTimeSlot: Date | null;
  setSelectedTimeSlot: React.Dispatch<React.SetStateAction<Date | null>>;
}

const TimeGrid: React.FC<TimeGridProps> = ({
  selectedDate,
  selectedTimeSlot,
  setSelectedTimeSlot,
}) => {
  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const h = hours % 12 || 12; // Convert hour to 12-hour format
    const ampm = hours < 12 || hours === 24 ? "am" : "pm"; // Determine AM/PM
    return `${h.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  };

  const generateTimeSlots = (): TimeSlots => {
    const slots: TimeSlots = [];
    const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0));
    for (let i = 0; i < 24; i += 0.5) {
      const hours = Math.floor(i);
      const minutes = (i % 1) * 60;
      const start = new Date(startOfDay.getTime());
      start.setHours(hours, minutes);
      const end = new Date(start.getTime() + 30 * 60000); // Adds 30 minutes
      slots.push({
        label: `${formatTime(start)} - ${formatTime(end)}`,
        start: start,
      });
    }
    return slots;
  };

  const timeSlots: TimeSlots = React.useMemo(generateTimeSlots, [selectedDate]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const businessId = queryParams.get('bid') || ''; // Default to empty string if not found
      const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0)).getTime();
      const endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999)).getTime();
      try {
        const appointmentsData = await getAppointments({ business_id: businessId, date_from: startOfDay, date_to: endOfDay });
        setAppointments(appointmentsData);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
        setAppointments([]);
      }
    };

    fetchAppointments();
  }, [selectedDate]); // Re-fetch appointments when selectedDate changes

  useEffect(() => {
    console.log(appointments);
  }, [appointments]);

  const isTimeSlotBooked = (slot: TimeSlot) => {
    return appointments.some((appointment: Appointment) => {
      const appointmentDate = new Date(appointment.appt_time);
      return appointmentDate >= slot.start && appointmentDate < new Date(slot.start.getTime() + 30 * 60000);
    });
  };

  return (
    <>
      <div className={`mt-4 grid grid-cols-6 gap-2`}>
        {timeSlots.map((slot: TimeSlot, index: number) => (
          <Button
            key={index}
            size="sm"
            variant={
              isTimeSlotBooked(slot)
                ? "unclickable"
                : selectedTimeSlot && selectedTimeSlot.getTime() === slot.start.getTime()
                ? "default"
                : "outline"
            }
            onClick={() =>
              !isTimeSlotBooked(slot) && setSelectedTimeSlot(slot.start)
            }>
            {slot.label}s
          </Button>
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-600">
        Appointments: {appointments && appointments.length > 0 ? appointments.map(appointment => `${appointment.id}: ${new Date(appointment.appt_time).toLocaleString()}, Duration: ${appointment.appt_duration} mins`).join(", ") : "No appointments found."}
      </p>
    </>
  );
};

export default TimeGrid;
