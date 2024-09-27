import React from "react";
import UserList from "./components/UserList/UserList";
import useUsers from "./hooks/useUsers";
import styles from "./App.module.scss";

const App: React.FC = () => {
  const { users, loading, error } = useUsers();

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>User Dashboard</h1>
      </header>
      <main className={styles.mainContent}>
        {loading ? (
          <p className={styles.message}>Loading...</p>
        ) : error ? (
          <p className={styles.message}>{error}</p>
        ) : (
          <UserList users={users} />
        )}
      </main>
    </div>
  );
};

export default App;
