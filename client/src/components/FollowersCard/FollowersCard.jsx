import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import { Followers } from "../../Data/Followers";
import User from "../User/User";
import { useSelector } from "react-redux";
import { getAllUser } from "../../api/UserRequest";

const FollowersCard = () => {
  const [persons, setPersons] = useState(null);
  const {user} = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
    };
    fetchPersons();
  }, []);
  return (
    <div className="FollowersCard">
      <h3>People You May Know</h3>
      <h6 style={{margin:'0'}}>Follow people to see their posts</h6>
      {persons && persons.map((person, id) => {
          if (person._id !== (user && user._id)) {
            return <User person={person} key={id} />;
          }
          return null
        })}
    </div>
  );
};

export default FollowersCard;
