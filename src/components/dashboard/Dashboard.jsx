import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import Navbar from "../Navbar";
const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchUserRepos = async () => {
      const res = await fetch(`${API_URL}/repo/user/${userId}`);
      const data = await res.json();
      setRepositories(data);
    };

    const fetchSuggestedRepos = async () => {
      const res = await fetch(`${API_URL}/repo/all`);
      const data = await res.json();
      setSuggestedRepositories(data);
    };

    fetchUserRepos();
    fetchSuggestedRepos();
  }, []);


  return (
    <>
      <Navbar />

      <main className="dashboard-container">

        {/* Suggested Repositories */}
        <section className="suggested-section">
          <h3>Suggested Repositories</h3>

          {suggestedRepositories.map((repo) => (
            <div className="suggested-card" key={repo._id}
              onClick={() => navigate(`/repo/name/${repo.repoName}`)}
              style={{ cursor: "pointer" }}>
              <p className="repo-title">{repo.repoName}</p>
              {/* <p className="repo-desc">{repo.description || "No description"}</p> */}
            </div>
          ))}
        </section>

        {/* Your Repositories */}
        <section className="repos-section">
          <h2>Your Repositories</h2>

          <div className="repo-grid">
            {Array.isArray(repositories) && repositories.map((repo) => (
              <div className="repo-card" key={repo._id}>
                <h4>{repo.repoName}</h4>
                <p>{repo.description || "No description"}</p>
                <span>{repo.visibility ? "Public" : "Private"}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="events-section">
          <h3>Upcoming Events</h3>
          <ul>
            <li>Tech Conference – Dec 15</li>
            <li>Developer Meetup – Dec 25</li>
            <li>React Summit – Jan 5</li>
          </ul>
        </section>

      </main>

      {/* Footer */}
      <footer className="footer">
        <ul>
          <li>Terms</li>
          <li>Privacy</li>
          <li>Security</li>
          <li>Status</li>
          <li>Community</li>
          <li>Docs</li>
          <li>Contact</li>
        </ul>
      </footer>
    </>
  );
};

export default Dashboard;
