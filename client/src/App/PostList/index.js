import React, { Component } from 'react';

//packages
import { connect } from "react-redux";
import { loadData, removePosting, updatePosting, searchPostings } from "../../Redux/postings";

//components
import PostItem from "./PostItem";
import Form from "./Form";

class PostList extends Component {
    componentDidMount() {
        this.props.loadData();
    }
    render() {
        let { data, filterBy, sortBy } = this.props.postings;
        return (
            <div>
                <Form searchPostings={this.props.searchPostings}></Form>
                <div>
                    {
                        data.filter(filterBy).sort(sortBy).map((post, i) => {
                            return <PostItem post={post} updatePosting={this.props.updatePosting} removePosting={this.props.removePosting} key={post._id} />
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({ postings: state.postings })

export default connect(mapStateToProps, { loadData, removePosting, updatePosting, searchPostings })(PostList);
