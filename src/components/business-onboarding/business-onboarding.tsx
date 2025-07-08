"use client";

import { useState } from "react";
import styles from "./business-onboarding.module.css";
import type { FormData } from "@/types/business-onboarding";

import Page8 from "./page-8";
import Page9 from "./page-9";
import Page10 from "./page-10";
import Page11 from "./page-11";
import Page12 from "./page-12";
import Page13 from "./page-13";

const BusinessOnboarding = () => {
  const [currentPage, setCurrentPage] = useState(8);
  const [formData, setFormData] = useState<FormData>({
    yourName: "",
    emailAddress: "",
    phoneNumber: "",
    countryCode: "US",
    password: "",
    confirmPassword: "",
    businessName: "",
    businessAddress: "",
    apartmentSuite: "",
    usTaxId: "",
    rightsPrivacyAcknowledged: false,
    dataUsageAcknowledged: false,
    californiaPrivacyAcknowledged: false,
    dataAnalysisAuthorized: false,
  });

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleBack = () => {
    if (currentPage > 8) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleContinue = () => {
    if (currentPage < 13) {
      setCurrentPage(currentPage + 1);
    } else {
      console.log("Business Onboarding Complete - Form Data:", formData);
      alert("Onboarding completed! Check console for data.");
    }
  };

  const getProgressPercentage = () => {
    return ((currentPage - 7) / 6) * 100;
  };

  const isCurrentPageValid = () => {
    switch (currentPage) {
      case 8:
        const phoneDigits = formData.phoneNumber.replace(/\D/g, "");
        const requiredLength =
          formData.countryCode === "IN"
            ? 10
            : formData.countryCode === "GB"
            ? 11
            : 10;
        return (
          formData.yourName.trim() !== "" &&
          formData.emailAddress.trim() !== "" &&
          phoneDigits.length === requiredLength &&
          formData.password.trim() !== "" &&
          formData.confirmPassword.trim() !== "" &&
          formData.password === formData.confirmPassword
        );
      case 9:
        return (
          formData.businessName.trim() !== "" &&
          formData.businessAddress.trim() !== "" &&
          formData.usTaxId.trim() !== ""
        );
      case 10:
        return formData.rightsPrivacyAcknowledged;
      case 11:
        return formData.dataUsageAcknowledged;
      case 12:
        return formData.californiaPrivacyAcknowledged;
      case 13:
        return formData.dataAnalysisAuthorized;
      default:
        return false;
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 8:
        return <Page8 formData={formData} updateFormData={updateFormData} />;
      case 9:
        return <Page9 formData={formData} updateFormData={updateFormData} />;
      case 10:
        return <Page10 formData={formData} updateFormData={updateFormData} />;
      case 11:
        return <Page11 formData={formData} updateFormData={updateFormData} />;
      case 12:
        return <Page12 formData={formData} updateFormData={updateFormData} />;
      case 13:
        return <Page13 formData={formData} updateFormData={updateFormData} />;
      default:
        return <Page8 formData={formData} updateFormData={updateFormData} />;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${getProgressPercentage()}%` }}
        />
      </div>

      <header className={styles.header}>
        <div className={styles.backButtonContainer}>
          <button
            className={styles.backButton}
            onClick={handleBack}
            aria-label="Go back"
          >
            <img src="/arrow-left.svg" alt="Back" className={styles.backIcon} />
          </button>
          <div className={styles.tooltip}>Back</div>
        </div>
        <img src="/logo.svg" alt="Observr" className={styles.logo} />
      </header>

      <main className={styles.main}>{renderCurrentPage()}</main>

      <footer className={styles.footer}>
        <button
          className={`${styles.continueButton} ${
            !isCurrentPageValid() ? styles.disabled : ""
          }`}
          onClick={handleContinue}
          disabled={!isCurrentPageValid()}
        >
          Continue
        </button>
      </footer>
    </div>
  );
};

export default BusinessOnboarding;
