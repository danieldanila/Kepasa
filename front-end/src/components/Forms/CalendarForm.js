import { Calendar } from "primereact/calendar";
import { useState } from "react";

export default function CalendarForm({ id, label }) {
  const [date, setDate] = useState(null);
  return (
    <span className="p-float-label">
      <Calendar
        id={id}
        dateFormat="yy-mm-dd"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <label htmlFor={id}>{label}</label>
    </span>
  );
}
