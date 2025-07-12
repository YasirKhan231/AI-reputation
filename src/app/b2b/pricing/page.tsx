"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar";
import styles from "./pricing.module.css";

export default function Pricing() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const pricingPlans = [
    {
      id: "growth",
      name: "Growth",
      subtitle: "For Small Businesses",
      price: "$499",
      term: "/month",
      icon: "/b2b/pricing/growth.svg",
      isCurrent: true,
      buttonText: "Current plan",
      buttonType: "current" as const,
    },
    {
      id: "scale",
      name: "Scale",
      subtitle: "For Medium Businesses",
      price: "$899",
      term: "/month",
      icon: "/b2b/pricing/scale.svg",
      isCurrent: false,
      buttonText: "Change Plan",
      buttonType: "change" as const,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      subtitle: "For Large Enterprises",
      price: "Custom",
      term: "",
      icon: "/b2b/pricing/enterprise.svg",
      isCurrent: false,
      buttonText: "Change Plan",
      buttonType: "change" as const,
      customPrice: true,
    },
  ];

  const featureComparison = [
    {
      feature: "Reports / Month",
      growth: "100",
      scale: "300",
      enterprise: "Unlimited",
    },
    {
      feature: "Users",
      growth: "2",
      scale: "5",
      enterprise: "Unlimited",
    },
    {
      feature: "CSV Upload",
      growth: "✓",
      scale: "✓",
      enterprise: "✓",
    },
    {
      feature: "Export",
      growth: "PDF",
      scale: "PDF, CSV",
      enterprise: "All",
    },
    {
      feature: "Support",
      growth: "Email",
      scale: "Priority",
      enterprise: "Dedicated CSM",
    },
  ];

  return (
    <div className={styles.pricingContainer}>
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      <div
        className={`${styles.mainContent} ${
          sidebarCollapsed ? styles.collapsed : ""
        }`}
      >
        <div className={styles.pageContent}>
          <h1 className={styles.pageTitle}>Billing & Subscription</h1>

          {/* Main Container */}
          <div className={styles.mainContainer}>
            {/* Left Column - Features */}
            <div className={styles.leftColumn}>
              <div className={styles.plansLabel}>PLANS</div>
              <div className={styles.featuresList}>
                {featureComparison.map((row, index) => (
                  <div key={index} className={styles.featureItem}>
                    {row.feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Vertical Divider */}
            <div className={styles.verticalDivider}></div>

            {/* Right Columns - Plans */}
            <div className={styles.plansContainer}>
              {pricingPlans.map((plan) => (
                <div key={plan.id} className={styles.planColumn}>
                  <div className={styles.planHeader}>
                    <div className={styles.planIcon}>
                      <img
                        src={plan.icon || "/placeholder.svg"}
                        alt={plan.name}
                      />
                    </div>
                    <div className={styles.planName}>{plan.name}</div>
                    <div className={styles.planSubtitle}>{plan.subtitle}</div>
                    <div
                      className={`${styles.planPrice} ${
                        plan.customPrice ? styles.customPrice : ""
                      }`}
                    >
                      <span className={styles.planPrice}>{plan.price}</span>
                      {plan.term && (
                        <span className={styles.planTerm}>{plan.term}</span>
                      )}
                    </div>
                    <button
                      className={`${styles.planButton} ${
                        styles[plan.buttonType]
                      }`}
                    >
                      {plan.buttonText}
                    </button>
                  </div>

                  <div className={styles.planFeatures}>
                    {featureComparison.map((row, index) => (
                      <div key={index} className={styles.planFeatureValue}>
                        {row[plan.id as keyof typeof row]}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
