import React, { useContext } from 'react'
import { Col } from 'reactstrap';
import { Button, Icon } from 'antd';
import { CartContext } from '../../contexts/Cart.context'

export default function (bookData) {
    const context = useContext(CartContext)

    if (!bookData) { return null }
    return (bookData.map(book => <Col
        xs="12"
        sm="6"
        lg="3"
        offset={6}
        key={book._id}
        className="books__display">
        <img src={book.thumbnailUrl} alt="Book descr" height="140px" />
        <h6 className="books__display--title">{book.title}</h6>
        <p className="books__display--authors"><span>{book.authors[0]}</span></p>
        <p className="books__display--description">{book.shortDescription}</p>

        <Button onClick={() => context.addToCart({
            id: book._id,
            title: book.title,
            thumbnail: book.thumbnailUrl
        })}
            type="primary"
            width="">
            <Icon type="shopping-cart" />

            Add to cart
        </Button>




        <br />
    </Col>
    ))
}
// export default DisplayBooks