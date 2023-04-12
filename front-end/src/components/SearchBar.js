import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import styles from "../styles/SearchBar.module.css";

export default function SearchBar() {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  function handleFocus() {
    setIsFocused(!isFocused);
  }

  function handleValue(newValue) {
    setValue(newValue);
  }

  return (
    <span
      className={`p-input-icon-left ${styles.searchBar}`}
      onBlur={handleFocus}
    >
      <i
        className={`pi pi-search ${
          isFocused
            ? styles.searchBarIconFocused
            : styles.searchBarIconUnfocused
        }`}
        onClick={handleFocus}
      />

      {isFocused ? (
        <>
          <InputText
            autoFocus
            className={styles.inputText}
            type="text"
            placeholder="Search people, projects and more..."
            value={value}
            onChange={(e) => handleValue(e.target.value)}
          />
        </>
      ) : (
        <></>
      )}
    </span>
  );
}
