import NotificationBar from "./NotificationBar";
import SearchBar from "./SearchBar";
import styles from "../styles/Navbar.module.css";
import UserMenu from "./UserMenu";
import { useState } from "react";

export default function Navbar() {
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

  return (
    <navbar className={styles.container}>
      <SearchBar
        items={items}
        losesFocus={true}
        placeHolder="Search anything..."
      />
      <NotificationBar />
      <UserMenu />
    </navbar>
  );
}
