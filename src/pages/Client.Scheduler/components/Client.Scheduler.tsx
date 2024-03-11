import { addDays, format, startOfWeek, addWeeks } from "date-fns";
import { SVGProps, useState, FC } from "react";
import TimeGrid from "./TimeGrid";

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

export const MobileScheduler: FC = () => {
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
          <button className="p-2" onClick={() => handleWeekChange("previous")}>
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <div>
            <h2 className="text-center text-lg font-semibold">
              Week of {format(startOfWeek(currentWeek), "EEE, d MMMM")}
            </h2>
          </div>
          <button className="p-2" onClick={() => handleWeekChange("next")}>
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="mt-4 flex overflow-x-auto space-x-4 justify-center">
          {Array.from({ length: 7 }).map((_, index) => {
            const day = addDays(startOfWeek(currentWeek), index);
            return (
              <button
                key={index}
                className={`rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${
                  selectedDate.toDateString() === day.toDateString() &&
                  "border-gray-800 bg-gray-900 text-white"
                } hover:bg-gray-800 hover:text-white`}
                onClick={() => handleSelectDate(day)}>
                {format(day, "EEE, d MMM")}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {["All Day", "Morning", "Afternoon", "Evening"].map((time) => (
          <button
            key={time}
            type="button"
            className={`w-full sm:w-auto flex-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
 ${
   selectedTime === time
     ? "bg-gray-800 text-white"
     : "bg-gray-100 text-gray-800"
 } hover:bg-primary hover:text-white`}
            onClick={() => handleSelectTime(time)}>
            {time}
          </button>
        ))}
      </div>
      <TimeGrid selectedTime={selectedTime} setSelectedTime={setSelectedTime} />

      <div className="mt-6">
        <button className="w-full sm:w-auto rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20">
          Continue
        </button>
      </div>
    </>
  );
};
