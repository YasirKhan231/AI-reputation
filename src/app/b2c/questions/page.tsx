"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LoadingScreen from "@/components/loading";
import styles from "./questions.module.css";

interface QuestionnaireData {
  location: string;
  age: string;
  gender: string;
  middleInitial: string;
  aliases: string;
  socialLinks: string;
  company: string;
  education: string;
}

const questionGroups = [
  // Group 1: Basic Info (location, age, gender)
  [
    {
      id: "location",
      title: "Do you know where they live or have lived?",
      subtitle: "This helps narrow down Our Results",
      placeholder: "Select City",
      type: "select",
      options: [
        "New York, NY",
        "Los Angeles, CA",
        "Chicago, IL",
        "Houston, TX",
        "Phoenix, AZ",
        "Philadelphia, PA",
        "San Antonio, TX",
        "San Diego, CA",
        "Dallas, TX",
        "San Jose, CA",
      ],
    },
    {
      id: "age",
      title: "What's their approximate age?",
      subtitle: "This helps narrow down Our Results",
      placeholder: "Select Age",
      type: "select",
      options: ["18-25", "26-35", "36-45", "46-55", "56-65", "65+"],
    },
    {
      id: "gender",
      title: "What is John's Gender?",
      subtitle: "This helps narrow down Our Results",
      placeholder: "",
      type: "radio",
      options: ["Male", "Female"],
    },
  ],
  // Group 2: Identity Info (middle initial, aliases)
  [
    {
      id: "middleInitial",
      title: "What is John's Middle Initial?",
      subtitle: "This helps narrow down Our Results",
      placeholder: "e.g. S",
      type: "input",
    },
    {
      id: "aliases",
      title: "Any known aliases or nicknames?",
      subtitle: "Enter a known employer or startup affiliation.",
      placeholder: "e.g. Jon vs. Jonathan, Ash vs. Ashley",
      type: "input",
    },
  ],
  // Group 3: Online Presence (social links, company)
  [
    {
      id: "socialLinks",
      title: "Do you have any links or usernames?",
      subtitle: "Enter a known social media handle or profile link.",
      placeholder: "Paste link here",
      type: "input",
    },
    {
      id: "company",
      title: "Do you know a company they've worked at?",
      subtitle: "Enter a known employer or startup affiliation.",
      placeholder: "e.g. Google, Y Combinator",
      type: "input",
    },
  ],
  // Group 4: Final Question (education)
  [
    {
      id: "education",
      title: "Do you know their education background?",
      subtitle: "College, university, or bootcamp they attended?",
      placeholder: "e.g. Stanford, UC Berkeley, Flatiron School",
      type: "input",
    },
  ],
];

const processingSteps = [
  {
    title: "Verifying Identity Match",
    subtitle:
      "With a 99.7% identity match accuracy, we make sure you're viewing the\nright profile — not just a lookalike.",
    icon: "/iconprocess1.svg",
  },
  {
    title: 'Looking Up Public Profiles for "John"',
    subtitle:
      "We're scanning the open web to find real people behind the name —\nwith a 99.7% match accuracy based on usernames, bios, and public\nphotos.",
    icon: "/iconprocess2.svg",
  },
  {
    title: "Understanding Their Online Presence",
    subtitle:
      "We connect usernames, bios, photos, and public posts across platforms\nfor a complete view.",
    icon: "/iconprocess3.svg",
  },
];

export default function QuestionnairePage() {
  const [currentGroup, setCurrentGroup] = useState(0);
  const [currentQuestionInGroup, setCurrentQuestionInGroup] = useState(0);
  const [formData, setFormData] = useState<QuestionnaireData>({
    location: "",
    age: "",
    gender: "",
    middleInitial: "",
    aliases: "",
    socialLinks: "",
    company: "",
    education: "",
  });
  const [showProcessing, setShowProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showFinalLoading, setShowFinalLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (showProcessing) {
      setProgress(0);
      const duration = 10000; // 10 seconds per step
      const interval = 50; // Update every 50ms
      const increment = 100 / (duration / interval);
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + increment;
        });
      }, interval);
      return () => clearInterval(progressInterval);
    }
  }, [showProcessing, processingStep]);

  const startProcessing = (stepIndex: number) => {
    setShowProcessing(true);
    setProcessingStep(stepIndex);
    setProgress(0);

    setTimeout(() => {
      setShowProcessing(false);
      // Move to next group after processing
      if (currentGroup < questionGroups.length - 1) {
        setCurrentGroup(currentGroup + 1);
        setCurrentQuestionInGroup(0);
      }
    }, 10000); // 10 seconds
  };

  const handleSubmit = () => {
    const isLastQuestionInGroup =
      currentQuestionInGroup === questionGroups[currentGroup].length - 1;

    if (isLastQuestionInGroup) {
      // Check which processing step to show based on current group
      if (currentGroup === 0) {
        // After first 3 questions (location, age, gender) - show "Verifying Identity Match"
        startProcessing(0);
      } else if (currentGroup === 1) {
        // After middle initial and aliases - show "Looking Up Public Profiles"
        startProcessing(1);
      } else if (currentGroup === 2) {
        // After social links and company - show "Understanding Online Presence"
        startProcessing(2);
      } else if (currentGroup === 3) {
        // After education (final question) - show final loading
        console.log("Final form data:", formData);
        setShowFinalLoading(true);
      }
    } else {
      // Move to next question in current group
      setCurrentQuestionInGroup(currentQuestionInGroup + 1);
    }
  };

  const handleIDontKnow = () => {
    handleSubmit(); // Same logic as submit
  };

  const handleSkip = () => {
    handleSubmit(); // Same logic as submit
  };

  const handleInputChange = (field: keyof QuestionnaireData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Show final loading screen
  if (showFinalLoading) {
    return <LoadingScreen />;
  }

  // Show processing screen
  if (showProcessing) {
    const currentStepData = processingSteps[processingStep];
    return (
      <div className={styles.questionnaireContainer}>
        <main className={styles.questionnaireMain}>
          <div className={styles.questionnaireProcessingContainer}>
            <div className={styles.questionnaireProcessingIcon}>
              <Image
                src={currentStepData.icon || "/placeholder.svg"}
                alt="Processing"
                width={100}
                height={100}
                className={styles.questionnaireProcessingImage}
              />
              <svg
                className={styles.questionnaireProcessingSvg}
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth="8"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * progress) / 100}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                  className={styles.questionnaireProcessingCircle}
                />
              </svg>
            </div>
            <h1 className={styles.questionnaireProcessingTitle}>
              {currentStepData.title}
            </h1>
            <p className={styles.questionnaireProcessingSubtitle}>
              {currentStepData.subtitle.split("\n").map((line, index) => (
                <span key={index}>
                  {line}
                  {index < currentStepData.subtitle.split("\n").length - 1 && (
                    <br />
                  )}
                </span>
              ))}
            </p>
          </div>
        </main>
      </div>
    );
  }

  const currentQ = questionGroups[currentGroup][currentQuestionInGroup];

  return (
    <div className={styles.questionnaireContainer}>
      <main className={styles.questionnaireMain}>
        <div className={styles.questionnaireQuestionContainer}>
          <h1 className={styles.questionnaireQuestionTitle}>
            {currentQ.title}
          </h1>
          <p className={styles.questionnaireQuestionSubtitle}>
            {currentQ.subtitle}
          </p>
          <div className={styles.questionnaireInputSection}>
            {currentQ.type === "input" && (
              <div className={styles.questionnaireInputContainer}>
                <div className={styles.questionnaireInputWithButtons}>
                  <input
                    type="text"
                    placeholder={currentQ.placeholder}
                    value={formData[currentQ.id as keyof QuestionnaireData]}
                    onChange={(e) =>
                      handleInputChange(
                        currentQ.id as keyof QuestionnaireData,
                        e.target.value
                      )
                    }
                    className={styles.questionnaireInput}
                  />
                  <div className={styles.questionnaireButtonGroup}>
                    <button
                      onClick={handleSubmit}
                      className={styles.questionnaireSubmitButton}
                    >
                      Submit
                    </button>
                    <button
                      onClick={handleIDontKnow}
                      className={styles.questionnaireIDontKnowButton}
                    >
                      I don't know
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleSkip}
                  className={styles.questionnaireSkipButton}
                >
                  SKIP
                </button>
              </div>
            )}

            {currentQ.type === "radio" && (
              <div className={styles.questionnaireRadioContainer}>
                <div className={styles.questionnaireRadioGroup}>
                  {"options" in currentQ &&
                    currentQ.options?.map((option) => (
                      <label
                        key={option}
                        className={styles.questionnaireRadioLabel}
                      >
                        <input
                          type="radio"
                          name="gender"
                          value={option}
                          checked={formData.gender === option}
                          onChange={(e) =>
                            handleInputChange("gender", e.target.value)
                          }
                          className={styles.questionnaireRadioInput}
                        />
                        <div className={styles.questionnaireRadioCard}>
                          <div className={styles.questionnaireRadioIcon}>
                            {option === "Male" ? "♂" : "♀"}
                          </div>
                          <span className={styles.questionnaireRadioText}>
                            {option}
                          </span>
                        </div>
                      </label>
                    ))}
                </div>
                <div className={styles.questionnaireRadioButtonGroup}>
                  <button
                    onClick={handleSubmit}
                    className={styles.questionnaireSubmitButton}
                  >
                    Submit
                  </button>
                  <button
                    onClick={handleIDontKnow}
                    className={styles.questionnaireIDontKnowButton}
                  >
                    I don't know
                  </button>
                </div>
                <button
                  onClick={handleSkip}
                  className={styles.questionnaireSkipButton}
                >
                  SKIP
                </button>
              </div>
            )}

            {currentQ.type === "select" && (
              <div className={styles.questionnaireSelectContainer}>
                <div className={styles.questionnaireSelectWithButtons}>
                  <div className={styles.questionnaireSelectWrapper}>
                    {currentQ.id === "location" && (
                      <div className={styles.questionnaireLocationIcon}>📍</div>
                    )}
                    <select
                      value={formData[currentQ.id as keyof QuestionnaireData]}
                      onChange={(e) =>
                        handleInputChange(
                          currentQ.id as keyof QuestionnaireData,
                          e.target.value
                        )
                      }
                      className={styles.questionnaireSelect}
                    >
                      <option value="">{currentQ.placeholder}</option>
                      {Array.isArray((currentQ as any).options) &&
                        (currentQ as any).options.map((option: string) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className={styles.questionnaireButtonGroup}>
                    <button
                      onClick={handleSubmit}
                      className={styles.questionnaireSubmitButton}
                    >
                      Submit
                    </button>
                    <button
                      onClick={handleIDontKnow}
                      className={styles.questionnaireIDontKnowButton}
                    >
                      I don't know
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleSkip}
                  className={styles.questionnaireSkipButton}
                >
                  SKIP
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
