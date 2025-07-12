"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/sidebar";
import { consentData } from "../../../data/consentdata";
import styles from "./consent-Tracking.module.css";

export default function ConsentTracking() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(consentData.length / itemsPerPage);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const filteredData = consentData.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  // Convert title to URL slug
  const titleToSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  return (
    <div className={styles.consentContainer}>
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      <div
        className={`${styles.mainContent} ${
          sidebarCollapsed ? styles.collapsed : ""
        }`}
      >
        <div className={styles.pageHeader}>
          <h1>Consent Tracking</h1>
        </div>

        {/* Search and Filter Section */}
        <div className={styles.searchFilterSection}>
          <div className={styles.searchContainer}>
            <img
              src="/b2b/consent-Tracking/search.svg"
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
            <img
              src="/b2b/consent-Tracking/filter-lines.svg"
              alt="Filter"
              className={styles.filterIconLeft}
            />
            <select
              className={styles.filterSelect}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
            </select>
            <img
              src="/b2b/consent-Tracking/dropdown.svg"
              alt="Dropdown"
              className={styles.filterIconRight}
            />
          </div>
        </div>

        {/* Consent Cards */}
        <div className={styles.consentCards}>
          {paginatedData.map((item) => (
            <Link
              key={item.id}
              href={`/b2b/consent-Tracking/${titleToSlug(item.title)}`}
              className={styles.consentCardLink}
            >
              <div className={styles.consentCard}>
                <div className={styles.cardLeft}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDate}>{item.date}</p>
                </div>

                <div className={styles.cardRight}>
                  <div className={styles.statusPills}>
                    <div className={styles.statusPill}>
                      <img
                        src="/b2b/consent-Tracking/profiles.svg"
                        alt="Profiles"
                        className={styles.pillIcon}
                      />
                      <span className={styles.pillText}>
                        {item.profiles} Profiles
                      </span>
                    </div>
                    <div className={styles.statusPill}>
                      <img
                        src="/b2b/consent-Tracking/consented.svg"
                        alt="Consented"
                        className={styles.pillIcon}
                      />
                      <span className={styles.pillText}>
                        {item.consented} Consented
                      </span>
                    </div>
                    <div className={styles.statusPill}>
                      <img
                        src="/b2b/consent-Tracking/declined.svg"
                        alt="Declined"
                        className={styles.pillIcon}
                      />
                      <span className={styles.pillText}>
                        {item.declined} Declined
                      </span>
                    </div>
                    <div className={styles.statusPill}>
                      <img
                        src="/b2b/consent-Tracking/in-progress.svg"
                        alt="In Progress"
                        className={styles.pillIcon}
                      />
                      <span className={styles.pillText}>
                        {item.inProgress} In Progress
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <button
            className={`${styles.paginationButton} ${
              currentPage === 1 ? styles.disabled : ""
            }`}
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <img
              src="/b2b/consent-Tracking/left-arrow.svg"
              alt="Previous"
              className={styles.paginationIcon}
            />
            Previous
          </button>

          <div className={styles.pageNumbers}>
            {getPageNumbers().map((pageNum) => (
              <button
                key={pageNum}
                className={`${styles.pageNumber} ${
                  currentPage === pageNum ? styles.active : ""
                }`}
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </button>
            ))}
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <span className={styles.ellipsis}>...</span>
            )}
          </div>

          <button
            className={`${styles.paginationButton} ${
              currentPage === totalPages ? styles.disabled : ""
            }`}
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
          >
            Next
            <img
              src="/b2b/consent-Tracking/right-arrow.svg"
              alt="Next"
              className={styles.paginationIcon}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
