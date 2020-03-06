/* eslint-disable linebreak-style */
import React from 'react';

import { List, Avatar, Alert, Card } from 'antd';
import { Container, Row, Col, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux'


const CartBook = ({ cartItems }) => {

  const counting = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <>
      <Container>
        <Row>
          <Col lg="8">
            <Card>
              <List
                itemLayout="horizontal"
                dataSource={cartItems}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={item.product.thumbnail} style={{ width: '90px', height: '100px', borderRadius: 0 }} />}
                      title={<Link to="/books">{item.product.title}</Link>}
                      description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                    <div>
                      <h6>
                        {' '}
                        <Badge color="primary">{item.quantity}</Badge>
                      </h6>
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col lg="4">
            <Card title={`Total: ${counting} items`} style={{}}>
              <p>Price: 100.400 VND</p>
              <p>VAT: 5% </p>
              <Alert message="Total: 105.420 VND" type="info" />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state
  }
}

export default connect(mapStateToProps)(CartBook)