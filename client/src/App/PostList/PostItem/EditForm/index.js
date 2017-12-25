import React, { Component } from 'react';
import moment from "moment";

export default class EditForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputs: {
                company: props.company,
                title: props.title,
                salary: props.salary || "",
                contact: props.contact || "",
                contactEmail: props.contactEmail || "",
                contactPh: props.contactPh || "",
                offerAmt: props.offerAmt || "",
                datePosted: new Date(props.datePosted),
                applied: props.applied,
                responded: props.responded,
                notes: props.notes || ""
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        e.persist();
        this.setState((prevState) => {
            let { name, value, checked, type } = e.target;
            switch (type) {
                case "checkbox":
                    return {
                        inputs: {
                            ...prevState.inputs,
                            [name]: checked
                        }
                    }
                case "date":
                    return {
                        inputs: {
                            ...prevState.inputs,
                            [name]: new Date(value)
                        }
                    }
                case "number":
                    return {
                        inputs: {
                            ...prevState.inputs,
                            [name]: Number(value)
                        }
                    }
                default:
                    return {
                        inputs: {
                            ...prevState.inputs,
                            [name]: value
                        }
                    }
            }
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.updatePosting(this.state.inputs, this.props._id);
        this.props.toggleEdit();
    }
    render() {
        let { company, title, salary, contact, contactEmail, contactPh, offerAmt, datePosted, applied, responded, notes } = this.state.inputs;
        return (
            this.props.editing ?
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} value={company} name="company" type="text" placeholder="Company" required />
                    <input onChange={this.handleChange} value={title} name="title" type="text" placeholder="Title" required />
                    <input onChange={this.handleChange} value={salary} name="salary" type="number" placeholder="Advertised Salary" />
                    <input onChange={this.handleChange} value={contact} name="contact" type="text" placeholder="Contact Name" />
                    <input onChange={this.handleChange} value={contactEmail} name="contactEmail" type="email" placeholder="Contact Email" />
                    <input onChange={this.handleChange} value={contactPh} name="contactPh" type="text" placeholder="Contact Phone" />
                    <input onChange={this.handleChange} value={offerAmt} name="offerAmt" type="number" placeholder="Offer Amount" />
                    <span>Date Posted: <input onChange={this.handleChange} value={moment(datePosted).format("YYYY-MM-DD")} name="datePosted" type="date" /></span>
                    <span>Applied? <input onChange={this.handleChange} name="applied" checked={applied} type="checkbox" /></span>
                    <span>Responded? <input onChange={this.handleChange} name="responded" checked={responded} type="checkbox" /></span>
                    <textarea onChange={this.handleChange} value={notes} style={{ overflow: "auto", resize: "none" }} name="notes" id="notes" cols="30" rows="10" placeholder="Notes"></textarea>
                    <button type="submit">Save</button>
                </form> :
                null
        )
    }
}
