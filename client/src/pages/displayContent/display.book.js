import React from 'react'
import {ListGroupItem} from 'reactstrap';
 
 const displayBooks = bookData => {
  
    if(!bookData) {return null}
    return bookData.map(book => <ListGroupItem
        key={book._id}
            className="books__display">
            <h6>{book.title}</h6>
            <p>{book.shortDescription}</p>
        </ListGroupItem>
        )
}
export default displayBooks