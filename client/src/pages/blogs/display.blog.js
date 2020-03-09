import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';
import 'antd/dist/antd.css';
const displayBlogPost = posts => {

    if (!posts.length) return null;

    return (
        <div className="posts">
            <ListGroup>
                {posts.map(post =>
                    <ListGroupItem
                        key={post._id}
                        className="blog-post__display">

                        <h6>{post.title}</h6>
                        <p>{post.body}</p>

                    </ListGroupItem>
                )}
            </ListGroup>
        </div>
    )
}
export default displayBlogPost