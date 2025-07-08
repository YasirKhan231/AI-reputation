"use client";

import { useState, useEffect } from "react";
import styles from "./loading.module.css";

interface ScanCategory {
  id: number;
  name: string;
  icon: string;
  completed: boolean;
}

const LoadingPage = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [categories, setCategories] = useState<ScanCategory[]>([
    { id: 1, name: "Home Address", icon: "🏠", completed: false },
    { id: 2, name: "Phone Numbers", icon: "📞", completed: false },
    { id: 3, name: "Social Media", icon: "🌐", completed: false },
    { id: 4, name: "Photos", icon: "🖼️", completed: false },
    { id: 5, name: "Court Records", icon: "🏛️", completed: false },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 20;
        if (newProgress <= 100) {
          return newProgress;
        }
        clearInterval(interval);
        return 100;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const stepIndex = Math.floor(progress / 20);
    setCurrentStep(stepIndex);

    setCategories((prev) =>
      prev.map((category, index) => ({
        ...category,
        completed: index < stepIndex,
      }))
    );
  }, [progress]);

  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={styles.container}>
      {/* Navigation */}
      <nav className={styles.navbar}>
        <div className={styles.navContent}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <div className={styles.logoCircle}></div>
            </div>
            <span className={styles.logoText}>Observr</span>
          </div>

          <div className={styles.navLinks}>
            <a href="#" className={styles.navLink}>
              Home
            </a>
            <a href="#" className={styles.navLink}>
              Saved
            </a>
            <a href="#" className={styles.navLink}>
              Pricing
            </a>
          </div>

          <div className={styles.profileAvatar}>
            <img src="/placeholder.svg?height=32&width=32" alt="Profile" />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Left Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.categoryList}>
            {categories.map((category, index) => (
              <div
                key={category.id}
                className={`${styles.categoryItem} ${
                  index === currentStep ? styles.active : ""
                } ${category.completed ? styles.completed : ""}`}
              >
                <div className={styles.categoryIcon}>
                  <span className={styles.icon}>{category.icon}</span>
                  {index === currentStep && (
                    <div className={styles.spinnerRing}></div>
                  )}
                </div>
                <span className={styles.categoryName}>{category.name}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Center Content */}
        <section className={styles.centerContent}>
          <div className={styles.progressContainer}>
            <svg className={styles.progressRing} width="200" height="200">
              <circle
                className={styles.progressRingBackground}
                cx="100"
                cy="100"
                r="90"
                fill="transparent"
                stroke="#f1f5f9"
                strokeWidth="8"
              />
              <circle
                className={styles.progressRingForeground}
                cx="100"
                cy="100"
                r="90"
                fill="transparent"
                stroke="#4f46e5"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                transform="rotate(-90 100 100)"
              />
            </svg>
            <div className={styles.progressText}>
              <span className={styles.progressPercentage}>{progress}%</span>
            </div>
          </div>

          <div className={styles.textContent}>
            <h1 className={styles.title}>
              Matching Profiles Across Platforms…
            </h1>
            <p className={styles.subtitle}>
              Scanning public platforms, matching profiles, and collecting
              visible content — this may take a few seconds.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LoadingPage;
