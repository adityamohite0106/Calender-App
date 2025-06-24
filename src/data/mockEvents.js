export const mockEvents = [
  {
    id: 1,
    title: "Team Meeting",
    start: new Date(new Date().setHours(10, 0, 0, 0)), // today at 10 AM
    end: new Date(new Date().setHours(11, 0, 0, 0)),   // today at 11 AM
    icon: "📅",
    color: "bg-gradient-to-r from-green-200 via-green-300 to-green-400",
    person: "🧑‍💼 Manager",
  },
  {
    id: 2,
    title: "Workout Session",
    start: new Date(new Date().setHours(18, 0, 0, 0)), // today at 6 PM
    end: new Date(new Date().setHours(19, 0, 0, 0)),   // today at 7 PM
    icon: "🏋️",
    color: "bg-gradient-to-r from-blue-200 via-cyan-200 to-indigo-200",
    person: "💪 Self",
  },
];
