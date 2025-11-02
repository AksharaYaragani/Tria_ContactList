import React from "react";

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <input
      className="search-bar"
      type="text"
      placeholder="Search contact by name..."
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default SearchBar;
