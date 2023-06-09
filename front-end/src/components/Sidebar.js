import SidebarElement from "./SidebarElement";
import styles from "../styles/Sidebar.module.css";
import Link from "next/link";
import { useContext } from "react";
import { LoggedUserContext } from "@/pages/_app";

export default function Sidebar() {
  const { loggedUser } = useContext(LoggedUserContext);

  return (
    <navbar className={styles.container}>
      <Link href="/">
        <div className={styles.logo}>
          <h2>Kepasa</h2>
        </div>
      </Link>
      <Link href="/">
        <SidebarElement name="Home" icon="pi pi-home" />
      </Link>
      <Link href="/time">
        <SidebarElement name="Time" icon="pi pi-clock" />
      </Link>
      <Link href="/goals">
        <SidebarElement name="Goals" icon="pi pi-star" />
      </Link>
      <Link href="/people">
        <SidebarElement name="People" icon="pi pi-users" />
      </Link>
      <Link href="/projects">
        <SidebarElement name="Projects" icon="pi pi-book" />
      </Link>
      <Link href="/departments">
        <SidebarElement name="Departments" icon="pi pi-building" />
      </Link>
      <Link href="/roles">
        <SidebarElement name="Roles" icon="pi pi-id-card" />
      </Link>
      <Link href="/periods">
        <SidebarElement name="Periods" icon="pi pi-calendar" />
      </Link>
      <Link href="/taskTypes">
        <SidebarElement name="TaskTypes" icon="pi pi-list" />
      </Link>

      {loggedUser && loggedUser.isAdministrator && (
        <>
          <Link href="/rolesProjects">
            <SidebarElement name="RolesProjects" icon="pi pi-dollar" />
          </Link>
          <Link href="/usersProjectsRoles">
            <SidebarElement name="UsersProjectsRoles" icon="pi pi-briefcase" />
          </Link>
        </>
      )}
    </navbar>
  );
}
