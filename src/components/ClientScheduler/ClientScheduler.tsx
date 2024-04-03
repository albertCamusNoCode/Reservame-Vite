import { addDays, format, startOfWeek, addWeeks } from "date-fns";
import { SVGProps, useState, FC } from "react";
import TimeGrid from "../TimeGrid/TimeGrid";
import { Button } from "@/components/ui/button";
import { addAppointment } from "../../data-actions/appointment";

interface ChevronIconProps extends SVGProps<SVGSVGElement> {}

const ChevronLeftIcon: FC<ChevronIconProps> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
};

const ChevronRightIcon: FC<ChevronIconProps> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
};

export const ClientScheduler: FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date());
  const [selectedToD, setSelectedToD] = useState<string>("All Day");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<Date | null>(null);

  const handleSelectDate = (date: Date): void => {
    setSelectedDate(date);
  };

  const handleSelectToD = (time: string): void => {
    setSelectedToD(time);
  };

  const handleWeekChange = (direction: "next" | "previous"): void => {
    const newWeek =
      direction === "next"
        ? addWeeks(currentWeek, 1)
        : addWeeks(currentWeek, -1);
    setCurrentWeek(newWeek);
    setSelectedDate(startOfWeek(newWeek));
  };

  const businessId = "660b88e229e05e16978e"; // Example business ID

  const handleContinue = async () => {
    if (!selectedTimeSlot) {
      alert("Please select a time slot.");
      return;
    }

    const appointmentDate = new Date(selectedTimeSlot);
    try {
      await addAppointment({
        business: businessId,
        time: appointmentDate,
      });
      alert("Appointment booked successfully.");
      // Optionally reset state or redirect the user
    } catch (error) {
      console.error("Failed to book appointment:", error);
      alert("Failed to book appointment.");
    }
  };

  return (
    <div key="1" className="bg-white p-8 rounded-lg shadow max-w-3xl mx-auto my-12">
      <h1 className="text-2xl font-semibold mb-6">Auto Body | Reservations</h1>
      <div className="flex justify-between items-center mb-6">
        <ChevronLeftIcon className="text-gray-400 cursor-pointer" onClick={() => handleWeekChange("previous")} />
        <div className="flex space-x-1">
          {Array.from({ length: 7 }).map((_, index) => {
            const day = addDays(startOfWeek(currentWeek), index);
            return (
              <div key={index} className="flex flex-col items-center">
                <span className="text-sm font-medium text-gray-500">{format(day, "EEEE")}</span>
                <Button
                  className={selectedDate.toDateString() === day.toDateString() ? "bg-blue-100 text-blue-600" : "text-sm font-medium text-gray-500"}
                  onClick={() => handleSelectDate(day)}>
                  {format(day, "dd MMM")}
                </Button>
              </div>
            );
          })}
        </div>
        <ChevronRightIcon className="text-gray-400 cursor-pointer" onClick={() => handleWeekChange("next")} />
      </div>
      <Button className="mb-4" variant="ghost">
        Today
      </Button>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-sm font-medium text-gray-500 mb-1">Selected Date</div>
          <div className="text-lg font-semibold">{format(selectedDate, "EEE, MMMM do")}</div>
        </div>
        <div>
          <div className="text-sm font-medium text-gray-500 mb-1">Selected Time</div>
          <div className="text-lg font-semibold">{selectedTimeSlot ? format(selectedTimeSlot, "h:mm a") : "-"}</div>
        </div>
      </div>
      <div className="flex space-x-2 mb-6">
        {["All Day", "Morning", "Afternoon", "Evening"].map((time) => (
          <Button
            key={time}
            className="flex-1"
            variant={selectedToD === time ? "secondary" : "outline"}
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
      />
      <div className="flex justify-center mt-6">
        <Button className="w-full" variant="outline" onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
};

