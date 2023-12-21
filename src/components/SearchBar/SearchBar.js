import React, { useState } from "react";
import { CiGrid2H, CiGrid41 } from "react-icons/ci";
import icon from "../../assets/google-keep-icon.svg";
import "./SearchBar.css";

const SearchBar = ({ onSearch, toggleLayout, isGridView }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value.trim().toLowerCase());
  };

  return (
    <div className="search-bar">
      <div className="logo">
        <img src={icon} alt="Google Keep Icon" />
        <p>
          <span>K</span>eep
        </p>
      </div>
      <input
        type="text"
        placeholder="Search notes..."
        value={searchQuery}
        onChange={handleChange}
      />
      {isGridView ? (
        <CiGrid2H
          onClick={toggleLayout}
          className="list-icon"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="List View"
        />
      ) : (
        <CiGrid41
          onClick={toggleLayout}
          className="list-icon"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Grid View"
        />
      )}
    </div>
  );
};

export default SearchBar;
