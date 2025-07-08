"use client";

import { useState, useEffect } from "react";
import ProfileList from "../../components/profile-list";
import type { PersonProfile } from "../../types/profile";
import { fetchProfiles } from "../../lib/profile-service";
import styles from "./saved.module.css";

export default function SavedPage() {
  const [profiles, setProfiles] = useState<PersonProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedProfiles = await fetchProfiles();
      // Filter only saved profiles
      const savedProfiles = fetchedProfiles.filter((profile) => profile.saved);
      setProfiles(savedProfiles);
    } catch (err) {
      setError("Failed to load profiles. Please try again.");
      console.error("Error loading profiles:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleProfilesChange = (updatedProfiles: PersonProfile[]) => {
    // Filter out unsaved profiles
    const savedProfiles = updatedProfiles.filter((profile) => profile.saved);
    setProfiles(savedProfiles);
  };

  if (loading) {
    return (
      <div className={styles.savedContainer}>
        <main className={styles.savedMain}>
          <div className={styles.savedContent}>
            <h1 className={styles.savedTitle}>Saved Profiles</h1>
            <div className={styles.loadingContainer}>
              <div className={styles.loadingSpinner}></div>
              <p className={styles.loadingText}>Loading saved profiles...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.savedContainer}>
        <main className={styles.savedMain}>
          <div className={styles.savedContent}>
            <h1 className={styles.savedTitle}>Saved Profiles</h1>
            <div className={styles.errorContainer}>
              <p className={styles.errorText}>{error}</p>
              <button className={styles.retryButton} onClick={loadProfiles}>
                Try Again
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.savedContainer}>
      <main className={styles.savedMain}>
        <div className={styles.savedContent}>
          <h1 className={styles.savedTitle}>Saved Profiles</h1>

          {profiles.length === 0 ? (
            <div className={styles.emptyContainer}>
              <p className={styles.emptyText}>No saved profiles yet.</p>
              <p className={styles.emptySubtext}>
                Start searching to save profiles you're interested in.
              </p>
            </div>
          ) : (
            <ProfileList
              profiles={profiles}
              onProfilesChange={handleProfilesChange}
            />
          )}
        </div>
      </main>
    </div>
  );
}
