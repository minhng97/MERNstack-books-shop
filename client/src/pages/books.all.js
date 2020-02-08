import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
    ListGroup, ListGroupItem
    , Form, Input, FormGroup, Label
} from 'reactstrap';
import Button from 'antd/es/button';
import 'antd/dist/antd.css';

import displayBooks from './displayContent/display.book'


const AllBooks = props => {
    const [books, setBooks] = useState([])

    useEffect(() => {
        getBooks()
    }, []
    )

    const getBooks = () => {

        // Get posts from database
        axios.get('/api/allbooks')
            .then(({ data }) => {
                // Deep copy
                const booksFetched = [...data];
                setBooks(booksFetched)
                // console.log("The books have been loaded", console.log(booksData))
            })
            .catch((error) => {
                alert('Error getting posts: ', error)
            })

    }


    return (
        <div>
            Book page
            <div className="posts">
                <ListGroup>
                    {displayBooks(books)}
                </ListGroup>
            </div>
        </div>
    )
}

export default AllBooks