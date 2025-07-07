"use client";

import { useState, useEffect } from "react";
import styles from "./questions.module.css";
import { useRouter } from "next/navigation";

interface QuestionnaireData {
  education: string;
  company: string;
  socialLinks: string;
  aliases: string;
  middleInitial: string;
  gender: string;
  age: string;
  location: string;
}

const questions = [
  {
    id: "education",
    title: "Do you know their education background?",
    subtitle: "College, university, or bootcamp they attended?",
    placeholder: "e.g. Stanford, UC Berkeley, Flatiron School",
    type: "input",
  },
  {
    id: "company",
    title: "Do you know a company they've worked at?",
    subtitle: "Enter a known employer or startup affiliation.",
    placeholder: "e.g. Google, Y Combinator",
    type: "input",
  },
  {
    id: "socialLinks",
    title: "Do you have any links or usernames?",
    subtitle: "Enter a known social media handle or profile link.",
    placeholder: "Paste link here",
    type: "input",
  },
  {
    id: "aliases",
    title: "Any known aliases or nicknames?",
    subtitle: "Enter a known employer or startup affiliation.",
    placeholder: "e.g. Jon vs. Jonathan, Ash vs. Ashley",
    type: "input",
  },
  {
    id: "middleInitial",
    title: "What is Jhon's Middle Initial?",
    subtitle: "This helps narrow down Our Results",
    placeholder: "e.g. S",
    type: "input",
  },
  {
    id: "gender",
    title: "What is Jhon's Gender?",
    subtitle: "This helps narrow down Our Results",
    placeholder: "",
    type: "radio",
    options: ["Male", "Female"],
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
];

const processingSteps = [
  {
    title: 'Looking Up Public Profiles for "Robinson Crusoe"',
    subtitle:
      "We're scanning the open web to find real people behind the name —\nwith a 99.7% match accuracy based on usernames, bios, and public\nphotos.",
  },
  {
    title: "Verifying Identity Match",
    subtitle:
      "With a 99.7% identity match accuracy, we make sure you're viewing the\nright profile — not just a lookalike.",
  },
  {
    title: "Understanding Their Online Presence",
    subtitle:
      "We connect usernames, bios, photos, and public posts across platforms\nfor a complete view.",
  },
];

export default function QuestionnairePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [formData, setFormData] = useState<QuestionnaireData>({
    education: "",
    company: "",
    socialLinks: "",
    aliases: "",
    middleInitial: "",
    gender: "",
    age: "",
    location: "",
  });
  const [showProcessing, setShowProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (showProcessing) {
      setProgress(0);
      const duration = 5000; // 5 seconds per step
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

  const startProcessing = () => {
    console.log("Final form data:", formData);
    setShowProcessing(true);
    setProcessingStep(0);

    // First step - 5 seconds
    setTimeout(() => {
      setProcessingStep(1);
      // Second step - 5 seconds
      setTimeout(() => {
        setProcessingStep(2);
        // Third step - 5 seconds
        setTimeout(() => {
          // Show results after 15 seconds total
          setShowProcessing(false);
          router.push("/results");
        }, 5000);
      }, 5000);
    }, 5000);
  };

  const handleSubmit = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Final submission - start processing
      startProcessing();
    }
  };

  const handleIDontKnow = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Final submission - start processing
      startProcessing();
    }
  };

  const handleSkip = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Final submission - start processing
      startProcessing();
    }
  };

  const handleInputChange = (field: keyof QuestionnaireData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (showProcessing) {
    const currentStepData = processingSteps[processingStep];

    return (
      <div className={styles.questionnaireContainer}>
        <main className={styles.questionnaireMain}>
          <div className={styles.questionnaireProcessingContainer}>
            <div className={styles.questionnaireProcessingIcon}>
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

  const currentQ = questions[currentQuestion];

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
                  {currentQ.options?.map((option) => (
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
                      {currentQ.options?.map((option) => (
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
