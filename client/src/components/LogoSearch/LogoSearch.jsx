import {React, useState} from "react";
import { UilSearch } from "@iconscout/react-unicons";
import "./LogoSearch.css";
import Logo2 from "../../img/GatesMem.png";
import hamburger_btn from "../../img/hamburger-btn.png";
import { Link } from "react-router-dom";
import SearchModal from "../SearchModal/SearchModal";

const LogoSearch = ({handleSideBar}) => {
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <>
      <div className="LogoSearch">
        <Link to={'/home'}><img src={Logo2} width={"30px"} height={"30px"} alt="" /></Link>
        
        <div className="Search">
          <input onClick={()=>setModalOpened(true)} type="text" placeholder="explore" />
          {modalOpened && (
              <SearchModal
                modalOpened={modalOpened}
                setModalOpened={setModalOpened}
              />
            )}
          <div className="s-icon">
            <UilSearch />
          </div>
        </div>
        <img
        onClick={handleSideBar}
        className="hamburger_btn"
        style={{
          width: "35px",
          height: "35px"
        }} src={hamburger_btn} alt="" />
      </div>
    </>
  );
};

export default LogoSearch;
