"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import styles from "./uploadcsvdialog.module.css";

interface UploadCSVDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ProcessingStep {
  id: string;
  title: string;
  completed: boolean;
}

export default function UploadCSVDialog({
  isOpen,
  onClose,
}: UploadCSVDialogProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalFiles, setTotalFiles] = useState(95);
  const [processedFiles, setProcessedFiles] = useState(0);
  const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>([
    { id: "1", title: "CSV file parsed successfully", completed: true },
    { id: "2", title: "Profile data extracted", completed: false },
    { id: "3", title: "Data validation completed", completed: false },
    { id: "4", title: "Analyzing social media presence", completed: false },
    { id: "5", title: "Generating risk assessments", completed: false },
    { id: "6", title: "Compiling final reports", completed: false },
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        if (!isProcessing) {
          onClose();
        }
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isProcessing) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, isProcessing]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/csv") {
      startProcessing();
    } else {
      alert("Please select a valid CSV file");
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0 && files[0].type === "text/csv") {
      startProcessing();
    } else {
      alert("Please drop a valid CSV file");
    }
  };

  const startProcessing = () => {
    setIsProcessing(true);
    setProgress(0);
    setProcessedFiles(0);

    // Set initial state with first step completed
    setProcessingSteps([
      { id: "1", title: "CSV file parsed successfully", completed: true },
      { id: "2", title: "Profile data extracted", completed: false },
      { id: "3", title: "Data validation completed", completed: false },
      { id: "4", title: "Analyzing social media presence", completed: false },
      { id: "5", title: "Generating risk assessments", completed: false },
      { id: "6", title: "Compiling final reports", completed: false },
    ]);

    // Simulate processing
    const startTime = Date.now();
    const duration = 80000; // 80 seconds
    const stepThresholds = [0, 15, 30, 45, 60, 75]; // Thresholds for each step (including first step at 0%)

    const processInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(currentProgress);
      setProcessedFiles(Math.floor((currentProgress / 100) * totalFiles));

      // Update steps based on current progress
      setProcessingSteps((prevSteps) => {
        return prevSteps.map((step, index) => ({
          ...step,
          completed: currentProgress >= stepThresholds[index],
        }));
      });

      if (currentProgress >= 100) {
        clearInterval(processInterval);
        setTimeout(() => {
          setIsProcessing(false);
          onClose();
          // Reset state
          setProgress(0);
          setProcessedFiles(0);
          setProcessingSteps((prevSteps) =>
            prevSteps.map((step) => ({ ...step, completed: false }))
          );
        }, 2000);
      }
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} />
      <div className={styles.dialogContainer}>
        <div className={styles.outerContainer} ref={dialogRef}>
          <div
            className={styles.innerContainer}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {!isProcessing ? (
              <div className={styles.uploadContent}>
                <div className={styles.iconCircle}>
                  <img src="/b2b/sidebar/uploadcsv1.svg" alt="Upload CSV" />
                </div>

                <h2 className={styles.uploadTitle}>Upload CSV File</h2>

                <p className={styles.uploadDescription}>
                  Upload or drag and drop a CSV file to generate reports on
                  multiple people
                </p>

                <button
                  className={styles.uploadButton}
                  onClick={handleUploadClick}
                >
                  Upload File
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className={styles.hiddenInput}
                />
              </div>
            ) : (
              <div className={styles.processingContent}>
                <div className={styles.processingIcon}>
                  <div className={styles.circularProgress}>
                    <img
                      src="/b2b/sidebar/uploadcsv1.svg"
                      alt="Processing"
                      className={styles.progressIcon}
                    />
                  </div>
                </div>

                <h2 className={styles.processingTitle}>Analyzing Profiles</h2>

                <p className={styles.processingDescription}>
                  Aggregating public data across platforms and generating
                  reports. This may take up to 1 minute
                </p>

                <div className={styles.progressSection}>
                  <div className={styles.progressHeader}>
                    <span className={styles.progressLabel}>
                      Processing Files
                    </span>
                    <span className={styles.progressCount}>
                      {processedFiles}/{totalFiles}
                    </span>
                  </div>

                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className={styles.stepsList}>
                  {processingSteps.map((step) => (
                    <div key={step.id} className={styles.stepItem}>
                      <div
                        className={`${styles.stepIndicator} ${
                          step.completed ? styles.completed : ""
                        }`}
                      >
                        {step.completed ? (
                          <>
                            <img
                              src="/b2b/sidebar/checkmark.svg"
                              alt="Completed"
                              className={styles.stepIcon}
                            />
                          </>
                        ) : (
                          <div className={styles.emptyCircle} />
                        )}
                      </div>
                      <span className={styles.stepTitle}>{step.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
