// /app/page.tsx or /app/choose/page.tsx

"use client";

import styles from "./landing.module.css";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1 className={styles.question}>Where do you want to go?</h1>
      <div className={styles.buttonGroup}>
        <button className={styles.button} onClick={() => router.push("/b2c")}>
          Individual
        </button>
        <button className={styles.button} onClick={() => router.push("/b2b")}>
          Business
        </button>
      </div>
    </div>
  );
}
