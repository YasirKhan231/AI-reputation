"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import type { PersonProfile } from "../../../../types/profile";
import { fetchProfiles } from "../../../../lib/profile-service";

import styles from "./profile-detail.module.css";

export default function ProfileDetailPage() {
  const params = useParams();
  const [profile, setProfile] = useState<PersonProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProfile();
  }, [params.id]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const profiles = await fetchProfiles();
      const foundProfile = profiles.find(
        (p) => p.id === Number.parseInt(params.id as string)
      );

      if (foundProfile) {
        setProfile(foundProfile);
      } else {
        setError("Profile not found");
      }
    } catch (err) {
      setError("Failed to load profile. Please try again.");
      console.error("Error loading profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialClick = (url: string) => {
    window.open(url, "_blank");
  };

  const handleToggleSave = async () => {
    if (!profile) return;

    try {
      const updatedProfile = { ...profile, saved: !profile.saved };
      setProfile(updatedProfile);
      console.log(`Profile ${profile.id} save status toggled`);
    } catch (error) {
      console.error("Error toggling save status:", error);
    }
  };

  const getPlatformColor = (platform: string) => {
    const colors = {
      facebook: "#1877f2",
      instagram: "#e4405f",
      twitter: "#1da1f2",
      tiktok: "#000000",
      youtube: "#ff0000",
    };
    return colors[platform as keyof typeof colors] || "#666666";
  };

  const getSocialMediaUrl = (source: string) => {
    if (!profile) return "#";

    const sourceMap = {
      Twitter: profile.socialMedia.twitter,
      Facebook: profile.socialMedia.facebook,
      Reddit: profile.socialMedia.twitter, // Using Twitter as fallback for Reddit
      Instagram: profile.socialMedia.instagram,
      LinkedIn: profile.socialMedia.linkedin,
    };

    return sourceMap[source as keyof typeof sourceMap] || "#";
  };

  const renderSocialIcon = (platform: string) => {
    const iconPath = `/public/${platform}.svg`;

    return (
      <div
        className={styles.profileDetailMediaPlatform}
        style={{ backgroundColor: getPlatformColor(platform) }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          {platform === "facebook" && (
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          )}
          {platform === "twitter" && (
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          )}
          {platform === "instagram" && (
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          )}
          {platform === "linkedin" && (
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          )}
          {platform === "youtube" && (
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          )}
          {platform === "tiktok" && (
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
          )}
        </svg>
      </div>
    );
  };

  if (loading) {
    return (
      <div className={styles.profileDetailContainer}>
        <main className={styles.profileDetailMain}>
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <p className={styles.loadingText}>Loading profile...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className={styles.profileDetailContainer}>
        <main className={styles.profileDetailMain}>
          <div className={styles.errorContainer}>
            <p className={styles.errorText}>{error || "Profile not found"}</p>
            <button
              className={styles.backButton}
              onClick={() => window.history.back()}
            >
              Go Back
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.profileDetailContainer}>
      <main className={styles.profileDetailMain}>
        <div className={styles.profileDetailContent}>
          {/* Header Section */}
          <div className={styles.profileDetailHeader}>
            <div className={styles.profileDetailLeft}>
              <div className={styles.profileDetailImageSection}>
                <Image
                  src={profile.profilePicture || "/placeholder.svg"}
                  alt={profile.name}
                  width={120}
                  height={120}
                  className={styles.profileDetailPicture}
                />
              </div>

              <div className={styles.profileDetailInfo}>
                <h1 className={styles.profileDetailName}>{profile.name}</h1>

                <div className={styles.profileDetailDetail}>
                  <svg
                    className={styles.profileDetailIcon}
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 1a3 3 0 0 1 3 3c0 1.792-.8 3.4-2.054 4.514-.784.697-1.626 1.284-1.946 1.486-.32-.202-1.162-.789-1.946-1.486C3.8 7.4 3 5.792 3 4a3 3 0 0 1 3-3zm0 4.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
                    />
                  </svg>
                  <span className={styles.profileDetailText}>
                    {profile.location}
                  </span>
                </div>

                <div className={styles.profileDetailDetail}>
                  <svg
                    className={styles.profileDetailIcon}
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5z" />
                  </svg>
                  <span className={styles.profileDetailText}>
                    {profile.profession} at {profile.company}
                    {profile.previousCompany &&
                      ` | Previously at ${profile.previousCompany}`}
                  </span>
                </div>

                <div className={styles.profileDetailDetail}>
                  <svg
                    className={styles.profileDetailIcon}
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M2 2a2 2 0 00-2 2v8.01A2 2 0 002 14h5.5a.5.5 0 000-1H2a1 1 0 01-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 001 0V4a2 2 0 00-2-2H2zm3.708 6.208L1 11.105V5.383l4.708 2.825zM1 4.217V4a1 1 0 011-1h12a1 1 0 011 1v.217l-7 4.2-7-4.2z" />
                  </svg>
                  <span className={styles.profileDetailText}>
                    {profile.email}
                  </span>
                </div>

                {profile.phone && (
                  <div className={styles.profileDetailDetail}>
                    <svg
                      className={styles.profileDetailIcon}
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122L9.98 10.94a6.678 6.678 0 0 1-3.21-.918 6.678 6.678 0 0 1-.918-3.21l.508-1.804a.678.678 0 0 0-.122-.58L3.654 1.328z" />
                    </svg>
                    <span className={styles.profileDetailText}>
                      {profile.phone}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.profileDetailActions}>
              <div className={styles.profileDetailTopActions}>
                <button
                  className={`${styles.profileDetailSaveButton} ${
                    profile.saved ? styles.profileDetailSaveButtonActive : ""
                  }`}
                  onClick={handleToggleSave}
                >
                  <svg
                    className={styles.profileDetailSaveIcon}
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    {profile.saved ? (
                      <path d="M2 2a2 2 0 012-2h8a2 2 0 012 2v13.5a.5.5 0 01-.777.416L8 13.101l-5.223 2.815A.5.5 0 012 15.5V2z" />
                    ) : (
                      <path d="M2 2a2 2 0 012-2h8a2 2 0 012 2v13.5a.5.5 0 01-.777.416L8 13.101l-5.223 2.815A.5.5 0 012 15.5V2zm2-.5A1.5 1.5 0 002.5 3v11.5l4.777-2.578a.5.5 0 01.446 0L12.5 14.5V3A1.5 1.5 0 0011 1.5H4z" />
                    )}
                  </svg>
                </button>

                <button className={styles.profileDetailShareButton}>
                  <svg
                    className={styles.profileDetailShareIcon}
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                  </svg>
                </button>

                <button className={styles.profileDetailDownloadButton}>
                  <svg
                    className={styles.profileDetailDownloadIcon}
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                  </svg>
                  Download PDF
                </button>
              </div>

              <div className={styles.profileDetailSocialMedia}>
                {profile.socialMedia.facebook && (
                  <button
                    className={`${styles.profileDetailSocialButton} ${styles.profileDetailSocialFacebook}`}
                    onClick={() =>
                      handleSocialClick(profile.socialMedia.facebook!)
                    }
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </button>
                )}

                {profile.socialMedia.twitter && (
                  <button
                    className={`${styles.profileDetailSocialButton} ${styles.profileDetailSocialTwitter}`}
                    onClick={() =>
                      handleSocialClick(profile.socialMedia.twitter!)
                    }
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </button>
                )}

                {profile.socialMedia.linkedin && (
                  <button
                    className={`${styles.profileDetailSocialButton} ${styles.profileDetailSocialLinkedin}`}
                    onClick={() =>
                      handleSocialClick(profile.socialMedia.linkedin!)
                    }
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </button>
                )}

                {profile.socialMedia.instagram && (
                  <button
                    className={`${styles.profileDetailSocialButton} ${styles.profileDetailSocialInstagram}`}
                    onClick={() =>
                      handleSocialClick(profile.socialMedia.instagram!)
                    }
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </button>
                )}
              </div>

              <div className={styles.profileDetailTags}>
                {profile.tags.map((tag, index) => (
                  <span key={index} className={styles.profileDetailTag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className={styles.profileDetailGrid}>
            {/* Left Column */}
            <div className={styles.profileDetailLeftColumn}>
              {/* Personal Information */}
              <div className={styles.profileDetailSection}>
                <h2 className={styles.profileDetailSectionTitle}>
                  PERSONAL INFORMATIONS
                </h2>
                <div className={styles.profileDetailPersonalInfo}>
                  <div className={styles.profileDetailInfoRow}>
                    <span className={styles.profileDetailInfoLabel}>Name</span>
                    <span className={styles.profileDetailInfoValue}>
                      {profile.name}
                    </span>
                  </div>
                  {profile.nickname && (
                    <div className={styles.profileDetailInfoRow}>
                      <span className={styles.profileDetailInfoLabel}>
                        Nickname
                      </span>
                      <span className={styles.profileDetailInfoValue}>
                        {profile.nickname}
                      </span>
                    </div>
                  )}
                  {profile.phone && (
                    <div className={styles.profileDetailInfoRow}>
                      <span className={styles.profileDetailInfoLabel}>
                        Phone
                      </span>
                      <span className={styles.profileDetailInfoValue}>
                        {profile.phone}
                      </span>
                    </div>
                  )}
                  <div className={styles.profileDetailInfoRow}>
                    <span className={styles.profileDetailInfoLabel}>Email</span>
                    <span className={styles.profileDetailInfoValue}>
                      {profile.email}
                    </span>
                  </div>
                  {profile.personalInfo.age && (
                    <div className={styles.profileDetailInfoRow}>
                      <span className={styles.profileDetailInfoLabel}>Age</span>
                      <span className={styles.profileDetailInfoValue}>
                        {profile.personalInfo.age}
                      </span>
                    </div>
                  )}
                  {profile.personalInfo.height && (
                    <div className={styles.profileDetailInfoRow}>
                      <span className={styles.profileDetailInfoLabel}>
                        Height
                      </span>
                      <span className={styles.profileDetailInfoValue}>
                        {profile.personalInfo.height}
                      </span>
                    </div>
                  )}
                  {profile.personalInfo.gender && (
                    <div className={styles.profileDetailInfoRow}>
                      <span className={styles.profileDetailInfoLabel}>
                        Gender
                      </span>
                      <span className={styles.profileDetailInfoValue}>
                        {profile.personalInfo.gender}
                      </span>
                    </div>
                  )}
                  <div className={styles.profileDetailInfoRow}>
                    <span className={styles.profileDetailInfoLabel}>
                      Current City
                    </span>
                    <span className={styles.profileDetailInfoValue}>
                      {profile.personalInfo.currentCity}
                    </span>
                  </div>
                </div>
              </div>

              {/* Photos */}
              <div className={styles.profileDetailSection}>
                <h2 className={styles.profileDetailSectionTitle}>PHOTOS</h2>
                <div className={styles.profileDetailMediaGrid}>
                  {profile.photos.map((photo) => (
                    <div
                      key={photo.id}
                      className={styles.profileDetailMediaItem}
                    >
                      <Image
                        src={photo.url || "/placeholder.svg"}
                        alt="Profile photo"
                        width={150}
                        height={150}
                        className={styles.profileDetailMediaImage}
                      />
                      {renderSocialIcon(photo.platform)}
                    </div>
                  ))}
                </div>
              </div>

              {/* Public Sentiment */}
              <div className={styles.profileDetailSection}>
                <div className={styles.profileDetailSentimentHeader}>
                  <h2 className={styles.profileDetailSectionTitle}>
                    PUBLIC SENTIMENT
                  </h2>
                  <span className={styles.profileDetailSentimentPeriod}>
                    Last 6 month
                  </span>
                </div>
                <div className={styles.profileDetailSentiment}>
                  <div className={styles.profileDetailSentimentScore}>
                    <span className={styles.profileDetailSentimentNumber}>
                      {profile.publicSentiment.score}
                    </span>
                    <span className={styles.profileDetailSentimentLabel}>
                      ↗ 10 (2.63%) This month
                    </span>
                  </div>

                  <div className={styles.profileDetailChart}>
                    <svg
                      className={styles.profileDetailChartSvg}
                      viewBox="0 0 400 80"
                    >
                      <defs>
                        <linearGradient
                          id="sentimentGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#34d399" />
                        </linearGradient>
                        <linearGradient
                          id="areaGradient"
                          x1="0%"
                          y1="0%"
                          x2="0%"
                          y2="100%"
                        >
                          <stop
                            offset="0%"
                            stopColor="rgba(16, 185, 129, 0.3)"
                          />
                          <stop
                            offset="100%"
                            stopColor="rgba(16, 185, 129, 0.05)"
                          />
                        </linearGradient>
                      </defs>

                      {/* Area fill */}
                      <path
                        fill="url(#areaGradient)"
                        d="M20,60 Q50,45 80,50 T140,40 T200,35 T260,30 T320,25 Q350,22 380,20 L380,80 L20,80 Z"
                      />

                      {/* Wave line */}
                      <path
                        fill="none"
                        stroke="url(#sentimentGradient)"
                        strokeWidth="3"
                        d="M20,60 Q50,45 80,50 T140,40 T200,35 T260,30 T320,25 Q350,22 380,20"
                      />

                      {/* Data points */}
                      <circle cx="20" cy="60" r="4" fill="#10b981" />
                      <circle cx="80" cy="50" r="4" fill="#10b981" />
                      <circle cx="140" cy="40" r="4" fill="#10b981" />
                      <circle cx="200" cy="35" r="4" fill="#10b981" />
                      <circle cx="260" cy="30" r="4" fill="#10b981" />
                      <circle cx="320" cy="25" r="4" fill="#10b981" />
                    </svg>
                    <div className={styles.profileDetailChartLabels}>
                      <span className={styles.profileDetailChartLabel}>
                        JAN
                      </span>
                      <span className={styles.profileDetailChartLabel}>
                        FEB
                      </span>
                      <span className={styles.profileDetailChartLabel}>
                        MAR
                      </span>
                      <span className={styles.profileDetailChartLabel}>
                        APR
                      </span>
                      <span className={styles.profileDetailChartLabel}>
                        JUN
                      </span>
                      <span className={styles.profileDetailChartLabel}>
                        JUL
                      </span>
                    </div>
                  </div>

                  <div className={styles.profileDetailMentions}>
                    {profile.publicSentiment.mentions.map((mention) => (
                      <div
                        key={mention.id}
                        className={styles.profileDetailMention}
                      >
                        <div className={styles.profileDetailMentionDot}></div>
                        <div className={styles.profileDetailMentionContent}>
                          <span className={styles.profileDetailMentionText}>
                            {mention.text}
                          </span>
                          <span className={styles.profileDetailMentionSource}>
                            View Post
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Positive Marks */}
              <div className={styles.profileDetailSection}>
                <h2 className={styles.profileDetailSectionTitle}>
                  POSITIVE MARKS
                </h2>
                <div className={styles.profileDetailPositiveMarks}>
                  {profile.positiveMarks.map((mark) => (
                    <div
                      key={mark.id}
                      className={styles.profileDetailPositiveMark}
                    >
                      <div className={styles.profileDetailPositiveMarkIcon}>
                        {/* Empty space for manual icon upload */}
                      </div>
                      <div className={styles.profileDetailPositiveMarkContent}>
                        <h4 className={styles.profileDetailPositiveMarkTitle}>
                          {mark.title}
                        </h4>
                        <p
                          className={
                            styles.profileDetailPositiveMarkDescription
                          }
                        >
                          {mark.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className={styles.profileDetailRightColumn}>
              {/* Related To */}
              <div className={styles.profileDetailSection}>
                <h2 className={styles.profileDetailSectionTitle}>RELATED TO</h2>
                <div className={styles.profileDetailRelatedPeople}>
                  {profile.relatedPeople.map((person) => (
                    <div
                      key={person.id}
                      className={styles.profileDetailRelatedPerson}
                    >
                      <Image
                        src={person.profilePicture || "/placeholder.svg"}
                        alt={person.name}
                        width={40}
                        height={40}
                        className={styles.profileDetailRelatedPersonImage}
                      />
                      <div className={styles.profileDetailRelatedPersonInfo}>
                        <span className={styles.profileDetailRelatedPersonName}>
                          {person.name}
                        </span>
                        <span
                          className={styles.profileDetailRelatedPersonRelation}
                        >
                          {person.relationship}
                        </span>
                      </div>
                    </div>
                  ))}
                  <button className={styles.profileDetailSeeMore}>
                    See 5 More
                  </button>
                </div>
              </div>

              {/* Videos */}
              <div className={styles.profileDetailSection}>
                <h2 className={styles.profileDetailSectionTitle}>VIDEOS</h2>
                <div className={styles.profileDetailMediaGrid}>
                  {profile.videos.map((video) => (
                    <div
                      key={video.id}
                      className={styles.profileDetailMediaItem}
                    >
                      <div className={styles.profileDetailVideoContainer}>
                        <Image
                          src={video.thumbnail || video.url}
                          alt="Video thumbnail"
                          width={150}
                          height={150}
                          className={styles.profileDetailMediaImage}
                        />
                        <div className={styles.profileDetailVideoPlayButton}>
                          <svg viewBox="0 0 24 24" fill="white">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      {renderSocialIcon(video.platform)}
                    </div>
                  ))}
                </div>
              </div>

              {/* Flagged Contents */}
              <div className={styles.profileDetailSection}>
                <h2 className={styles.profileDetailSectionTitle}>
                  FLAGGED CONTENTS
                </h2>
                <div className={styles.profileDetailFlaggedContents}>
                  {profile.flaggedContents.map((content) => (
                    <div
                      key={content.id}
                      className={styles.profileDetailFlaggedContent}
                    >
                      <p className={styles.profileDetailFlaggedText}>
                        "{content.text}"
                      </p>
                      <div className={styles.profileDetailFlaggedTags}>
                        {content.tags.map((tag, index) => (
                          <span
                            key={index}
                            className={styles.profileDetailFlaggedTag}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className={styles.profileDetailFlaggedMeta}>
                        <span className={styles.profileDetailFlaggedDate}>
                          {content.date}
                        </span>
                        <span
                          className={styles.profileDetailFlaggedSource}
                          onClick={() =>
                            handleSocialClick(getSocialMediaUrl(content.source))
                          }
                        >
                          Source: {content.source}
                        </span>
                      </div>
                    </div>
                  ))}
                  <button className={styles.profileDetailMoreFlagged}>
                    More Flagged Contents
                  </button>
                </div>
              </div>

              {/* Education and Profession */}
              <div className={styles.profileDetailSection}>
                <h2 className={styles.profileDetailSectionTitle}>
                  EDUCATION AND PROFESSION
                </h2>
                <div className={styles.profileDetailEducationProfession}>
                  {profile.educationProfession.map((item) => (
                    <div
                      key={item.id}
                      className={styles.profileDetailEducationItem}
                    >
                      <div className={styles.profileDetailEducationIcon}>
                        {item.type === "education" ? (
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z" />
                          </svg>
                        )}
                      </div>
                      <div className={styles.profileDetailEducationContent}>
                        <h4 className={styles.profileDetailEducationTitle}>
                          {item.title}
                        </h4>
                        <p className={styles.profileDetailEducationOrg}>
                          {item.organization}
                        </p>
                      </div>
                      <div className={styles.profileDetailEducationDate}>
                        {item.current ? (
                          <span
                            className={styles.profileDetailEducationCurrent}
                          >
                            {item.startYear} - CURRENT
                          </span>
                        ) : (
                          <span className={styles.profileDetailEducationRange}>
                            {item.startYear} - {item.endYear}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
