import NotificationBar from "./NotificationBar";
import SearchBar from "./SearchBar";
import styles from "../styles/Navbar.module.css";
import UserMenu from "./UserMenu";
import { useContext, useEffect, useState } from "react";
import { ProjectsContext, UsersContext } from "@/pages/_app";

export default function Navbar() {
  const { users } = useContext(UsersContext);
  const { projects } = useContext(ProjectsContext);

  const [items, setItems] = useState([]);

  useEffect(() => {
    const filteredUsers = users.map((user) => {
      return {
        id: user.id,
        name: user.fullName,
      };
    });

    const uniqueUsers = filteredUsers.filter(
      (user) => !items.some((item) => item.id === user.id)
    );

    setItems((prevItems) => prevItems.concat(uniqueUsers));

    const filteredProjects = projects.map((project) => {
      return {
        id: project.id,
        name: project.name,
      };
    });

    const uniqueProjects = filteredProjects.filter(
      (project) => !items.some((item) => item.id === project.id)
    );

    setItems((prevItems) => prevItems.concat(uniqueProjects));
  }, [users, projects]);

  return (
    <navbar className={styles.container}>
      <SearchBar
        items={items}
        losesFocus={true}
        placeHolder="Search people, projects..."
      />
      <NotificationBar />
      <UserMenu />
    </navbar>
  );
}
