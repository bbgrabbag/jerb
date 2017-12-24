import React from 'react';

//packages
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../Redux/auth";

function Nav(props) {
    let isAuthenticated = props.isAuthenticated;
    return (
        <nav>
            {isAuthenticated ? null : <Link to="/">Sign Up</Link>}
            {isAuthenticated ? null : <Link to="/login">Log In</Link>}
            {isAuthenticated ? <Link to="/profile-page">Profile</Link> : null}
            {isAuthenticated ? <Link to="/add-post">+</Link> : null}
            {isAuthenticated ? <Link to="/view-posts">Postings</Link> : null}
            {isAuthenticated ? <button onClick={props.logout}>Logout</button> : null}
        </nav>
    )
}

const mapStateToProps = state => ({ isAuthenticated: state.auth.isAuthenticated });

export default connect(mapStateToProps, { logout })(Nav);
