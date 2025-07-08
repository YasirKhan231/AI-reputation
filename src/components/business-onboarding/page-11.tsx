"use client";

import type { PageProps } from "@/types/business-onboarding";

import styles from "./page-11.module.css";

const Page11 = ({ formData, updateFormData }: PageProps) => {
  return (
    <div className={styles.container}>
      <section className={styles.content}>
        <header className={styles.pageHeader}>
          <h1 className={styles.title}>How We Use and Disclose Public Data</h1>
          <p className={styles.subtitle}>
            We only collect publicly available data and never access private
            accounts. Learn how we use and analyze this data.
          </p>
        </header>

        <article className={styles.legalContent}>
          <p className={styles.paragraph}>
            You are being asked to authorize Boltshift Inc. to collect and
            analyze publicly available information across platforms (e.g.,
            social media, press, forums) to generate a structured reputation
            profile...
          </p>

          <ul className={styles.bulletList}>
            <li className={styles.bulletItem}>Clear language</li>
            <li className={styles.bulletItem}>No marketing</li>
            <li className={styles.bulletItem}>No hidden consent</li>
          </ul>
        </article>

        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="dataUsage"
            className={styles.checkbox}
            checked={formData.dataUsageAcknowledged}
            onChange={(e) =>
              updateFormData({ dataUsageAcknowledged: e.target.checked })
            }
          />
          <label htmlFor="dataUsage" className={styles.checkboxLabel}>
            I acknowledge receipt of the Summary of Your Rights Under the Fair
            Credit Reporting Act (FCRA) and certify that I have read and
            understand this document.
          </label>
        </div>
      </section>
    </div>
  );
};

export default Page11;
