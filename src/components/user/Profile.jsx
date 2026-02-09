import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import Navbar from "../Navbar";
import { UnderlineNav } from "@primer/react";
import { BookIcon, RepoIcon } from "@primer/octicons-react";
import { useAuth } from "../../authContext";

const Profile = () => {
  const navigate = useNavigate(); //we are using the "useNavigate" hook for to switch between overview and starred repository

  const [userDetails, setUserDetails] = useState("");
  const [repositories, setRepositories] = useState([]);
  const { currentUser, setCurrentUser } = useAuth();
  const [allIssues, setAllIssues] = useState([]);
  // const { name } = useParams();

  useEffect(() => {

    const userId = localStorage.getItem("userId");

    const fetchUserDeatils = async () => {
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:3000/userProfile/${userId}`);
          setUserDetails(response.data);
        } catch (error) {
          console.log("Cannot fetch detail: ", error);
        }
      }

    };

    const fetchRepositories = async () => {
      try {
        const response = await fetch(`http://localhost:3000/repo/user/${userId}`);
        const data = await response.json();
        setRepositories(data);
      } catch (error) {
        console.error("Error fetching repositories", error);
      }
    };

    fetchUserDeatils();
    fetchRepositories();
  }, []);

  // useEffect(() => {
  //   const fetchAllIssues = async () => {
  //     const res = await fetch(
  //       `http://localhost:3000/repo/name/${name}`
  //     );

  //     const data = await res.json();

  //     if (Array.isArray(data)) {
  //       setAllIssues(data);
  //     } else {
  //       setAllIssues([]); // safety
  //     }
  //   };

  //   fetchAllIssues();
  // }, [name]);

  const handleDeleteRepo = async (repoId) => {
    const userId = localStorage.getItem("userId");

    const confirmDelete = window.confirm(
      "Are you sure want to delete this repo ?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/repo/delete/${repoId}`, {
        data: { userId },
      });

      setRepositories((prevRepos) =>
        prevRepos.filter((repo) => repo._id !== repoId)
      );

      alert("Repository deleted successfully");

    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete repository");
    }
  };

  return (
    <>
      <Navbar />

      <UnderlineNav aria-label="Repository">

        <UnderlineNav.Item
          aria-current="page"
          icon={BookIcon}
          sx={{
            backgroundColor: "transparent",
            color: "white",
            "&:hover": {
              textDecoration: "underline",
              color: "white",
            },
          }}
        >
          Overview
        </UnderlineNav.Item>

        <UnderlineNav.Item
          onClick={() => navigate("/starRepo")}
          icon={RepoIcon}
          sx={{
            backgroundColor: "transparent",
            color: "whitesmoke",
            "&:hover": {
              textDecoration: "underline",
              color: "white",
            },
          }}
        >
          Starred Repositories
        </UnderlineNav.Item>

      </UnderlineNav>


      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          setCurrentUser(null);

          window.location.href = "/auth";
        }}
        style={{ position: "fixed", bottom: "50px", right: "50px" }}
        id="logout"
      >
        Logout
      </button>

      <div className="profile-page-wrapper">
        <div className="user-repo-section">
          <h2>Your Repositories</h2>

          <div className="repo-card-wrapper">
            {repositories.map((repo) => (
              <div className="repo" key={repo.repoName}
                onClick={() => navigate(`/repo/${repo._id}`)}>
                <h4 className="repo-name">{repo.repoName}</h4>
                <span>{repo.visibility ? "Public" : "Private"}</span>
                <p className="description">
                  {repo.description || "No description"}
                </p>
                &nbsp;
                &nbsp;
                <button
                  className="delete-btn"
                  onClick={(e) =>{ e.stopPropagation(); handleDeleteRepo(repo._id)}}

                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>


        <div className="user-profile-section">
          <div className="profile-image"> <img src="https://cdn-icons-png.flaticon.com/512/4140/4140037.png" /> </div>

          <div className="name">
            <h3>{userDetails.username}</h3>
          </div>

          <button className="follow-btn">Follow</button>

          <div className="follower">
            <p>10 Follower</p>
            <p>3 Following</p>
          </div>
        </div>

      </div>
      {/* <section className="suggested-section">
        <h3>All Issues</h3>

        <div className="issue-grid">
          {allIssues.map((issue) => (
            <div
              className="issue-card"
              key={issue._id}
              onClick={() => setSelectedIssue(issue)}
            >
              <p className="issueTitle">{issue.title}</p>
              <p className="issueDescription">{issue.description}</p>


            </div>
          ))}
        </div>
      </section> */}
    </>
  );
};

export default Profile;