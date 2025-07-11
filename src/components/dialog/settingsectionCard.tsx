"use client";

import type React from "react";

import { useState, useRef } from "react";
import styles from "./settingsectioncard.module.css";

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

interface Country {
  name: string;
  code: string;
  flag: string;
}

const countries: Country[] = [
  { name: "United States", code: "+1", flag: "/b2b/dialog/flags/america.svg" },
  { name: "India", code: "+91", flag: "/b2b/dialog/flags/india.svg" },
  { name: "United Kingdom", code: "+44", flag: "/b2b/dialog/flags/uk.svg" },
  { name: "Canada", code: "+1", flag: "/b2b/dialog/flags/canada.svg" },
  { name: "Australia", code: "+61", flag: "/b2b/dialog/flags/australia.svg" },
];

export default function SettingSectionCard({
  sectionName,
  fields,
  buttonText,
  iconSrc,
  onSubmit,
  showAvatar,
}: SettingSectionCardProps) {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [avatarImage, setAvatarImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {showAvatar && (
        <div className={styles.avatarSection}>
          <div className={styles.avatarContainer}>
            <img
              src={avatarImage || iconSrc || "/placeholder.svg"}
              alt="Profile"
              className={styles.avatar}
            />
            <button
              type="button"
              className={styles.uploadIcon}
              onClick={handleAvatarClick}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 0L6 12M0 6L12 6" stroke="white" strokeWidth="1.5" />
              </svg>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={styles.hiddenFileInput}
            />
          </div>
        </div>
      )}

      {fields.map((field, index) => (
        <div key={index} className={styles.fieldGroup}>
          {field.label && <label className={styles.label}>{field.label}</label>}
          {field.label === "PHONE NUMBER" ? (
            <div className={styles.phoneContainer}>
              <div
                className={styles.countryFlag}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <img
                  src={selectedCountry.flag || "/placeholder.svg"}
                  alt={selectedCountry.name}
                  width="16"
                  height="12"
                />
                <span className={styles.dropdownArrow}>▼</span>
                {isDropdownOpen && (
                  <div className={styles.dropdown}>
                    {countries.map((country) => (
                      <div
                        key={country.name}
                        className={styles.dropdownItem}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCountrySelect(country);
                        }}
                      >
                        <img
                          src={country.flag || "/placeholder.svg"}
                          alt={country.name}
                          width="16"
                          height="12"
                        />
                        <span className={styles.countryCode}>
                          {country.code}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
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
