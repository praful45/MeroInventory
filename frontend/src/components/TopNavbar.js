import React from 'react'
// import 'bootstrap/dist/css/bootstrap.css'
import { Container, Row, Col, Navbar, Nav, NavDropdown, NavDropdownDivider } from 'react-bootstrap'
import { PersonCircle, BoxArrowRight } from 'react-bootstrap-icons';
// import { BoxArrowRight } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom'
// import "../pages/routes/InvRoutes"

const TopNavbar = () => {
  return (
    <>


      <Row>
        <Col>
          <Navbar variant='light' bg='warning' expand='md'>
            <Container>
              <Navbar.Brand as={Link} to="/">
                <img src='logo of My Inventory.png'
                  height='40'
                  width='40'
                  className='align-top' alt='logo of inventory'
                />
                &nbsp;
              </Navbar.Brand>
              <Navbar.Toggle aria-controls='top-nav' />
              <Navbar.Collapse id='top-nav'>
                <Nav className='mx-auto fw-bold'>
                  <Nav.Link as={Link} to="/">Dashboard </Nav.Link>

                  <NavDropdown title='Categories' id='top-nav'>
                    <NavDropdown.Item as={Link} to="/category">Categories list</NavDropdown.Item>
                    {/* made change here */}
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/category-add">Add New Category</NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown title='Products' id='top-nav'>
                    <NavDropdown.Item href='#'>Manage products</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href='#'>Add New product</NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown title='Sales' id='top-nav'>
                    <NavDropdown.Item href='#'>Sales Report</NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown title='Warehouse' id='top-nav'>
                    <NavDropdown.Item href='#'>Manage Warehouse</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Nav>
                  <Nav.Link href="#profile">
                    <PersonCircle /> Profile
                  </Nav.Link>
                </Nav>
                <Navbar.Text>
                  <NavDropdown>
                    <Nav.Link href="#logout">
                      Logout <BoxArrowRight />
                    </Nav.Link>
                    <NavDropdown.Item href='#'>Logout</NavDropdown.Item>
                  </NavDropdown>
                </Navbar.Text>
              </Navbar.Collapse>

            </Container>

          </Navbar>
        </Col>

      </Row>

    </>

  );
}

export default TopNavbar