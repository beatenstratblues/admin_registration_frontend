import React from "react";

const SearchBar = ({ queryFunction, selectFilter }) => {
  return (
    <div className="searchBar" style={{ marginBottom: 15 }}>
      <label for="FilterDropDown">Search by : </label>
      <select
        id="FilterDropDown"
        value={selectFilter.selectFilter}
        onChange={(e) => {
          selectFilter.setSelectFilter(e.target.value);
        }}
      >
        <option value="Name">Name</option>
        <option value="Email">Email</option>
        <option value="Contact">Contact</option>
      </select>
      &nbsp; &nbsp; &nbsp; &nbsp;
      <input
        type="text"
        placeholder="Search Admin"
        style={{ width: 500 }}
        value={queryFunction.searchQuery}
        onChange={(e) => {
          queryFunction.setSearchQuery(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
