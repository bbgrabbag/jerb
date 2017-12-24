import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

class ProtectedRoute extends Component {
    render() {
        let { path, component } = this.props;
        return (
            this.props.isAuthenticated ?
                <Route path={path} component={component} /> :
                <Redirect to="/login" />
        )
    }
}

const mapStateToProps = state => ({ isAuthenticated: state.auth.isAuthenticated });

export default connect(mapStateToProps, {})(ProtectedRoute);
