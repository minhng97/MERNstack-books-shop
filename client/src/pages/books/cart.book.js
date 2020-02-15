import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { CartContext } from '../../contexts/Cart.context'

import { List, Avatar } from 'antd';
import { Badge } from 'reactstrap';
export default (props) => {
    const [books, setBooks] = useState([])
    const cart = useContext(CartContext)
    console.log("cart: ", cart)
    useEffect(() => {
        getAndSetBook()
        async function getAndSetBook() {
            let { data } = await axios.get('/api/allbooks')
            // Deep copy
            const booksFetched = [...data];
            setBooks(booksFetched)

        }
    }, [])
  

    return (
        <>
            <List
                itemLayout="horizontal"
                dataSource={cart.cartItems}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={<a href="#">{item.product.title}</a>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            
                        />
                        <div><Badge href="#" color="primary">{item.quantity}</Badge></div>
                    </List.Item>
                )}
            />

        </>
    )
}