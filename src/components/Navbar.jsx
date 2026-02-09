import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";


// Router = Road system
// Builds roads
// Sets rules

// Link = Vehicle
// Travels on those roads
// Needs the road system to exist

// No roads → car can’t move.

const Navbar = () => {
  return (
    <nav>
      <Link to="/">
        <div>
          <img
            src="https://www.github.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub Logo"
          />
          <h3>GitHub</h3>
        </div>
      </Link>
      <div>
        <Link to="/create">
          <p>Create a Repository</p>
        </Link>
        <Link to="/profile">
          <p>Profile</p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;