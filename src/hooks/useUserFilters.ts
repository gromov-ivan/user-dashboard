import { useState, useMemo } from "react";
import { User } from "../types/User";

type SortField = "name" | "email";
type SortOrder = "asc" | "desc";

const useUserFilters = (users: User[]) => {
  const [filterText, setFilterText] = useState("");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const handleFilterChange = (text: string) => {
    setFilterText(text);
  };

  const handleSortChange = (field: SortField) => {
    setSortField(field);
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const filteredSortedUsers = useMemo(() => {
    const filtered = users.filter((user) => {
      const searchText = filterText.toLowerCase();
      return (
        user.name.toLowerCase().includes(searchText) ||
        user.email.toLowerCase().includes(searchText) ||
        user.phone.toLowerCase().includes(searchText) ||
        user.website.toLowerCase().includes(searchText) ||
        user.address.street.toLowerCase().includes(searchText) ||
        user.address.suite.toLowerCase().includes(searchText) ||
        user.address.city.toLowerCase().includes(searchText) ||
        user.address.zipcode.toLowerCase().includes(searchText)
      );
    });

    const sorted = [...filtered].sort((a, b) => {
      const fieldA = a[sortField].toLowerCase();
      const fieldB = b[sortField].toLowerCase();

      if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
      if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [users, filterText, sortField, sortOrder]);

  return {
    filterText,
    sortField,
    sortOrder,
    handleFilterChange,
    handleSortChange,
    toggleSortOrder,
    filteredSortedUsers,
  };
};

export default useUserFilters;
