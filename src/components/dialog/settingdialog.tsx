"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./settingDialog.module.css";
import SettingSectionCard from "./settingsectionCard";

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsDialog({
  isOpen,
  onClose,
}: SettingsDialogProps) {
  const [activeSection, setActiveSection] = useState("account");
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    highRiskAlerts: true,
    weeklyReports: true,
    securityUpdates: false,
    systemUpdates: false,
  });
  const dialogRef = useRef<HTMLDivElement>(null);

  const navigationItems = [
    {
      id: "account",
      label: "Account Settings",
      icon: "/b2b/dialog/account.svg",
    },
    {
      id: "password",
      label: "Change Password",
      icon: "/b2b/dialog/password.svg",
    },
    { id: "company", label: "Company Info", icon: "/b2b/dialog/company.svg" },
    {
      id: "notification",
      label: "Notification Settings",
      icon: "/b2b/dialog/notification.svg",
    },
  ];

  const accountFields = [
    { label: "YOUR NAME", placeholder: "Jhon Smith", type: "text" },
    {
      label: "EMAIL ADDRESS",
      placeholder: "youremail@gmail.com",
      type: "email",
    },
    { label: "PHONE NUMBER", placeholder: "+1 XXX XXX XXXX", type: "tel" },
  ];

  const passwordFields = [
    {
      label: "CURRENT PASSWORD",
      placeholder: "Enter Password",
      type: "password",
    },
    { label: "NEW PASSWORD", placeholder: "New Password", type: "password" },
    {
      label: "CONFIRM NEW PASSWORD",
      placeholder: "Confirm Password",
      type: "password",
    },
  ];

  const companyFields = [
    { label: "BUSINESS NAME", placeholder: "Jhon Smith", type: "text" },
    {
      label: "BUSINESS ADDRESS",
      placeholder: "Business address",
      type: "text",
    },
    { label: "", placeholder: "Apt, Suite, Etc", type: "text" },
    { label: "US TAX ID", placeholder: "1-800-829-1040", type: "text" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleAccountSubmit = (data: any) => {
    console.log("Account Settings:", data);
  };

  const handlePasswordSubmit = (data: any) => {
    console.log("Password Change:", data);
  };

  const handleCompanySubmit = (data: any) => {
    console.log("Company Info:", data);
  };

  const handleNotificationToggle = (key: string) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  const handleNotificationSubmit = () => {
    console.log("Notification Settings:", notifications);
  };

  if (!isOpen) return null;

  const getSectionTitle = () => {
    switch (activeSection) {
      case "account":
        return "Account Settings";
      case "password":
        return "Account Settings";
      case "company":
        return "Company Info";
      case "notification":
        return "Notification Settings";
      default:
        return "Settings";
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "account":
        return (
          <SettingSectionCard
            sectionName="Account Settings"
            fields={accountFields}
            buttonText="SAVE"
            iconSrc="/profile.svg"
            onSubmit={handleAccountSubmit}
            showAvatar={true}
          />
        );
      case "password":
        return (
          <SettingSectionCard
            sectionName="Change Password"
            fields={passwordFields}
            buttonText="CHANGE PASSWORD"
            onSubmit={handlePasswordSubmit}
            showAvatar={false}
          />
        );
      case "company":
        return (
          <SettingSectionCard
            sectionName="Company Info"
            fields={companyFields}
            buttonText="SAVE"
            onSubmit={handleCompanySubmit}
            showAvatar={false}
          />
        );
      case "notification":
        return (
          <div className={styles.notificationContent}>
            <div className={styles.notificationSection}>
              <div className={styles.notificationInfo}>
                <h3 className={styles.notificationTitle}>Email Alerts</h3>
                <p className={styles.notificationSubtitle}>
                  Receive email notifications for important events
                </p>
              </div>
              <div className={styles.toggleContainer}>
                <label className={styles.toggle}>
                  <input
                    type="checkbox"
                    checked={notifications.emailAlerts}
                    onChange={() => handleNotificationToggle("emailAlerts")}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </div>

            <div className={styles.notificationSection}>
              <div className={styles.notificationInfo}>
                <h3 className={styles.notificationTitle}>High Risk Alerts</h3>
                <p className={styles.notificationSubtitle}>
                  Immediate notifications for high-risk profiles
                </p>
              </div>
              <div className={styles.toggleContainer}>
                <label className={styles.toggle}>
                  <input
                    type="checkbox"
                    checked={notifications.highRiskAlerts}
                    onChange={() => handleNotificationToggle("highRiskAlerts")}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </div>

            <div className={styles.notificationSection}>
              <div className={styles.notificationInfo}>
                <h3 className={styles.notificationTitle}>Weekly Reports</h3>
                <p className={styles.notificationSubtitle}>
                  Summary reports sent every week
                </p>
              </div>
              <div className={styles.toggleContainer}>
                <label className={styles.toggle}>
                  <input
                    type="checkbox"
                    checked={notifications.weeklyReports}
                    onChange={() => handleNotificationToggle("weeklyReports")}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </div>

            <div className={styles.notificationSection}>
              <div className={styles.notificationInfo}>
                <h3 className={styles.notificationTitle}>Security updates</h3>
                <p className={styles.notificationSubtitle}>
                  Important notifications about your account security.
                </p>
              </div>
              <div className={styles.toggleContainer}>
                <label className={styles.toggle}>
                  <input
                    type="checkbox"
                    checked={notifications.securityUpdates}
                    onChange={() => handleNotificationToggle("securityUpdates")}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </div>

            <div className={styles.notificationSection}>
              <div className={styles.notificationInfo}>
                <h3 className={styles.notificationTitle}>System Updates</h3>
                <p className={styles.notificationSubtitle}>
                  Notifications about system maintenance and updates
                </p>
              </div>
              <div className={styles.toggleContainer}>
                <label className={styles.toggle}>
                  <input
                    type="checkbox"
                    checked={notifications.systemUpdates}
                    onChange={() => handleNotificationToggle("systemUpdates")}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className={styles.overlay} />
      <div className={styles.dialogContainer}>
        <div className={styles.dialog} ref={dialogRef}>
          <div className={styles.sidebar}>
            <h2 className={styles.sidebarTitle}>Settings</h2>
            <nav className={styles.navigation}>
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  className={`${styles.navItem} ${
                    activeSection === item.id ? styles.active : ""
                  }`}
                  onClick={() => setActiveSection(item.id)}
                >
                  <img
                    src={item.icon || "/placeholder.svg"}
                    alt={item.label}
                    className={styles.navIcon}
                  />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
          <div className={styles.content}>
            <h2 className={styles.sectionTitle}>{getSectionTitle()}</h2>
            {renderContent()}
          </div>
        </div>
      </div>
    </>
  );
}
