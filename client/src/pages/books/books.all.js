import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Container, Row } from 'reactstrap';

import 'antd/dist/antd.css';

import DisplayBooks from './display.book';

import { connect } from 'react-redux'
import { addToCart } from '../../actions/cart.action'

const AllBooks = ({ location, addProductToCart }) => {
  const [books, setBooks] = useState([]);

  const getBooks = () => {

    axios.get('/api/allbooks')
      .then(({ data }) => {
        setBooks(data);
      })
      .catch((error) => {
        console.error('Error getting posts: ', error);
      });
  };
  useEffect(() => {
    getBooks();
  }, []);

  return (

    <div className="posts">
      {JSON.stringify(location.pathname)}
      <Container>
        <Row>
          <DisplayBooks bookData={books} addToCart={addProductToCart} />
        </Row>
      </Container>
    </div>

  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addProductToCart: (product) => { dispatch(addToCart(product)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllBooks)