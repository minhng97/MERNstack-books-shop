import React from 'react'
import {ListGroupItem} from 'reactstrap';

const displayBlogPost = posts => {

    if (!posts.length) return null;

    return posts.map(post => <ListGroupItem
    key={post._id}
        className="blog-post__display">
        <h6>{post.title}</h6>
        <p>{post.body}</p>
    </ListGroupItem>
    )
}
export default displayBlogPost