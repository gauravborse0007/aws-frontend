import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./RepoDetail.css";
import Navbar from "../Navbar";
const API_URL = import.meta.env.VITE_API_URL;

const RepoDetail = () => {
  const { repoName } = useParams();
  const navigate = useNavigate();

  const [repo, setRepo] = useState(null);
  const [liked, setLiked] = useState(false);
  const [following, setFollowing] = useState(false);
  const [allIssues, setAllIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);


  // fetch repository
  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const res = await axios.get(`${API_URL}/repo/name/${repoName}`);
        setRepo(res.data[0]); // API returns array
      } catch (error) {
        console.error("Failed to load repo", error);
      }
    };

    fetchRepo();
  }, [repoName]);


  useEffect(() => {
    if (!repo?._id) return;

    const fetchAllIssues = async () => {
      const res = await fetch(
        `${API_URL}/issues/all/${repo._id}`
      );

      const data = await res.json();
      setAllIssues(Array.isArray(data) ? data : []);
    };

    fetchAllIssues();
  }, [repo]);


  if (!repo) return <p style={{ color: "white" }}>Loading...</p>;

  return (
    <>
      <Navbar />

      <div className="repo-detail-container">
        {/* HEADER */}
        <div className="repo-header">
          <h2>{repo.repoName}</h2>
          
          <div className="repo-actions" >
            <button
              className={`like-btn ${liked ? "liked" : ""}`}
              onClick={() => setLiked(!liked)}
    
            >
              {liked ? "⭐ Liked" : "☆ Like"}
            </button>

            <button
              className={`follow-btn ${following ? "following" : ""}`}
              onClick={() => setFollowing(!following)}
            >
              {following ? "Following" : "Follow"}
            </button>
          </div>
        </div>

        {/* DESCRIPTION */}
        <p className="repo-desc">{repo.description || "No description"}</p>

        {/* VISIBILITY */}
        <div className="visibility">
          {repo.visibility ? "Public" : "Private"}
        </div>
      </div>

      {/* CREATE ISSUE */}
      <button
        className="issue-btn"
       style={{marginRight:"5%"}}
        onClick={() => navigate(`/issue/create/${repo._id}`)}
      >
        New Issue
      </button>

      {/* ALL ISSUES */}
      <section className="suggested-section" >
        <h3 style={{marginRight:"3%"}}>All Issues</h3>
        
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
      </section>

      {selectedIssue && (
        <div className="issue-modal" onClick={() => setSelectedIssue(null)}>
          <div
            className="issue-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selectedIssue.title}</h2>

            <pre className="issue-modal-description">
              {selectedIssue.description}
            </pre>

            <button onClick={() => setSelectedIssue(null)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default RepoDetail;
