import { useEffect, useState } from "react";
import { isSameDay, format } from "date-fns";

const Daily = ({ events: initialEvents }) => {
  const today = new Date();
  const [events, setEvents] = useState([]);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [editEventId, setEditEventId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");

  // Load from localStorage or fallback to props
useEffect(() => {
  setEvents(initialEvents);
}, [initialEvents]);


  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  const todayEvents = events.filter((ev) => isSameDay(ev.start, today));

  const handleDelete = (id) => {
    const updated = events.filter((ev) => ev.id !== id);
    setEvents(updated);
    setMenuOpenId(null);
  };

  const handleEdit = (id) => {
    const target = events.find((ev) => ev.id === id);
    setEditedTitle(target.title);
    setEditEventId(id);
    setMenuOpenId(null);
  };

  const saveEdit = (id) => {
    const updated = events.map((ev) =>
      ev.id === id ? { ...ev, title: editedTitle } : ev
    );
    setEvents(updated);
    setEditEventId(null);
    setEditedTitle("");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        Events on {format(today, "PPP")}
      </h2>
      {todayEvents.length === 0 ? (
        <p className="text-gray-500">No events today.</p>
      ) : (
        <ul className="space-y-3">
          {todayEvents.map((ev) => (
            <li
              key={ev.id}
              className={`relative p-3 rounded shadow ${ev.color} text-sm`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[10px]">
                    {format(ev.start, "p")} - {format(ev.end, "p")}
                  </div>

                  {editEventId === ev.id ? (
                    <div className="flex gap-2 mt-1">
                      <input
                        className="text-sm rounded px-1"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                      />
                      <button
                        onClick={() => saveEdit(ev.id)}
                        className="text-green-600 text-xs"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="font-bold">
                      {ev.icon} {ev.title}
                    </div>
                  )}

                  <div className="text-gray-700 text-xs">{ev.person}</div>
                </div>

                {/* 3 Dot Button */}
                <div className="relative">
                  <button
                    onClick={() =>
                      setMenuOpenId(menuOpenId === ev.id ? null : ev.id)
                    }
                    className="text-xl px-2"
                  >
                    ⋮
                  </button>

                  {menuOpenId === ev.id && (
                    <div className="absolute right-0 mt-1 bg-white border rounded shadow-md text-xs z-10">
                      <button
                        onClick={() => handleEdit(ev.id)}
                        className="block px-3 py-1 hover:bg-gray-100 w-full text-left"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(ev.id)}
                        className="block px-3 py-1 hover:bg-gray-100 w-full text-left text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Daily;
