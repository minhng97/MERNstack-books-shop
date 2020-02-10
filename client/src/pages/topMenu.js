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
  const context = useContext(CartContext)

  // const context = useContext(UserContext)
  // console.log("context from user.context: ", context)

  const toggle = () => setIsOpen(!isOpen);
  const logout = () => localStorage.removeItem("token")

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand>
          <NavLink to="/">React App</NavLink>
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
              <Button type="primary"><Icon type="shopping-cart" />{context.cartItems.length}</Button>
            </NavItem>

          </Nav>
        </Collapse>
      </Navbar>

      <Button type="danger" color="warning" onClick={logout}>Logout</Button>
    </div>

  );
};

export default TopMenu;
