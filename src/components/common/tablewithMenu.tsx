"use client";

import type React from "react";

import { useState } from "react";
import styles from "./tablewithMenu.module.css";

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
}

export interface TableAction {
  label: string;
  icon?: string;
  onClick: (item: any) => void;
}

interface TableWithMenuProps {
  data: any[];
  columns: TableColumn[];
  actions: TableAction[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  renderCell: (item: any, column: TableColumn) => React.ReactNode;
}

export default function TableWithMenu({
  data,
  columns,
  actions,
  currentPage,
  totalPages,
  onPageChange,
  renderCell,
}: TableWithMenuProps) {
  const [activeActionMenu, setActiveActionMenu] = useState<number | null>(null);

  const handleActionClick = (itemId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setActiveActionMenu(activeActionMenu === itemId ? null : itemId);
  };

  const handleAction = (action: TableAction, item: any) => {
    action.onClick(item);
    setActiveActionMenu(null);
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

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key} style={{ width: column.width }}>
                  {column.label}
                </th>
              ))}
              <th style={{ width: "60px" }}></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                {columns.map((column) => (
                  <td key={column.key}>{renderCell(item, column)}</td>
                ))}
                <td className={styles.actionCell}>
                  <button
                    className={styles.actionButton}
                    onClick={(e) => handleActionClick(item.id, e)}
                  >
                    ⋮
                  </button>
                  {activeActionMenu === item.id && (
                    <div className={styles.actionMenu}>
                      {actions.map((action, index) => (
                        <button
                          key={index}
                          className={styles.actionMenuItem}
                          onClick={() => handleAction(action, item)}
                        >
                          {action.icon && (
                            <img
                              src={action.icon || "/placeholder.svg"}
                              alt={action.label}
                            />
                          )}
                          {action.label}
                        </button>
                      ))}
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
          className={`${styles.paginationButton} ${
            currentPage === 1 ? styles.disabled : ""
          }`}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <img
            src="/b2b/consent-Tracking/detail/left-arrow.svg"
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
              onClick={() => onPageChange(pageNum)}
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
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          Next
          <img
            src="/b2b/consent-Tracking/detail/right-arrow.svg"
            alt="Next"
            className={styles.paginationIcon}
          />
        </button>
      </div>
    </div>
  );
}
