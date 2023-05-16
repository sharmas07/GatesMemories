import React, { useState } from 'react'
import Profile from '../../img/profileImg.png'
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unfollowUser } from "../../actions/userAction.js";

const User = ({person}) => {
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
    const { user } = useSelector((state) => state.authReducer.authData);
    const dispatch = useDispatch()
    
    const [following, setFollowing] = useState(
      person.followers.includes(user && user._id)
    );
    const handleFollow = () => {
      following
        ? dispatch(unfollowUser(person._id, user))
        : dispatch(followUser(person._id, user));
      setFollowing((prev) => !prev);
    };
  return (
    <div className="follower">
    <div>
      <img src={person.profilePicture? person.profilePicture :Profile} className="followerImg" alt="" />
      <div className="name">
        <span>{person.name}</span>
        <span>@{person.username}</span>
      </div>
    </div>
    <button className={following?"button fc-btn UnfollowBtn":"button fc-btn"} onClick={handleFollow}>{following?'Unfollow':'Follow'}</button>
  </div>  )
}

export default User