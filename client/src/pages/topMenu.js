import React, { useState, useContext } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  // NavLink,
  // Button
} from "reactstrap";
import { Button, Icon } from 'antd';

import { CartContext } from '../contexts/Cart.context'



import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// import { UserContext } from '../contexts/user.context'


const TopMenu = props => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useContext(CartContext)

  let counting = cartItems.reduce((acc, curr, ind) => {
    return acc + curr.quantity
  }, 0)
  const toggle = () => setIsOpen(!isOpen);
  const logout = () => localStorage.removeItem("token")

  return (
    <>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/" style={{ color: "#007bff" }}>
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
                <Button type="primary"><Icon type="shopping-cart" />{counting}</Button>
              </NavLink>
            </NavItem>

          </Nav>
        </Collapse>
      </Navbar>

      <Button type="danger" color="warning" onClick={logout}>Logout</Button>
    </>

  );
};

export default TopMenu;
