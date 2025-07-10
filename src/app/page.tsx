// app/page.tsx
"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/header";
import styles from "./landing.module.css";

export default function Home() {
  const router = useRouter();

  const handleIndividualClick = () => {
    router.push("/b2c");
  };

  const handleBusinessClick = () => {
    router.push("/b2b/dashboard");
  };

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.buttonContainer}>
          <button
            className={styles.choiceButton}
            onClick={handleIndividualClick}
          >
            Individual
          </button>
          <button className={styles.choiceButton} onClick={handleBusinessClick}>
            Business
          </button>
        </div>
      </main>
    </div>
  );
}
