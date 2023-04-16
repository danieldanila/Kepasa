import { Password } from "primereact/password";
import { useState } from "react";

export default function PasswordForm({ id, label }) {
  const [password, setPassowrd] = useState("");

  return (
    <span className="p-float-label">
      <Password
        id={id}
        value={password}
        onChange={(e) => setPassowrd(e.target.value)}
      />
      <label htmlFor={id}>{label}</label>
    </span>
  );
}
