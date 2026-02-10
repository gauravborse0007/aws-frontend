import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";
import { Button } from "@primer/react";
import "./auth.css";
const API_URL = import.meta.env.VITE_API_URL;

import logo from "../../assets/github-mark-white.svg";
import { Link, useActionData } from "react-router-dom"; 

const Login = () => {

    useEffect(()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setCurrentUser(null);
    },[]);

    const[email, setEmail] = useState("");
    const[password, setPassword]= useState("");
    const[loading, setLoading] = useState(false);
    const{currentUser,setCurrentUser} = useAuth(); 

    const handleLogin = async (e)=>{  
        e.preventDefault();

    try { 
      setLoading(true);
      const res = await axios.post(`${API_URL}/login`, {
        email: email,
        password: password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      setCurrentUser(res.data.userId);
      setLoading(false);

      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("SignIn Failed!");
      setLoading(false);
    }
}

    return (
    <div className="login-wrapper">
      <div className="login-logo-container">
        <img className="logo-login" src={logo} alt="Logo" />
      </div>

      <div className="login-box-wrapper login-box">
        <div className="login-heading">
          <div style={{ padding: "10px", fontSize: 24, fontWeight: "bold", marginBottom: "20px" }}>
            Sign In
          </div>
        </div>


          <div>
            <label className="label">Email address</label>
            <input
              autoComplete="off"
              name="Email"
              id="Email"
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="div">
            <label className="label">Password</label>
            <input
              autoComplete="off"
              name="Password"
              id="Password"
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            variant="primary"
            className="login-btn"
            disabled={loading}
            onClick={handleLogin}
          >
            {loading ? "Loading..." : "Login"}
          </Button>
        </div>

        <div className="pass-box" style={{marginLeft:"38%", marginTop:"25px"}}>
          <p>
           New to Github ? <Link to="/signup">Create an account </Link>
          </p>
        </div>
      </div>
  );
}

export default Login;