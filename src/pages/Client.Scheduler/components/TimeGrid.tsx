import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import getAppointments from "src/pages/Client.Scheduler/services/getAppointments";

type TimeSlot = {
  label: string;
};

type TimeSlots = {
  [key: string]: TimeSlot[];
};

interface TimeGridProps {
  selectedTime: string;
}

const TimeGrid: React.FC<TimeGridProps> = ({ selectedTime }) => {
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
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  return (
    <>
      <div className={`mt-4 grid grid-cols-6 gap-2`}>
        {timeSlots[selectedTime]?.map((slot: TimeSlot, index: number) => (
          <Button
            key={index}
            size="sm"
            variant={selectedTimeSlot === slot.label ? "default" : "outline"}
            onClick={() => setSelectedTimeSlot(slot.label)}>
            {slot.label}
          </Button>
        ))}
      </div>
    </>
  );
};

export default TimeGrid;
