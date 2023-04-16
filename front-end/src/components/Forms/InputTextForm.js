import { InputText } from "primereact/inputtext";
import { useState } from "react";

export default function InputTextForm({ id, label, keyfilter }) {
  const [text, setText] = useState("");
  return (
    <span className="p-float-label">
      <InputText
        id={id}
        keyfilter={keyfilter}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <label htmlFor={id}>{label}</label>
    </span>
  );
}
