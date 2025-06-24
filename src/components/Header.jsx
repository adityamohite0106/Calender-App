import { useState } from "react";

const Header = ({ view, setView, addEvent }) => {
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
  });

  // 🎨 Gradient options to choose randomly from
  const colorOptions = [
    "bg-gradient-to-r from-purple-200 via-pink-200 to-red-200",
    "bg-gradient-to-r from-green-200 via-green-300 to-green-400",
    "bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200",
    "bg-gradient-to-r from-blue-200 via-cyan-200 to-indigo-200",
    "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400",
    "bg-gradient-to-r from-pink-200 via-rose-200 to-purple-200",
    "bg-gradient-to-r from-teal-200 via-blue-200 to-sky-200",
  ];

  const handleAdd = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time) return;

    const start = new Date(`${newEvent.date}T${newEvent.time}`);
    const randomColor =
      colorOptions[Math.floor(Math.random() * colorOptions.length)];

    const event = {
      id: Date.now(),
      title: newEvent.title,
      start,
      end: new Date(start.getTime() + 60 * 60 * 1000),
      icon: "🎶",
      color: randomColor,
      person: "✨Admin",
    };

    addEvent(event);

    // Reset form
    setNewEvent({
      title: "",
      date: "",
      time: "",
    });
    setShowModal(false);
  };

  return (
    <>
      {/* Header section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Calendar</h1>
        <button
          onClick={() => setShowModal(true)}
className="text-pink-600 px-4 py-2 rounded-full text-sm font-semibold hover:text-pink-800"
        >
          + New event
        </button>
      </div>

      {/* View buttons */}
      <div className="flex-1 flex justify-center">
        <div className="flex gap-4 bg-gray-100 p-2 rounded-md">
          {["daily", "weekly", "monthly"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`capitalize px-3 py-1 border-b-2 rounded-md ${
                view === v
                  ? "bg-white text-black border-gray-300"
                  : "border-transparent text-gray-600"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-80 space-y-4">
            <h2 className="text-xl font-semibold">Add New Event</h2>

            <input
              type="text"
              placeholder="Event Title"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
              className="w-full border p-2 rounded"
            />

            <input
              type="date"
              value={newEvent.date}
              onChange={(e) =>
                setNewEvent({ ...newEvent, date: e.target.value })
              }
              className="w-full border p-2 rounded"
            />

            <input
              type="time"
              value={newEvent.time}
              onChange={(e) =>
                setNewEvent({ ...newEvent, time: e.target.value })
              }
              className="w-full border p-2 rounded"
            />

            {/* Modal buttons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="bg-pink-500 text-white px-4 py-1 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
