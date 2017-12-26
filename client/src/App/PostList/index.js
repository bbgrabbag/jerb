import React, { Component } from 'react';

//packages
import { connect } from "react-redux";
import { loadData, removePosting, updatePosting, searchPostings, sortPostings, filterPostings } from "../../Redux/postings";

//components
import PostItem from "./PostItem";
import Form from "./Form";

class PostList extends Component {
    componentDidMount() {
        this.props.loadData();
    }
    render() {
        let { data, filterBy, sortBy } = this.props.postings;
        let display = data.filter(filterBy).sort(sortBy);
        return (
            <div>
                <Form filterPostings={this.props.filterPostings} searchPostings={this.props.searchPostings} sortPostings={this.props.sortPostings}></Form>
                {!data.length ?
                    <h3>You haven't added any listings!</h3> :
                    !display.length ?
                        <h5>No job listings match your query</h5> :
                        <div>
                            {
                                data.filter(filterBy).sort(sortBy).map((post, i) => {
                                    return <PostItem post={post} updatePosting={this.props.updatePosting} removePosting={this.props.removePosting} key={post._id} />
                                })
                            }
                        </div>}
            </div>
        )
    }
}

const mapStateToProps = state => ({ postings: state.postings })

export default connect(mapStateToProps, { loadData, removePosting, updatePosting, searchPostings, sortPostings, filterPostings })(PostList);
