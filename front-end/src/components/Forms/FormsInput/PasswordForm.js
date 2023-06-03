import { Password } from "primereact/password";
import { useState } from "react";

export default function PasswordForm({
  id,
  label,
  customOnChange,
  initialValue,
  objectState,
  setObjectState,
  feedbackValue,
}) {
  const [password, setPassowrd] = useState(initialValue);

  const handleInputTextChange = (e, id, objectState, setObjectState) => {
    setPassowrd(e.target.value);
    customOnChange(e, id, objectState, setObjectState);
  };

  return (
    <span className="p-float-label">
      <Password
        id={id}
        value={password}
        onChange={(e) =>
          handleInputTextChange(e, id, objectState, setObjectState)
        }
        feedback={feedbackValue}
      />
      <label htmlFor={id}>{label}</label>
    </span>
  );
}
