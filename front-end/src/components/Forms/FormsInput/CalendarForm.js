import { Calendar } from "primereact/calendar";
import { useState } from "react";

export default function CalendarForm({
  id,
  label,
  customOnChange,
  initialValue,
  objectState,
  setObjectState,
}) {
  const [date, setDate] = useState(
    initialValue ? new Date(initialValue) : null
  );

  const handleInputCalendarChange = (e, id, objectState, setObjectState) => {
    setDate(e.target.value);
    e.target.value = e.target.value.toLocaleDateString("en-CA");
    customOnChange(e, id, objectState, setObjectState);
  };

  return (
    <span className="p-float-label">
      <Calendar
        id={id}
        dateFormat="yy-mm-dd"
        value={date}
        readOnlyInput
        onChange={(e) =>
          handleInputCalendarChange(e, id, objectState, setObjectState)
        }
      />
      <label htmlFor={id}>{label}</label>
    </span>
  );
}
