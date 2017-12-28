import React from 'react';
import "./index.css";
import { Link, withRouter } from "react-router-dom";

function Header(props) {
    return (
        <header className="nav-links">
            <Link to="/">
                <h1><i className="fa fa-briefcase" aria-hidden="true"></i>Jerb.</h1>
            </Link>
            <p>Where the jerbs at</p>
        </header>
    )
}

export default withRouter(Header);