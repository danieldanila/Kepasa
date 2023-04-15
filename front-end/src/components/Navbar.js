import NotificationBar from "./NotificationBar";
import SearchBar from "./SearchBar";
import styles from "../styles/Navbar.module.css";
import UserMenu from "./UserMenu";

export default function Navbar() {
  return (
    <navbar className={styles.container}>
      <SearchBar />
      <NotificationBar />
      <UserMenu />
    </navbar>
  );
}
