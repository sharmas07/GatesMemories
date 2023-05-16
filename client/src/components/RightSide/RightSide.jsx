import React, { useState } from "react";
import "./RightSide.css";
import Home from "../../img/home.png";
import ShareModal from "../ShareModal/ShareModal";
import { Link } from "react-router-dom";

const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <div className="RightSide">
      <div className="navIcons">
        <Link to="../home">
          <img src={Home} alt="" />
        </Link>
        <button
          className="button r-btn"
          onClick={() => {
            setModalOpened(true);
          }}
        >
          share
        </button>
        {modalOpened && (
          <ShareModal
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
          />
        )}
      </div>
    </div>
  );
};

export default RightSide;
