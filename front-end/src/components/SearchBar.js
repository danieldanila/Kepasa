import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import styles from "../styles/SearchBar.module.css";

export default function SearchBar({
  items,
  losesFocus,
  customOnChange,
  placeHolder,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(!losesFocus);

  function handleFocus() {
    if (losesFocus) {
      setIsFocused(!isFocused);
    }
  }

  const handleSearchQuery = (e) => {
    if (customOnChange !== null && customOnChange !== undefined) {
      customOnChange(e);
    }
    setSearchQuery(e.target.value);
  };

  const filteredData = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <span className="p-input-icon-left" onBlur={handleFocus}>
      <i
        className={`navBarIcon pi pi-search ${
          isFocused
            ? styles.searchBarIconFocused
            : styles.searchBarIconUnfocused
        }`}
        onClick={handleFocus}
      />

      {isFocused && (
        <>
          <InputText
            autoFocus
            className={styles.inputText}
            type="text"
            placeholder={placeHolder}
            value={searchQuery}
            onChange={handleSearchQuery}
          />
          <div className={styles.filteredDataContainer}>
            <ul className={styles.filteredData}>
              {searchQuery &&
                filteredData.map((item) => {
                  return <li key={item.id}>{item.name}</li>;
                })}
            </ul>
          </div>
        </>
      )}
    </span>
  );
}
