import styles from "../styles/SidebarElement.module.css";

export default function SidebarElement({ name, icon }) {
  const isCurrentPage =
    global.currentPage === name.toLocaleLowerCase() ||
    (global.pageRoute === "/" && name == "Home");

  return (
    <div
      className={`${styles.container} ${isCurrentPage && styles.currentPage}`}
    >
      <i className={`${icon}`} />
      <p>{name}</p>
    </div>
  );
}
