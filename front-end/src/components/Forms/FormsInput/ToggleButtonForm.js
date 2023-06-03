import { ToggleButton } from "primereact/togglebutton";
import { useState } from "react";

export default function ToggleButtonForm({
  id,
  onLabel,
  offLabel,
  customOnChange,
  initialValue,
  objectState,
  setObjectState,
}) {
  const [isSelected, setIsSelected] = useState(initialValue);

  const handleInputBooleanChange = (e, id, objectState, setObjectState) => {
    setIsSelected(e.value);
    customOnChange(e, id, objectState, setObjectState);
  };

  return (
    <span className="p-float-label">
      <ToggleButton
        id={id}
        checked={isSelected}
        value={isSelected}
        onLabel={onLabel}
        offLabel={offLabel}
        onChange={(e) =>
          handleInputBooleanChange(e, id, objectState, setObjectState)
        }
      />
    </span>
  );
}
