"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "./search/searchbar";
import SearchOverlay from "./search/searchOverlay";
import styles from "./sidebar.module.css";
import SettingsDialog from "./dialog/settingdialog";
import UploadCSVDialog from "./upload-csv/uploadcsvDialog";

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export default function Sidebar({
  isCollapsed = false,
  onToggle,
}: SidebarProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  // Use internal state if no external control
  const collapsed = isCollapsed !== undefined ? isCollapsed : internalCollapsed;
  const toggleSidebar =
    onToggle || (() => setInternalCollapsed(!internalCollapsed));

  // Add keyboard shortcut effect
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Ctrl+K (Windows/Linux) or Cmd+K (Mac)
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        setShowSearchOverlay(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const navigationItems = [
    { name: "Dashboard", icon: "dashboard.svg", route: "/b2b/dashboard" },
    { name: "Reports", icon: "reports.svg", route: "/b2b/reports" },
    {
      name: "Consent Tracking",
      icon: "consent.svg",
      route: "/b2b/consent-Tracking",
    },
    {
      name: "Individual Search",
      icon: "individual.svg",
      route: "/b2b/individual-search",
    },
    {
      name: "Integrations & API",
      icon: "api.svg",
      route: "/b2b/integration-api",
    },
    {
      name: "Billing & Subscription",
      icon: "pricing.svg",
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
      setShowSettingsDialog(true);
    }
    setShowDropdown(false);
  };

  const handleSearchClick = () => {
    setShowSearchOverlay(true);
  };

  // Render collapsed toggle button when sidebar is hidden
  if (collapsed) {
    return (
      <div style={{ marginRight: "20px" }}>
        {" "}
        {/* Added margin container */}
        <button className={styles.collapsedToggle} onClick={toggleSidebar}>
          <img src="/b2b/sidebar/toggle.svg" alt="Open Sidebar" />
        </button>
      </div>
    );
  }

  return (
    <>
      <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
        {/* Top Row */}
        <div className={styles.topRow}>
          <div className={styles.logo}>
            <img src="/logo.svg" alt="Observr" />
          </div>
          <div className={styles.topActions}>
            <Link href="/b2b/notifications" className={styles.actionButton}>
              <img src="/b2b/sidebar/notification.svg" alt="Notifications" />
            </Link>
            <button className={styles.actionButton} onClick={toggleSidebar}>
              <img src="/b2b/sidebar/toggle.svg" alt="Toggle Sidebar" />
            </button>
          </div>
        </div>

        {/* Search Component */}
        <div onClick={handleSearchClick}>
          <SearchBar />
        </div>

        {/* Scrollable Content */}
        <div className={styles.scrollableContent}>
          {/* Navigation Items */}
          <nav className={styles.navigation}>
            {navigationItems.map((item) => {
              const isActive = pathname === item.route;
              return (
                <Link
                  key={item.name}
                  href={item.route}
                  className={`${styles.navItem} ${
                    isActive ? styles.active : ""
                  }`}
                >
                  <img
                    src={`/b2b/sidebar/${item.icon}`}
                    alt={item.name}
                    className={`${styles.navIcon} ${
                      isActive ? styles.activeIcon : ""
                    }`}
                  />
                  <span className={styles.navText}>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Upload CSV Button */}
          <div className={styles.uploadSection}>
            <button
              className={styles.uploadButton}
              onClick={() => setShowUploadDialog(true)}
            >
              <img
                src="/b2b/sidebar/upload.svg"
                alt="Upload"
                className={styles.uploadIcon}
              />
              Upload CSV
            </button>
          </div>

          {/* Spacer to push profile to bottom */}
          <div className={styles.spacer}></div>

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

            {/* Updated Dropdown Menu */}
            {showDropdown && (
              <div className={styles.dropdown} ref={dropdownRef}>
                <button
                  className={styles.dropdownItem}
                  onClick={() => handleDropdownAction("Setting")}
                >
                  <img
                    src="/b2b/sidebar/setting.svg"
                    alt="Settings"
                    className={styles.dropdownIcon}
                  />
                  Settings
                </button>
                <button
                  className={styles.dropdownItem}
                  onClick={() => handleDropdownAction("Help")}
                >
                  <img
                    src="/b2b/sidebar/help.svg"
                    alt="Help"
                    className={styles.dropdownIcon}
                  />
                  Help
                </button>
                <button
                  className={styles.dropdownItem}
                  onClick={() => handleDropdownAction("Sign out")}
                >
                  <img
                    src="/b2b/sidebar/signout.svg"
                    alt="Sign Out"
                    className={styles.dropdownIcon}
                  />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={showSearchOverlay}
        onClose={() => setShowSearchOverlay(false)}
      />

      {/* Settings Dialog */}
      <SettingsDialog
        isOpen={showSettingsDialog}
        onClose={() => setShowSettingsDialog(false)}
      />
      <UploadCSVDialog
        isOpen={showUploadDialog}
        onClose={() => setShowUploadDialog(false)}
      />
    </>
  );
}
