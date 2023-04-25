import { Calendar } from "primereact/calendar";
import { useState } from "react";

export default function CalendarForm({ id, label, customOnChange }) {
  const [date, setDate] = useState(null);

  const handleInputCalendarChange = (e, id) => {
    setDate(e.target.value);
    e.target.value = e.target.value.toLocaleDateString("en-CA");
    customOnChange(e, id);
  };

  return (
    <span className="p-float-label">
      <Calendar
        id={id}
        dateFormat="yy-mm-dd"
        value={date}
        readOnlyInput
        onChange={(e) => handleInputCalendarChange(e, id)}
      />
      <label htmlFor={id}>{label}</label>
    </span>
  );
}
