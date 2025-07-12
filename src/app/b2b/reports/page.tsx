"use client";

import type React from "react";

import { useState } from "react";
import Sidebar from "@/components/sidebar";
import ProfileHeader from "@/components/profile/profileHeader";
import { reportData } from "@/data/reportData"; // Assuming you have a reportData file with the necessary data
import styles from "./reports.module.css";

export default function Reports() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeActionMenu, setActiveActionMenu] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState("All Reports");

  const itemsPerPage = 8;
  const totalPages = Math.ceil(reportData.length / itemsPerPage);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const filteredData = reportData.filter((report) =>
    report.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleActionClick = (reportId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setActiveActionMenu(activeActionMenu === reportId ? null : reportId);
  };

  const handleAction = (action: string, reportId: number) => {
    console.log(`${action} report ${reportId}`);
    setActiveActionMenu(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const summaryCards = [
    {
      title: "Total Reports",
      value: "520",
      icon: "/b2b/reports/total-report.svg",
    },
    {
      title: "Profile Analyzed",
      value: "6,890",
      icon: "/b2b/reports/profile-analyzed.svg",
    },
    {
      title: "High Risk Found",
      value: "45",
      icon: "/b2b/reports/high-risk.svg",
    },
    {
      title: "Processing",
      value: "3",
      icon: "/b2b/reports/processing.svg",
    },
  ];

  return (
    <div className={styles.reportsContainer}>
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      <div
        className={`${styles.mainContent} ${
          sidebarCollapsed ? styles.collapsed : ""
        }`}
      >
        <div className={styles.pageHeader}>
          <h1>Reports</h1>
        </div>

        {/* Summary Cards */}
        <div className={styles.summaryCards}>
          {summaryCards.map((card, index) => (
            <div key={index} className={styles.summaryCard}>
              <div className={styles.cardIcon}>
                <img src={card.icon || "/placeholder.svg"} alt={card.title} />
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardTitle}>{card.title}</div>
                <div className={styles.cardValue}>{card.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filter Section */}
        <div className={styles.searchFilterSection}>
          <div className={styles.searchContainer}>
            <img
              src="/b2b/reports/search.svg"
              alt="Search"
              className={styles.searchIcon}
            />
            <input
              type="text"
              placeholder="Search"
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className={styles.filterContainer}>
            <select
              className={styles.filterSelect}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All Reports">All Reports</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
            </select>
          </div>
        </div>

        {/* Reports Table */}
        <div className={styles.tableContainer}>
          <table className={styles.reportsTable}>
            <thead>
              <tr>
                <th>NAME</th>
                <th>UPLOAD DATE</th>
                <th>STATUS</th>
                <th>RISK FLAGS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((report) => (
                <tr key={report.id}>
                  <td className={styles.nameCell}>{report.name}</td>
                  <td className={styles.dateCell}>{report.date}</td>
                  <td>
                    <span
                      className={`${styles.statusPill} ${
                        styles[report.status.toLowerCase().replace(" ", "")]
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td>
                    <div
                      className={`${styles.riskFlag} ${
                        report.risk === 0 ? styles.riskLow : styles.riskHigh
                      }`}
                    >
                      {report.risk}
                    </div>
                  </td>
                  <td className={styles.actionCell}>
                    <button
                      className={styles.actionButton}
                      onClick={(e) => handleActionClick(report.id, e)}
                    >
                      ⋮
                    </button>
                    {activeActionMenu === report.id && (
                      <div className={styles.actionMenu}>
                        <button
                          className={styles.actionMenuItem}
                          onClick={() => handleAction("View", report.id)}
                        >
                          <img src="/b2b/reports/eye.svg" alt="View" />
                          View
                        </button>
                        <button
                          className={styles.actionMenuItem}
                          onClick={() => handleAction("Download", report.id)}
                        >
                          <img src="/b2b/reports/download.svg" alt="Download" />
                          Download
                        </button>
                        <button
                          className={styles.actionMenuItem}
                          onClick={() => handleAction("Delete", report.id)}
                        >
                          <img src="/b2b/reports/delete.svg" alt="Download" />{" "}
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <button
            className={styles.paginationButton}
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <img src="/b2b/reports/left-arrow.svg" alt="Download" />
            Previous
          </button>

          <div className={styles.pageNumbers}>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  className={`${styles.pageNumber} ${
                    currentPage === pageNum ? styles.active : ""
                  }`}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            {totalPages > 5 && <span className={styles.ellipsis}>...</span>}
          </div>

          <button
            className={styles.paginationButton}
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
