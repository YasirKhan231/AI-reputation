"use client";

import styles from "./NotificationCard.module.css";

interface NotificationCardProps {
  id: number;
  icon: string;
  message: string;
  time: string;
  read: boolean;
  onClick: (id: number) => void;
}

export default function NotificationCard({
  id,
  icon,
  message,
  time,
  read,
  onClick,
}: NotificationCardProps) {
  const handleClick = () => {
    if (!read) {
      onClick(id);
    }
  };

  return (
    <div
      className={`${styles.notificationCard} ${!read ? styles.unread : ""}`}
      onClick={handleClick}
    >
      <div className={styles.iconContainer}>
        <img
          src={icon || "/placeholder.svg"}
          alt="Notification"
          className={styles.icon}
        />
      </div>

      <div className={styles.content}>
        <div
          className={`${styles.message} ${
            read ? styles.readMessage : styles.unreadMessage
          }`}
        >
          {message}
        </div>
        <div className={styles.time}>{time}</div>
      </div>

      {!read && <div className={styles.unreadDot}></div>}
    </div>
  );
}
