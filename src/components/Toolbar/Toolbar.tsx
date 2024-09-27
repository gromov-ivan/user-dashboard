import React from "react";
import styles from "./Toolbar.module.scss";

interface ToolbarProps {
  onFilterChange: (text: string) => void;
  onSortChange: (field: "name" | "email") => void;
  onToggleSortOrder: () => void;
  sortField: "name" | "email";
  sortOrder: "asc" | "desc";
}

const Toolbar: React.FC<ToolbarProps> = ({
  onFilterChange,
  onSortChange,
  onToggleSortOrder,
  sortField,
  sortOrder,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange(e.target.value);
  };

  return (
    <div className={styles.toolbar}>
      <input
        type="search"
        placeholder="Search users"
        onChange={handleInputChange}
      />
      <div className={styles.sortButtons}>
        <button
          className={sortField === "name" ? styles.active : ""}
          onClick={() => onSortChange("name")}
        >
          Sort by Name
        </button>
        <button
          className={sortField === "email" ? styles.active : ""}
          onClick={() => onSortChange("email")}
        >
          Sort by Email
        </button>
        <button onClick={onToggleSortOrder}>
          {sortOrder === "asc" ? "Asc" : "Desc"}
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
