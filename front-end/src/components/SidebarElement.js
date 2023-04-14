import styles from "../styles/SidebarElement.module.css";
import { useRouter } from "next/router";
export default function SidebarElement({ name, icon }) {
  const router = useRouter();
  const pageRoute = router.pathname;
  const currentPage = pageRoute.slice(1, pageRoute.length).toLocaleLowerCase();
  const isCurrentPage =
    currentPage === name.toLocaleLowerCase() ||
    (pageRoute === "/" && name == "Home");

  return (
    <div
      className={`${styles.container} ${isCurrentPage && styles.currentPage}`}
    >
      <i className={`${icon}`} />
      <p>{name}</p>
    </div>
  );
}
