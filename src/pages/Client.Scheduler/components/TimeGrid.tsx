import React from "react";
import appointmentTime from "src/pages/Client.Scheduler/services/getAppointments.tsx";

type TimeSlot = {
  label: string;
};

type TimeSlots = {
  [key: string]: TimeSlot[];
};

interface TimeGridProps {
  selectedTime: string;
  setSelectedTime: (time: string) => void;
}

const TimeGrid: React.FC<TimeGridProps> = ({
  selectedTime,
  setSelectedTime,
}) => {
  const timeSlots: TimeSlots = {
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
  };

  return (
    <>
      <div
        className={`mt-4 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2`}>
        {timeSlots[selectedTime]?.map((slot: TimeSlot, index: number) => (
          <button
            key={index}
            className="rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={() => setSelectedTime(slot.label)}>
            {slot.label}
          </button>
        ))}
      </div>
    </>
  );
};

export default TimeGrid;
