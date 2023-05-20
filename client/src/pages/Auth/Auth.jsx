import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/GatesMem.png";
import {useDispatch, useSelector} from 'react-redux'
import { logIn, signUp } from "../../actions/AuthAction";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loading = useSelector((state)=>state.authReducer.loading)
  const [isSignUp, setIsSignUp] = useState(true);
  const [data, setData] = useState({
    email:"",
    password: "",
    confirmpassword: "",
    username: "",
  });

  const [confirmpassword, setConfirmPassword] = useState(true);
  // handle Change in input
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      data.password === data.confirmpassword ? dispatch(signUp(data,navigate)):setConfirmPassword(false)
    }
    else{
      dispatch(logIn(data,navigate))
    }
  };

  // Reset Form
  const resetForm = () => {
    setData({
      email:"",
      password: "",
      confirmpassword: "",
      username: "",
    });
    setConfirmPassword(true);
  };

  return (
    <div className="Auth">
      {/* left side */}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>Gates Memories</h1>
          <h6>Connecting the GITIANS</h6>
        </div>
      </div>
      {/* Right side  */}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Sign Up" : "Log In"}</h3>
          
            <input
              onChange={handleChange}
              type="text"
              className="info-input"
              name="username"
              placeholder="Username"
            />
           {isSignUp && <input
              onChange={handleChange}
              type="email"
              className="info-input"
              name="email"
              placeholder="Email"
            />}
         
          
            <input
              onChange={handleChange}
              type="password"
              className="info-input"
              name="password"
              placeholder="password"
            />
            {isSignUp && (
              <input
                onChange={handleChange}
                type="password"
                className="info-input"
                name="confirmpassword"
                placeholder="confirm password"
              />
            )}
         
          <span
            style={{
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
              display: confirmpassword ? "none" : "block",
            }}
          >
            * password not matched
          </span>
          <div>
            <span
              style={{ fontSize: "12px", cursor: "pointer" }}
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp
                ? "Already have an account ? Login"
                : "Don't have an account? Sign Up"}
            </span>
          </div>
          <button disabled={loading} className="button signup-btn" type="submit">
            {loading ? "Loading..":isSignUp ? "SignUp" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
