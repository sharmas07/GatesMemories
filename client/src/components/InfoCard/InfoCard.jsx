import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../Profilemodel/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../api/UserRequest.js";
import { logout } from "../../actions/AuthAction";

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);

  const handleLogOut = ()=> {
      dispatch(logout())
    }

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
       
      }
    };
    fetchProfileUser();
  }, [user]);
  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {user._id === profileUserId ? 
          <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => {
                setModalOpened(true);
              }}
            />
            {modalOpened && (
              <ProfileModal
                modalOpened={modalOpened}
                setModalOpened={setModalOpened}
                data = {user}
              />
            )}
          </div>
         : (
          ''
        )} 
      </div>
      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>{profileUser.relationship}</span>
      </div>
      <div className="info">
        <span>
          <b>LivesIn </b>
        </span>
        <span>{profileUser.livesin}</span>
      </div>
      <div className="info">
        <span>
          <b>Branch </b>
        </span>
        <span>{profileUser.worksAt}</span>
      </div>

      <button className="button info-btn" onClick={handleLogOut}>Logout</button>
    </div>
  );
};

export default InfoCard;