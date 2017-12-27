import React, { Component } from 'react';
import "./index.css";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteAct, logout } from "../../Redux/auth";

//bootstrap
import { Modal } from "react-bootstrap";

class ProfilePage extends Component {
    constructor(props) {
        super();
        this.state = {
            toggle: false
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    componentDidUpdate(prevProps, prevState) {
        window.scrollTo(0, 0);
    }
    openModal() {
        this.setState({
            toggle: true
        })
    }
    closeModal() {
        this.setState({
            toggle: false
        })
    }
    render() {
        let { fName, lName, username } = this.props.user;
        // let modal = {
        //     display: this.state.toggle ? "inherit" : "none"
        // }
        let { logout } = this.props;
        let italicize = { fontStyle: "italic" }
        return (
            <div className="profile-wrapper">
                <div className="profile-header">
                    <h2>Hello, {fName} {lName}!</h2>
                    <p style={italicize}>@{username}</p>
                </div>
                <div className="profile-content">
                    <button>
                        <Link to="add-post">Add new job listing</Link>
                    </button>
                    <button>
                        <Link to="view-posts">View your current job listings</Link>
                    </button>
                    <button onClick={logout}>Logout</button>
                </div>
                <div className="profile-delete">
                    <button onClick={this.openModal}><i className="fa fa-times" ></i> Delete Account</button>
                </div>
                <Modal bsClass="modal-custom" show={this.state.toggle} onHide={this.closeModal}>
                    <Modal.Header bsClass="modal-header-custom" closeButton>
                        <Modal.Title bsClass="modal-title-custom">Warning</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to delete your account?</p>
                        <p>This will remove all data associated with <span style={{ fontStyle: "italic" }}>@{username}</span></p>
                        <button onClick={() => this.props.deleteAct(this.props.history)}>Yes</button>
                        <button onClick={this.closeModal}>Cancel</button>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({ user: state.auth.user });

export default connect(mapStateToProps, { deleteAct, logout })(ProfilePage);
