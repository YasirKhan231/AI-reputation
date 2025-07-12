"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./individual-search-questions.module.css";

interface FormData {
  selectedReason: string;
  socialHandles: {
    linkedin: string;
    twitter: string;
    facebook: string;
    instagram: string;
    reddit: string;
    threads: string;
    other: string;
  };
  personalInfo: {
    firstName: string;
    emailAddress: string;
  };
}

interface IndividualSearchQuestionsProps {
  searchQuery?: string;
  onComplete?: (data: FormData) => void;
  onBack?: () => void;
}

export default function IndividualSearchQuestions({
  searchQuery,
  onComplete,
  onBack,
}: IndividualSearchQuestionsProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(31);
  const [formData, setFormData] = useState<FormData>({
    selectedReason: "",
    socialHandles: {
      linkedin: "",
      twitter: "",
      facebook: "",
      instagram: "",
      reddit: "",
      threads: "",
      other: "",
    },
    personalInfo: {
      firstName: "",
      emailAddress: "",
    },
  });

  const reasons = [
    "Pre-hire screening",
    "Vendor or consultant due diligence",
    "Founder/investor reputation check",
    "Legal/compliance review",
    "General risk monitoring",
  ];

  const socialPlatforms = [
    {
      key: "linkedin",
      icon: "/b2b/search-individual/linkedin.svg",
      placeholder: "Paste linkedin profile",
    },
    {
      key: "twitter",
      icon: "/b2b/search-individual/x.svg",
      placeholder: "Paste x profile",
    },
    {
      key: "facebook",
      icon: "/b2b/search-individual/facebook.svg",
      placeholder: "Paste facebook profile",
    },
    {
      key: "instagram",
      icon: "/b2b/search-individual/instagram.svg",
      placeholder: "Paste instagram profile",
    },
    {
      key: "reddit",
      icon: "/b2b/search-individual/reddit.svg",
      placeholder: "Paste reddit",
    },
    {
      key: "threads",
      icon: "/b2b/search-individual/threads.svg",
      placeholder: "Paste thread profile",
    },
  ];

  const steps = [
    { text: "Verifying Identity", completed: true },
    { text: "Cross-Matching Public Profiles", completed: true },
    { text: "Scanning Criminal & Legal Records", completed: false },
    { text: "Analyzing Professional Background", completed: false },
    { text: "Detecting Behavioral Risk Signals", completed: false },
    { text: "Generating Final Report", completed: false },
  ];

  // Progress animation for step 4
  useEffect(() => {
    if (currentStep === 4) {
      // Console log all collected data when reaching step 4
      console.log("=== INDIVIDUAL SEARCH QUESTIONS - ALL COLLECTED DATA ===");
      console.log("Search Query:", searchQuery);
      console.log("Step 1 - Selected Reason:", formData.selectedReason);
      console.log("Step 2 - Social Handles:", formData.socialHandles);
      console.log("Step 3 - Personal Information:", formData.personalInfo);
      console.log("=== COMPLETE FORM DATA ===", formData);
      console.log("Current Step:", currentStep);
      console.log("Progress:", progress);

      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(timer);
            // Call onComplete when analysis is finished
            if (onComplete) {
              onComplete(formData);
            }
            return 95;
          }
          return prev + 1;
        });
      }, 100);

      return () => clearInterval(timer);
    }
  }, [currentStep, formData, searchQuery, onComplete]);

  const handleReasonSelect = (reason: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedReason: reason,
    }));
  };

  const handleSocialHandleChange = (platform: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      socialHandles: {
        ...prev.socialHandles,
        [platform]: value,
      },
    }));
  };

  const handlePersonalInfoChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  const handleContinue = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else if (onBack) {
      onBack();
    }
  };

  const getProgressWidth = () => {
    return `${(currentStep / 4) * 100}%`;
  };

  const canContinue = () => {
    switch (currentStep) {
      case 1:
        return formData.selectedReason !== "";
      case 2:
        return true; // Social handles are optional
      case 3:
        return (
          formData.personalInfo.firstName !== "" &&
          formData.personalInfo.emailAddress !== ""
        );
      case 4:
        return true;
      default:
        return false;
    }
  };

  const renderStep1 = () => (
    <div className={styles.content}>
      <h1 className={styles.mainHeading}>
        What is the reason for requesting this background check?
      </h1>

      <div className={styles.optionsContainer}>
        {reasons.map((reason, index) => (
          <button
            key={index}
            className={`${styles.optionButton} ${
              formData.selectedReason === reason ? styles.selected : ""
            }`}
            onClick={() => handleReasonSelect(reason)}
          >
            {reason}
          </button>
        ))}
      </div>

      <button
        className={styles.continueButton}
        onClick={handleContinue}
        disabled={!canContinue()}
      >
        Continue
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className={styles.content}>
      <h1 className={styles.mainHeading}>
        Any public usernames or social handles you're aware of?
      </h1>

      <div className={styles.inputsContainer}>
        {socialPlatforms.map((platform) => (
          <div key={platform.key} className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <Image
                src={platform.icon || "/placeholder.svg"}
                alt={platform.key}
                width={20}
                height={20}
                className={styles.inputIcon}
              />
              <input
                type="text"
                placeholder={platform.placeholder}
                value={
                  formData.socialHandles[
                    platform.key as keyof typeof formData.socialHandles
                  ]
                }
                onChange={(e) =>
                  handleSocialHandleChange(platform.key, e.target.value)
                }
                className={styles.input}
              />
            </div>
          </div>
        ))}

        <div className={styles.inputGroup}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              placeholder="Other"
              value={formData.socialHandles.other}
              onChange={(e) =>
                handleSocialHandleChange("other", e.target.value)
              }
              className={styles.input}
            />
          </div>
        </div>
      </div>

      <button className={styles.continueButton} onClick={handleContinue}>
        Continue
      </button>
    </div>
  );

  const renderStep3 = () => (
    <div className={styles.content}>
      <h1 className={styles.mainHeading}>Ask Someone for background check</h1>

      <p className={styles.description}>
        We'll email a link so this person can consent to and complete their
        background check. Both of you receive the completed report.
      </p>

      <div className={styles.formContainer}>
        <div className={styles.inputGroupForm}>
          <label className={styles.label}>FIRST NAME</label>
          <input
            type="text"
            placeholder="Jhon Smith"
            value={formData.personalInfo.firstName}
            onChange={(e) =>
              handlePersonalInfoChange("firstName", e.target.value)
            }
            className={styles.inputForm}
          />
        </div>

        <div className={styles.inputGroupForm}>
          <label className={styles.label}>EMAIL ADDRESS</label>
          <input
            type="email"
            placeholder="youremail@gmail.com"
            value={formData.personalInfo.emailAddress}
            onChange={(e) =>
              handlePersonalInfoChange("emailAddress", e.target.value)
            }
            className={styles.inputForm}
          />
        </div>
      </div>

      <button
        className={styles.continueButton}
        onClick={handleContinue}
        disabled={!canContinue()}
      >
        Continue
      </button>
    </div>
  );

  const renderStep4 = () => (
    <div className={styles.content}>
      <div className={styles.profileIcon}>
        <div className={styles.iconCircle}>
          <Image
            src="/b2b/search-individual/analyze-profile.svg"
            alt="Analyze Profile"
            width={100}
            height={100}
            className={styles.inputIcon}
          />
        </div>
      </div>

      <h1 className={styles.mainHeading}>Analyzing Profile</h1>

      <p className={styles.description}>
        Aggregating public data across platforms and generating reports. This
        may take up to 1 minute
      </p>

      <div className={styles.progressSection}>
        <div className={styles.progressHeader}>
          <span className={styles.progressLabel}>Processing Files</span>
          <span className={styles.progressCount}>{progress}/95</span>
        </div>
        <div className={styles.progressBarContainer}>
          <div
            className={styles.progressBarFill}
            style={{ width: `${(progress / 95) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className={styles.stepsContainer}>
        {steps.map((step, index) => (
          <div key={index} className={styles.stepItem}>
            <div
              className={`${styles.stepIcon} ${
                step.completed ? styles.completed : ""
              }`}
            >
              {step.completed ? "✓" : ""}
            </div>
            <span
              className={`${styles.stepText} ${
                step.completed ? styles.completedText : ""
              }`}
            >
              {step.text}
            </span>
          </div>
        ))}
      </div>

      <button
        className={styles.continueButton}
        onClick={() => console.log("Analysis Complete!")}
      >
        Continue
      </button>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBack}>
          ←
        </button>
        <Image src="/logo.svg" alt="Observr" width={100} height={40} />
      </div>

      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: getProgressWidth() }}
        ></div>
      </div>

      {renderCurrentStep()}

      {/* Debug Info - Remove in production */}
    </div>
  );
}
