"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Sidebar from "@/components/sidebar";
import TableWithMenu, {
  type TableColumn,
  type TableAction,
} from "../../../../components/common/tablewithMenu";
import {
  consentDetailData,
  getConsentStats,
  type ConsentDetailData,
} from "../../../../data/consentDetailData";
import styles from "./consentDetail.module.css";

export default function ConsentDetail() {
  const params = useParams();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeFilter, setActiveFilter] = useState<
    "All" | "Pending" | "Consented" | "Declined"
  >("All");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;
  const stats = getConsentStats();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Convert URL slug back to title
  const getPageTitle = (slug: string) => {
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const pageTitle = params.id
    ? getPageTitle(params.id as string)
    : "Campaign Details";

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (
    filter: "All" | "Pending" | "Consented" | "Declined"
  ) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const statCards = [
    {
      title: "Total Profiles",
      value: stats.totalProfiles.toLocaleString(),
      icon: "/b2b/consent-Tracking/detail/total-profiles.svg",
    },
    {
      title: "Consented",
      value: stats.consented.toLocaleString(),
      icon: "/b2b/consent-Tracking/detail/consented.png",
    },
    {
      title: "Pending",
      value: stats.pending.toString(),
      icon: "/b2b/consent-Tracking/detail/pending.svg",
    },
    {
      title: "Declined",
      value: stats.declined.toString(),
      icon: "/b2b/consent-Tracking/detail/declined.png",
    },
  ];

  const tableColumns: TableColumn[] = [
    { key: "name", label: "NAME", width: "25%" },
    { key: "uploadDate", label: "UPLOAD DATE", width: "15%" },
    { key: "riskLevel", label: "RISK LEVEL", width: "15%" },
    { key: "status", label: "STATUS", width: "15%" },
    { key: "responseDate", label: "RESPONSE DATE", width: "15%" },
  ];

  const tableActions: TableAction[] = [
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
            {/* <div className={styles.nameEmail}>{item.email}</div> */}
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

  return (
    <div className={styles.consentDetailContainer}>
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      <div
        className={`${styles.mainContent} ${
          sidebarCollapsed ? styles.expanded : ""
        }`}
      >
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/b2b/consent-Tracking" className={styles.breadcrumbLink}>
            CONSENT TRACKING
          </Link>
          <span className={styles.breadcrumbSeparator}>&gt;</span>
          <span className={styles.breadcrumbCurrent}>
            {pageTitle.toUpperCase()}
          </span>
        </div>

        {/* Page Title */}
        <div className={styles.pageHeader}>
          <h1>{pageTitle.toUpperCase()}</h1>
        </div>

        {/* Stat Cards */}
        <div className={styles.statCards}>
          {statCards.map((card, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statIcon}>
                <img src={card.icon || "/placeholder.svg"} alt={card.title} />
              </div>
              <div className={styles.statContent}>
                <div className={styles.statTitle}>{card.title}</div>
                <div className={styles.statValue}>{card.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
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

        {/* Table */}
        <TableWithMenu
          data={paginatedData}
          columns={tableColumns}
          actions={tableActions}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          renderCell={renderCell}
        />
      </div>
    </div>
  );
}
