import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
  isSameDay,
  subMonths,
  addMonths,
} from "date-fns";
import { useState } from "react";

const Monthly = ({ events = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days = [];
  let day = startDate;
  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  const getEventsForDate = (date) => {
    return events.filter((ev) =>
      ev.start ? isSameDay(ev.start, date) : ev.date && isSameDay(ev.date, date)
    );
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="text-lg px-2">
          ←
        </button>
        <h2 className="text-xl font-semibold">{format(currentMonth, "MMMM yyyy")}</h2>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="text-lg px-2">
          →
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-600 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {days.map((date, i) => {
          const isCurrentMonth = isSameMonth(date, monthStart);
          const isToday = isSameDay(date, new Date());
          const hasEvents = getEventsForDate(date).length > 0;

          return (
            <div
              key={i}
              onClick={() => handleDateClick(date)}
              className={`cursor-pointer min-h-[80px] border rounded p-1 flex flex-col items-center ${
                isToday ? "border-pink-500" : ""
              } ${
                hasEvents ? "bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200" : ""
              } ${!isCurrentMonth ? "text-gray-400" : ""}`}
            >
              <div
                className={`w-6 h-6 flex items-center justify-center rounded-full ${
                  isToday ? "bg-pink-500 text-white" : ""
                }`}
              >
                {format(date, "d")}
              </div>
              {/* Small icons preview */}
              <div className="flex gap-1 flex-wrap justify-center mt-1 text-sm">
                {getEventsForDate(date).map((ev, i) => (
                  <span key={i}>{ev.icon}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg">
            <h2 className="text-lg font-bold mb-4">
              Events on {format(selectedDate, "PPP")}
            </h2>
            <ul className="space-y-2">
              {getEventsForDate(selectedDate).length === 0 ? (
                <p className="text-gray-500">No events on this day.</p>
              ) : (
                getEventsForDate(selectedDate).map((ev, idx) => (
                  <li
                    key={idx}
                    className={`p-3 rounded ${ev.color} text-sm shadow`}
                  >
                    <div className="font-semibold">{ev.icon} {ev.title}</div>
                    <div className="text-xs text-gray-700">
                      {format(ev.start, "p")} - {format(ev.end, "p")} | {ev.person}
                    </div>
                  </li>
                ))
              )}
            </ul>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Monthly;
