import React, { Component } from 'react';

import { connect } from "react-redux";
import { login } from "../../Redux/auth";
import {Link} from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: {
                username: "",
                password: "",
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        e.persist();
        this.setState((prevState) => {
            return {
                inputs: {
                    ...prevState.inputs,
                    [e.target.name]: e.target.value
                }
            }
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.login(this.state.inputs, this.props.history);
        this.clearInputs();
    }
    clearInputs() {
        this.setState({
            inputs: {
                username: "",
                password: "",
            }
        });
    }

    render() {
        let inputs = this.state.inputs;
        return (
            <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleChange} value={inputs.username} name="username" type="text" placeholder="@" />
                <input onChange={this.handleChange} value={inputs.password} name="password" type="password" placeholder="#" />
                <button type="submit">Submit</button>
                <p>{this.props.errMsg}</p>
                <span>New to Jerb?</span>
                <Link to="/">Sign Up</Link>
            </form>
        )
    }
}

const mapStateToProps = state => ({ errMsg: state.auth.errMsg.login })

export default connect(mapStateToProps, { login })(Login);
