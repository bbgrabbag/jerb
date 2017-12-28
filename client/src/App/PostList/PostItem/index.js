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
        let viewStyle = { display: toggleView ? "inherit" : "none"}
        let btnPos = { justifyContent: toggleEdit ? "flex-end" : toggleView ? "center" : "flex-start" }
        let { _id, company, title, salary, notes, createdAt, applied, responded, contactEmail, contact, contactPh, offerAmt, datePosted } = this.props.post;
        let responseStatStyle = { width: "50%", backgroundColor: responded ? "rgba(153,217,153, .7)" : "rgba(255,127,127, .7)" }
        let applyStatStyle = { width: "50%", backgroundColor: applied ? "rgba(153,217,153, .7)" : "rgba(255,127,127, .7)" }
        return (
            <div className="info-wrapper">
                <div style={btnPos} className="buttons" >
                    <button onClick={this.toggleEdit}><i className="fa fa-pencil"></i></button>
                    <button className="remove-item-btn" onClick={() => this.props.removePosting(_id)}><i className="fa fa-trash"></i></button>
                </div>
                {toggleEdit ?
                    <EditForm toggleEdit={this.toggleEdit} updatePosting={this.props.updatePosting} editing={this.state.toggleEdit} {...this.props.post} /> :
                    <div className="info-content" style={{ display: toggleEdit ? "none" : "block" }}>
                        <div className="info-header">
                            <h2><b>{company}</b></h2>
                            <h3>{title}</h3>
                        </div>
                        <p style={applyStatStyle}><i>{applied ? "Applied" : "Hasn't applied"}</i></p>
                        <p style={responseStatStyle}><i>{responded ? "Responded" : "Hasn't responded"}</i></p>
                        <p>Date created: <b>{new Date(createdAt).toLocaleDateString()}</b></p>
                        <button style={{ display: toggleView ? "none" : "inherit" }} onClick={this.toggleView}><i className="fa fa-angle-down"></i></button>
                        <br />
                        <p style={viewStyle}>Contact: <i>{contact}</i></p>
                        <p style={viewStyle}>Contact Email: <i>{contactEmail}</i></p>
                        <p style={viewStyle}>Contact Phone: <i>{contactPh}</i></p>
                        <p style={viewStyle}>Advertised salary: <i>{salary ? salary.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        }) : ""}</i></p>
                        <p style={viewStyle}>Offer amount: <i>{offerAmt ? offerAmt.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        }) : ""}</i></p>
                        <p style={viewStyle}>Date posted: <b>{new Date(datePosted).toLocaleDateString()}</b></p>
                        <p style={viewStyle}>Notes: <i>{notes}</i></p>
                        <button style={viewStyle} onClick={this.toggleView}><i className="fa fa-angle-up"></i></button>
                    </div>}
            </div>
        )
    }
}
