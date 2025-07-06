"use client";

import Image from "next/image";
import styles from "./saved.module.css";

interface SocialMediaLinks {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
}

interface PersonProfile {
  id: number;
  name: string;
  location: string;
  profession: string;
  company: string;
  previousCompany?: string;
  email: string;
  profilePicture: string;
  tags: string[];
  socialMedia: SocialMediaLinks;
  saved: boolean;
}

const savedProfiles: PersonProfile[] = [
  {
    id: 1,
    name: "Robinson Crusoe",
    location: "Austin, TX",
    profession: "Software Engineer",
    company: "Google",
    previousCompany: "Apple",
    email: "robinsoncrusoe@gmail.com",
    profilePicture: "/placeholder.svg?height=80&width=80",
    tags: ["Philosophy", "Technology", "Design"],
    socialMedia: {
      facebook: "https://facebook.com/robinsoncrusoe",
      twitter: "https://twitter.com/robinsoncrusoe",
      linkedin: "https://linkedin.com/in/robinsoncrusoe",
      instagram: "https://instagram.com/robinsoncrusoe",
    },
    saved: true,
  },
  {
    id: 2,
    name: "Robinson Crusoe",
    location: "Austin, TX",
    profession: "Software Engineer",
    company: "Orville",
    email: "robin45@gmail.com",
    profilePicture: "/placeholder.svg?height=80&width=80",
    tags: ["Gaming", "Engineering", "Development"],
    socialMedia: {
      twitter: "https://twitter.com/robin45",
      linkedin: "https://linkedin.com/in/robin45",
      instagram: "https://instagram.com/robin45",
    },
    saved: true,
  },
  {
    id: 3,
    name: "Robinson Crusoe",
    location: "Austin, TX",
    profession: "Software Engineer",
    company: "Orville",
    email: "robin45@gmail.com",
    profilePicture: "/placeholder.svg?height=80&width=80",
    tags: ["Gaming", "Engineering", "Development"],
    socialMedia: {
      twitter: "https://twitter.com/robincrusoe3",
      linkedin: "https://linkedin.com/in/robincrusoe3",
      instagram: "https://instagram.com/robincrusoe3",
    },
    saved: true,
  },
  {
    id: 4,
    name: "Robinson Crusoe",
    location: "Austin, TX",
    profession: "Software Engineer",
    company: "Orville",
    email: "robin45@gmail.com",
    profilePicture: "/placeholder.svg?height=80&width=80",
    tags: ["Gaming", "Engineering", "Development"],
    socialMedia: {
      twitter: "https://twitter.com/robincrusoe4",
      linkedin: "https://linkedin.com/in/robincrusoe4",
      instagram: "https://instagram.com/robincrusoe4",
    },
    saved: true,
  },
  {
    id: 5,
    name: "Robinson Crusoe",
    location: "Austin, TX",
    profession: "Software Engineer",
    company: "Orville",
    email: "robin45@gmail.com",
    profilePicture: "/placeholder.svg?height=80&width=80",
    tags: ["Gaming", "Engineering", "Development"],
    socialMedia: {
      twitter: "https://twitter.com/robincrusoe5",
      linkedin: "https://linkedin.com/in/robincrusoe5",
      instagram: "https://instagram.com/robincrusoe5",
    },
    saved: true,
  },
];

export default function SavedPage() {
  const handleSocialClick = (url: string) => {
    window.open(url, "_blank");
  };

  const handleUnsave = (profileId: number) => {
    console.log(`Unsaving profile with ID: ${profileId}`);
    // Here you would typically update the state or make an API call
  };

  return (
    <div className={styles.savedContainer}>
      <main className={styles.savedMain}>
        <div className={styles.savedContent}>
          <h1 className={styles.savedTitle}>Saved Profiles</h1>

          <div className={styles.savedProfilesList}>
            {savedProfiles.map((profile) => (
              <div key={profile.id} className={styles.savedProfileCard}>
                <div className={styles.savedProfileLeft}>
                  <div className={styles.savedProfileImage}>
                    <Image
                      src={profile.profilePicture || "/placeholder.svg"}
                      alt={profile.name}
                      width={80}
                      height={80}
                      className={styles.savedProfilePicture}
                    />
                  </div>

                  <div className={styles.savedProfileInfo}>
                    <h3 className={styles.savedProfileName}>{profile.name}</h3>

                    <div className={styles.savedProfileDetail}>
                      <svg
                        className={styles.savedProfileIcon}
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.536 3.464a5 5 0 010 7.072L8 14.07l-3.536-3.535a5 5 0 117.072-7.07v.001zm-4.536 8.607a4 4 0 100-8 4 4 0 000 8z"
                          clipRule="evenodd"
                        />
                        <path d="M8 7a1 1 0 100-2 1 1 0 000 2z" />
                      </svg>
                      <span className={styles.savedProfileText}>
                        {profile.location}
                      </span>
                    </div>

                    <div className={styles.savedProfileDetail}>
                      <svg
                        className={styles.savedProfileIcon}
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a.5.5 0 01.47.33L7 3h2l.53-.67A.5.5 0 0110 2h2.5a.5.5 0 010 1H12v11a1 1 0 01-1 1H5a1 1 0 01-1-1V3h-.5a.5.5 0 010-1H6zM5 3v10h6V3H5z"
                          clipRule="evenodd"
                        />
                        <path d="M7 5.5a.5.5 0 01.5-.5h1a.5.5 0 010 1h-1a.5.5 0 01-.5-.5zM7.5 7a.5.5 0 000 1h1a.5.5 0 000-1h-1zM7 9.5a.5.5 0 01.5-.5h1a.5.5 0 010 1h-1a.5.5 0 01-.5-.5z" />
                      </svg>
                      <span className={styles.savedProfileText}>
                        {profile.profession} at {profile.company}
                        {profile.previousCompany &&
                          ` | Previously at ${profile.previousCompany}`}
                      </span>
                    </div>

                    <div className={styles.savedProfileDetail}>
                      <svg
                        className={styles.savedProfileIcon}
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <path d="M2 2a2 2 0 00-2 2v8.01A2 2 0 002 14h5.5a.5.5 0 000-1H2a1 1 0 01-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 001 0V4a2 2 0 00-2-2H2zm3.708 6.208L1 11.105V5.383l4.708 2.825zM1 4.217V4a1 1 0 011-1h12a1 1 0 011 1v.217l-7 4.2-7-4.2z" />
                        <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648zm-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8z" />
                      </svg>
                      <span className={styles.savedProfileText}>
                        {profile.email}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={styles.savedProfileRight}>
                  <button
                    className={styles.savedButton}
                    onClick={() => handleUnsave(profile.id)}
                  >
                    <svg
                      className={styles.savedButtonIcon}
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                    </svg>
                    Saved
                  </button>

                  <div className={styles.savedSocialMedia}>
                    {profile.socialMedia.facebook && (
                      <button
                        className={`${styles.savedSocialButton} ${styles.savedSocialFacebook}`}
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
                        className={`${styles.savedSocialButton} ${styles.savedSocialTwitter}`}
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
                        className={`${styles.savedSocialButton} ${styles.savedSocialLinkedin}`}
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
                        className={`${styles.savedSocialButton} ${styles.savedSocialInstagram}`}
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

                  <div className={styles.savedTags}>
                    {profile.tags.map((tag, index) => (
                      <span key={index} className={styles.savedTag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
