import { addDays, format, startOfWeek, addWeeks } from "date-fns";
import { useState } from "react";
import TimeGrid from "./TimeGrid";
import { Button } from "@/components/ui/button";
import { addAppointment } from "../../../data-actions/appointment";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { BusinessPublic } from "@/types";
import { Card } from "../../ui/card";

export const SchedulerStep = ({ businessPublic, businessId }: { businessPublic: BusinessPublic | null, businessId: string }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date());
  const [selectedToD, setSelectedToD] = useState<string>("All Day");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<Date | null>(null);
  const handleSelectDate = (date: Date): void => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };

  const handleSelectToD = (time: string): void => {
    setSelectedToD(time);
  };

  const handleWeekChange = (direction: "next" | "previous" | "current"): void => {
    let newWeek = currentWeek;
    if (direction === "next") {
      newWeek = addWeeks(currentWeek, 1);
    } else if (direction === "previous") {
      newWeek = addWeeks(currentWeek, -1);
    } else if (direction === "current") {
      newWeek = new Date(); // Resets to the current week
    }
    setCurrentWeek(newWeek);
  };



  const handleContinue = async () => {
    if (!selectedTimeSlot) {
      alert("Please select a time slot.");
      return;
    }

    const appointmentDate = selectedTimeSlot ? selectedTimeSlot.toISOString() : null;
    try {
      await addAppointment({
        business_id: businessId, // businessId is now guaranteed to be a string, not null
        client_phone: "000-000-0000", // Placeholder value, replace with actual client phone
        appt_time: appointmentDate,
        appt_duration: 30, // Assuming 30 minutes for the duration
        business_service_id: "serviceIdPlaceholder", // Placeholder value, replace with actual service ID
      });
      alert("Appointment booked successfully.");
      // Optionally reset state or redirect the user
    } catch (error) {
      console.error("Failed to book appointment:", error);
      alert("Failed to book appointment.");
    }
  };

  if (!businessPublic) return null;
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
      <Button className="mt-7" size="icon" variant="outline" onClick={() => handleWeekChange("previous")}>
      <ChevronLeftIcon className="h-5 w-5" />
        <span className="sr-only">Previous Week</span>
      </Button>
        <div className="flex space-x-2">
          {Array.from({ length: 7 }).map((_, index) => {
            const day = addDays(startOfWeek(currentWeek), index);
            return (
              <div key={index} className="flex flex-col items-center">
                <span className="text-sm font-medium text-gray-500 mb-2">{format(day, "EEEE")}</span>
                <Button
                  variant={selectedDate.toDateString() === day.toDateString() ? "default" : "outline"}
                  onClick={() => handleSelectDate(day)}>
                  {format(day, "dd MMM")}
                </Button>
              </div>
            );
          })}
        </div>
        <Button className="mt-7" size="icon" variant="outline" onClick={() => handleWeekChange("next")}>
      <ChevronRightIcon className="h-5 w-5" />
        <span className="sr-only">Next Week</span>
      </Button>
      </div>
      <Button className="mb-4" variant="outline" onClick={() => { handleSelectDate(new Date()); handleWeekChange("current"); }}>
        Today
      </Button>
      <Card className="p-6 flex flex-col flex-shrink mb-4">
        <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-sm font-medium text-gray-500 mb-1">Selected Date</div>
          <div className="text-lg font-semibold">{format(selectedDate, "EEE, MMMM do")}</div>
        </div>
        <div>
          <div className="text-sm font-medium text-gray-500 mb-1">Selected Time</div>
          <div className="text-lg font-semibold">{selectedTimeSlot ? format(selectedTimeSlot, "h:mm a") : "-"}</div>
        </div>
      </div>
      </Card>
      <div className="flex space-x-2 mb-6">
        {["All Day", "Morning", "Afternoon", "Evening"].map((time) => (
          <Button
            key={time}
            className="flex-1"
            variant={selectedToD === time ? "default" : "outline"}
            onClick={() => handleSelectToD(time)}>
            {time}
          </Button>
        ))}
      </div>
      <TimeGrid
        selectedToD={selectedToD}
        selectedDate={selectedDate}
        selectedTimeSlot={selectedTimeSlot}
        setSelectedTimeSlot={setSelectedTimeSlot}
        businessId={businessId}
      />
      <div className="flex justify-center mt-6">
        <Button className="w-full" variant={selectedTimeSlot ? "default" : "unclickable"} onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
};

