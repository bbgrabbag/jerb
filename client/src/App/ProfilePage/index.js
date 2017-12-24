import React, { Component } from 'react';

import { connect } from "react-redux";

class ProfilePage extends Component {
    constructor(props) {
        super();
        this.state = {
            toggle: false
        }
        this.toggleModal = this.toggleModal.bind(this);
    }
    toggleModal() {
        this.setState((prevState) => {
            return {
                toggle: !prevState.toggle
            }
        });
    }
    render() {
        let { fName, lName, username } = this.props.user;
        let modal = {
            display: this.state.toggle ? "inherit" : "none"
        }
        return (
            <div>
                <h2>Hello, {fName} {lName}!</h2>
                <p>@{username}</p>
                <span>Delete account? <button onClick={this.toggleModal}>X</button></span>
                <div className="modal" style={modal}>
                    test
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({ user: state.auth.user });

export default connect(mapStateToProps, {})(ProfilePage);
