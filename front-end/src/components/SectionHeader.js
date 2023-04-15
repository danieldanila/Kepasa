import Link from "next/link";
import styles from "../styles/SectionHeader.module.css";

export default function SectionHeader({ title, page }) {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <Link className={styles.viewMore} href={`/${page}`}>
        <p>View more</p>
      </Link>
    </div>
  );
}
