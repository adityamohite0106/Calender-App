import { format, startOfWeek, addDays, isSameDay } from "date-fns";
import { useState } from "react";

const Weekly = ({ events = [] }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const weekStart = startOfWeek(new Date(), { weekStartsOn: 0 });
  const days = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));
  const hours = Array.from({ length: 24 });

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  return (
    <div className="overflow-auto h-[90vh] bg-white">
      {/* Header: Day Names */}
      <div className="grid grid-cols-[60px_repeat(7,_1fr)] border-b border-l border-r text-sm bg-white sticky top-0 z-10">
        <div></div>
        {days.map((day, i) => {
          const isToday = isSameDay(day, new Date());
          return (
            <div
              key={i}
              className="text-center py-2 font-medium flex flex-col items-center justify-center"
            >
              <span>{format(day, "EEE")}</span>
              <span
                className={`w-6 h-6 mt-1 flex items-center justify-center rounded-full ${
                  isToday ? "bg-pink-500 text-white" : ""
                }`}
              >
                {format(day, "d")}
              </span>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Time on Left, Calendar Grid on Right */}
      <div className="flex">
        {/* Time Labels */}
        <div className="flex flex-col w-[60px]">
          {hours.map((_, hourIdx) => (
            <div
              key={`time-${hourIdx}`}
              className="h-12 text-xs text-right pr-2 py-3 border-l border-r border-gray-200"
            >
              {format(new Date().setHours(hourIdx, 0, 0), "haaa")}
            </div>
          ))}
        </div>

        {/* 7-Day Grid */}
        <div className="relative flex-1 grid grid-cols-7">
          {days.map((_, dayIdx) => (
            <div key={`col-${dayIdx}`} className="flex flex-col">
              {hours.map((_, hourIdx) => (
                <div
                  key={`cell-${dayIdx}-${hourIdx}`}
                  className="h-12 border-l border-r border-gray-200"
                ></div>
              ))}
            </div>
          ))}

          {/* Events */}
          {events.map((event, index) => {
            const dayIdx = event.start.getDay(); // 0 = Sun, 6 = Sat
            const startHour = event.start.getHours();
            const startMin = event.start.getMinutes();
            const duration =
              (event.end.getTime() - event.start.getTime()) / (1000 * 60); // in minutes

            return (
              <div
                key={`event-${index}`}
                className="absolute z-0 px-1"
                style={{
                  top: `${startHour * 48 + (startMin / 60) * 48}px`,
                  left: `calc(60px + ${dayIdx} * (100% - 60px) / 7)`,
                  width: `calc((100% - 60px) / 7)`,
                  height: `${(duration / 60) * 48}px`,
                }}
              >
                <div
                  className={`${event.color} text-xs p-1 rounded shadow-md overflow-hidden cursor-pointer`}
                  onClick={() => handleEventClick(event)}
                >
                  <div className="font-medium">
                    {event.icon} {event.title}
                  </div>
                  <div className="text-[10px] text-gray-700">{event.person}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Popup Modal */}
      {showModal && selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg">
            <h2 className="text-lg font-semibold mb-2">
              {selectedEvent.icon} {selectedEvent.title}
            </h2>
            <p className="text-sm mb-1 text-gray-600">
              <strong>Time:</strong> {format(selectedEvent.start, "p")} -{" "}
              {format(selectedEvent.end, "p")}
            </p>
            <p className="text-sm mb-3 text-gray-600">
              <strong>Person:</strong> {selectedEvent.person}
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
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

export default Weekly;
