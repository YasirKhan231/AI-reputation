"use client";
import type { PageProps } from "@/types/business-onboarding";

import PhoneInput from "./components/phone-input";
import styles from "./page-8.module.css";

const Page8 = ({ formData, updateFormData }: PageProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.pageHeader}>
          <h1 className={styles.title}>Tell us about Yourself</h1>
          <p className={styles.subtitle}>
            Welcome! Set up your account to start generating comprehensive
            reputation reports in minutes.
          </p>
        </header>

        <form className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="yourName" className={styles.label}>
              YOUR NAME
            </label>
            <input
              id="yourName"
              type="text"
              className={styles.input}
              placeholder="John Smith"
              value={formData.yourName}
              onChange={(e) => updateFormData({ yourName: e.target.value })}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="emailAddress" className={styles.label}>
              EMAIL ADDRESS
            </label>
            <input
              id="emailAddress"
              type="email"
              className={styles.input}
              placeholder="youremail@gmail.com"
              value={formData.emailAddress}
              onChange={(e) => updateFormData({ emailAddress: e.target.value })}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="phoneNumber" className={styles.label}>
              PHONE NUMBER
            </label>
            <PhoneInput
              value={formData.phoneNumber}
              countryCode={formData.countryCode}
              onChange={(value) => updateFormData({ phoneNumber: value })}
              onCountryChange={(countryCode) => updateFormData({ countryCode })}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              className={styles.input}
              placeholder="Enter Password (min 8 characters)"
              value={formData.password}
              onChange={(e) => updateFormData({ password: e.target.value })}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="confirmPassword" className={styles.label}>
              CONFIRM PASSWORD
            </label>
            <input
              id="confirmPassword"
              type="password"
              className={styles.input}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) =>
                updateFormData({ confirmPassword: e.target.value })
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page8;
