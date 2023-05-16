import React from 'react'
import LogoSearch from '../LogoSearch/LogoSearch'
import FollowersCard from '../FollowersCard/FollowersCard'
import InfoCard from '../InfoCard/InfoCard'

const ProfileLeft = ({handleSideBar}) => {
  return (
    <div className='ProfileSide'>
        <LogoSearch  handleSideBar={handleSideBar} />
        <InfoCard />
        <FollowersCard />
    </div>
  )
}

export default ProfileLeft