import ClassicButton from "./ClassicButton";
import styles from "../../styles/TimeNavigation.module.css";
import { useState } from "react";

export default function TimeNavigation({ setComponentToShow }) {
  const [pageTitle, setPageTitle] = useState("My Activity Reports");

  const changeVisibleComponent = (e) => {
    setPageTitle(e.target.innerText);
    setComponentToShow(e.target.innerText);
  };

  return (
    <>
      <section className={styles.navigationContainer}>
        <ClassicButton
          onClick={changeVisibleComponent}
          text={"My Activity Reports"}
        />
        <ClassicButton
          onClick={changeVisibleComponent}
          text={"Activity Reports To Approve"}
        />
        <ClassicButton
          onClick={changeVisibleComponent}
          text={"Activity Reports"}
        />
      </section>

      <h2 className="pageTitle">{pageTitle}</h2>
    </>
  );
}
