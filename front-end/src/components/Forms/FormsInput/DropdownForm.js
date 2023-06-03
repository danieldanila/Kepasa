import { AutoComplete } from "primereact/autocomplete";
import { useState } from "react";

export default function DropdownForm({
  id,
  label,
  suggestions,
  fieldNameToBeShown,
  customOnChange,
  initialValue,
  objectState,
  setObjectState,
}) {
  const [selectedOption, setSelectedOption] = useState(initialValue);
  const [filteredOptions, setFilteredOptions] = useState(null);

  const handleInputDropdownChange = (e, id, objectState, setObjectState) => {
    setSelectedOption(e.target.value);
    customOnChange(e, id, objectState, setObjectState);
  };

  const searchOption = (event) => {
    let filteredOptionsCopy;

    if (!event.query.trim().length) {
      filteredOptionsCopy = [...suggestions];
    } else {
      filteredOptionsCopy = suggestions
        .filter((sugestion) => {
          return sugestion[fieldNameToBeShown]
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        })
        .map((suggestion) => {
          return {
            ...suggestion,
            label: suggestion[fieldNameToBeShown],
            value: suggestion.id,
          };
        });
    }

    setFilteredOptions(filteredOptionsCopy);
  };

  return (
    <span className="p-float-label">
      <AutoComplete
        id={id}
        suggestions={filteredOptions}
        field="label"
        forceSelection
        completeMethod={searchOption}
        value={selectedOption}
        onChange={(e) =>
          handleInputDropdownChange(e, id, objectState, setObjectState)
        }
      />
      <label htmlFor={id}>{label}</label>
    </span>
  );
}
