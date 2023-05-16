import React from 'react'
import './Home.css'
import ProfileSide from '../../components/profilesSide/ProfileSide'
import PostSide from '../../components/PostSide/PostSide'
import FollowersCard from '../../components/FollowersCard/FollowersCard'

const Home = ({handleSideBar}) => {
  
  return (
    <div className="Home">
        <ProfileSide handleSideBar={handleSideBar}/>
        <PostSide />
    </div>
  )
}

export default Home