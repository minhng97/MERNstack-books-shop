import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { CartContext } from '../../contexts/Cart.context'

import { List, Avatar, Alert, Card } from 'antd';
import { Container, Row, Col, Badge } from 'reactstrap';
export default (props) => {
    const [books, setBooks] = useState([])
    const cart = useContext(CartContext)
    let counting = cart.cartItems.reduce((acc, curr, ind) => {
        return acc + curr.quantity
    }, 0)
    console.log("cart: ", cart)
    useEffect(() => {
        getAndSetBook()
        async function getAndSetBook() {
            let { data } = await axios.get('/api/allbooks')
            // copy
            const booksFetched = [...data];
            setBooks(booksFetched)

        }
    }, [])


    return (
        <>
            <Container><Row>
                <Col lg="8"><Card>
                    <List
                        itemLayout="horizontal"
                        dataSource={cart.cartItems}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.product.thumbnail} style={{ width: "90px", height: "100px", borderRadius: 0 }} />}
                                    title={<a href="#">{item.product.title}</a>}
                                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"

                                />
                                <div><h6> <Badge color="primary">{item.quantity}</Badge></h6></div>
                            </List.Item>
                        )}
                    /></Card></Col>
                <Col lg="4">
                    {/* <Alert message="Continue to checkout" type="info" /> */}
                    <Card title={`Total: ${counting} items`} style={{}}>
                        <p>Price: 100.400 VND</p>
                        <p>VAT: 5% </p>
                        <Alert message={`Total: 105.420 VND`} type="info"></Alert>
                    </Card>
                </Col>
            </Row></Container>
        </>
    )
}