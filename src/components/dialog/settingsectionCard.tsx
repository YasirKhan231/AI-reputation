"use client";

import type React from "react";

import { useState } from "react";
import styles from "./settingDialog.module.css";

interface Field {
  label: string;
  placeholder: string;
  type: string;
}

interface SettingSectionCardProps {
  sectionName: string;
  fields: Field[];
  buttonText: string;
  iconSrc?: string;
  onSubmit: (data: any) => void;
  showAvatar: boolean;
}

export default function SettingSectionCard({
  sectionName,
  fields,
  buttonText,
  iconSrc,
  onSubmit,
  showAvatar,
}: SettingSectionCardProps) {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const handleInputChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {showAvatar && iconSrc && (
        <div className={styles.avatarSection}>
          <div className={styles.avatarContainer}>
            <img
              src={iconSrc || "/placeholder.svg"}
              alt="Profile"
              className={styles.avatar}
            />
            <div className={styles.uploadIcon}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 0L8 16M0 8L16 8" stroke="white" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {fields.map((field, index) => (
        <div key={index} className={styles.fieldGroup}>
          {field.label && <label className={styles.label}>{field.label}</label>}
          {field.label === "PHONE NUMBER" ? (
            <div className={styles.phoneContainer}>
              <div className={styles.countryFlag}>
                <img src="/flags/us.png" alt="US" width="20" height="15" />
                <span>▼</span>
              </div>
              <input
                type={field.type}
                placeholder={field.placeholder}
                className={styles.phoneInput}
                value={formData[index] || ""}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            </div>
          ) : (
            <input
              type={field.type}
              placeholder={field.placeholder}
              className={styles.input}
              value={formData[index] || ""}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          )}
        </div>
      ))}

      <button type="submit" className={styles.submitButton}>
        {buttonText}
      </button>
    </form>
  );
}
