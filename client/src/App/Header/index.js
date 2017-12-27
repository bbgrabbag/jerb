import React from 'react';
import "./index.css";
import { logout } from "../../Redux/auth";
import { connect } from "react-redux";

function Header(props) {
    let { logout, user, isAuthenticated } = props;
    return (
        <header>
            <h1><i className="fa fa-briefcase" aria-hidden="true"></i>Jerb.</h1>
            <p>Track your job search in one place</p>
            {isAuthenticated ? <span><button onClick={logout}>Logout, <span style={{ fontStyle: "italic" }}>@{user.username}</span></button></span> : null}
        </header>
    )
}

const mapStateToProps = state => (
    {
        user: state.auth.user,
        isAuthenticated: state.auth.isAuthenticated
    }
)

export default connect(mapStateToProps, { logout })(Header);