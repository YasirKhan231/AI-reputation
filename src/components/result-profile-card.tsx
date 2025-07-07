"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { PersonProfile } from "../types/profile";
import styles from "./result-profile-card.module.css";

interface ResultsProfileCardProps {
  profile: PersonProfile & { matchPercentage: number };
  onSocialClick: (url: string) => void;
}

export default function ResultsProfileCard({
  profile,
  onSocialClick,
}: ResultsProfileCardProps) {
  const router = useRouter();

  const handleProfileClick = () => {
    router.push(`/profile/${profile.id}`);
  };

  return (
    <div className={styles.resultsProfileCard} onClick={handleProfileClick}>
      <div className={styles.resultsProfileLeft}>
        <div className={styles.resultsProfileImage}>
          <Image
            src={profile.profilePicture || "/placeholder.svg"}
            alt={profile.name}
            width={80}
            height={80}
            className={styles.resultsProfilePicture}
          />
        </div>

        <div className={styles.resultsProfileInfo}>
          <h3 className={styles.resultsProfileName}>{profile.name}</h3>

          <div className={styles.resultsProfileDetail}>
            <svg
              className={styles.resultsProfileIcon}
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 1a3 3 0 0 1 3 3c0 1.792-.8 3.4-2.054 4.514-.784.697-1.626 1.284-1.946 1.486-.32-.202-1.162-.789-1.946-1.486C3.8 7.4 3 5.792 3 4a3 3 0 0 1 3-3zm0 4.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
              />
            </svg>
            <span className={styles.resultsProfileText}>
              {profile.location}
            </span>
          </div>

          <div className={styles.resultsProfileDetail}>
            <svg
              className={styles.resultsProfileIcon}
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5z" />
              <path d="M0 7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v.5a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V7z" />
            </svg>
            <span className={styles.resultsProfileText}>
              {profile.profession} at {profile.company}
              {profile.previousCompany &&
                ` | Previously at ${profile.previousCompany}`}
            </span>
          </div>

          <div className={styles.resultsProfileDetail}>
            <svg
              className={styles.resultsProfileIcon}
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M2 2a2 2 0 00-2 2v8.01A2 2 0 002 14h5.5a.5.5 0 000-1H2a1 1 0 01-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 001 0V4a2 2 0 00-2-2H2zm3.708 6.208L1 11.105V5.383l4.708 2.825zM1 4.217V4a1 1 0 011-1h12a1 1 0 011 1v.217l-7 4.2-7-4.2z" />
            </svg>
            <span className={styles.resultsProfileText}>{profile.email}</span>
          </div>
        </div>
      </div>

      <div className={styles.resultsProfileRight}>
        <div className={styles.resultsMatchBadge}>
          <svg
            className={styles.resultsMatchIcon}
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
          </svg>
          {profile.matchPercentage}% Match
        </div>

        <div
          className={styles.resultsSocialMedia}
          onClick={(e) => e.stopPropagation()}
        >
          {profile.socialMedia.facebook && (
            <button
              className={`${styles.resultsSocialButton} ${styles.resultsSocialFacebook}`}
              onClick={() => onSocialClick(profile.socialMedia.facebook!)}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
          )}

          {profile.socialMedia.twitter && (
            <button
              className={`${styles.resultsSocialButton} ${styles.resultsSocialTwitter}`}
              onClick={() => onSocialClick(profile.socialMedia.twitter!)}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </button>
          )}

          {profile.socialMedia.linkedin && (
            <button
              className={`${styles.resultsSocialButton} ${styles.resultsSocialLinkedin}`}
              onClick={() => onSocialClick(profile.socialMedia.linkedin!)}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </button>
          )}

          {profile.socialMedia.instagram && (
            <button
              className={`${styles.resultsSocialButton} ${styles.resultsSocialInstagram}`}
              onClick={() => onSocialClick(profile.socialMedia.instagram!)}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </button>
          )}
        </div>

        <div className={styles.resultsTags}>
          {profile.tags.map((tag, index) => (
            <span key={index} className={styles.resultsTag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
