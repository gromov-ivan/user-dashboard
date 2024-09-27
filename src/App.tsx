import React, { useState } from "react";
import UserList from "./components/UserList/UserList";
import useUsers from "./hooks/useUsers";
import styles from "./App.module.scss";
import Toolbar from "./components/Toolbar/Toolbar";

const App: React.FC = () => {
  const { users, loading, error } = useUsers();
  const [filterText, setFilterText] = useState("");

  const handleFilterChange = (text: string) => {
    setFilterText(text);
  };

  const filteredUsers = users.filter((user) => {
    const searchText = filterText.toLowerCase();
    return user.name.toLowerCase().includes(searchText);
  });

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>User Dashboard</h1>
      </header>
      <main className={styles.mainContent}>
        <Toolbar onFilterChange={handleFilterChange} />
        {loading ? (
          <p className={styles.message}>Loading...</p>
        ) : error ? (
          <p className={styles.message}>{error}</p>
        ) : (
          <>
            {filteredUsers && filteredUsers.length === 0 && (
              <p className={styles.message}>No users found</p>
            )}
            <UserList users={filteredUsers} />
          </>
        )}
      </main>
    </div>
  );
};

export default App;
