import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Container, Row } from 'reactstrap';

import 'antd/dist/antd.css';

import DisplayBooks from './display.book'


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
                setBooks(data)
            })
            .catch((error) => {
                alert('Error getting posts: ', error)
            })

    }


    return (

        <div className="posts">
            <Container>
                <Row>
                    {DisplayBooks(books)}
                </Row>
            </Container>
        </div>

    )
}

export default AllBooks