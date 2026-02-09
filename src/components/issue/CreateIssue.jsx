import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";


const createIssue = () => {

    const navigate = useNavigate();

    const { repoId } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    const handleCreateIssue = async (e) => {
        e.preventDefault();

        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");


        if (!title || !description) {
            alert("Title and description is required");
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:3000/issue/create/${repoId}`,
                {
                    description,
                    title
                },
            );
            alert("Issue created successfully ✅");
            console.log(response.data);

            navigate("/");
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.error || "Something went wrong");
        }
    }


    return (

        <main>
            <div style={{ padding: "40px", backgroundColor: "#0d1117", minHeight: "100vh", color: "#c9d1d9" }}>
                <div style={{ maxWidth: "700px", margin: "auto" }}>

                    <h1>Create a New Issue</h1>
                    <main className="repo-detail-container" >

                        <form onSubmit={handleCreateIssue}>
                            <label>Title</label>
                            <input
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                style={inputStyle}
                            />

                            <label>Description</label>
                            <textarea
                                placeholder="Type your description here..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                style={{
                                    width: "100%", backgroundColor: "#010409", paddingBottom: "25%", border: "1px solid #30363d",
                                    borderRadius: "6px",
                                    color: "#c9d1d9"
                                }}
                            />

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
                                Create Issue
                            </button>
                        </form>
                    </main>
                    <div>
                        <Link to="/">
                            <p>Back</p>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
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
    color: "#c9d1d9"
};

export default createIssue;