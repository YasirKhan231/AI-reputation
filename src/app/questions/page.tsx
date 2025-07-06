"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./questions.module.css";

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
  const [isLoading, setIsLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  const handleInputChange = (field: keyof QuestionnaireData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (currentQuestion < questions.length - 1) {
      if (currentQuestion === 3) {
        // After aliases question
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          setShowVerification(true);
          setTimeout(() => {
            setShowVerification(false);
            setCurrentQuestion(currentQuestion + 1);
          }, 3000);
        }, 2000);
      } else {
        setCurrentQuestion(currentQuestion + 1);
      }
    } else {
      // Final submission
      console.log("Final form data:", formData);
      alert("Questionnaire completed!");
    }
  };

  const handleIDontKnow = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      console.log("Final form data:", formData);
      alert("Questionnaire completed!");
    }
  };

  const handleSkip = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      console.log("Final form data:", formData);
      alert("Questionnaire completed!");
    }
  };

  if (isLoading) {
    return (
      <div className={styles.questionnaireContainer}>
        <header className={styles.questionnaireHeader}>
          <div className={styles.questionnaireHeaderContent}>
            <div className={styles.questionnaireLogo}>
              <div className={styles.questionnaireLogoIcon}></div>
              <span className={styles.questionnaireLogoText}>Observr</span>
            </div>
            <nav className={styles.questionnaireNav}>
              <a href="#" className={styles.questionnaireNavLink}>
                Home
              </a>
              <a href="#" className={styles.questionnaireNavLink}>
                Saved
              </a>
              <a href="#" className={styles.questionnaireNavLink}>
                Pricing
              </a>
            </nav>
            <div className={styles.questionnaireProfileAvatar}>
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="Profile"
                width={40}
                height={40}
                className={styles.questionnaireAvatarImage}
              />
            </div>
          </div>
        </header>

        <main className={styles.questionnaireMain}>
          <div className={styles.questionnaireLoadingContainer}>
            <div className={styles.questionnaireLoadingIcon}>
              <svg
                className={styles.questionnaireLoadingSvg}
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
                  strokeDashoffset="80"
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                  className={styles.questionnaireLoadingCircle}
                />
              </svg>
              <div className={styles.questionnaireLoadingDocIcon}>📄</div>
            </div>
            <h1 className={styles.questionnaireLoadingTitle}>
              Looking Up Public Profiles for "Robinson Crusoe"
            </h1>
            <p className={styles.questionnaireLoadingSubtitle}>
              We're scanning the open web to find real people behind the name —
              <br />
              with a 99.7% match accuracy based on usernames, bios, and public
              <br />
              photos.
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (showVerification) {
    return (
      <div className={styles.questionnaireContainer}>
        <header className={styles.questionnaireHeader}>
          <div className={styles.questionnaireHeaderContent}>
            <div className={styles.questionnaireLogo}>
              <div className={styles.questionnaireLogoIcon}></div>
              <span className={styles.questionnaireLogoText}>Observr</span>
            </div>
            <nav className={styles.questionnaireNav}>
              <a href="#" className={styles.questionnaireNavLink}>
                Home
              </a>
              <a href="#" className={styles.questionnaireNavLink}>
                Saved
              </a>
              <a href="#" className={styles.questionnaireNavLink}>
                Pricing
              </a>
            </nav>
            <div className={styles.questionnaireProfileAvatar}>
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="Profile"
                width={40}
                height={40}
                className={styles.questionnaireAvatarImage}
              />
            </div>
          </div>
        </header>

        <main className={styles.questionnaireMain}>
          <div className={styles.questionnaireVerificationContainer}>
            <div className={styles.questionnaireVerificationIcon}>
              <svg
                className={styles.questionnaireVerificationSvg}
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
                  strokeDashoffset="80"
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                  className={styles.questionnaireVerificationCircle}
                />
              </svg>
              <div className={styles.questionnaireVerificationUserIcon}>👤</div>
            </div>
            <h1 className={styles.questionnaireVerificationTitle}>
              Verifying Identity Match
            </h1>
            <p className={styles.questionnaireVerificationSubtitle}>
              With a 99.7% identity match accuracy, we make sure you're viewing
              the
              <br />
              right profile — not just a lookalike.
            </p>
          </div>
        </main>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className={styles.questionnaireContainer}>
      <header className={styles.questionnaireHeader}>
        <div className={styles.questionnaireHeaderContent}>
          <div className={styles.questionnaireLogo}>
            <div className={styles.questionnaireLogoIcon}></div>
            <span className={styles.questionnaireLogoText}>Observr</span>
          </div>
          <nav className={styles.questionnaireNav}>
            <a href="#" className={styles.questionnaireNavLink}>
              Home
            </a>
            <a href="#" className={styles.questionnaireNavLink}>
              Saved
            </a>
            <a href="#" className={styles.questionnaireNavLink}>
              Pricing
            </a>
          </nav>
          <div className={styles.questionnaireProfileAvatar}>
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="Profile"
              width={40}
              height={40}
              className={styles.questionnaireAvatarImage}
            />
          </div>
        </div>
      </header>

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
              </div>
            )}

            {currentQ.type === "select" && (
              <div className={styles.questionnaireSelectContainer}>
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
            )}

            <button
              onClick={handleSkip}
              className={styles.questionnaireSkipButton}
            >
              SKIP
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
