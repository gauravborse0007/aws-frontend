import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";
import "./IssueDetails.css";
const API_URL = import.meta.env.VITE_API_URL;


const IssueDetails = () => {
  const { repoId } = useParams();
  const [repo, setRepo] = useState(null);
  const [allIssues, setAllIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);


  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const res = await axios.get(`${API_URL}/repo/${repoId}`);
        setRepo(res.data); // API returns array
        console.log(res.data.repoName);
        console.log(res.data.description);
        // display the name of repository and description when click on repository
      } catch (error) {
        console.error("Failed to load repo", error);
      }
    };

    fetchRepo();
  }, [repoId]);

  useEffect(() => {
    const fetchAllIssues = async () => {
      const res = await fetch(
        `${API_URL}/issues/all/${repoId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();
      setAllIssues(Array.isArray(data) ? data : []);
    };

    fetchAllIssues();
  }, [repoId]);

  // ✅ DELETE ISSUE
  const handleDeleteIssue = async (issueId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this issue?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${API_URL}/deleteIssue/${issueId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // remove issue from UI
      setAllIssues((prev) =>
        prev.filter((issue) => issue._id !== issueId)
      );

      alert("Issue deleted successfully");
    } catch (error) {
      console.error("Delete issue failed:", error);
      alert("Failed to delete issue");
    }
  };

return (
  <>
    <Navbar />

 {repo && (
  <>
    <section className="repo-header">
      <h2 className="repo-name">{repo.repoName}</h2>
    </section>

    <p className="repo-description">
      {repo.description || "No description provided"}
    </p>
  </>
)}


    {/* ✅ ISSUES */}
    <section className="issue-section">
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

            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteIssue(issue._id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </section>

    {/* MODAL */}
    {selectedIssue && (
      <div className="issue-modal" onClick={() => setSelectedIssue(null)}>
        <div
          className="issue-modal-box"
          onClick={(e) => e.stopPropagation()}
          style={{width:"50%"}}
        >
          <h2>{selectedIssue.title}</h2>
          <pre>{selectedIssue.description}</pre>
          <button onClick={() => setSelectedIssue(null)}>Close</button>
        </div>
      </div>
    )}
  </>
);

};

export default IssueDetails;
