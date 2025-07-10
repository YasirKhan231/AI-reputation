"use client";

import { useEffect } from "react";
import styles from "./searchbar.module.css";

export default function SearchBar() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        alert("Search button press");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearchClick = () => {
    alert("Search button press");
  };

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
