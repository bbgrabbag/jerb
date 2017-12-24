import React, { Component } from 'react';

// packages
import { Link } from "react-router-dom";

export default class Signup extends Component {
    render() {
        return (
            <form>
                <input type="text" />
                <input type="text" />
                <input type="text" />
                <button>Submit</button>
                <span>Already a user?</span>
                <Link to="/login">Login</Link>
            </form>
        )
    }
}
