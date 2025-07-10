"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./sidebar.module.css";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: "📊", route: "/dashboard", active: true },
    { name: "Reports", icon: "📋", route: "/b2b/reports" },
    { name: "Consent Tracking", icon: "🔒", route: "/b2b/consent-tracking" },
    { name: "Integrations & API", icon: "🔗", route: "/b2b/integrations-api" },
    {
      name: "Billing & Subscription",
      icon: "💳",
      route: "/b2b/billing-subscription",
    },
  ];

  if (isCollapsed) {
    return (
      <button className={styles.floatingToggle} onClick={onToggle}>
        <img src="/heiumberger.svg" alt="Open Sidebar" />
      </button>
    );
  }

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>🔵</div>
          <span>Observ</span>
        </div>
        <div className={styles.headerIcons}>
          <div className={styles.iconBtn}>
            <img src="/search.svg" alt="Search" />
          </div>
          <button className={styles.iconBtn} onClick={onToggle}>
            <img src="/heiumberger.svg" alt="Toggle Sidebar" />
          </button>
        </div>
      </div>

      <div className={styles.searchSection}>
        <div className={styles.searchContainer}>
          <img src="/search.svg" alt="Search" className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search"
            className={styles.searchInput}
          />
          <span className={styles.searchShortcut}>⌘ K</span>
        </div>
      </div>

      <nav className={styles.sidebarNav}>
        {menuItems.map((item, index) => (
          <Link
            href={item.route}
            key={index}
            className={`${styles.navItem} ${item.active ? styles.active : ""}`}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className={styles.uploadCsvSection}>
        <button className={styles.uploadCsvBtn}>
          <span className={styles.uploadIcon}>📤</span>
          Upload CSV
        </button>
      </div>

      <div className={styles.individualSearch}>
        <input
          type="text"
          placeholder="Search individuals by Name, Email, Social etc"
          className={styles.searchInputLarge}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className={styles.searchActions}>
          <button className={styles.observBtn}>Observ ai</button>
          <button className={styles.searchBtn}>
            <img
              src="/search.svg"
              alt="Search"
              className={styles.searchBtnIcon}
            />
            Search
          </button>
        </div>
      </div>

      <div className={styles.userSection}>
        <div className={styles.userProfile}>
          <div className={styles.userAvatar}>
            <img src="/profile-analysed.svg" alt="User Avatar" />
          </div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>Reona Saho</div>
            <div className={styles.userEmail}>reonasaho@gmail.com</div>
          </div>
          <button
            className={styles.moreOptions}
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            ⋮
          </button>
        </div>

        {showUserMenu && (
          <div className={styles.userMenuPopup}>
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
