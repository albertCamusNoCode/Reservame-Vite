import { addDays, format, startOfWeek, addWeeks } from "date-fns";
import { SVGProps, useState, FC } from "react";
import TimeGrid from "./TimeGrid";
import { Button } from "@/components/ui/button";

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
  const [selectedTime, setSelectedTime] = useState<string>("All Day");
  // const currentBusiness =

  const handleSelectDate = (date: Date): void => {
    setSelectedDate(date);
  };

  const handleSelectTime = (time: string): void => {
    setSelectedTime(time);
  };

  const handleWeekChange = (direction: "next" | "previous"): void => {
    const newWeek =
      direction === "next"
        ? addWeeks(currentWeek, 1)
        : addWeeks(currentWeek, -1);
    setCurrentWeek(newWeek);
    setSelectedDate(startOfWeek(newWeek));
  };

  return (
    <>
      <div className="bg-white p-4">
        <p className="mt-2 text-sm text-gray-600">Zürich | Löwenstrasse 16</p>
        <div className="mt-4 flex justify-between">
          <Button className="p-2" onClick={() => handleWeekChange("previous")}>
            <ChevronLeftIcon className="h-6 w-6" />
          </Button>
          <div>
            <h2 className="text-center text-lg font-semibold">
              Week of {format(startOfWeek(currentWeek), "EEE, d MMMM")}
            </h2>
          </div>
          <Button className="p-2" onClick={() => handleWeekChange("next")}>
            <ChevronRightIcon className="h-6 w-6" />
          </Button>
        </div>
        <div className="mt-4 flex overflow-x-auto space-x-4 justify-center">
          {Array.from({ length: 7 }).map((_, index) => {
            const day = addDays(startOfWeek(currentWeek), index);
            return (
              <Button
                key={index}
                variant={
                  selectedDate.toDateString() === day.toDateString()
                    ? "default"
                    : "outline"
                }
                onClick={() => handleSelectDate(day)}>
                {format(day, "EEE, d MMM")}
              </Button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {["All Day", "Morning", "Afternoon", "Evening"].map((time) => (
          <Button
            key={time}
            type="button"
            variant={selectedTime === time ? "default" : "outline"}
            onClick={() => handleSelectTime(time)}>
            {time}
          </Button>
        ))}
      </div>
      <TimeGrid selectedTime={selectedTime} />

      <div className="flex justify-center mt-6">
        <Button variant="default">Continue</Button>
      </div>
    </>
  );
};
