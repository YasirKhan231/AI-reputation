"use client";

import type { PageProps } from "@/types/business-onboarding";

import styles from "./page-12.module.css";

const Page12 = ({ formData, updateFormData }: PageProps) => {
  return (
    <div className={styles.container}>
      <section className={styles.content}>
        <header className={styles.pageHeader}>
          <h1 className={styles.title}>
            Your California Privacy Rights and Disclosures
          </h1>
          <p className={styles.subtitle}>
            Under California law, you have specific rights to access and delete
            personal information. See details here.
          </p>
        </header>

        <article className={styles.legalContent}>
          <h2 className={styles.sectionTitle}>
            NOTICE REGARDING BACKGROUND CHECKS PER CALIFORNIA LAW
          </h2>

          <p className={styles.paragraph}>
            Ben chen (the "Company") intends to obtain information about you for
            employment screening purposes from a consumer reporting agency.
            Thus, you can expect to be the subject of an "investigative consumer
            report" and a "consumer credit report" obtained for employment
            purposes. Such reports may include information about your character,
            general reputation, personal characteristics and mode of living.
            With respect to any investigative consumer report from an
            investigative consumer reporting agency ("ICRA"), the Company may
            investigate the information contained in your employment application
            and other background information about you, including but not
            limited to obtaining a criminal record report, verifying references,
            work history, your social security number, your educational
            achievements, licensure, and certifications, your driving record,
            and other information about you, and interviewing people who are
            knowledgeable about you. The results of this report may be used as a
            factor in making employment decisions. The source of any
            investigative consumer report (as that term is defined under
            California law) will be Checkr, Inc., One Montgomery Street, Suite
            2400, San Francisco, CA 94104 | (844) 824-3257 | Help Center |
            Candidate Portal. The Company agrees to provide you with a co...
          </p>
        </article>

        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="californiaPrivacy"
            className={styles.checkbox}
            checked={formData.californiaPrivacyAcknowledged}
            onChange={(e) =>
              updateFormData({
                californiaPrivacyAcknowledged: e.target.checked,
              })
            }
          />
          <label htmlFor="californiaPrivacy" className={styles.checkboxLabel}>
            I acknowledge receipt of the Summary of Your Rights Under the Fair
            Credit Reporting Act (FCRA) and certify that I have read and
            understand this document.
          </label>
        </div>
      </section>
    </div>
  );
};

export default Page12;
