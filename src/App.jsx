import { useState, useEffect } from "react";
import Header from "./components/Header";
import CalendarView from "./components/CalendarView";
import { mockEvents } from "./data/mockEvents";

function App() {
  const [view, setView] = useState("weekly");
  const [events, setEvents] = useState([]);

  // Load events from localStorage on first render
useEffect(() => {
  const saved = localStorage.getItem("calendarEvents");

  if (saved) {
    try {
      const parsed = JSON.parse(saved);

      // 🔍 Check if it's empty
      if (parsed.length === 0) {
        setEvents(mockEvents);
        return;
      }

      const hydrated = parsed.map((e) => ({
        ...e,
        start: new Date(e.start),
        end: new Date(e.end),
      }));
      setEvents(hydrated);
    } catch (err) {
      console.error("Error parsing localStorage:", err);
      setEvents(mockEvents);
    }
  } else {
    setEvents(mockEvents);
  }
}, []);


  // Save updated events to localStorage whenever events change
  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  // Add a new event
  const addEvent = (newEvent) => {
    setEvents((prev) => [...prev, newEvent]);
  };

  return (
    <div className="font-sans p-4 bg-white min-h-screen">
      <Header view={view} setView={setView} addEvent={addEvent} />
      <CalendarView view={view} events={events} />
    </div>
  );
}

export default App;
