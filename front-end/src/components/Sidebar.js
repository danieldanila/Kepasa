import SidebarElement from "./SidebarElement";
import styles from "../styles/Sidebar.module.css";

export default function Sidebar() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <h2>Kepasa</h2>
      </div>
      <SidebarElement name="Home" icon="pi pi-home" />
      <SidebarElement name="Time" icon="pi pi-clock" />
      <SidebarElement name="Goals" icon="pi pi-star" />
      <SidebarElement name="People" icon="pi pi-users" />
      <SidebarElement name="Projects" icon="pi pi-book" />
    </div>
  );
}
