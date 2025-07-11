"use client";

import { useEffect } from "react";
import styles from "./searchbar.module.css";

export default function SearchBar() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearchClick = () => {};

  return (
    <div className={styles.searchContainer} onClick={handleSearchClick}>
      <img
        src="/b2b/sidebar/search.svg"
        alt="Search"
        className={styles.searchIcon}
      />
      <span className={styles.searchText}>Search</span>
      <div className={styles.shortcut}>
        <span>⌘</span>
        <span>K</span>
      </div>
    </div>
  );
}
