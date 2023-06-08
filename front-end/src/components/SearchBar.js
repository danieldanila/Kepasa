import React, { useEffect, useState } from "react";
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
  const [filteredItems, setFilteredItems] = useState(null);

  useEffect(() => {
    const filteredData = items
      .filter((item) =>
        item.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 5);

    setFilteredItems(filteredData);
  }, [searchQuery]);

  const handleFocus = () => {
    if (losesFocus) {
      setIsFocused(!isFocused);
      setSearchQuery("");
    }
  };

  const handleSearchQuery = (e) => {
    if (customOnChange !== null && customOnChange !== undefined) {
      customOnChange(e);
    }
    setSearchQuery(e.target.value);
  };

  const handleClick = (itemId) => {
    global.router.push("/people/" + itemId);
  };

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
                filteredItems &&
                filteredItems.map((item) => {
                  return (
                    <li key={item.id} onMouseDown={(e) => handleClick(item.id)}>
                      {item.fullName}
                    </li>
                  );
                })}
            </ul>
          </div>
        </>
      )}
    </span>
  );
}
