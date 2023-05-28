import { Password } from "primereact/password";
import { useState } from "react";

export default function PasswordForm({
  id,
  label,
  customOnChange,
  initialValue,
}) {
  const [password, setPassowrd] = useState(initialValue);

  const handleInputTextChange = (e, id) => {
    setPassowrd(e.target.value);
    customOnChange(e, id);
  };

  return (
    <span className="p-float-label">
      <Password
        id={id}
        value={password}
        onChange={(e) => handleInputTextChange(e, id)}
      />
      <label htmlFor={id}>{label}</label>
    </span>
  );
}
