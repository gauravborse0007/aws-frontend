import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

const Create = () => {
  const navigate = useNavigate();

  const [repoName, setRepoName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [issues, setIssues] = useState(false);

  const handleCreateRepo = async (e) => {
    e.preventDefault();

    const owner = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!repoName) {
      alert("Repository name is required");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/repo/creat`,
        {
          repoName,
          owner,
          description,
          visibility: visibility === "public",
          issues: [],
        },
      );

      alert("Repository created successfully ✅");
      console.log(response.data);

      navigate("/profile");

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div style={{ padding: "40px", backgroundColor: "#0d1117", minHeight: "100vh", color: "#c9d1d9" }}>
      <div style={{ maxWidth: "700px", margin: "auto" }}>

        <h1>Create a new repository</h1>

        <form onSubmit={handleCreateRepo}>

          <label>Repository name *</label>
          <input
            type="text"
            placeholder="Enter repo name"
            value={repoName}
            onChange={(e) => setRepoName(e.target.value)}
            style={inputStyle}
          />

          <label>Description</label>
          <textarea
            value={description}
            placeholder="Type your description"
            onChange={(e) => setDescription(e.target.value)}
            style={{ ...inputStyle, height: "200px" }}
          />

          <label>Visibility</label>
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            style={inputStyle}
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <input
              type="checkbox"
              checked={issues}
              onChange={(e) => setIssues(e.target.checked)}
            />
            <label>Enable Issues</label>
          </div>

          <button
            type="submit"
            style={{
              marginTop: "20px",
              backgroundColor: "#238636",
              border: "none",
              padding: "10px 18px",
              borderRadius: "6px",
              color: "white",
              cursor: "pointer"
            }}
          >
            Create repository
          </button>

        </form>
          <div>
            <Link to="/">
              <p>Back</p>
            </Link>
          </div>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "6px",
  marginBottom: "15px",
  backgroundColor: "#010409",
  border: "1px solid #30363d",
  borderRadius: "6px",
  color: "#c9d1d9",
};

export default Create;
