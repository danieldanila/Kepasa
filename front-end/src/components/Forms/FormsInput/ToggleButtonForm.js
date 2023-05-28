import { ToggleButton } from "primereact/togglebutton";
import { useState } from "react";

export default function ToggleButtonForm({
  id,
  onLabel,
  offLabel,
  customOnChange,
  initialValue,
}) {
  const [isSelected, setIsSelected] = useState(initialValue);

  const handleInputBooleanChange = (e, id) => {
    setIsSelected(e.value);
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
