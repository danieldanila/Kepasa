import React, { useState, useRef, useEffect } from "react";
import { VirtualScroller } from "primereact/virtualscroller";
import styles from "../styles/NotificationBar.module.css";

export default function NotificationBar() {
  const [notifications, setNotifications] = useState([
    "Welcome aboard, Dani!",
    "Alex joined the company",
    "Andrei joined the company",
    "Cristi joined the company",
    "Ana joined the company",
    "Andreea joined the company",
    "Mihai joined the company",
    "Ionut joined the company",
  ]);
  const [isFocused, setIsFocused] = useState(false);
  const virtualScrollerRef = useRef(null);

  useEffect(() => {
    if (isFocused) {
      virtualScrollerRef.current.focus();
    }
  }, [isFocused]);

  function handleFocus() {
    setIsFocused(!isFocused);
  }

  const notificationTemplate = (notification) => {
    return <div className={styles.notificationCard}>{notification}</div>;
  };

  return (
    <div>
      <i
        className={`pi pi-bell ${styles.notificationBell}`}
        onClick={handleFocus}
      />

      {isFocused ? (
        <div
          className={styles.container}
          ref={virtualScrollerRef}
          tabIndex="0"
          onBlur={handleFocus}
        >
          <h3>Notifications</h3>
          <VirtualScroller
            className={styles.virtualScroller}
            items={notifications}
            itemTemplate={notificationTemplate}
            itemSize={50}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
