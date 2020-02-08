import React, { useState, useContext } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from "reactstrap";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { UserContext } from '../contexts/user.context'

const TopMenu = props => {
  const [isOpen, setIsOpen] = useState(false);

  const context = useContext(UserContext)
console.log(context)
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand>
          <Link to="/">React App</Link>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink>
                <Link to="/">Home</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link to="/reg">Register</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link to="/log">Login</Link>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <p>{context.login}</p>
      <Button type="button" color="warning" onClick={context.logout}>Logout</Button>
    </div>

  );
};
console.log(typeof TopMenu)
export default TopMenu;
