import React, { Component } from 'react';
import EditForm from "./EditForm";

export default class PostItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleView: false,
            toggleEdit: false
        }
        this.toggleView = this.toggleView.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
    }
    toggleView() {
        this.setState((prevState) => {
            return {
                toggleView: !prevState.toggleView
            }
        });
    }
    toggleEdit() {
        this.setState((prevState) => {
            return {
                toggleEdit: !prevState.toggleEdit
            }
        });
    }

    render() {
        let toggleView = { display: this.state.toggleView ? "inherit" : "none" }
        let { _id, company, title, salary, notes, createdAt, applied, responded, contactEmail, contact, contactPh, offerAmt, datePosted } = this.props.post;
        return (
            <div>
                <button onClick={this.toggleEdit}>Edit</button>
                <button onClick={() => this.props.removePosting(_id)}>X</button>
                <EditForm toggleEdit={this.toggleEdit}updatePosting={this.props.updatePosting}editing={this.state.toggleEdit} {...this.props.post} />
                <div style={{ display: this.state.toggleEdit ? "none" : "inherit" }}>
                    <h2>{company}</h2>
                    <h3>{title}</h3>
                    <p>Application Status: {applied ? "Applied" : "Hasn't applied"}</p>
                    <p>Response Status: {responded ? "Responded" : "Hasn't responded"}</p>
                    <p>Date created: {new Date(createdAt).toLocaleString()}</p>
                    <button style={{ display: this.state.toggleView ? "none" : "inherit" }} onClick={this.toggleView}>See More</button>
                    <p style={toggleView}>Contact: {contact}</p>
                    <p style={toggleView}>Contact Email: {contactEmail}</p>
                    <p style={toggleView}>Contact Phone: {contactPh}</p>
                    <p style={toggleView}>Advertised salary: {salary ? salary.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    }) : ""}</p>
                    <p style={toggleView}>Offer amount: {offerAmt ? offerAmt.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    }) : ""}</p>
                    <p style={toggleView}>Date posted: {new Date(datePosted).toLocaleString()}</p>
                    <p style={toggleView}>Notes: {notes}</p>
                    <button style={toggleView} onClick={this.toggleView}>See Less</button>
                </div>
            </div>
        )
    }
}
