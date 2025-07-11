"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./searchOverlay.module.css";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchSuggestion {
  id: string;
  title: string;
  date: string;
  category: "today" | "last30days" | "older";
}

const searchSuggestions: SearchSuggestion[] = [
  {
    id: "1",
    title: "UI UX Designer hiring 2025 Q1",
    date: "",
    category: "today",
  },
  {
    id: "2",
    title: "HR Hiring 2024 Q4",
    date: "OCT 11",
    category: "last30days",
  },
  {
    id: "3",
    title: "UI UX Designer hiring 2025 Q1",
    date: "OCT 8",
    category: "last30days",
  },
  {
    id: "4",
    title: "UGC Creators for Quran AI",
    date: "SEP 10",
    category: "last30days",
  },
  {
    id: "5",
    title: "TikToker Analysis",
    date: "AUG 29",
    category: "last30days",
  },
  {
    id: "6",
    title: "UI UX Designer hiring 2025 Q1",
    date: "AUG 20",
    category: "older",
  },
  {
    id: "7",
    title: "UGC Creators for Quran AI",
    date: "SEP 10",
    category: "older",
  },
  { id: "8", title: "TikToker Analysis", date: "AUG 29", category: "older" },
];

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] =
    useState(searchSuggestions);
  const overlayRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        if (!isOpen) {
          // Open search overlay
          setSearchQuery("");
          setFilteredSuggestions(searchSuggestions);
        }
      }
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
      // Focus input after a small delay to ensure it's rendered
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredSuggestions(searchSuggestions);
    } else {
      const filtered = searchSuggestions.filter((suggestion) =>
        suggestion.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    }
  }, [searchQuery]);

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    console.log("Selected suggestion:", suggestion);
    onClose();
  };

  const groupedSuggestions = {
    today: filteredSuggestions.filter((s) => s.category === "today"),
    last30days: filteredSuggestions.filter((s) => s.category === "last30days"),
    older: filteredSuggestions.filter((s) => s.category === "older"),
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.searchContainer} ref={overlayRef}>
        <div className={styles.inputContainer}>
          <img
            src="/b2b/sidebar/search.svg"
            alt="Search"
            className={styles.searchIcon}
          />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          <div className={styles.shortcut}>
            <span>⌘</span>
            <span>K</span>
          </div>
        </div>

        <div className={styles.suggestionsContainer}>
          {groupedSuggestions.today.length > 0 && (
            <div className={styles.suggestionGroup}>
              <div className={styles.timeHeading}>TODAY</div>
              {groupedSuggestions.today.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className={styles.suggestionItem}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <span className={styles.suggestionTitle}>
                    {suggestion.title}
                  </span>
                  {suggestion.date && (
                    <span className={styles.suggestionDate}>
                      {suggestion.date}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {groupedSuggestions.last30days.length > 0 && (
            <div className={styles.suggestionGroup}>
              <div className={styles.timeHeading}>LAST 30 DAYS</div>
              {groupedSuggestions.last30days.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className={styles.suggestionItem}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <span className={styles.suggestionTitle}>
                    {suggestion.title}
                  </span>
                  {suggestion.date && (
                    <span className={styles.suggestionDate}>
                      {suggestion.date}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {groupedSuggestions.older.length > 0 && (
            <div className={styles.suggestionGroup}>
              <div className={styles.timeHeading}>OLDER</div>
              {groupedSuggestions.older.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className={styles.suggestionItem}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <span className={styles.suggestionTitle}>
                    {suggestion.title}
                  </span>
                  {suggestion.date && (
                    <span className={styles.suggestionDate}>
                      {suggestion.date}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {filteredSuggestions.length === 0 && (
            <div className={styles.noResults}>
              <p>No results found for "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
