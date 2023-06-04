import SidebarElement from "./SidebarElement";
import styles from "../styles/Sidebar.module.css";
import Link from "next/link";

export default function Sidebar() {
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
      <Link href="projects">
        <SidebarElement name="Projects" icon="pi pi-book" />
      </Link>
    </navbar>
  );
}
