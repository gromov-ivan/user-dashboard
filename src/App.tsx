import React, { useEffect, useState } from "react";
import { User } from "./types/User";
import UserList from "./components/UserList/UserList";

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <h1>User Dashboard</h1>
      <UserList users={users} />
    </div>
  );
};

export default App;
