import React from "react";
import { User } from "../../types/User";
import styles from "./UserCard.module.scss";

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className={styles.userCard}>
      <h2>{user.name}</h2>
      <p>
        <b>Email:</b> {user.email}
      </p>
      <p>
        <b>Phone:</b> {user.phone}
      </p>
      <p>
        <b>Website:</b> {user.website}
      </p>
      <p>
        <b>Address:</b> {user.address.street}, {user.address.suite},{" "}
        {user.address.zipcode} {user.address.city}
      </p>
    </div>
  );
};

export default UserCard;
