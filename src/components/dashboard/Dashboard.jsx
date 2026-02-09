// import React, { useEffect, useState } from "react";
// import './dashboard.css';
// import Navbar from "../Navbar.jsx";

// const Dashboard = () => {
//     const [repositories, setRepositories] = useState([]);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [suggestedRepositories, setSuggestedRepositories] = useState([]);
//     const [searchResults, setSearchResults] = useState([]);
//     const [starredRepos, setStarredRepos] = useState([]);

//     const toggleStar = (repoId) => {
//         setStarredRepos((prev) =>
//             prev.includes(repoId)
//                 ? prev.filter((id) => id !== repoId) // unstar
//                 : [...prev, repoId]                  // star
//         );
//     };


//     // whenever we login we will always get user's repositories and in suggestedrepositories all other repositories also which is present in database 
//     useEffect(() => {
//         const userId = localStorage.getItem("userId");


//         const fetchRepositories = async () => {
//             try {
//                 const response = await fetch(`http://localhost:3000/repo/user/${userId}`);
//                 const data = await response.json();
//                 setRepositories(data);
//             } catch (error) {
//                 console.error("Error fetching repositories", error);
//             }
//         };

//         const fetchSuggestedRepositories = async () => {
//             try {
//                 const response = await fetch(`http://localhost:3000/repo/all`); //here we will get all the repositories of database
//                 const data = await response.json();
//                 setSuggestedRepositories(data);
//             } catch (error) {
//                 console.error("Error fetching repositories", error);
//             }
//         };

//         fetchRepositories();
//         fetchSuggestedRepositories();
//     }, []);


//     useEffect(() => {
//         // console.log("Suggested repos updated:", suggestedRepositories);
//     }, [suggestedRepositories]);



//     // we had written searchresult inside another useEffect because it is depending on another dependencies i.e searchQuery and repositories
//     // searching the repository from user's repositories 
//     useEffect(() => {
//         if (!Array.isArray(repositories)) {
//             setSearchResults([]);
//             return;
//         }

//         if (searchQuery == "") {
//             setSearchResults(repositories);
//         } else {
//             const filterRepo = repositories.filter((repo) =>
//                 repo.repoName.toLowerCase().includes(searchQuery.toLowerCase())
//             );
//             setSearchResults(filterRepo);
//         }
//     }, [searchQuery, repositories]) //if any of this dependency gets changes useEffect will reload


//     return (

//         <>
//             <Navbar />
//             <section id="dashboard">

//                 <aside>
//                     {suggestedRepositories.map((repo) => {
//                         const isStarred = starredRepos.includes(repo._id);

//                         return (
//                             <div
//                                 key={repo._id}
//                                 style={{
//                                     display: "flex",
//                                     justifyContent: "space-between",
//                                     alignItems: "center",
//                                     marginBottom: "10px"
//                                 }}
//                             >
//                                 <div>
//                                     <h4 style={{ margin: 0 }}>{repo.repoName}</h4>
//                                     <p style={{ fontSize: "12px", color: "gray" }}>
//                                         {repo.description}
//                                     </p>
//                                 </div>

//                                 <span
//                                     onClick={() => toggleStar(repo._id)}
//                                     style={{
//                                         cursor: "pointer",
//                                         fontSize: "18px",
//                                         color: isStarred ? "#f1c40f" : "#aaa"
//                                     }}
//                                     title={isStarred ? "Unstar" : "Star"}
//                                 >
//                                     {isStarred ? "❤️" : "🩶"}
//                                 </span>
//                             </div>
//                         );
//                     })}

//                 </aside>

//                 <main>
//                     <h2>Your Repositories</h2>
//                     <div id="search">
//                         <input
//                             type="text"
//                             value={searchQuery}
//                             placeholder="Search..."
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                         />
//                     </div>
//                     {searchResults.map((repo) => {
//                         return (
//                             <div key={repo._id} >
//                                 <h3>{repo.repoName}</h3>
//                                 <h5>{repo.description}</h5>
//                             </div>
//                         )
//                     })}
//                 </main>

//                 <aside>
//                     <h3>
//                         Upcoming Events
//                     </h3>
//                     <ul>
//                         <li>Tech conference-Dec 15</li>
//                         <li>Developer Meetup-Dec 25</li>
//                         <li>React Summit-Jan 5</li>
//                     </ul>
//                 </aside>
//             </section>
//         </>
//     )

// }

// export default Dashboard;

















import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import Navbar from "../Navbar";

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchUserRepos = async () => {
      const res = await fetch(`http://localhost:3000/repo/user/${userId}`);
      const data = await res.json();
      setRepositories(data);
    };

    const fetchSuggestedRepos = async () => {
      const res = await fetch(`http://localhost:3000/repo/all`);
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
            {repositories.map((repo) => (
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
