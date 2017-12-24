import React, { Component } from 'react'

export default class PostForm extends Component {
    render() {
        return (
            <form>
                <input type="text"/>
                <input type="text"/>
                <input type="text"/>
                <input type="checkbox"/>
                <button>+</button>
            </form>
        )
    }
}
