"use client";

import { useState, useEffect } from "react";
import ProfileCard from "./profile-card";
import type { PersonProfile } from "../types/profile";
import styles from "./profile-list.module.css";

interface ProfileListProps {
  profiles: PersonProfile[];
  onProfilesChange?: (profiles: PersonProfile[]) => void;
}

export default function ProfileList({
  profiles: initialProfiles,
  onProfilesChange,
}: ProfileListProps) {
  const [profiles, setProfiles] = useState<PersonProfile[]>(initialProfiles);

  useEffect(() => {
    setProfiles(initialProfiles);
  }, [initialProfiles]);

  const handleToggleSave = async (profileId: number) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 200));

      const updatedProfiles = profiles.map((profile) =>
        profile.id === profileId
          ? { ...profile, saved: !profile.saved }
          : profile
      );

      setProfiles(updatedProfiles);
      onProfilesChange?.(updatedProfiles);

      console.log(`Profile ${profileId} save status toggled`);
    } catch (error) {
      console.error("Error toggling save status:", error);
    }
  };

  const handleSocialClick = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className={styles.profileList}>
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.id}
          profile={profile}
          onToggleSave={handleToggleSave}
          onSocialClick={handleSocialClick}
        />
      ))}
    </div>
  );
}
