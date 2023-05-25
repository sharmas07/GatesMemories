import React from 'react'
import './Profile.css'
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft'
import ProfileCard from '../../components/ProfileCard/ProfileCard'
import PostSide from '../../components/PostSide/PostSide'

const Profile = ({ handleSideBar}) => {
  return (
    <div className='Profile'>
        <ProfileLeft  handleSideBar={handleSideBar} />

        <div className="Profile-center">
            <ProfileCard location="profilePage"/>
            <h3 style={{margin:'4px'}}>Your Posts</h3>
            <PostSide/>
        </div>
    </div>
  )
}

export default Profile