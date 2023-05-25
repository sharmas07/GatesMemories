import React from "react";
import SearchUserCard from "./SearchUserCard";
import "./SearchList.css";

const SearchList = ({ data, searchString }) => {
  return (
    <div className="search-list">
      {searchString ? data.length > 0 ? (
        data.map((user) => <SearchUserCard user={user} />)
      ) : (
        <h3>No users found</h3>
      ) : ''}
    </div>
  );
};

export default SearchList;
