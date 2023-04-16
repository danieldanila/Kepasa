import styles from "../styles/DataTableHeader.module.css";
import { Button } from "primereact/button";
import SearchBar from "./SearchBar";

export default function DataTableHeader({ clearFilters, customOnChange }) {
  return (
    <div className={styles.headerContainer}>
      <Button
        type="button"
        icon="pi pi-filter-slash"
        label="Clear filters"
        outlined
        onClick={clearFilters}
      />

      <SearchBar
        items={[]}
        losesFocus={false}
        placeHolder={`Search ${global.currentPage}`}
        customOnChange={customOnChange}
      />
    </div>
  );
}
