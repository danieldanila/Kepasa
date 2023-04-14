import styles from "../styles/SidebarElement.module.css";

export default function SidebarElement({ name, icon }) {
  return (
    <div className={styles.container}>
      <i className={`${icon}`} />
      <p>{name}</p>
    </div>
  );
}
