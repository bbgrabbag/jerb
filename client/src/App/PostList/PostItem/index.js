import React, { Component } from 'react';
import EditForm from "./EditForm";
import "./index.css";

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
        let { toggleEdit, toggleView } = this.state;
        
        let viewStyle = { display: toggleView ? "inherit" : "none" }
        let btnPos = { justifyContent: toggleEdit ? "flex-end" : toggleView ? "center" : "flex-start" }
        let { _id, company, title, salary, notes, createdAt, applied, responded, contactEmail, contact, contactPh, offerAmt, datePosted } = this.props.post;
        return (
            <div className="info-wrapper">
                <div style={btnPos} className="buttons" >
                    <button onClick={this.toggleEdit}>Edit</button>
                    <button onClick={() => this.props.removePosting(_id)}><i className="fa fa-trash"></i></button>
                </div>
                {toggleEdit ?
                    <EditForm toggleEdit={this.toggleEdit} updatePosting={this.props.updatePosting} editing={this.state.toggleEdit} {...this.props.post} /> :
                    <div className="info-content" style={{ display: toggleEdit ? "none" : "inherit" }}>
                        <div className="info-header">
                            <h2>{company}</h2>
                            <h3>{title}</h3>
                        </div>
                        <p>Application Status: {applied ? "Applied" : "Hasn't applied"}</p>
                        <p>Response Status: {responded ? "Responded" : "Hasn't responded"}</p>
                        <p>Date created: {new Date(createdAt).toLocaleString()}</p>
                        <button style={{ display: toggleView ? "none" : "inherit" }} onClick={this.toggleView}><i className="fa fa-angle-down"></i></button>
                        <br />
                        <p style={viewStyle}>Contact: {contact}</p>
                        <p style={viewStyle}>Contact Email: {contactEmail}</p>
                        <p style={viewStyle}>Contact Phone: {contactPh}</p>
                        <p style={viewStyle}>Advertised salary: {salary ? salary.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        }) : ""}</p>
                        <p style={viewStyle}>Offer amount: {offerAmt ? offerAmt.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        }) : ""}</p>
                        <p style={viewStyle}>Date posted: {new Date(datePosted).toLocaleString()}</p>
                        <p style={viewStyle}>Notes: {notes}</p>
                        <button style={viewStyle} onClick={this.toggleView}><i className="fa fa-angle-up"></i></button>
                    </div>}
            </div>
        )
    }
}
