import React, { useState, useEffect, useRef } from "react";
import styles from "./Toolbar.module.scss";
import { ArrowDownUp, ListFilter, RotateCcw, Search, X } from "lucide-react";

interface ToolbarProps {
  onFilterChange: (text: string) => void;
  onSortChange: (field: "name" | "email" | null) => void;
  onToggleSortOrder: () => void;
  resetFilters: () => void;
  sortField: "name" | "email" | null;
  sortOrder: "asc" | "desc";
}

const Toolbar: React.FC<ToolbarProps> = ({
  onFilterChange,
  onSortChange,
  onToggleSortOrder,
  resetFilters,
  sortField,
  sortOrder,
}) => {
  const [searchText, setSearchText] = useState("");
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const sortMenuRef = useRef<HTMLDivElement>(null);

  // Handle search input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    onFilterChange(e.target.value);
  };

  // Clear search input
  const clearSearch = () => {
    setSearchText("");
    onFilterChange("");
  };

  // Toggle the sort menu
  const toggleSortMenu = () => {
    setIsSortMenuOpen((prev) => !prev);
  };

  // Handle sort field change
  const handleSortFieldChange = (field: "name" | "email") => {
    onSortChange(field);
  };

  const sortOrderText = sortOrder === "asc" ? "A-Z" : "Z-A";

  // Close the sort menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sortMenuRef.current &&
        !sortMenuRef.current.contains(event.target as Node)
      ) {
        setIsSortMenuOpen(false);
      }
    };

    if (isSortMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSortMenuOpen]);

  return (
    <div className={styles.toolbar}>
      <div className={styles.searchContainer}>
        <Search className={styles.icon} aria-hidden="true" size={14} />
        <input
          type="text"
          placeholder="Search users"
          value={searchText}
          onChange={handleInputChange}
          aria-label="Search users"
        />
        {searchText && (
          <button
            className={styles.clearButton}
            onClick={clearSearch}
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <div className={styles.actions}>
        <div
          className={styles.sortMenu}
          ref={sortMenuRef}
          aria-label="Sort options"
        >
          <button
            className={styles.sortButton}
            onClick={toggleSortMenu}
            aria-haspopup="true"
            aria-expanded={isSortMenuOpen}
          >
            <ListFilter size={14} />
            Sort
          </button>
          {isSortMenuOpen && (
            <div className={styles.sortOptions} role="menu">
              <p className={styles.sortTitle}>Sort by</p>
              <hr className={styles.divider} />
              <ul>
                <li>
                  <button
                    onClick={() => handleSortFieldChange("name")}
                    className={
                      sortField === "name" ? styles.activeOption : undefined
                    }
                    role="menuitem"
                  >
                    Name
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSortFieldChange("email")}
                    className={
                      sortField === "email" ? styles.activeOption : undefined
                    }
                    role="menuitem"
                  >
                    Email
                  </button>
                </li>
              </ul>
              <hr className={styles.divider} />
              <button onClick={onToggleSortOrder} role="menuitem">
                <ArrowDownUp className={styles.icon} size={14} />
                Order: {sortOrderText}
              </button>
            </div>
          )}
        </div>
        <button
          className={styles.resetButton}
          onClick={resetFilters}
          aria-label="Reset sorting"
        >
          <RotateCcw size={14} />
          Reset
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
