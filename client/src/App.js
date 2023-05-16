import { useSelector } from "react-redux";
import "./App.css";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import { Routes, Route, Navigate } from "react-router-dom";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import close_btn from './img/close.png'
import FollowersCard from "./components/FollowersCard/FollowersCard";
import { useEffect, useState } from "react";

function App() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)
  const handleSideBar = ()=>{
    console.log("side bar handler fired")
    setIsSideBarOpen(!isSideBarOpen)
  }
  
  const {user} = useSelector((state) => state.authReducer.authData);
  return (
    <>
    <div className="App">
      <div className={`hamberger_container ${isSideBarOpen?'isSideBarOpen':''}`}>
      <div style={
        {
          display:'flex',
          flexDirection:'row',
          justifyContent:'flex-end',
          marginBottom:'1rem'
        }
      }>
      <img src={close_btn}
        onClick={handleSideBar}
        style={
          {
            marginBottom:'8px',
            filter:'invert(1)',
            width:'30px',
            height:'30px'
          }
        } alt="" />
  
      </div>
        <ProfileCard handleSideBar={handleSideBar}/>
        <div >
        <FollowersCard />
        </div>
      </div>
      <Routes>
        <Route
          path="/"
          element={user ?  <Navigate to="home" /> : <Navigate to="auth" />}
        />
        <Route
          path="/home"
          element={user ? <Home handleSideBar={handleSideBar}/> : <Navigate to="../auth" />}
        />
        <Route
          path="/auth"
          element={user ? <Navigate to="../home" /> : <Auth />}
        />
        <Route
          path="/profile/:id"
          element={user ? <Profile  handleSideBar={handleSideBar} /> : <Navigate to="../auth" />}
        />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
      
    </div>
    <div className="footer">
    <h5 style={{textAlign:'center',margin:'2px',padding:'5px'}}>Made with 💙 by GIT-CSE</h5>
  </div></>
  );
}

export default App;
