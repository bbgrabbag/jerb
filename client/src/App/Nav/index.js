import React from 'react';

//packages
import { Link } from "react-router-dom";

function Nav(props) {
    return (
        <nav>
            <Link to="/">Sign Up</Link>
            <Link to="/login">Log In</Link>
            <Link to="/profile-page">Profile</Link>
            <Link to="/add-post">+</Link>
            <Link to="/view-posts">Postings</Link>
            <button>Logout</button>
        </nav>
    )
}

export default Nav;
