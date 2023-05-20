import React from 'react'
import Cover from '../../img/cover.jpg'
import Profile from '../../img/profileImg.png'
import './ProfileCard.css'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

const ProfileCard = ({location, handleSideBar}) => {
    const posts = useSelector((state)=>state.postReducer.posts)
    const {user} = useSelector((state)=>state.authReducer.authData)
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <div className='ProfileCard'>
        <div className="ProfileImages">
            <img src={user && user.coverPicture? user.coverPicture : Cover} alt="" />
            <img src={user && user.profilePicture? user.profilePicture :Profile} alt="" />
        </div>
        <div className="ProfileName">
            <span>{user && user.username} </span>
            <span>{user && user.worksAt? user.worksAt:'your branch'}</span>
        </div>
        <div className="followStatus">
            <hr/>
            <div>
                <div className="follow">
                    <span>{user && user.following.length}</span>
                    <span>Following</span>
                </div>
                <div className="vl"></div>
                <div className="follow">
                    <span>{user && user.followers.length}</span>
                    <span>Followers</span>
                </div>

                {location==='profilePage' && (
                    <>
                        <div className="vl">

                        </div>
                        <div className="follow">
                            <span>{posts && posts.filter((post)=>post.userId===user._id).length}</span>
                            <span>Posts</span>
                        </div>
                    </>
                )}

            </div>
            <hr />
        </div>
        {location==='profilePage'  ? "":<span onClick={handleSideBar}>
        <Link  to={`/profile/${user ? user._id:''}`} style={{ textDecoration: "none", color: "black" }}>
            My Profile
          </Link>
        </span>}
        
    </div>
  )
}

export default ProfileCard