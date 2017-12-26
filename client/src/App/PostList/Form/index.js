import React, { Component } from 'react';

export default class Form extends Component {
    constructor(props) {
        super();
        this.state = {
            search: "",
            sort: "newest",
            filter: "all"
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.determineSorter = this.determineSorter.bind(this);
        this.determineFilter = this.determineFilter.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
    }
    clearSearch() {
        this.setState({
            search: ""
        });
    }
    handleSearch(e) {
        e.persist();
        let { value } = e.target;
        this.setState({
            search: value
        });
    }
    handleSort(e) {
        e.persist();
        let { value } = e.target
        this.setState({
            sort: value
        })
    }
    handleFilter(e) {
        e.persist();
        let { id } = e.target;
        this.setState({
            filter: id
        })
    }
    determineSorter() {
        let { sort } = this.state;
        let sortF;
        switch (sort) {
            case "oldest":
                sortF = (post1, post2, i) => {
                    let first = new Date(post1.createdAt).getTime();
                    let sec = new Date(post2.createdAt).getTime();
                    return first - sec;
                }
                return sortF;
            case "a-z":
                sortF = (post1, post2, i) => {
                    let first = post1.company;
                    let second = post2.company;
                    return first <= second ? -1 : 1;
                }
                return sortF;
            case "z-a":
                sortF = (post1, post2, i) => {
                    let first = post1.company;
                    let second = post2.company;
                    return first >= second ? -1 : 1;
                }
                return sortF;
            default:
                sortF = (post1, post2, i) => {
                    let first = new Date(post1.createdAt).getTime();
                    let sec = new Date(post2.createdAt).getTime();
                    return sec - first;
                }
                return sortF;
        }
    }
    determineFilter() {
        let { filter } = this.state;
        let filterF;
        switch (filter) {
            case "applied":
                filterF = (post) => {
                    return post.applied === true;
                }
                return filterF;
            case "not-applied":
                filterF = (post) => {
                    return post.applied === false;
                }
                return filterF;
            case "responded":
                filterF = (post) => {
                    return post.responded === true;
                }
                return filterF;
            case "not-responded":
                filterF = (post) => {
                    return post.responded === false;
                }
                return filterF;
            default:
                filterF = (post, i) => {
                    return post;
                }
                return filterF;
        }
    }
    componentDidMount() {
        this.props.sortPostings(this.determineSorter());
        this.props.filterPostings(this.determineFilter());
    }
    componentDidUpdate(prevProps, prevState) {
        let { search, sort, filter } = this.state;
        if (prevState.search !== search)
            this.props.searchPostings(search);
        if (prevState.sort !== sort)
            this.props.sortPostings(this.determineSorter());
        if (prevState.filter !== filter)
            this.props.filterPostings(this.determineFilter());
    }
    render() {
        return (
            <div>
                <input onChange={this.handleSearch} value={this.state.search} name="search" type="text" placeholder="Search" />
                <button onClick={this.clearSearch}>Clear</button>
                <select onChange={this.handleSort} value={this.state.sort} name="sort-by" id="sort-by">
                    <option value="newest">Most Recent</option>
                    <option value="oldest">Oldest</option>
                    <option value="a-z">A - Z</option>
                    <option value="z-a">Z - A</option>
                </select>
                <div>
                    <span><input onChange={this.handleFilter} defaultChecked={true} type="radio" name="status" id="all" />All</span>
                    <span><input onChange={this.handleFilter} type="radio" name="status" id="applied" />Applied</span>
                    <span><input onChange={this.handleFilter} type="radio" name="status" id="not-applied" />Not Applied </span>
                    <span><input onChange={this.handleFilter} type="radio" name="status" id="responded" />Responded</span>
                    <span><input onChange={this.handleFilter} type="radio" name="status" id="not-responded" />Not Responded</span>
                </div>
            </div>
        )
    }
}
