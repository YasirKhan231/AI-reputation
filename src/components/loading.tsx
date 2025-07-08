"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./loading.module.css"; // Adjust the path as necessary

interface ScanStep {
  id: number;
  title: string;
  icon: string;
  completed: boolean;
}

const LoadingScreen = () => {
  const totalSec = 40;
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(-1); // Start with -1 so no step is active initially

  const [scanSteps, setScanSteps] = useState<ScanStep[]>([
    {
      id: 1,
      title: "Home Address",
      icon: "/home.svg",
      completed: false,
    },
    {
      id: 2,
      title: "Phone Numbers",
      icon: "/phone.svg",
      completed: false,
    },
    {
      id: 3,
      title: "Social Media",
      icon: "/globe.svg",
      completed: false,
    },
    { id: 4, title: "Photos", icon: "/image-user.svg", completed: false },
    {
      id: 5,
      title: "Court Records",
      icon: "/building.svg",
      completed: false,
    },
  ]);

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

    // Update completed steps
    setScanSteps((prev) =>
      prev.map((step, index) => ({
        ...step,
        completed: index < currentStepIndex,
      }))
    );
  }, [progress]);

  const circumference = 2 * Math.PI * 70;
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
                } ${step.completed ? styles.completed : ""}`}
              >
                <div className={styles.stepIconContainer}>
                  <div className={styles.iconCircle}>
                    <Image
                      src={step.icon || "/placeholder.svg"}
                      alt={step.title}
                      width={20}
                      height={20}
                      className={styles.icon}
                    />
                  </div>
                  {index === currentStep && (
                    <div className={styles.spinnerRing}></div>
                  )}
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
              <svg className={styles.progressRing} width="160" height="160">
                <circle
                  className={styles.progressBackground}
                  cx="80"
                  cy="80"
                  r="70"
                  fill="transparent"
                  stroke="#f1f5f9"
                  strokeWidth="6"
                />
                <circle
                  className={styles.progressForeground}
                  cx="80"
                  cy="80"
                  r="70"
                  fill="transparent"
                  stroke="#516BFF"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  transform="rotate(-90 80 80)"
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
