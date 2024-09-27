import React from "react";
import { User } from "../../types/User";
import styles from "./UserCard.module.scss";
import { Globe, Mail, MapPin, Phone } from "lucide-react";

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className={styles.userCard}>
      <h2 className={styles.name}>{user.name}</h2>
      <p className={styles.info}>
        <Mail className={styles.icon} size={14} aria-hidden="true" />
        <span>{user.email}</span>
      </p>
      <p className={styles.info}>
        <Phone className={styles.icon} size={14} aria-hidden="true" />
        <span>{user.phone}</span>
      </p>
      <p className={styles.info}>
        <Globe className={styles.icon} size={14} aria-hidden="true" />
        <span>{user.website}</span>
      </p>
      <p className={styles.info}>
        <MapPin className={styles.icon} size={14} aria-hidden="true" />
        <span>
          {user.address.street}, {user.address.suite}, {user.address.city},{" "}
          {user.address.zipcode}
        </span>
      </p>
    </div>
  );
};

export default UserCard;
