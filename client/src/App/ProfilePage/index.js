import React, { Component } from 'react';

import { connect } from "react-redux";
import { deleteAct } from "../../Redux/auth";

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
                    <span>Are you sure you want to delete your account? This will remove all data associated with @{username}</span>
                    <button onClick={() => this.props.deleteAct(this.props.history)}>Yes</button>
                    <button onClick={this.toggleModal}>Cancel</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({ user: state.auth.user });

export default connect(mapStateToProps, { deleteAct })(ProfilePage);
