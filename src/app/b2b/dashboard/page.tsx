"use client";
import React, { useState, useRef } from "react";
import Sidebar from "@/components/sidebar";
import styles from "./dashboard.module.css";

// Mock data for benefits
const benefitsData = [
  {
    icon: "/b2b/dashboard/profiles.svg",
    text: "Analyze up to 500 profiles at once with a single upload",
  },
  {
    icon: "/b2b/dashboard/search.svg",
    text: "Comprehensive multi-platform analysis",
  },
  {
    icon: "/b2b/dashboard/download.svg",
    text: "Instant downloadable reports",
  },
];

// Mock data for metrics
const metricsData = [
  {
    leftIcon: "/b2b/dashboard/totalprofile1.svg",
    label: "TOTAL REPORTS",
    value: "520",
    rightIcon: "/b2b/dashboard/totalprofile2.svg",
  },
  {
    leftIcon: "/b2b/dashboard/profileanalyse1.svg",
    label: "PROFILE ANALYZED",
    value: "6,890",
    rightIcon: "/b2b/dashboard/profileanalyse2.svg",
  },
  {
    leftIcon: "/b2b/dashboard/highrisk1.svg",
    label: "HIGH RISK FOUND",
    value: "520",
    rightIcon: "/b2b/dashboard/highrisk2.svg",
  },
];

// Data for bar chart
const barChartData = [
  { month: "JAN", low: 80, moderate: 60, high: 25 },
  { month: "FEB", low: 75, moderate: 30, high: 25 },
  { month: "MAR", low: 65, moderate: 90, high: 25 },
  { month: "APR", low: 55, moderate: 30, high: 75 },
];

// Pie chart data with percentages
const pieChartData = [
  {
    type: "low",
    label: "LOW RISK",
    value: 3650,
    percentage: 52,
    color: "#37BD80",
  },
  {
    type: "moderate",
    label: "MODERATE RISK",
    value: 2520,
    percentage: 30,
    color: "#E5C02A",
  },
  {
    type: "high",
    label: "HIGH RISK",
    value: 521,
    percentage: 18,
    color: "#E2723E",
  },
];

export default function Dashboard() {
  const [selectedRisk, setSelectedRisk] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [hoveredBar, setHoveredBar] = useState<{
    month: string;
    type: string;
    value: number;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      alert("✅ File uploaded successfully!");
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRiskClick = (riskType: string) => {
    setSelectedRisk(selectedRisk === riskType ? null : riskType);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleBarHover = (month: string, type: string, value: number) => {
    setHoveredBar({ month, type, value });
  };

  const handleBarLeave = () => {
    setHoveredBar(null);
  };

  // Pie chart calculations
  const radius = 80;
  const strokeWidth = 40;
  const circumference = 2 * Math.PI * radius;
  const gapAngle = 2; // degrees between segments
  const gapLength = (gapAngle / 360) * circumference;

  let currentOffset = 0;
  const pieSegments = pieChartData.map((item) => {
    const segmentLength = (item.percentage / 100) * circumference;
    const dashLength = segmentLength - gapLength;
    const dashArray = `${dashLength} ${circumference - dashLength}`;
    const offset = -currentOffset;

    currentOffset += segmentLength;

    return (
      <circle
        key={item.type}
        cx="100"
        cy="100"
        r={radius}
        fill="none"
        stroke={item.color}
        strokeWidth={strokeWidth}
        strokeDasharray={dashArray}
        strokeDashoffset={offset}
      />
    );
  });

  const totalProfiles = pieChartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      <div
        className={`${styles.mainContent} ${
          sidebarCollapsed ? styles.collapsed : ""
        }`}
      >
        {/* Dashboard Header */}
        <div className={styles.dashboardHeader}>
          <h1 className={styles.dashboardTitle}>Dashboard</h1>
        </div>

        {/* Metrics Grid */}
        <div className={styles.metricsGrid}>
          {metricsData.map((metric, index) => (
            <div key={index} className={styles.metricCard}>
              <div className={styles.metricLeft}>
                <div className={styles.metricTopIcon}>
                  <img src={metric.leftIcon} alt={metric.label} />
                </div>
                <div className={styles.metricLabel}>{metric.label}</div>
                <div className={styles.metricValue}>{metric.value}</div>
              </div>
              <div className={styles.metricRightIcon}>
                <img src={metric.rightIcon} alt="" />
              </div>
            </div>
          ))}
        </div>

        {/* Upload Section */}
        <div className={styles.uploadSection}>
          <div className={styles.uploadContent}>
            <div className={styles.iconCircle}>
              <img src="/b2b/sidebar/uploadcsv1.svg" alt="Upload CSV" />
            </div>
            <h2 className={styles.uploadTitle}>Upload CSV File</h2>
            <p className={styles.uploadDescription}>
              Upload or drag and drop a CSV file to generate reports on multiple
              people
            </p>
            <button className={styles.uploadButton} onClick={handleUploadClick}>
              Upload File
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className={styles.hiddenInput}
            />
          </div>

          <div
            className={`${styles.benefitsContainer} ${
              sidebarCollapsed ? styles.collapsedBenefits : ""
            }`}
          >
            <h3 className={styles.benefitsTitle}>What you will Get</h3>
            <ul className={styles.benefitsList}>
              {benefitsData.map((benefit, index) => (
                <li key={index} className={styles.benefitItem}>
                  <div className={styles.benefitIcon}>
                    <img src={benefit.icon} alt={`Benefit ${index + 1}`} />
                  </div>
                  <span className={styles.benefitText}>{benefit.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Charts Section */}
        <div className={styles.chartsSection}>
          {/* Pie Chart Section */}
          <div className={styles.pieChartContainer}>
            <h3 className={styles.chartTitle}>Monthly Risk Distribution</h3>
            <div className={styles.pieChartWrapper}>
              <div className={styles.pieChart}>
                <svg viewBox="0 0 200 200">
                  {/* Background circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="none"
                    stroke="#F3F4F6"
                    strokeWidth={strokeWidth}
                  />
                  {/* Segments */}
                  {pieSegments}
                </svg>
                <div className={styles.pieChartCenter}>
                  <div className={styles.pieChartTotal}>
                    {totalProfiles.toLocaleString()}
                  </div>
                  <div className={styles.pieChartLabel}>TOTAL</div>
                </div>
              </div>
              <div className={styles.pieChartLegend}>
                {pieChartData.map((item) => (
                  <div
                    key={item.type}
                    className={`${styles.legendItem} ${
                      selectedRisk === item.type ? styles.selected : ""
                    }`}
                    onClick={() => handleRiskClick(item.type)}
                  >
                    <div
                      className={styles.legendColor}
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className={styles.legendLabel}>{item.label}</span>
                    <span className={styles.legendValue}>
                      {item.value.toLocaleString()}
                    </span>
                    <span className={styles.legendPercentage}>
                      {item.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bar Chart Section */}
          <div className={styles.barChartContainer}>
            <h3 className={styles.chartTitle}>Monthly Risk Trend</h3>
            <p className={styles.chartSubtitle}>
              Risk level trends over the past 4 months
            </p>
            <div className={styles.barChartWrapper}>
              <div className={styles.yAxis}>
                <span>1000</span>
                <span>800</span>
                <span>600</span>
                <span>400</span>
                <span>200</span>
                <span>0</span>
              </div>
              <div className={styles.barsContainer}>
                {barChartData.map((monthData, index) => (
                  <div key={index} className={styles.monthGroup}>
                    <div className={styles.bars}>
                      <div
                        className={`${styles.bar} ${styles.lowRisk}`}
                        style={{ height: `${monthData.low}%` }}
                        onMouseEnter={() =>
                          handleBarHover(
                            monthData.month,
                            "LOW RISK",
                            Math.round((1000 * monthData.low) / 100)
                          )
                        }
                        onMouseLeave={handleBarLeave}
                      >
                        {hoveredBar?.month === monthData.month &&
                          hoveredBar?.type === "LOW RISK" && (
                            <div className={styles.barTooltip}>
                              {hoveredBar.value}
                            </div>
                          )}
                      </div>
                      <div
                        className={`${styles.bar} ${styles.moderateRisk}`}
                        style={{ height: `${monthData.moderate}%` }}
                        onMouseEnter={() =>
                          handleBarHover(
                            monthData.month,
                            "MODERATE RISK",
                            Math.round((1000 * monthData.moderate) / 100)
                          )
                        }
                        onMouseLeave={handleBarLeave}
                      >
                        {hoveredBar?.month === monthData.month &&
                          hoveredBar?.type === "MODERATE RISK" && (
                            <div className={styles.barTooltip}>
                              {hoveredBar.value}
                            </div>
                          )}
                      </div>
                      <div
                        className={`${styles.bar} ${styles.highRisk}`}
                        style={{ height: `${monthData.high}%` }}
                        onMouseEnter={() =>
                          handleBarHover(
                            monthData.month,
                            "HIGH RISK",
                            Math.round((1000 * monthData.high) / 100)
                          )
                        }
                        onMouseLeave={handleBarLeave}
                      >
                        {hoveredBar?.month === monthData.month &&
                          hoveredBar?.type === "HIGH RISK" && (
                            <div className={styles.barTooltip}>
                              {hoveredBar.value}
                            </div>
                          )}
                      </div>
                    </div>
                    <span className={styles.monthLabel}>{monthData.month}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.barChartLegend}>
              <div className={styles.legendItem}>
                <div
                  className={`${styles.legendColor} ${styles.lowRisk}`}
                ></div>
                <span className={styles.legendText}>LOW RISK</span>
              </div>
              <div className={styles.legendItem}>
                <div
                  className={`${styles.legendColor} ${styles.moderateRisk}`}
                ></div>
                <span className={styles.legendText}>MODERATE RISK</span>
              </div>
              <div className={styles.legendItem}>
                <div
                  className={`${styles.legendColor} ${styles.highRisk}`}
                ></div>
                <span className={styles.legendText}>HIGH RISK</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
