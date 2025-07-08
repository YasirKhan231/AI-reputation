"use client";

import type { PageProps } from "@/types/business-onboarding";

import styles from "./page-9.module.css";

const Page9 = ({ formData, updateFormData }: PageProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.pageHeader}>
          <h1 className={styles.title}>Tell us about Your Business</h1>
          <p className={styles.subtitle}>
            Welcome! Set up your account to start generating comprehensive
            reputation reports in minutes.
          </p>
        </header>

        <form className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="businessName" className={styles.label}>
              BUSINESS NAME
            </label>
            <input
              id="businessName"
              type="text"
              className={styles.input}
              placeholder="Your Business Name"
              value={formData.businessName}
              onChange={(e) => updateFormData({ businessName: e.target.value })}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="businessAddress" className={styles.label}>
              BUSINESS ADDRESS
            </label>
            <input
              id="businessAddress"
              type="text"
              className={styles.input}
              placeholder="Business address"
              value={formData.businessAddress}
              onChange={(e) =>
                updateFormData({ businessAddress: e.target.value })
              }
            />
          </div>

          <div className={styles.field}>
            <input
              type="text"
              className={styles.input}
              placeholder="Apt, Suite, Etc"
              value={formData.apartmentSuite}
              onChange={(e) =>
                updateFormData({ apartmentSuite: e.target.value })
              }
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="usTaxId" className={styles.label}>
              US TAX ID
            </label>
            <input
              id="usTaxId"
              type="text"
              className={styles.input}
              placeholder="1-800-829-1040"
              value={formData.usTaxId}
              onChange={(e) => updateFormData({ usTaxId: e.target.value })}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page9;
