"use client";

import { useState, useEffect } from "react";
import ResultsProfileCard from "@/components/result-profile-card";
import type { PersonProfile } from "../../types/profile";
import { fetchProfiles } from "../../lib/profile-service";
import styles from "./results.module.css";

interface ProfileWithMatch extends PersonProfile {
  matchPercentage: number;
}

export default function ResultsPage() {
  const [profiles, setProfiles] = useState<ProfileWithMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedProfiles = await fetchProfiles();

      // Add match percentages to profiles
      const profilesWithMatch: ProfileWithMatch[] = fetchedProfiles.map(
        (profile, index) => ({
          ...profile,
          matchPercentage: [93, 85, 85, 85, 85][index] || 85,
        })
      );

      setProfiles(profilesWithMatch);
    } catch (err) {
      setError("Failed to load results. Please try again.");
      console.error("Error loading results:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialClick = (url: string) => {
    window.open(url, "_blank");
  };

  if (loading) {
    return (
      <div className={styles.resultsContainer}>
        <main className={styles.resultsMain}>
          <div className={styles.resultsContent}>
            <div className={styles.loadingContainer}>
              <div className={styles.loadingSpinner}></div>
              <p className={styles.loadingText}>Loading results...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.resultsContainer}>
        <main className={styles.resultsMain}>
          <div className={styles.resultsContent}>
            <div className={styles.errorContainer}>
              <p className={styles.errorText}>{error}</p>
              <button className={styles.retryButton} onClick={loadResults}>
                Try Again
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.resultsContainer}>
      <main className={styles.resultsMain}>
        <div className={styles.resultsContent}>
          <h1 className={styles.resultsTitle}>
            {profiles.length} Results found
          </h1>

          <div className={styles.resultsProfilesList}>
            {profiles.map((profile) => (
              <ResultsProfileCard
                key={profile.id}
                profile={profile}
                onSocialClick={handleSocialClick}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
