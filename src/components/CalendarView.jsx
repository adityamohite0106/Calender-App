import Daily from "../pages/Daily";
import Weekly from "../pages/Weekly";
import Monthly from "../pages/Monthly";

const CalendarView = ({ view, events }) => {
  if (view === "daily") return <Daily events={events} />;
  if (view === "weekly") return <Weekly events={events} />;
  if (view === "monthly") return <Monthly events={events} />;

  return <div className="text-center text-red-500 mt-4">Invalid view selected.</div>;
};

export default CalendarView;
