"use client";

import { useState } from "react";
import styles from "./ProfileHeader.module.css";

export default function ProfileHeader() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <div className={styles.profileHeader}>
      <div className={styles.profileInfo}>
        <div className={styles.avatar}>
          <img src="/profile-analysed.svg" alt="Reona Saho" />
        </div>
        <div className={styles.details}>
          <h2 className={styles.name}>Reona Saho</h2>
          <p className={styles.email}>reonasaho@gmail.com</p>
        </div>
      </div>
      <div className={styles.profileActions}>
        <button
          className={styles.moreButton}
          onClick={() => setShowProfileMenu(!showProfileMenu)}
        >
          ⋮
        </button>

        {showProfileMenu && (
          <div className={styles.profileMenuDialog}>
            <div className={styles.menuItem}>
              <span className={styles.menuIcon}>⚙️</span>
              <span>Settings</span>
            </div>
            <div className={styles.menuItem}>
              <span className={styles.menuIcon}>❓</span>
              <span>Help</span>
            </div>
            <div className={styles.menuItem}>
              <span className={styles.menuIcon}>↩️</span>
              <span>Sign out</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
