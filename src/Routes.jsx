import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/user/Profile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

import Create from "./components/repo/create";
import RepoDetail from "./components/repo/RepoDetail";
import CreateIssue from "./components/issue/CreateIssue";
import IssueDetails from "./components/issue/IssueDetails";

// Routes, Route = Road system (Without routes, useNavigate and Link will NOT work )
// Builds roads
// Sets rules

// Link = Vehicle
// Travels on those roads
// Needs the road system to exist
// use in clickable buttons
// use within html code
// <Link to="/profile">
//    Go to Profile
// </Link>

// useNavigate hook = for automatically redirecting users to other web pages without refreshing pages based on the written conditions
// if (loginSuccess) {
//    navigate("/profile");
// }

// No roads → car can’t move.

//NOTE that : we can use Link instead of useNavigate but only if it is clickable button.



// Auth context
import { useAuth } from "./authContext";

const ProjectRoutes = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    //this userId will come from backend when user login and we store it in local storage
    const userIdFromStorage = localStorage.getItem("userId");

    // If user exists in localStorage but not in state, update state to login
    if (userIdFromStorage && !currentUser) {
      setCurrentUser(userIdFromStorage);
    }

    // If user NOT logged in and visiting protected pages
    if (!userIdFromStorage && !["/auth", "/signup"].includes(window.location.pathname)) {
      navigate("/auth"); //autamatically navigates to auth route
    }

    // If user is logged in but trying to visit login page
    if (userIdFromStorage && window.location.pathname == "/auth") {
      navigate("/");
    }
  }, [currentUser, navigate, setCurrentUser]);  //if any of these values got change then re-render component

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/auth" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/create" element={<Create />} />
      <Route path="/repo/name/:repoName" element={<RepoDetail />} />
      <Route path="/issue/create/:repoId" element={<CreateIssue/>}/>
      <Route path="/repo/:repoId" element={<IssueDetails/>}/>

    </Routes>
  );
};

export default ProjectRoutes;
