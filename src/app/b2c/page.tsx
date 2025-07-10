"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/components/header";
export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      router.push(`/b2c/questions?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <Header></Header>
      {/* Main Content */}
      <main className={styles.main}>
        {/* Left Decorative Card */}
        <div className={styles.leftCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>Gross profit margin</span>
            <span className={styles.cardPercentage}>7/8</span>
          </div>
          <div className={styles.cardValue}>4,266</div>
          <div className={styles.cardSubtext}>
            <span className={styles.viewTrend}>VIEW TREND</span>
            <span className={styles.cardPeriod}>for the last 6 months</span>
          </div>
          <div className={styles.chartContainer}>
            <div className={styles.chart}>
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className={styles.chartBar}
                  style={{ height: `${Math.random() * 60 + 20}%` }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>
            Make People Decisions
            <br />
            with <span className={styles.confidenceText}>Confidence</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Get transparent, AI-synthesized reports from public data —<br />
            no guessing, no stalking, just signal.
          </p>

          <div className={styles.searchSection}>
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search by Name, Email, Social"
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div className={styles.searchButtons}>
                <button className={styles.observrButton}>Observr.ai</button>
                <button
                  className={styles.searchButton}
                  onClick={handleSearchClick}
                  disabled={!searchQuery.trim()}
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          <button className={styles.upgradeButton}>Upgrade To Pro</button>

          <div className={styles.testimonial}>
            <div className={styles.stars}>
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={styles.star}>
                  ★
                </span>
              ))}
            </div>
            <span className={styles.testimonialText}>
              Received the most valuable voting by Kota
            </span>
          </div>
        </div>

        {/* Right Decorative Card */}
        <div className={styles.rightCard}>
          <div className={styles.accuracyCard}>
            <div className={styles.accuracyHeader}>
              <span className={styles.accuracyLabel}>On-Time Accuracy</span>
            </div>
            <div className={styles.circularProgress}>
              <svg className={styles.progressSvg} viewBox="0 0 100 100">
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
                />
              </svg>
              <div className={styles.progressText}>70.5%</div>
            </div>
            <div className={styles.accuracyFooter}>
              <span className={styles.accuracyNote}>
                It's good enough that this is what we believe
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
