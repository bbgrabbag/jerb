import React from 'react';
import "./index.css";

//packages
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

function Nav(props) {
    let { isAuthenticated } = props;
    let style = { display: isAuthenticated ? "flex" : "none" }
    return (
        <nav style={style}>
            <Link to="/profile-page"><i className="fa fa-home"></i></Link>
            <Link to="/add-post"><i className="fa fa-plus"></i></Link>
            <Link to="/view-posts"><i className="fa fa-eye"></i>
</Link>
        </nav>
    )
}

const mapStateToProps = state => ({ isAuthenticated: state.auth.isAuthenticated });

export default withRouter(connect(mapStateToProps, {})(Nav));
