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
  const notificationsContainerRef = useRef(null);
  const notificationsBellRef = useRef(null);

  useEffect(() => {
    const handleNotificationClick = (event) => {
      if (
        notificationsContainerRef.current &&
        notificationsBellRef.current &&
        !notificationsContainerRef.current.contains(event.target) &&
        !notificationsBellRef.current.contains(event.target)
      ) {
        handleFocus();
      }
    };
    document.addEventListener("mousedown", handleNotificationClick);
    return () => {
      document.removeEventListener("mousedown", handleNotificationClick);
    };
  }, [isFocused]);

  function handleFocus() {
    setIsFocused(!isFocused);
  }

  const notificationTemplate = (notification) => {
    return <div className={styles.notificationCardItem}>{notification}</div>;
  };

  return (
    <div>
      <i
        className="pi pi-bell"
        onClick={handleFocus}
        ref={notificationsBellRef}
      />
      <div className={styles.notificationBarContainer}>
        {isFocused && (
          <div
            className={styles.notificationListContainer}
            ref={notificationsContainerRef}
            tabIndex="0"
          >
            <h3>Notifications</h3>
            <VirtualScroller
              className={styles.virtualScroller}
              items={notifications}
              itemTemplate={notificationTemplate}
              itemSize={50}
            />
          </div>
        )}
      </div>
    </div>
  );
}
