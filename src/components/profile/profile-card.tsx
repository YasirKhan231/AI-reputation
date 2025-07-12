"use client";

import Image from "next/image";
import type { PersonProfile } from "../../types/profile";
import styles from "./profile-card.module.css";

interface ProfileCardProps {
  profile: PersonProfile;
  onToggleSave: (profileId: number) => void;
  onSocialClick: (url: string) => void;
}

export default function ProfileCard({
  profile,
  onToggleSave,
  onSocialClick,
}: ProfileCardProps) {
  return (
    <div className={styles.profileCard}>
      <div className={styles.profileLeft}>
        <div className={styles.profileImage}>
          <Image
            src={profile.profilePicture || "/placeholder.svg"}
            alt={profile.name}
            width={80}
            height={80}
            className={styles.profilePicture}
          />
        </div>

        <div className={styles.profileInfo}>
          <h3 className={styles.profileName}>{profile.name}</h3>

          <div className={styles.profileDetail}>
            <svg
              className={styles.profileIcon}
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 1a3 3 0 0 1 3 3c0 1.792-.8 3.4-2.054 4.514-.784.697-1.626 1.284-1.946 1.486-.32-.202-1.162-.789-1.946-1.486C3.8 7.4 3 5.792 3 4a3 3 0 0 1 3-3zm0 4.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
              />
            </svg>
            <span className={styles.profileText}>{profile.location}</span>
          </div>

          <div className={styles.profileDetail}>
            <svg
              className={styles.profileIcon}
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5z" />
              <path d="M0 7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v.5a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V7z" />
            </svg>
            <span className={styles.profileText}>
              {profile.profession} at {profile.company}
              {profile.previousCompany &&
                ` | Previously at ${profile.previousCompany}`}
            </span>
          </div>

          <div className={styles.profileDetail}>
            <svg
              className={styles.profileIcon}
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M2 2a2 2 0 00-2 2v8.01A2 2 0 002 14h5.5a.5.5 0 000-1H2a1 1 0 01-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 001 0V4a2 2 0 00-2-2H2zm3.708 6.208L1 11.105V5.383l4.708 2.825zM1 4.217V4a1 1 0 011-1h12a1 1 0 011 1v.217l-7 4.2-7-4.2z" />
              <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648zm-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8z" />
            </svg>
            <span className={styles.profileText}>{profile.email}</span>
          </div>
        </div>
      </div>

      <div className={styles.profileRight}>
        <button
          className={`${styles.saveButton} ${
            profile.saved ? styles.saveButtonActive : ""
          }`}
          onClick={() => onToggleSave(profile.id)}
        >
          <svg
            className={styles.saveButtonIcon}
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            {profile.saved ? (
              <path d="M2 2a2 2 0 012-2h8a2 2 0 012 2v13.5a.5.5 0 01-.777.416L8 13.101l-5.223 2.815A.5.5 0 012 15.5V2z" />
            ) : (
              <path d="M2 2a2 2 0 012-2h8a2 2 0 012 2v13.5a.5.5 0 01-.777.416L8 13.101l-5.223 2.815A.5.5 0 012 15.5V2zm2-.5A1.5 1.5 0 002.5 3v11.5l4.777-2.578a.5.5 0 01.446 0L12.5 14.5V3A1.5 1.5 0 0011 1.5H4z" />
            )}
          </svg>
          Saved
        </button>

        <div className={styles.socialMedia}>
          {profile.socialMedia.facebook && (
            <button
              className={`${styles.socialButton} ${styles.socialFacebook}`}
              onClick={() => onSocialClick(profile.socialMedia.facebook!)}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
          )}

          {profile.socialMedia.twitter && (
            <button
              className={`${styles.socialButton} ${styles.socialTwitter}`}
              onClick={() => onSocialClick(profile.socialMedia.twitter!)}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </button>
          )}

          {profile.socialMedia.linkedin && (
            <button
              className={`${styles.socialButton} ${styles.socialLinkedin}`}
              onClick={() => onSocialClick(profile.socialMedia.linkedin!)}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </button>
          )}

          {profile.socialMedia.instagram && (
            <button
              className={`${styles.socialButton} ${styles.socialInstagram}`}
              onClick={() => onSocialClick(profile.socialMedia.instagram!)}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </button>
          )}
        </div>

        <div className={styles.tags}>
          {profile.tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
