import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { Link, NavLink, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const isOrganizersPage = location.pathname === '/organizers';

    return (
        <header>
            <Navbar bg="white" expand="lg" fixed="top" className="shadow-sm">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            src="/assets/logo.jpg"
                            height="28"
                            alt="Logo"
                        />
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                        <Nav className="mx-auto">
                            {/* <Nav.Link as={NavLink} to="/" className="mx-4">
                                Home
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/organizers" className="mx-4">
                                For Organizers
                            </Nav.Link> */}
                            
                        </Nav>

                        {!isOrganizersPage && (
                            <div className="d-flex">
                                <Button
                                    variant="outline-dark"
                                    className="me-2"
                                    as={Link}
                                    to="/login"
                                >
                                    Login
                                </Button>
                            </div>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
