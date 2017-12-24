import React from 'react';

//components
import PostItem from "./PostItem";

function PostList(props) {
    return (
        <div>
            {[{_id:"test"}].map((post, i)=>{
                return <PostItem {...post} key={post._id}/>
            })}
        </div>
    )
}

export default PostList;
