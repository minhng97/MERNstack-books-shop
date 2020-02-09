import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Container, Row } from 'reactstrap';
import Button from 'antd/es/button';
import 'antd/dist/antd.css';

import displayBooks from './display.book'


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
                <Container>
                <Row>
                    {displayBooks(books)}
                </Row>
                </Container>
            </div>
        </div>
    )
}

export default AllBooks