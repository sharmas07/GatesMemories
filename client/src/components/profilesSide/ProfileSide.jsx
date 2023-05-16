import React from "react";
import LogoSearch from "../LogoSearch/LogoSearch";
import "./ProfileSide.css";
import ProfileCard from "../ProfileCard/ProfileCard";
import FollowersCard from "../FollowersCard/FollowersCard";

const ProfileSide = ({ handleSideBar }) => {
  return (
    <div className="ProfileSide">
      <LogoSearch handleSideBar={handleSideBar} />
      <div className="profilecard_container"> 
        <ProfileCard location={"home"} />
      </div>
      <div className="followers_card_container">
        <FollowersCard />
      </div>
    </div>
  );
};

export default ProfileSide;
