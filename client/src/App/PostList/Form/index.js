import React, { Component } from 'react';
import "./index.css";

export default class Form extends Component {
    constructor(props) {
        super();
        this.state = {
            search: "",
            sort: "newest",
            filter: "all",
            showAdvFilter: false
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.determineSorter = this.determineSorter.bind(this);
        this.determineFilter = this.determineFilter.bind(this);
        this.resetSearch = this.resetSearch.bind(this);
        this.toggleAdvFilter = this.toggleAdvFilter.bind(this);
    }
    resetSearch(e) {
        e.preventDefault();
        this.setState({
            search: "",
            sort: "newest",
            filter: "all",
            showAdvFilter: false
        });
    }
    handleSearch(e) {
        e.persist();
        let { value } = e.target;
        this.setState({
            search: value,
            showAdvFilter: false
        });
    }
    handleSort(e) {
        e.persist();
        let { value } = e.target
        this.setState({
            sort: value,
            showAdvFilter: false
        })
    }
    handleFilter(e) {
        e.persist();
        let { id } = e.target;
        this.setState({
            filter: id,
            showAdvFilter: false
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
    toggleAdvFilter(e) {
        e.preventDefault();
        this.setState((prevState) => {
            return {
                showAdvFilter: !prevState.showAdvFilter
            }
        })
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
        let { showAdvFilter } = this.state;
        let filterStyle = { display: showAdvFilter ? "flex" : "none" }
        return (
            <div className="form-wrapper">
                <form className="search-form">
                    <input onChange={this.handleSearch} value={this.state.search} name="search" type="text" placeholder="Search" />
                    <button style={{ display: showAdvFilter ? "none" : "inline-block", textAlign: "center" }} onClick={this.toggleAdvFilter}>Advanced Filter <i className="fa fa-angle-down"></i></button>
                    <div className="adv-filter-wrapper" style={filterStyle}>
                        <button onClick={this.toggleAdvFilter}><i className="fa fa-angle-up"></i></button>
                        <div className="radio-filter">
                            <div>
                                <input onChange={this.handleFilter} checked={this.state.filter === "all"} type="radio" name="status" id="all" />
                                <label htmlFor="all">All</label>
                            </div>
                            <div>
                                <input onChange={this.handleFilter} type="radio" name="status" id="applied" />
                                <label htmlFor="applied">Applied</label>
                            </div>
                            <div>
                                <input onChange={this.handleFilter} type="radio" name="status" id="not-applied" />
                                <label htmlFor="not-applied">Not Applied </label>
                            </div>
                            <div>
                                <input onChange={this.handleFilter} type="radio" name="status" id="responded" />
                                <label htmlFor="responded">Responded</label>
                            </div>
                            <div>
                                <input onChange={this.handleFilter} type="radio" name="status" id="not-responded" />
                                <label htmlFor="not-responded">Not Responded</label>
                            </div>
                        </div>
                        <div>
                            <select onChange={this.handleSort} value={this.state.sort} name="sort-by" id="sort-by">
                                <option value="newest">Most Recent</option>
                                <option value="oldest">Oldest</option>
                                <option value="a-z">A - Z</option>
                                <option value="z-a">Z - A</option>
                            </select>
                        </div>
                    </div>
                    <button onClick={this.resetSearch}>Reset</button>
                </form>
            </div>
        )
    }
}
