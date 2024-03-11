import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { getAppointments } from "../services/getAppointments";
import { Appointment } from "../services/types"; // Adjust the path as necessary

type TimeSlot = {
  label: string;
};

type TimeSlots = {
  [key: string]: TimeSlot[];
};

interface TimeGridProps {
  selectedToD: string;
  selectedDate: Date;
  selectedTimeSlot: string;
  setSelectedTimeSlot: React.Dispatch<React.SetStateAction<string>>;
}

const TimeGrid: React.FC<TimeGridProps> = ({
  selectedToD,
  selectedDate,
  selectedTimeSlot,
  setSelectedTimeSlot,
}) => {
  const generateTimeSlots = () => ({
    "All Day": Array.from({ length: 18 }, (_, index) => ({
      label: `${String(8 + Math.floor(index / 2)).padStart(2, "0")}:${
        index % 2 === 0 ? "00" : "30"
      } - ${String(8 + Math.floor(index / 2)).padStart(2, "0")}:${
        index % 2 === 0 ? "30" : "00"
      }`,
    })),
    Morning: Array.from({ length: 6 }, (_, index) => ({
      label: `${String(8 + index).padStart(2, "0")}:00 - ${String(
        8 + index
      ).padStart(2, "0")}:30`,
    })),
    Afternoon: Array.from({ length: 6 }, (_, index) => ({
      label: `${String(12 + index).padStart(2, "0")}:00 - ${String(
        12 + index
      ).padStart(2, "0")}:30`,
    })),
    Evening: Array.from({ length: 6 }, (_, index) => ({
      label: `${String(18 + index).padStart(2, "0")}:00 - ${String(
        18 + index
      ).padStart(2, "0")}:30`,
    })),
  });

  const timeSlots: TimeSlots = React.useMemo(generateTimeSlots, []);
  const [appointments, setAppointments] = useState<Appointment[]>([]); // Fixed type to Appointment[]

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointmentsData = await getAppointments("1"); // Assuming "1" is your business ID
        setAppointments(appointmentsData); // Correctly setting the appointments
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
        setAppointments([]);
      }
    };

    fetchAppointments();
  }, [selectedDate]); // Re-fetch appointments when selectedDate changes

  const isTimeSlotBooked = (slot: TimeSlot) => {
    return appointments.some((appointment: Appointment) => {
      const appointmentDate = new Date(appointment.time);
      const slotStart = new Date(selectedDate);
      const [startHours, startMinutes] = slot.label.split(" - ")[0].split(":");
      slotStart.setHours(parseInt(startHours), parseInt(startMinutes), 0, 0);
      const slotEnd = new Date(selectedDate);
      const [endHours, endMinutes] = slot.label.split(" - ")[1].split(":");
      slotEnd.setHours(parseInt(endHours), parseInt(endMinutes), 0, 0);

      return appointmentDate >= slotStart && appointmentDate < slotEnd;
    });
  };

  return (
    <>
      <div className={`mt-4 grid grid-cols-6 gap-2`}>
        {timeSlots[selectedToD]?.map((slot: TimeSlot, index: number) => (
          <Button
            key={index}
            size="sm"
            variant={
              isTimeSlotBooked(slot)
                ? "unclickable"
                : selectedTimeSlot === slot.label
                ? "default"
                : "outline"
            }
            onClick={() =>
              !isTimeSlotBooked(slot) && setSelectedTimeSlot(slot.label)
            }>
            {slot.label}
          </Button>
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-600">
        Appointments: {JSON.stringify(appointments)}
      </p>
    </>
  );
};

export default TimeGrid;
