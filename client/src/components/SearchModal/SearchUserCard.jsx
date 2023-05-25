import React from "react";
import './SearchUserCard.css'

const SearchUserCard = ({user}) => {
  return (
    <div className="search-card-container" key={user._id}>
      <div className="search-userimg-name">
        <img className="search-card-img" src={user.profilePicture} alt="" />
        <h3>{user.username}</h3>
      </div>
      <button className="button fc-btn" 
      // onClick={"handleFollow"}
      >Follow</button>
    </div>
  );
};

export default SearchUserCard;
