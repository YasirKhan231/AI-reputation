"use client";

import type { PageProps } from "@/types/business-onboarding";

import styles from "./page-13.module.css";

const Page13 = ({ formData, updateFormData }: PageProps) => {
  return (
    <div className={styles.container}>
      <section className={styles.content}>
        <header className={styles.pageHeader}>
          <h1 className={styles.title}>
            Authorize Public Data Analysis and Reporting
          </h1>
          <p className={styles.subtitle}>
            By continuing, you authorize us to gather and analyze public data to
            generate reports on individuals you search.
          </p>
        </header>

        <article className={styles.legalContent}>
          <h2 className={styles.sectionTitle}>
            Acknowledgment and Authorization for Background Check
          </h2>

          <p className={styles.paragraph}>
            I acknowledge receipt of the separate documents entitled Disclosure
            Regarding Background Investigation and A Summary of Your Rights
            Under the Fair Credit Reporting Act and certify that I have read and
            understand both of those documents. I hereby authorize the obtaining
            of "consumer reports" and/or "investigative consumer reports" by the
            Ben chen (the "Requester") at any time after receipt of this
            authorization and throughout my employment, if applicable. To this
            end, I hereby authorize any law enforcement agency, administrator,
            state or federal agency, institution, school or university (public
            or private), information service bureau, past or present employers,
            motor vehicle records agencies, or insurance company to furnish any
            and all background information requested by Checkr, Inc., One
            Montgomery Street, Suite 2400, San Francisco, CA 94104 | (844)
            824-3257 | Help Center | Candidate Portal and/or the Requester. I
            agree that a facsimile ("fax"), electronic, or photographic copy of
            this Authorization shall be as valid as the original.
          </p>

          <p className={styles.paragraph}>
            New York residents/candidates only: Upon request, you will be
            informed whether or not a consumer report was requested by the
            Employer, and if such report was requested, informed of th...
          </p>
        </article>

        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="dataAnalysis"
            className={styles.checkbox}
            checked={formData.dataAnalysisAuthorized}
            onChange={(e) =>
              updateFormData({ dataAnalysisAuthorized: e.target.checked })
            }
          />
          <label htmlFor="dataAnalysis" className={styles.checkboxLabel}>
            By checking the box below, I authorize Boltshift Inc. and its
            third-party service providers to collect, analyze, and report public
            data about me...
          </label>
        </div>
      </section>
    </div>
  );
};

export default Page13;
