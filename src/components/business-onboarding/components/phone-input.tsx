"use client";

import type React from "react";

import { useState, useEffect } from "react";
import styles from "./phone-input.module.css";

interface Country {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
  format: string;
  maxLength: number;
}

const countries: Country[] = [
  {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    dialCode: "+1",
    format: "(XXX) XXX-XXXX",
    maxLength: 10,
  },
  {
    code: "IN",
    name: "India",
    flag: "🇮🇳",
    dialCode: "+91",
    format: "XXXXX XXXXX",
    maxLength: 10,
  },
  {
    code: "GB",
    name: "United Kingdom",
    flag: "🇬🇧",
    dialCode: "+44",
    format: "XXXX XXX XXXX",
    maxLength: 11,
  },
  {
    code: "CA",
    name: "Canada",
    flag: "🇨🇦",
    dialCode: "+1",
    format: "(XXX) XXX-XXXX",
    maxLength: 10,
  },
];

interface PhoneInputProps {
  value: string;
  countryCode: string;
  onChange: (value: string) => void;
  onCountryChange: (countryCode: string) => void;
  placeholder?: string;
}

const PhoneInput = ({
  value,
  countryCode,
  onChange,
  onCountryChange,
  placeholder,
}: PhoneInputProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countries.find((c) => c.code === countryCode) || countries[0]
  );

  useEffect(() => {
    const country =
      countries.find((c) => c.code === countryCode) || countries[0];
    setSelectedCountry(country);
  }, [countryCode]);

  const formatPhoneNumber = (input: string, country: Country): string => {
    const digits = input.replace(/\D/g, "");
    const maxLength = country.maxLength;
    const truncated = digits.slice(0, maxLength);

    if (country.code === "US" || country.code === "CA") {
      if (truncated.length >= 6) {
        return `(${truncated.slice(0, 3)}) ${truncated.slice(
          3,
          6
        )}-${truncated.slice(6)}`;
      } else if (truncated.length >= 3) {
        return `(${truncated.slice(0, 3)}) ${truncated.slice(3)}`;
      } else {
        return truncated;
      }
    } else if (country.code === "IN") {
      if (truncated.length >= 5) {
        return `${truncated.slice(0, 5)} ${truncated.slice(5)}`;
      } else {
        return truncated;
      }
    } else if (country.code === "GB") {
      if (truncated.length >= 7) {
        return `${truncated.slice(0, 4)} ${truncated.slice(
          4,
          7
        )} ${truncated.slice(7)}`;
      } else if (truncated.length >= 4) {
        return `${truncated.slice(0, 4)} ${truncated.slice(4)}`;
      } else {
        return truncated;
      }
    }

    return truncated;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value, selectedCountry);
    onChange(formatted);
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    onCountryChange(country.code);
    setIsDropdownOpen(false);
    onChange(""); // Clear phone number when country changes
  };

  const getPlaceholder = () => {
    if (placeholder) return placeholder;
    return selectedCountry.format.replace(/X/g, "0");
  };

  const isValid = () => {
    const digits = value.replace(/\D/g, "");
    return digits.length === selectedCountry.maxLength;
  };

  return (
    <div className={styles.phoneInputContainer}>
      <div
        className={styles.countrySelector}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span className={styles.flag}>{selectedCountry.flag}</span>
        <span className={styles.arrow}>▼</span>

        {isDropdownOpen && (
          <div className={styles.dropdown}>
            {countries.map((country) => (
              <div
                key={country.code}
                className={styles.dropdownItem}
                onClick={() => handleCountrySelect(country)}
              >
                <span className={styles.flag}>{country.flag}</span>
                <span className={styles.countryName}>{country.name}</span>
                <span className={styles.dialCode}>{country.dialCode}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <input
        type="tel"
        className={`${styles.phoneInput} ${
          !isValid() && value ? styles.invalid : ""
        }`}
        value={value}
        onChange={handleInputChange}
        placeholder={getPlaceholder()}
      />
    </div>
  );
};

export default PhoneInput;
