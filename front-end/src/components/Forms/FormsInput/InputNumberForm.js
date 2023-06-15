import { InputNumber } from "primereact/inputnumber";
import { useState } from "react";

export default function InputNumberForm({
  id,
  label,
  keyfilter,
  customOnChange,
  initialValue,
  objectState,
  setObjectState,
}) {
  const handleInputTextChange = (e, id, objectState, setObjectState) => {
    setText(e.value);
    customOnChange(e, id, objectState, setObjectState);
  };

  const [text, setText] = useState(initialValue);
  return (
    <span className="p-float-label">
      <InputNumber
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
