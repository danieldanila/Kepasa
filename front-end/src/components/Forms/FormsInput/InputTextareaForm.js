import { useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";

export default function InputTextareaForm({
  id,
  label,
  keyfilter,
  customOnChange,
  initialValue,
  objectState,
  setObjectState,
}) {
  const handleInputTextChange = (e, id, objectState, setObjectState) => {
    setText(e.target.value);
    customOnChange(e, id, objectState, setObjectState);
  };

  const [text, setText] = useState(initialValue);
  return (
    <span className="p-float-label">
      <InputTextarea
        id={id}
        keyfilter={keyfilter}
        value={text}
        onChange={(e) =>
          handleInputTextChange(e, id, objectState, setObjectState)
        }
      />
      <label htmlFor={id}>{label}</label>
    </span>
  );
}
