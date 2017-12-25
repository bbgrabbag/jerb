import React, { Component } from 'react';

export default class Form extends Component {
    constructor(props) {
        super();
        this.state = {
            search: ""
        }
        this.handleSearch = this.handleSearch.bind(this);
    }
    handleSearch(e) {
        e.persist();
        let { value } = e.target;
        this.setState({
            search: value
        });
    }
    componentDidUpdate(prevProps, prevState) {
        let { search } = this.state;
        if (prevState.search !== search)
            this.props.searchPostings(search);
    }
    render() {
        return (
            <div>
                <input onChange={this.handleSearch} name="search" type="text" placeholder="Search" />
                <select name="sort-by" id="sort-by">
                    <option value="newest">Most Recent</option>
                    <option value="oldest">Oldest</option>
                    <option value="a-z">A - Z</option>
                    <option value="z-a">Z - A</option>
                </select>
                <div>
                    <span>Applied <input type="radio" name="status" id="applied" /></span>
                    <span>Not Applied <input type="radio" name="status" id="not-applied" /></span>
                    <span>Responded <input type="radio" name="status" id="responded" /></span>
                    <span>Not Responded <input type="radio" name="status" id="not-responded" /></span>
                </div>
            </div>
        )
    }
}
