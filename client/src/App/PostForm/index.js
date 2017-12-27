import React, { Component } from 'react';
import "./index.css";
import moment from "moment";
import { submitPosting } from "../../Redux/postings";
import { connect } from "react-redux";

class PostForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputs: {
                company: "",
                title: "",
                salary: "",
                contact: "",
                contactEmail: "",
                contactPh: "",
                offerAmt: "",
                datePosted: new Date(),
                applied: false,
                responded: false,
                notes: ""
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        window.scrollTo(0, 0);
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
        this.props.submitPosting(this.state.inputs, this.props.history);
        this.clearInputs();
    }
    clearInputs() {
        this.setState({
            inputs: {
                company: "",
                title: "",
                salary: "",
                contact: "",
                contactEmail: "",
                contactPh: "",
                offerAmt: "",
                datePosted: new Date(),
                applied: false,
                responded: false,
                notes: ""
            }
        })
    }
    render() {
        let { company, title, salary, contact, contactEmail, contactPh, offerAmt, datePosted, applied, responded, notes } = this.state.inputs;
        return (
            <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleChange} value={company} name="company" type="text" placeholder="Company" required />
                <input onChange={this.handleChange} value={title} name="title" type="text" placeholder="Title" required />
                <input onChange={this.handleChange} value={salary} name="salary" type="number" placeholder="Advertised Salary" />
                <input onChange={this.handleChange} value={contact} name="contact" type="text" placeholder="Contact Name" />
                <input onChange={this.handleChange} value={contactEmail} name="contactEmail" type="email" placeholder="Contact Email" />
                <input onChange={this.handleChange} value={contactPh} name="contactPh" type="text" placeholder="Contact Phone" />
                <input onChange={this.handleChange} value={offerAmt} name="offerAmt" type="number" placeholder="Offer Amount" />
                <span>Date Posted: <input onChange={this.handleChange} value={moment(datePosted).format("YYYY-MM-DD")} name="datePosted" type="date" /></span>
                <div className="checkbox">
                    <div>
                        <input id="new-applied"onChange={this.handleChange} name="applied" checked={applied} type="checkbox" />
                        <label htmlFor="new-applied">Applied? </label>
                    </div>
                    <div>
                        <input id="new-responded"onChange={this.handleChange} name="responded" checked={responded} type="checkbox" />
                        <label htmlFor="new-responded">Responded? </label>
                    </div>
                </div>
                <textarea onChange={this.handleChange} value={notes} style={{ overflow: "auto" }} name="notes" id="notes" cols="30" rows="5" placeholder="Notes"></textarea>
                <button type="submit"><i className="fa fa-plus"></i></button>
            </form>
        )
    }
}

export default connect(null, { submitPosting })(PostForm);
