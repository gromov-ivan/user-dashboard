import React from "react";
import styles from "./Toolbar.module.scss";

interface ToolbarProps {
  onFilterChange: (text: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onFilterChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange(e.target.value);
  };

  return (
    <div className={styles.toolbar}>
      <input
        type="text"
        placeholder="Search users"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Toolbar;
