import React from "react";
import UserList from "./components/UserList/UserList";
import Toolbar from "./components/Toolbar/Toolbar";
import useUsers from "./hooks/useUsers";
import useUserFilters from "./hooks/useUserFilters";
import styles from "./App.module.scss";

const App: React.FC = () => {
  const { users, loading, error } = useUsers();
  const {
    sortField,
    sortOrder,
    handleFilterChange,
    handleSortChange,
    toggleSortOrder,
    resetFilters,
    filteredSortedUsers,
  } = useUserFilters(users);

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>User Dashboard</h1>
        <p className={styles.subtitle}>
          Browse and manage the list of users fetched from the API.
        </p>
      </header>
      <main className={styles.mainContent}>
        <Toolbar
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          onToggleSortOrder={toggleSortOrder}
          resetFilters={resetFilters}
          sortField={sortField}
          sortOrder={sortOrder}
        />
        {loading || error ? (
          <div className={styles.message}>
            {loading ? <p>Loading...</p> : <p>{error}</p>}
          </div>
        ) : (
          <>
            {filteredSortedUsers && filteredSortedUsers.length === 0 && (
              <p className={styles.message}>No users found</p>
            )}
            <UserList users={filteredSortedUsers} />
          </>
        )}
      </main>
    </div>
  );
};

export default App;
