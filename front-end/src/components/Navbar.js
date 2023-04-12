import NotificationBar from "./NotificationBar";
import SearchBar from "./SearchBar";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.container}>
      <SearchBar />
      <NotificationBar />
    </div>
  );
}
