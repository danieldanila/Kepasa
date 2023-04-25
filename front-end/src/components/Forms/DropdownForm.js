import { AutoComplete } from "primereact/autocomplete";
import { useState } from "react";

export default function DropdownForm({
  id,
  label,
  suggestions,
  customOnChange,
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [filteredOptions, setFilteredOptions] = useState(null);

  const handleInputDropdownChange = (e, id) => {
    setSelectedOption(e.target.value);
    customOnChange(e, id);
  };

  const searchOption = (event) => {
    let filteredOptionsCopy;

    if (!event.query.trim().length) {
      filteredOptionsCopy = [...suggestions];
    } else {
      filteredOptionsCopy = suggestions.filter((sugestion) => {
        return sugestion.toLowerCase().startsWith(event.query.toLowerCase());
      });
    }

    setFilteredOptions(filteredOptionsCopy);
  };

  return (
    <span className="p-float-label">
      <AutoComplete
        id={id}
        suggestions={filteredOptions}
        forceSelection
        completeMethod={searchOption}
        value={selectedOption}
        onChange={(e) => handleInputDropdownChange(e, id)}
      />
      <label htmlFor={id}>{label}</label>
    </span>
  );
}
