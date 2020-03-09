/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';
import { Button, Icon } from 'antd';
import { Breadcrumb } from 'antd';

import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css';



const TopMenu = ({ location, cartItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  const counting = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  const toggle = () => setIsOpen(!isOpen);
  const logout = () => localStorage.removeItem('token');

  return (
    <>
      <Navbar color="light" light expand="md">

        <NavbarBrand href="/" style={{ color: '#007bff' }}>
          <NavItem>React App</NavItem>
        </NavbarBrand>

        <NavbarToggler onClick={toggle} />

        <Collapse isOpen={isOpen} navbar>

          <Nav className="mr-auto" navbar>

            <NavItem>
              <NavLink to="/">Home</NavLink>
            </NavItem>

            <NavItem>
              <NavLink to="/books"> Books</NavLink>
            </NavItem>
          </Nav>

          <Nav navbar>

            <NavItem>
              <NavLink to="/reg">Register</NavLink>
            </NavItem>

            <NavItem>
              <NavLink to="/log">Login </NavLink>
            </NavItem>

            <NavItem>
              <NavLink to="/bookcart">
                <Button type="primary">
                  <Icon type="shopping-cart" />
                  {counting}
                </Button>
              </NavLink>
            </NavItem>

          </Nav>
        </Collapse>
      </Navbar>

      <Breadcrumb separator=">">
    <Breadcrumb.Item>Home</Breadcrumb.Item>
    
  </Breadcrumb>

      <Button type="danger" color="warning" onClick={logout}>Logout</Button>
    </>

  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartItems
  }
}

export default connect(mapStateToProps)(TopMenu)