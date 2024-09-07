import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="homepage-container">
            
            <div className="bg-image text-light d-flex align-items-center" style={{
                backgroundImage: "url('src/assets/bg-1.avif')",
                height: "70vh",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}>
                <Container>
                    <Row className="align-items-center text-center text-md-start">
                        <Col md={8}>
                            <h1 className="fw-bold display-4">Hackathons for Illustrations</h1>
                            <p className="lead">
                                Empowering organizations and developers to unite, innovate, and shape the future together.
                            </p>
                            <div className="d-flex justify-content-center justify-content-md-start">
                                <Button
                                    variant="primary"
                                    className="me-5"
                                    as={Link}
                                    to="/organizers"
                                >
                                    For Organizers &rarr;
                                </Button>
                                {/* <Button variant="primary" className="me-3">
                                    For organizers
                                </Button>
                                <Button variant="outline-light">
                                    For participants
                                </Button> */}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            

            {/* Hackathon Search Section
            <Container className="mt-5 text-center">
                <Row>
                    <Col md={8} className="mx-auto">
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Find your next hackathon"
                                className="me-2"
                            />
                            <Button variant="primary">Search hackathons</Button>
                        </Form>
                    </Col>
                </Row>
            </Container> */}
        </div>
    );
};

export default HomePage;
