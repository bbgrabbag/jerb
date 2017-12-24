import React, { Component } from 'react';

import { connect } from "react-redux";

class ProfilePage extends Component {
    render() {
        let { fName, lName, username } = this.props.user;
        return (
            <div>
                <h2>Hello, {fName} {lName}!</h2>
                <p>@{username}</p>
            </div>
        )
    }
}

const mapStateToProps = state => ({ user: state.auth.user });

export default connect(mapStateToProps, {})(ProfilePage);
