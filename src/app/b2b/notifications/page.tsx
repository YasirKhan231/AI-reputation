"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar";
import NotificationCard from "../../../components/NotificationCard";
import {
  notificationData,
  type NotificationData,
} from "../../../data/notificationData";
import styles from "./notifications.module.css";

export default function Notifications() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notifications, setNotifications] =
    useState<NotificationData[]>(notificationData);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleNotificationClick = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <div className={styles.notificationsContainer}>
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      <div
        className={`${styles.mainContent} ${
          sidebarCollapsed ? styles.expanded : ""
        }`}
      >
        <div className={styles.pageContent}>
          <div className={styles.pageHeader}>
            <h1>Notifications</h1>
          </div>

          <div className={styles.notificationsWrapper}>
            <div className={styles.notificationsList}>
              {notifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  id={notification.id}
                  icon={notification.icon}
                  message={notification.message}
                  time={notification.time}
                  read={notification.read}
                  onClick={handleNotificationClick}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
