"use client";

import type React from "react";

import { useState } from "react";
import styles from "./newprofile.module.css";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"; // Import recharts components
import { profileData } from "@/data/profiledata";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar";
// Helper function to determine risk level and class
const getRiskLevel = (score: number) => {
  if (score < 30)
    return { level: "HIGH RISK", class: "high", color: "#FF8D58" };
  if (score >= 30 && score <= 65)
    return { level: "MODERATE RISK", class: "moderate", color: "#FACC15" };
  return { level: "LOW RISK", class: "low", color: "#37BD80" };
};

// Helper function to get positive trait icon
const getPositiveIcon = (index: number) => {
  const icons = [
    "/profile/trophy.svg",
    "/profile/record.svg",
    "/profile/achievement.svg",
    "/profile/community.svg",
  ];
  return (
    <img
      src={icons[index % icons.length] || "/placeholder.svg"}
      alt="icon"
      width={20}
      height={20}
      className={styles.mindIcon}
    />
  );
};

// Helper function to get education icon
const getEducationIcon = (index: number) => {
  // Determine if it's a profession or education entry based on title content
  const isProfession =
    profileData.educationAndProfession[index].title.includes("at");
  return isProfession ? (
    <img
      src="/profile/job.svg"
      alt="profession icon"
      width={20}
      height={20}
      className={styles.eduIcon}
    />
  ) : (
    <img
      src="/profile/education.svg"
      alt="education icon"
      width={20}
      height={20}
      className={styles.eduIcon}
    />
  );
};

// Recharts Pie Chart component
const DiscPieChart = ({ data }: { data: any }) => {
  // Exact segment configurations from your measurements
  const segments = [
    {
      name: "Steadiness",
      value: data.steadiness,
      color: "#37BD80",
      width: 180,
      height: 180,
      top: 402,
      left: -5,
      angle: 90,
    },
    {
      name: "Influence",
      value: data.influence,
      color: "#FACC15",
      width: 110,
      height: 110,
      top: 434,
      left: 28,
      angle: 180,
    },
    {
      name: "Dominance",
      value: data.dominance,
      color: "#FF8D58",
      width: 142,
      height: 142,
      top: 418,
      left: 14,
      angle: 180,
    },
    {
      name: "Conscientiousness",
      value: data.conscientiousness,
      color: "#90A8ED",
      width: 60,
      height: 60,
      top: 462,
      left: 52,
      angle: 270,
    },
  ];

  return (
    <div className={styles.pieChartContainer}>
      <div className={styles.pieChartBackground}>
        {segments.map((segment, index) => (
          <div
            key={index}
            className={styles.pieSegment}
            style={{
              position: "absolute",
              width: `${segment.width}px`,
              height: `${segment.height}px`,
              top: `${segment.top}px`,
              left: `${segment.left}px`,
              transform: `rotate(${segment.angle}deg)`,
              backgroundColor: segment.color,
              opacity: 1,
              borderRadius: "50%",
              clipPath: getClipPathForSegment(index),
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Helper function to determine clip path for each quadrant
const getClipPathForSegment = (index: number) => {
  switch (index) {
    case 0:
      return "polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%)"; // Top-right
    case 1:
      return "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)"; // Bottom-right
    case 2:
      return "polygon(50% 50%, 0% 50%, 0% 100%, 50% 100%)"; // Bottom-left
    case 3:
      return "polygon(50% 50%, 0% 50%, 0% 0%, 50% 0%)"; // Top-left
    default:
      return "";
  }
};

// Assessment Card Component
const AssessmentCard = ({
  title,
  score,
  percentage,
  description,
  onInfoClick,
}: {
  title: string;
  score: number;
  percentage: number;
  description: string;
  onInfoClick: (event: React.MouseEvent<HTMLImageElement>) => void; // Updated to pass event
}) => {
  const riskData = getRiskLevel(score);

  return (
    <div className={styles.metricCard}>
      <div className={styles.cardHeader}>
        <span className={styles.cardTitle}>{title}</span>
        <img
          src="/profile/info.svg"
          alt="info icon"
          className={styles.infoIcon}
          onClick={onInfoClick}
        />
        <span className={styles.scoreText} style={{ color: riskData.color }}>
          {riskData.level} - {score}/100
        </span>
      </div>

      <div className={styles.progressBarContainer}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{
              width: `${percentage}%`,
              backgroundColor: riskData.color,
            }}
          />
        </div>
      </div>

      <button className={styles.viewDetailsBtn}>
        <span>View Details</span>
        <img
          src="/profile/right.svg"
          alt="view details icon"
          className={styles.viewDetailsIcon}
        />
      </button>
    </div>
  );
};
const ShareDialog = ({
  onClose,
  position,
}: {
  onClose: () => void;
  position: { top: number; left: number };
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const linkText = "https://www.obsrvr.com/search/pins/?qdsfsdfsdfsdf";

  const handleCopy = () => {
    navigator.clipboard.writeText(linkText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className={styles.shareDialogOverlay} onClick={onClose}>
      <div
        className={styles.shareDialogContainer}
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.shareDialogHeader}>
          <h3 className={styles.shareDialogTitle}>Share Link</h3>
        </div>

        <div className={styles.linkContainer}>
          <div className={styles.linkIconContainer}>
            <img
              src="/profile/link.svg"
              alt="Link"
              className={styles.linkIcon}
            />
          </div>

          <div className={styles.divider}></div>

          <div className={styles.linkTextContainer}>
            <p className={styles.linkText}>{linkText}</p>
          </div>

          <div className={styles.divider}></div>

          <button className={styles.copyButton} onClick={handleCopy}>
            <img
              src="/profile/copy.svg"
              alt="Copy"
              className={styles.copyIcon}
            />
            {isCopied && <span className={styles.copiedText}>Copied!</span>}
          </button>
        </div>

        <p className={styles.shareDescriptionText}>
          Copy this link and send it to anyone you want to share the report
          with.
        </p>
      </div>
    </div>
  );
};

// Info Dialog Component
const InfoDialog = ({
  isOpen,
  onClose,
  title,
  riskLevel,
  riskColor,
  description,
  position,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  riskLevel: string;
  riskColor: string;
  description: string;
  position?: { top: number; left: number };
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={styles.dialogOverlay}
      onClick={onClose}
      style={
        position
          ? {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "transparent",
            }
          : {}
      }
    >
      <div
        className={styles.dialogContainer}
        style={
          position
            ? { position: "absolute", top: position.top, left: position.left }
            : {}
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.dialogHeader}>
          <span className={styles.dialogTitle}>{title}</span>{" "}
          {/* Heading on the left */}
          <div className={styles.dialogHeaderRight}>
            {" "}
            {/* New container for risk tag and close icon */}
            <span
              className={styles.dialogRiskLabel}
              style={{ backgroundColor: `${riskColor}0F`, color: riskColor }}
            >
              {riskLevel}
            </span>
            {/* <img
              src="/profile/x.svg"
              alt="close icon"
              className={styles.closeIcon}
              onClick={onClose}
            /> */}
          </div>
        </div>
        <p className={styles.dialogDescription}>{description}</p>
      </div>
    </div>
  );
};

export default function ProfilePage() {
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [shareDialogPosition, setShareDialogPosition] = useState({
    top: 0,
    left: 0,
  });
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [dialogPosition, setDialogPosition] = useState<
    { top: number; left: number } | undefined
  >(undefined);

  const {
    user,
    scores,
    discAssessment,
    flaggedContent,
    positiveTraits,
    positiveMentions,
    educationAndProfession,
    analyticSummary,
    assessmentDescriptions,
  } = profileData;
  const router = useRouter();
  const assessmentOrder = [
    {
      key: "professionalLife",
      title: "PROFESSIONAL LIFE",
      data: scores.professionalLife,
    },
    {
      key: "publicSentiment",
      title: "PUBLIC SENTIMENT",
      data: scores.publicSentiment,
    },
    {
      key: "socialRiskProfile",
      title: "SOCIAL RISK PROFILE",
      data: scores.socialRiskProfile,
    },
    {
      key: "identityConsistency",
      title: "IDENTITY CONSISTENCY",
      data: scores.identityConsistency,
    },
    {
      key: "onlineExposure",
      title: "ONLINE EXPOSURE",
      data: scores.onlineExposure,
    },
    {
      key: "personalAuthenticity",
      title: "PERSONAL AUTHENTICITY",
      data: scores.personalAuthenticity,
    },
  ];
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleShareClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const buttonRect = e.currentTarget.getBoundingClientRect();
    setShareDialogPosition({
      top: buttonRect.bottom + 10,
      left: buttonRect.left - 150,
    });
    setShowShareDialog(true);
  };
  const handleInfoClick = (
    key: string,
    event: React.MouseEvent<HTMLImageElement>
  ) => {
    const cardElement = event.currentTarget.closest(
      `.${styles.metricCard}`
    ) as HTMLElement;
    if (!cardElement) return;

    const cardRect = cardElement.getBoundingClientRect();
    const dialogWidth = 374;
    const dialogHeight = 163;

    // Position the dialog above the card, centered horizontally relative to the card
    const top = cardRect.top - dialogHeight - 10; // 10px padding above the card
    const left = cardRect.left + cardRect.width / 2 - dialogWidth / 2;

    setDialogPosition({ top, left });
    setActiveDialog(key);
  };

  const closeDialog = () => {
    setActiveDialog(null);
    setDialogPosition(undefined);
  };

  const activeAssessment = assessmentOrder.find((a) => a.key === activeDialog);
  const activeRiskData = activeAssessment
    ? getRiskLevel(activeAssessment.data.score)
    : null;

  const discChartData = [
    { label: "Dominance", value: discAssessment.dominance, color: "#FF8D58" },
    { label: "Influence", value: discAssessment.influence, color: "#FACC15" },
    { label: "Steadiness", value: discAssessment.steadiness, color: "#37BD80" },
    {
      label: "Conscientiousness",
      value: discAssessment.conscientiousness,
      color: "#5B8DEF",
    },
  ];

  return (
    <div className={styles.container}>
      {/* <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} /> */}
      {/* Navigation */}
      <nav className={styles.navigation}>
        <div className={styles.breadcrumbs}>
          <Link
            href="/b2b/report"
            className={styles.breadcrumbLink}
            style={{ color: "#4880FF" }}
          >
            REPORTS
          </Link>
          <img
            src="/profile/right.svg"
            alt="chevron right"
            width={16}
            height={16}
          />
          <span
            onClick={() => router.back()}
            className={styles.breadcrumbLink}
            style={{ color: "#4880FF" }}
          >
            UI UX DESIGNER HIRING 2025 Q1
          </span>
          <img
            src="/profile/right.svg"
            alt="chevron right"
            width={16}
            height={16}
          />
          <span className={styles.navigationname}>
            {user.name.toUpperCase()}
          </span>
        </div>
        <div className={styles.navigationActions}>
          {user.downloadPDF && (
            <button className={styles.downloadBtn}>
              <img
                src="/profile/download.svg"
                alt="download icon"
                className={styles.downloadIcon}
              />
              Download PDF
            </button>
          )}
          <div className={styles.sharebutton} onClick={handleShareClick}>
            <img
              src="/profile/share.svg"
              alt="share icon"
              className={styles.shareIcon}
            />
          </div>
        </div>
      </nav>

      {/* Main Content Container */}
      <div className={styles.mainContainer}>
        {/* Profile Header Section */}
        <div className={styles.profileHeader}>
          {/* Left Side - Profile Info */}
          <div className={styles.profileLeft}>
            <div className={styles.profileImageContainer}>
              <img
                src="/profile.svg"
                alt={user.name}
                className={styles.profileImage}
              />
            </div>

            <div className={styles.profileInfo}>
              <h1 className={styles.profileName}>{user.name}</h1>

              <div className={styles.profileRole}>
                <img
                  src="/profile/job.svg"
                  alt="profession"
                  className={styles.roleIcon}
                />
                <span>{user.title}</span>
              </div>

              <div className={styles.profileEmail}>
                <img
                  src="/profile/mail.svg"
                  alt="email"
                  className={styles.emailIcon}
                />
                <span>{user.email}</span>
              </div>

              <div className={styles.tags}>
                {/* Assuming tags are dynamic from profileData or hardcoded */}
                <span className={styles.tag}>Philosophy</span>
                <span className={styles.tag}>Technology</span>
                <span className={styles.tag}>Design</span>
              </div>
            </div>
          </div>

          {/* Right Side - Risk Summary */}
          <div className={styles.profileRight}>
            <div className={styles.riskBadge}>
              <div className={styles.riskCircle}></div>
              <span>{user.status}</span>
            </div>

            <div className={styles.overallScore}>
              <img
                src="/profile/score.svg"
                alt="chart icon"
                className={styles.scoreIcon}
              />
              <span>
                Overall Score :{" "}
                {Math.round(
                  (scores.professionalLife.score +
                    scores.publicSentiment.score +
                    scores.socialRiskProfile.score +
                    scores.identityConsistency.score +
                    scores.onlineExposure.score +
                    scores.personalAuthenticity.score) /
                    6
                )}
                /100
              </span>
            </div>

            <div className={styles.socialIcons}>
              {user.socialLinks.map((platform, index) => {
                let iconSrc = "";
                switch (platform.toLowerCase()) {
                  case "twitter":
                    iconSrc = "/profile/x.svg";
                    break;
                  case "linkedin":
                    iconSrc = "/profile/linkedin.svg";
                    break;
                  case "facebook":
                    iconSrc = "/profile/facebook.svg";
                    break;
                  case "instagram":
                    iconSrc = "/profile/instagram.svg";
                    break;
                  default:
                    iconSrc = "/placeholder.svg"; // Fallback
                }
                return (
                  <img
                    key={index}
                    src={iconSrc || "/placeholder.svg"}
                    alt={platform}
                    className={styles.socialIcon}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Assessment Grid */}
        <div className={styles.assessmentGrid}>
          {assessmentOrder.map((assessment) => (
            <AssessmentCard
              key={assessment.key}
              title={assessment.title}
              score={assessment.data.score}
              percentage={assessment.data.percentage}
              description={
                assessmentDescriptions[
                  assessment.key as keyof typeof assessmentDescriptions
                ]
              }
              onInfoClick={(e) => handleInfoClick(assessment.key, e)}
            />
          ))}
        </div>

        {/* Info Dialog */}
        {activeDialog && activeAssessment && activeRiskData && (
          <InfoDialog
            isOpen={true}
            onClose={closeDialog}
            title={activeAssessment.title}
            riskLevel={activeRiskData.level}
            riskColor={activeRiskData.color}
            description={
              assessmentDescriptions[
                activeDialog as keyof typeof assessmentDescriptions
              ]
            }
            position={dialogPosition}
          />
        )}
        {showShareDialog && (
          <ShareDialog
            onClose={() => setShowShareDialog(false)}
            position={shareDialogPosition}
          />
        )}

        {/* Bottom Section */}
        <div className={styles.bottomSection}>
          {/* Left - DISC Assessment */}
          <div className={styles.discAssessment}>
            <h3 className={styles.sectionTitle}>DISC ASSESSMENT</h3>
            <div className={styles.discChartContainer}>
              <div className={styles.pieChartWrapper}>
                <DiscPieChart data={discAssessment} />
              </div>
              <div className={styles.chartLegend}>
                {[
                  { label: "Dominance", value: 10, color: "#FF8D58" },
                  { label: "Influence", value: 18, color: "#FACC15" },
                  { label: "Steadiness", value: 28, color: "#37BD80" },
                  { label: "Conscientiousness", value: 50, color: "#5B8DEF" },
                ].map((item, index) => (
                  <div key={index} className={styles.legendItem}>
                    <span
                      className={styles.legendColor}
                      style={{ background: item.color }}
                    />
                    <span>{item.label}</span>
                    <span className={styles.percentage}>{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.discDescriptors}>
              <div className={styles.discDescriptorCard}>
                <span className={styles.descriptorLabel}>Match Strength:</span>
                <span className={styles.descriptorValue}>
                  {discAssessment.matchStrength}%
                </span>
              </div>
              <div className={styles.discDescriptorCard}>
                <span className={styles.descriptorLabel}>Strengths:</span>
                <span className={styles.descriptorText}>
                  {discAssessment.strengths}
                </span>
              </div>
              <div className={styles.discDescriptorCard}>
                <span className={styles.descriptorLabel}>Watchouts:</span>
                <span className={styles.descriptorText}>
                  {discAssessment.watchouts}
                </span>
              </div>
            </div>
          </div>

          {/* Right - Flagged Contents */}
          <div className={styles.flaggedContents}>
            <h3 className={styles.sectionTitle}>FLAGGED CONTENTS</h3>
            {flaggedContent.map((item, index) => (
              <div key={index} className={styles.flaggedItem}>
                <p>{item.text}</p>
                <div className={styles.flaggedMeta}>
                  <div className={styles.flaggedTagsContainer}>
                    {item.labels.map((label, tagIndex) => (
                      <span key={tagIndex} className={styles.flaggedTag}>
                        {label}
                      </span>
                    ))}
                  </div>
                  <div className={styles.flaggedDateSource}>
                    <span className={styles.flaggedDate}>{item.date}</span>
                    {/* Assuming source is a string, make it a clickable placeholder link */}
                    <span className={styles.flaggedSourcespan}> Source:</span>

                    <a href="#" className={styles.flaggedSourceLink}>
                      {item.source}
                    </a>
                  </div>
                </div>
              </div>
            ))}
            <button className={styles.moreFlaggedContentBtn}>
              More flagged content
            </button>
          </div>
        </div>

        {/* Additional Sections */}
        <div className={styles.additionalSections}>
          <div className={styles.positiveMinds}>
            <h3 className={styles.sectionTitle}>POSITIVE MINDS</h3>
            <div className={styles.positiveItemsContainer}>
              {positiveMentions.map((mention, index) => (
                <div key={index} className={styles.mindItem}>
                  {getPositiveIcon(index)}
                  <div className={styles.mindContent}>
                    <span className={styles.mindType}>
                      {positiveTraits[index] || "Positive Trait"}
                    </span>
                    <span className={styles.mindDesc}>{mention}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.educationProfession}>
            <h3 className={styles.sectionTitle}>EDUCATION AND PROFESSION</h3>
            <div className={styles.educationItemsContainer}>
              {educationAndProfession.map((item, index) => (
                <div key={index} className={styles.eduItem}>
                  {getEducationIcon(index)}
                  <div className={styles.eduContent}>
                    <span
                      className={styles.eduRole}
                      style={
                        item.title.includes("Graphic Designer at DDC")
                          ? { color: "#002F6C" }
                          : {}
                      }
                    >
                      {item.title}
                    </span>
                    <span className={styles.eduTimeline}>{item.years}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Analytic Insights Section */}
        <div className={styles.analyticInsights}>
          <h3 className={styles.analyticsTitle}>ANALYTIC INSIGHTS</h3>
          <div className={styles.divider} />
          <div className={styles.insightsGrid}>
            <div className={styles.analyticsRow}>
              <span className={styles.label}>Personality Tone:</span>
              <span className={styles.value}>
                {analyticSummary.personalityTraits.join(", ")}
              </span>
            </div>
            <div className={styles.analyticsRow}>
              <span className={styles.label}>Political Lean:</span>
              <span className={styles.value}>
                {analyticSummary.politicalLean}
              </span>
            </div>
            <div className={styles.analyticsRow}>
              <span className={styles.label}>Network Cluster:</span>
              <span className={styles.value}>
                {analyticSummary.networkCluster}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
