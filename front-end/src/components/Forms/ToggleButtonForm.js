import { ToggleButton } from "primereact/togglebutton";
import { useState } from "react";

export default function ToggleButtonForm({
  id,
  onLabel,
  offLabel,
  customOnChange,
}) {
  const [isSelected, setIsSelected] = useState(false);

  const handleInputBooleanChange = (e, id) => {
    setIsSelected(e.target.value);
    customOnChange(e, id);
  };

  return (
    <span className="p-float-label">
      <ToggleButton
        id={id}
        checked={isSelected}
        value={isSelected}
        onLabel={onLabel}
        offLabel={offLabel}
        onChange={(e) => handleInputBooleanChange(e, id)}
      />
    </span>
  );
}
