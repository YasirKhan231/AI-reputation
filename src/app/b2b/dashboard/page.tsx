"use client";

import type React from "react";
import { useState } from "react";
import Sidebar from "@/components/sidebar";
import styles from "./dashboard.module.css";

export default function Dashboard() {
  const [selectedRisk, setSelectedRisk] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      alert("✅ File uploaded successfully!");
    }
  };

  const handleRiskClick = (riskType: string) => {
    setSelectedRisk(selectedRisk === riskType ? null : riskType);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      <div
        className={`${styles.mainContent} ${
          sidebarCollapsed ? styles.expanded : ""
        }`}
      >
        <div className={styles.dashboardHeader}>
          <h1>Dashboard</h1>
          <div className={styles.uploadCsvHeader}>
            <input
              type="file"
              id="csv-upload"
              accept=".csv"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
            <label htmlFor="csv-upload" className={styles.uploadCsvHeaderBtn}>
              Upload CSV
            </label>
          </div>
        </div>

        <div className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <div className={`${styles.metricIcon} ${styles.blue}`}>
              <span>📊</span>
            </div>
            <div className={styles.metricContent}>
              <div className={styles.metricLabel}>TOTAL REPORTS</div>
              <div className={styles.metricValue}>520</div>
              <div className={styles.metricChart}>
                <div
                  className={`${styles.miniChart} ${styles.blueChart}`}
                ></div>
              </div>
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={`${styles.metricIcon} ${styles.cyan}`}>
              <img src="/profile-analysed.svg" alt="Profile" />
            </div>
            <div className={styles.metricContent}>
              <div className={styles.metricLabel}>PROFILE ANALYZED</div>
              <div className={styles.metricValue}>6,890</div>
              <div className={styles.metricChart}>
                <div
                  className={`${styles.miniChart} ${styles.cyanChart}`}
                ></div>
              </div>
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={`${styles.metricIcon} ${styles.orange}`}>
              <span>⚠️</span>
            </div>
            <div className={styles.metricContent}>
              <div className={styles.metricLabel}>HIGH RISK FOUND</div>
              <div className={styles.metricValue}>520</div>
              <div className={styles.metricChart}>
                <div
                  className={`${styles.miniChart} ${styles.orangeChart}`}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.uploadSection}>
          <div className={styles.uploadContainer}>
            <div className={styles.uploadIcon}>
              <span>📤</span>
            </div>
            <h3>Upload CSV File</h3>
            <p>
              Upload or drag and drop a CSV file to generate reports on multiple
              people
            </p>
            <div className={styles.uploadFileSection}>
              <input
                type="file"
                id="main-csv-upload"
                accept=".csv"
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
              <label htmlFor="main-csv-upload" className={styles.uploadFileBtn}>
                Upload File
              </label>
            </div>
          </div>

          <div className={styles.benefitsSection}>
            <h4>What you will Get</h4>
            <div className={styles.benefitItem}>
              <span className={styles.checkIcon}>✅</span>
              <span>
                Analyze up to 500 profiles at once with a single upload
              </span>
            </div>
            <div className={styles.benefitItem}>
              <span className={styles.checkIcon}>✅</span>
              <span>Comprehensive multi-platform analysis</span>
            </div>
            <div className={styles.benefitItem}>
              <span className={styles.checkIcon}>✅</span>
              <span>Instant downloadable reports</span>
            </div>
          </div>
        </div>

        <div className={styles.chartsSection}>
          <div className={styles.chartContainer}>
            <div className={styles.chartHeader}>
              <h3>Monthly Risk Distribution</h3>
            </div>
            <div className={styles.donutChart}>
              <div className={styles.chartCircle}>
                <svg viewBox="0 0 200 200">
                  <circle
                    className={styles.circleBg}
                    cx="100"
                    cy="100"
                    r="80"
                  />
                  <circle
                    className={`${styles.circleProgress} ${styles.circleLow}`}
                    cx="100"
                    cy="100"
                    r="80"
                    strokeDasharray={`${52 * 4.6} ${15} ${
                      (100 - 52) * 4.6 - 15
                    } 502`}
                    strokeDashoffset="0"
                  />
                  <circle
                    className={`${styles.circleProgress} ${styles.circleModerate}`}
                    cx="100"
                    cy="100"
                    r="80"
                    strokeDasharray={`${30 * 4.6} ${15} ${
                      (100 - 30) * 4.6 - 15
                    } 502`}
                    strokeDashoffset={`-${52 * 4.6 + 15}`}
                  />
                  <circle
                    className={`${styles.circleProgress} ${styles.circleHigh}`}
                    cx="100"
                    cy="100"
                    r="80"
                    strokeDasharray={`${18 * 4.6} ${15} ${
                      (100 - 18) * 4.6 - 15
                    } 502`}
                    strokeDashoffset={`-${(52 + 30) * 4.6 + 30}`}
                  />
                </svg>
                <div className={styles.chartCenter}>
                  <div className={styles.totalNumber}>6,890</div>
                  <div className={styles.totalLabel}>TOTAL</div>
                </div>
              </div>
              <div className={styles.chartLegend}>
                <button
                  className={`${styles.riskButton} ${styles.lowRisk} ${
                    selectedRisk === "low" ? styles.selected : ""
                  }`}
                  onClick={() => handleRiskClick("low")}
                >
                  <div
                    className={`${styles.legendColor} ${styles.green}`}
                  ></div>
                  <span className={styles.legendLabel}>LOW RISK</span>
                  <span className={styles.legendValue}>3,650</span>
                  <span className={styles.legendPercent}>52%</span>
                </button>
                <button
                  className={`${styles.riskButton} ${styles.moderateRisk} ${
                    selectedRisk === "moderate" ? styles.selected : ""
                  }`}
                  onClick={() => handleRiskClick("moderate")}
                >
                  <div
                    className={`${styles.legendColor} ${styles.yellow}`}
                  ></div>
                  <span className={styles.legendLabel}>MODERATE RISK</span>
                  <span className={styles.legendValue}>2,520</span>
                  <span className={styles.legendPercent}>30%</span>
                </button>
                <button
                  className={`${styles.riskButton} ${styles.highRisk} ${
                    selectedRisk === "high" ? styles.selected : ""
                  }`}
                  onClick={() => handleRiskClick("high")}
                >
                  <div
                    className={`${styles.legendColor} ${styles.orange}`}
                  ></div>
                  <span className={styles.legendLabel}>HIGH RISK</span>
                  <span className={styles.legendValue}>521</span>
                  <span className={styles.legendPercent}>18%</span>
                </button>
              </div>
            </div>
          </div>

          <div className={styles.chartContainer}>
            <div className={styles.chartHeader}>
              <h3>Monthly Risk Trend</h3>
              <p>Risk level trends over the past 4 months</p>
            </div>
            <div className={styles.barChart}>
              <div className={styles.chartYAxis}>
                <span>1000</span>
                <span>800</span>
                <span>600</span>
                <span>400</span>
                <span>200</span>
                <span>0</span>
              </div>
              <div className={styles.chartBars}>
                <div className={styles.monthGroup}>
                  <div className={styles.bars}>
                    <div
                      className={`${styles.bar} ${styles.green}`}
                      style={{ height: "80%" }}
                    ></div>
                    <div
                      className={`${styles.bar} ${styles.yellow}`}
                      style={{ height: "60%" }}
                    ></div>
                    <div
                      className={`${styles.bar} ${styles.orange}`}
                      style={{ height: "25%" }}
                    ></div>
                  </div>
                  <span className={styles.monthLabel}>JAN</span>
                </div>
                <div className={styles.monthGroup}>
                  <div className={styles.bars}>
                    <div
                      className={`${styles.bar} ${styles.green}`}
                      style={{ height: "75%" }}
                    ></div>
                    <div
                      className={`${styles.bar} ${styles.yellow}`}
                      style={{ height: "30%" }}
                    ></div>
                    <div
                      className={`${styles.bar} ${styles.orange}`}
                      style={{ height: "25%" }}
                    ></div>
                  </div>
                  <span className={styles.monthLabel}>FEB</span>
                </div>
                <div className={styles.monthGroup}>
                  <div className={styles.bars}>
                    <div
                      className={`${styles.bar} ${styles.green}`}
                      style={{ height: "65%" }}
                    ></div>
                    <div
                      className={`${styles.bar} ${styles.yellow}`}
                      style={{ height: "90%" }}
                    ></div>
                    <div
                      className={`${styles.bar} ${styles.orange}`}
                      style={{ height: "25%" }}
                    ></div>
                  </div>
                  <span className={styles.monthLabel}>MAR</span>
                </div>
                <div className={styles.monthGroup}>
                  <div className={styles.bars}>
                    <div
                      className={`${styles.bar} ${styles.green}`}
                      style={{ height: "55%" }}
                    ></div>
                    <div
                      className={`${styles.bar} ${styles.yellow}`}
                      style={{ height: "30%" }}
                    ></div>
                    <div
                      className={`${styles.bar} ${styles.orange}`}
                      style={{ height: "75%" }}
                    ></div>
                  </div>
                  <span className={styles.monthLabel}>APR</span>
                </div>
              </div>
              <div className={styles.chartLegendHorizontal}>
                <div className={styles.legendItem}>
                  <div
                    className={`${styles.legendColor} ${styles.green}`}
                  ></div>
                  <span>LOW RISK</span>
                </div>
                <div className={styles.legendItem}>
                  <div
                    className={`${styles.legendColor} ${styles.yellow}`}
                  ></div>
                  <span>MODERATE RISK</span>
                </div>
                <div className={styles.legendItem}>
                  <div
                    className={`${styles.legendColor} ${styles.orange}`}
                  ></div>
                  <span>HIGH RISK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
