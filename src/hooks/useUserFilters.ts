import { useState, useMemo } from "react";
import { User } from "../types/User";

type SortField = "name" | "email" | null;
type SortOrder = "asc" | "desc";

const useUserFilters = (users: User[]) => {
  const [filterText, setFilterText] = useState("");
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  // Handler to update filter text
  const handleFilterChange = (text: string) => {
    setFilterText(text);
  };

  // Handler to update sorting field
  const handleSortChange = (field: SortField) => {
    setSortField(field);
  };

  // Handler to toggle sorting order
  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  // Reset sorting options to default (no sorting)
  const resetFilters = () => {
    setSortField(null);
    setSortOrder("asc");
  };

  // Filter and sort users
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

    // Sort users if a sort field is selected
    if (sortField) {
      const sorted = [...filtered].sort((a, b) => {
        const fieldA = a[sortField].toLowerCase();
        const fieldB = b[sortField].toLowerCase();

        if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
        if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
      return sorted;
    } else {
      return filtered;
    }
  }, [users, filterText, sortField, sortOrder]);

  return {
    filterText,
    sortField,
    sortOrder,
    handleFilterChange,
    handleSortChange,
    toggleSortOrder,
    resetFilters,
    filteredSortedUsers,
  };
};

export default useUserFilters;
