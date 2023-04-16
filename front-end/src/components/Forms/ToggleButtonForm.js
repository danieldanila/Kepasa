import { ToggleButton } from "primereact/togglebutton";
import { useState } from "react";

export default function ToggleButtonForm({ id, onLabel, offLabel }) {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <span className="p-float-label">
      <ToggleButton
        id={id}
        checked={isSelected}
        value={isSelected}
        onLabel={onLabel}
        offLabel={offLabel}
        onChange={(e) => setIsSelected(e.target.value)}
      />
    </span>
  );
}
