import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import styles from "../styles/SearchBar.module.css";

export default function SearchBar() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Daniel Danila",
    },
    { id: 2, name: "Dan Negru" },
    {
      id: 3,
      name: "Costel Ridiche",
    },
    {
      id: 4,
      name: "James Kilengarth",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  function handleFocus() {
    setIsFocused(!isFocused);
  }

  function handleSearchQuery(newSearchQuery) {
    setSearchQuery(newSearchQuery);
  }

  const filteredData = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <span className="p-input-icon-left" onBlur={handleFocus}>
      <i
        className={`pi pi-search ${
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
            placeholder="Search people, projects and more..."
            value={searchQuery}
            onChange={(e) => handleSearchQuery(e.target.value)}
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
