import React from 'react'
import { Col } from 'reactstrap';


const displayBooks = bookData => {

    if (!bookData) { return null }
    return bookData.map(book => <Col
        xs="12"
        sm="6"
        lg="3"
        offset={6}
        key={book._id}
        className="books__display">
        <h6>{book.title}</h6>
        <img src={book.thumbnailUrl} alt="Book descr" />
        <p className="books__display--description">{book.shortDescription}</p>
        </Col>
    )
}
export default displayBooks