import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const TopMenu = props => {
  const [isOpen, setIsOpen] = useState(false);

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
                  <Link to="/login">login</Link>
                </NavLink>
              </NavItem>

            </Nav>
          </Collapse>
        </Navbar>
      </div>

  );
};

export default TopMenu;
