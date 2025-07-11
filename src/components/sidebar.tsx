"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "./search/searchbar";
import styles from "./sidebar.module.css";
import SettingsDialog from "./dialog/settingdialog";
interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export default function Sidebar({
  isCollapsed = false,
  onToggle,
}: SidebarProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const pathname = usePathname();

  const navigationItems = [
    {
      name: "Dashboard",
      icon: "/b2b/sidebar/dashboard.svg",
      route: "/dashboard",
    },
    {
      name: "Reports",
      icon: "/b2b/sidebar/reports.svg",
      route: "/b2b/reports",
    },
    {
      name: "Consent Tracking",
      icon: "/b2b/sidebar/consent.svg",
      route: "/b2b/consent-Tracking",
    },
    {
      name: "Integrations & API",
      icon: "/b2b/sidebar/api.svg",
      route: "/b2b/integration",
    },
    {
      name: "Billing & Subscription",
      icon: "/b2b/sidebar/pricing.svg",
      route: "/b2b/pricing",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleDropdownAction = (action: string) => {
    console.log(`${action} click`);
    if (action === "Setting") {
      setShowSettingsDialog(true)
    }
    setShowDropdown(false);
  };

  const handleSearchSubmit = () => {
    console.log("Individual search:", searchQuery);
  };

  if (isCollapsed) {
    return null;
  }

  return (
    <div className={styles.sidebar}>
      {/* Top Row */}
      <div className={styles.topRow}>
        <div className={styles.logo}>
          <img src="/logo.svg" alt="Observr" />
        </div>
        <div className={styles.topActions}>
          <Link href="/b2b/notifications" className={styles.actionButton}>
            <img src="/b2b/sidebar/notification.svg" alt="Notifications" />
          </Link>
          <button className={styles.actionButton} onClick={onToggle}>
            <img src="/b2b/sidebar/sidebar-toggle.svg" alt="Toggle Sidebar" />
          </button>
        </div>
      </div>

      {/* Search Component */}
      <SearchBar />

      {/* Navigation Items */}
      <nav className={styles.navigation}>
        {navigationItems.map((item) => {
          const isActive = pathname === item.route;
          return (
            <Link
              key={item.name}
              href={item.route}
              className={`${styles.navItem} ${isActive ? styles.active : ""}`}
            >
              <img
                src={`${item.icon}`}
                alt={item.name}
                className={styles.navIcon}
              />
              <span className={styles.navText}>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Upload CSV Button */}
      <div className={styles.uploadSection}>
        <button className={styles.uploadButton}>
          <img
            src="/b2b/sidebar/upload-csv.svg"
            alt="Upload"
            className={styles.uploadIcon}
          />
          Upload CSV
        </button>
      </div>

      {/* Individual Search Card */}
      <div className={styles.searchCard}>
        <p className={styles.searchCardText}>
          Search individuals by Name, Email, Social etc
        </p>
        <div className={styles.searchInputContainer}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
            placeholder="Enter search terms..."
          />
        </div>
        <div className={styles.searchCardActions}>
          <button className={styles.observButton}>Observ ai</button>
          <button className={styles.searchButton} onClick={handleSearchSubmit}>
            Search
          </button>
        </div>
      </div>

      {/* Profile Footer */}
      <div className={styles.profileFooter}>
        <div className={styles.profileContainer}>
          <div className={styles.profileImage}>
            <img src="/profile.svg" alt="Reona Saito" />
          </div>
          <div className={styles.profileInfo}>
            <div className={styles.profileName}>Reona Saito</div>
            <div className={styles.profileEmail}>reonasaito@gmail.com</div>
          </div>
          <button
            className={styles.menuButton}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img src="/b2b/sidebar/3dots.svg" alt="Menu" />
          </button>
        </div>

        {/* Dropdown Menu */}
        {showDropdown && (
          <div className={styles.dropdown} ref={dropdownRef}>
            <button
              className={styles.dropdownItem}
              onClick={() => handleDropdownAction("Setting")}
            >
              Settings
            </button>
            <button
              className={styles.dropdownItem}
              onClick={() => handleDropdownAction("Help")}
            >
              Help
            </button>
            <button
              className={styles.dropdownItem}
              onClick={() => handleDropdownAction("Sign out")}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
       <SettingsDialog isOpen={showSettingsDialog} onClose={() => setShowSettingsDialog(false)} />
    </div>
  );
}
