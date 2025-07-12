"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar";
import TableWithMenu, {
  type TableColumn,
  type TableAction,
} from "../../../components/common/tablewithMenu";
import IndividualSearchQuestions from "@/components/individual-search-questions/page";
import styles from "./individual-search.module.css";
import {
  consentDetailData,
  getConsentStats,
  type ConsentDetailData,
} from "../../../data/consentDetailData";

export default function IndividualSearch() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showQuestions, setShowQuestions] = useState(false);
  const [activeFilter, setActiveFilter] = useState<
    "All" | "Pending" | "Consented" | "Declined"
  >("All");

  const itemsPerPage = 8;
  const stats = getConsentStats();

  // Filter data based on active filter
  const filteredData = consentDetailData.filter((item) => {
    if (activeFilter === "All") return true;
    return item.status === activeFilter;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log("Starting search for:", searchQuery);
      setShowQuestions(true);
    } else {
      alert("Please enter a search query");
    }
  };

  const handleObserverAI = () => {
    console.log("Observer AI clicked");
  };

  const handleQuestionsComplete = (data: any) => {
    console.log("Questions completed with data:", data);
    setShowQuestions(false);
    alert("Background check completed successfully!");
  };

  const handleBackToSearch = () => {
    setShowQuestions(false);
  };

  const handleFilterChange = (
    filter: "All" | "Pending" | "Consented" | "Declined"
  ) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const getFilterCount = (filter: string) => {
    switch (filter) {
      case "All":
        return stats.all;
      case "Pending":
        return stats.pendingCount;
      case "Consented":
        return stats.consentedCount;
      case "Declined":
        return stats.declinedCount;
      default:
        return 0;
    }
  };

  const columns: TableColumn[] = [
    { key: "name", label: "NAME", width: "25%" },
    { key: "uploadDate", label: "UPLOAD DATE", width: "15%" },
    { key: "riskLevel", label: "RISK LEVEL", width: "15%" },
    { key: "status", label: "STATUS", width: "15%" },
    { key: "responseDate", label: "RESPONSE DATE", width: "15%" },
  ];

  const actions: TableAction[] = [
    {
      label: "View",
      icon: "/b2b/consent-Tracking/detail/eye.svg",
      onClick: (item) => console.log("View", item),
    },
    {
      label: "Delete",
      icon: "/b2b/consent-Tracking/detail/trash.svg",
      onClick: (item) => console.log("Delete", item),
    },
  ];

  const renderCell = (item: ConsentDetailData, column: TableColumn) => {
    switch (column.key) {
      case "name":
        return (
          <div className={styles.nameCell}>
            <div className={styles.nameMain}>{item.name}</div>
            <div className={styles.nameRole}>{item.role}</div>
          </div>
        );
      case "uploadDate":
        return <span className={styles.dateCell}>{item.uploadDate}</span>;
      case "riskLevel":
        return (
          <span
            className={`${styles.riskTag} ${
              styles[item.riskLevel.toLowerCase()]
            }`}
          >
            {item.riskLevel}
          </span>
        );
      case "status":
        return (
          <span
            className={`${styles.statusBadge} ${
              styles[item.status.toLowerCase()]
            }`}
          >
            {item.status}
          </span>
        );
      case "responseDate":
        return (
          <span className={styles.dateCell}>{item.responseDate || "—"}</span>
        );
      default:
        return null;
    }
  };

  if (showQuestions) {
    return (
      <div className={styles.pageContainer}>
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <div
          className={`${styles.questionsContainer} ${
            sidebarCollapsed ? styles.collapsed : ""
          }`}
        >
          <IndividualSearchQuestions
            searchQuery={searchQuery}
            onComplete={handleQuestionsComplete}
            onBack={handleBackToSearch}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div
        className={`${styles.individualSearchContainer} ${
          sidebarCollapsed ? styles.collapsed : ""
        }`}
      >
        <div className={styles.content}>
          <div className={styles.headerSection}>
            <h1 className={styles.mainHeading}>
              Run a Background Check on{" "}
              <span className={styles.highlightText}>One Person</span>
            </h1>
            <p className={styles.description}>
              Get transparent, AI-synthesized reports from public data — no
              guessing, no stalking, just signal.
            </p>
          </div>

          <div className={styles.searchContainer}>
            <div className={styles.searchInnerContainer}>
              <div className={styles.searchHeader}>
                <span className={styles.searchLabel}>
                  Search by Name, Email, Social
                </span>
              </div>
              <div className={styles.searchInputWrapper}>
                <input
                  type="text"
                  placeholder="Search by Name, Email, Social"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
                <div className={styles.searchButtons}>
                  <button
                    className={styles.observerAIButton}
                    onClick={handleObserverAI}
                  >
                    observer ai
                  </button>
                  <button
                    className={styles.searchButton}
                    onClick={handleSearch}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "7px",
                      }}
                    >
                      <img
                        src="/b2b/search-individual/stars.svg"
                        alt="star"
                        className={styles.icon}
                      />
                      Search
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.filterTabs}>
            {(["All", "Pending", "Consented", "Declined"] as const).map(
              (filter) => (
                <button
                  key={filter}
                  className={`${styles.filterTab} ${
                    activeFilter === filter ? styles.active : ""
                  }`}
                  onClick={() => handleFilterChange(filter)}
                >
                  {filter}
                  <span className={styles.filterCount}>
                    {getFilterCount(filter)}
                  </span>
                </button>
              )
            )}
          </div>

          <div className={styles.tableSection}>
            <TableWithMenu
              data={paginatedData}
              columns={columns}
              actions={actions}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              renderCell={renderCell}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
