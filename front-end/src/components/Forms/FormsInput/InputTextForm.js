import { InputText } from "primereact/inputtext";
import { useState } from "react";

export default function InputTextForm({
  id,
  label,
  keyfilter,
  customOnChange,
  initialValue,
}) {
  const handleInputTextChange = (e, id) => {
    setText(e.target.value);
    customOnChange(e, id);
  };

  const [text, setText] = useState(initialValue);
  return (
    <span className="p-float-label">
      <InputText
        id={id}
        keyfilter={keyfilter}
        value={text}
        onChange={(e) => handleInputTextChange(e, id)}
      />
      <label htmlFor={id}>{label}</label>
    </span>
  );
}
