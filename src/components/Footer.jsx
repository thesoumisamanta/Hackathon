import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
    return (
        <footer className="bg-light text-gray py-4 mt-auto">
            <Container>
                <Row>
                    <Col md={6} className="text-center text-md-left">
                        <h5>About Us</h5>
                        <p>We are dedicated to providing the best hackathon opportunities for developers and tech enthusiasts.</p>
                    </Col>
                    <Col md={6} className="text-center text-md-right">
                        <h5>Contact</h5>
                        <p>Email: info@hackathon.com</p>
                        <p>Phone: +123 456 7890</p>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        <p className="mb-0">© 2024 Hackathon Hub. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
