import React from 'react';
import { useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'; // Import Navbar components from Bootstrap

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS


function NavbarComponent({selectedPeriod, onSelect}) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" style={{ fontSize: '32px'}}>
      
        <Navbar.Brand style={{ marginLeft: '20px', fontSize: '32px' }} href="#home">Developer Rankings 🏆</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown onSelect={onSelect} title="Team" id="basic-nav-dropdown">

                <NavDropdown.Item eventKey={"All"}>
                    All
                </NavDropdown.Item>

                <NavDropdown.Divider />

                {/* TODO Fix Lazy Dropdown */}
                <NavDropdown.Item eventKey={"Team 1"}>1</NavDropdown.Item>
                <NavDropdown.Item eventKey={"Team 2"}>2</NavDropdown.Item>
                <NavDropdown.Item eventKey={"Team 3"}>3</NavDropdown.Item>
                <NavDropdown.Item eventKey={"Team 4"}>4</NavDropdown.Item>
                <NavDropdown.Item eventKey={"Team 5"}>5</NavDropdown.Item>
                <NavDropdown.Item eventKey={"Team 6"}>6</NavDropdown.Item>
              

            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      
    </Navbar>
  );
}

export default NavbarComponent;