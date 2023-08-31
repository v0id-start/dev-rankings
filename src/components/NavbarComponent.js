import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'; // Import Navbar components from Bootstrap

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS


function NavbarComponent({selectedPeriod, onSelect}) {
  const periods = ["1", "2", "3", "4", "5", "6"]

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

                {periods.map((period, index) => (
                  <NavDropdown.Item key={period} eventKey={period}>{period}</NavDropdown.Item>
                ))}

            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      
    </Navbar>
  );
}

export default NavbarComponent;