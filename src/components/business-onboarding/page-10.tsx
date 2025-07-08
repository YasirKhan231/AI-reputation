"use client";
import type { PageProps } from "@/types/business-onboarding";

import styles from "./page-10.module.css";

const Page10 = ({ formData, updateFormData }: PageProps) => {
  return (
    <div className={styles.container}>
      <section className={styles.content}>
        <header className={styles.pageHeader}>
          <h1 className={styles.title}>
            Understand Your Rights and Privacy Options
          </h1>
          <p className={styles.subtitle}>
            You have the right to request, review, correct, or delete any
            personal data we gather from public sources.
          </p>
        </header>

        <article className={styles.legalContent}>
          <p className={styles.paragraph}>
            Para información en español, visite{" "}
            <a
              href="https://www.consumerfinance.gov/learnmore"
              className={styles.link}
            >
              www.consumerfinance.gov/learnmore
            </a>{" "}
            o escribe a la Consumer Financial Protection Bureau, 1700 G Street
            NW, Washington, DC 20552.
          </p>

          <h2 className={styles.sectionTitle}>
            A Summary of Your Rights Under the Fair Credit Reporting Act
          </h2>

          <p className={styles.paragraph}>
            The federal Fair Credit Reporting Act (FCRA) promotes the accuracy,
            fairness, and privacy of information in the files of consumer
            reporting agencies. There are many types of consumer reporting
            agencies, including credit bureaus and specialty agencies (such as
            agencies that sell information about check writing histories,
            medical records, and rental history records). Here is a summary of
            your major rights under FCRA.{" "}
            <strong>
              For more information, including information about additional
              rights, go to{" "}
              <a
                href="https://www.consumerfinance.gov/learnmore"
                className={styles.link}
              >
                www.consumerfinance.gov/learnmore
              </a>
            </strong>{" "}
            or write to: Consumer Financial Protection Bureau, 1700 G Street NW,
            Washington, DC 20552.
          </p>

          <ul className={styles.list}>
            <li className={styles.listItem}>
              <strong>
                You must be told if information in your file has been used
                against you.
              </strong>{" "}
              Anyone who uses a credit report or another type of consumer report
              to deny your application for credit, insurance, or employment — or
              to take another adverse action against you — must tell you, and
              must give you the name, address, and phone number of the agency
              that provided the information....
            </li>
          </ul>
        </article>

        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="rightsPrivacy"
            className={styles.checkbox}
            checked={formData.rightsPrivacyAcknowledged}
            onChange={(e) =>
              updateFormData({ rightsPrivacyAcknowledged: e.target.checked })
            }
          />
          <label htmlFor="rightsPrivacy" className={styles.checkboxLabel}>
            I acknowledge receipt of the Summary of Your Rights Under the Fair
            Credit Reporting Act (FCRA) and certify that I have read and
            understand this document.
          </label>
        </div>
      </section>
    </div>
  );
};

export default Page10;
