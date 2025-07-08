"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./loading.module.css";

interface ScanStep {
  id: number;
  title: string;
  icon: string;
}

const LoadingScreen = () => {
  const totalSec = 40;
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const scanSteps: ScanStep[] = [
    { id: 1, title: "Home Address", icon: "/icons/icon1.png" },
    { id: 2, title: "Phone Numbers", icon: "/icons/icon2.png" },
    { id: 3, title: "Social Media", icon: "/icons/icon3.png" },
    { id: 4, title: "Photos", icon: "/icons/icon4.png" },
    { id: 5, title: "Court Records", icon: "/icons/icon5.png" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 100 / totalSec;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const stepDuration = totalSec / 5;
    const currentStepIndex = Math.floor(progress / (100 / 5));
    setCurrentStep(currentStepIndex);
  }, [progress]);

  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Left Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.stepsList}>
            {scanSteps.map((step, index) => (
              <div
                key={step.id}
                className={`${styles.stepItem} ${
                  index === currentStep ? styles.active : ""
                }`}
              >
                <div className={styles.stepIcon}>
                  <Image
                    src={step.icon || "/placeholder.svg"}
                    alt={step.title}
                    width={24}
                    height={24}
                    className={styles.icon}
                  />
                </div>
                <span className={styles.stepTitle}>{step.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          <div className={styles.progressSection}>
            <div className={styles.progressContainer}>
              <svg className={styles.progressRing} width="200" height="200">
                <circle
                  className={styles.progressBackground}
                  cx="100"
                  cy="100"
                  r="90"
                  fill="transparent"
                  stroke="#f1f5f9"
                  strokeWidth="8"
                />
                <circle
                  className={styles.progressForeground}
                  cx="100"
                  cy="100"
                  r="90"
                  fill="transparent"
                  stroke="#516BFF"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  transform="rotate(-90 100 100)"
                />
              </svg>
              <div className={styles.progressText}>
                <span className={styles.percentage}>
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
          </div>

          <div className={styles.textSection}>
            <h1 className={styles.mainTitle}>
              Matching Profiles Across Platforms…
            </h1>
            <p className={styles.subtitle}>
              Scanning public platforms, matching profiles, and collecting
              visible content — this may take a few seconds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
