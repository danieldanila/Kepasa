import ClipLoader from "react-spinners/ClipLoader";
import styles from "../styles/Loading.module.css";

export default function Loading() {
  return (
    <main className={styles.container}>
      <h2 className="pageTitle">Loading...</h2>

      <ClipLoader size={150} />
    </main>
  );
}
