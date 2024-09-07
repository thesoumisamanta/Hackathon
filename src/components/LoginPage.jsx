import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

const LoginPage = () => {
    const [loginData, setLoginData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [isRegister, setIsRegister] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., send data to server)
        console.log(loginData);
        // Redirect or display a success message here
    };

    return (
        <Container className="mt-5 mb-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">
                                {isRegister ? 'Register' : 'Login'}
                            </h2>
                            <Form onSubmit={handleSubmit}>
                                {isRegister && (
                                    <Form.Group className="mb-3">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="username"
                                            value={loginData.username}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                )}
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={loginData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={loginData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100 mb-3">
                                    {isRegister ? 'Register' : 'Login'}
                                </Button>
                            </Form>
                            <div className="text-center">
                                {isRegister ? (
                                    <>
                                        <p>Already have an account? <Button variant="link" onClick={() => setIsRegister(false)}>Login</Button></p>
                                    </>
                                ) : (
                                    <>
                                        <p>Don't have an account? <Button variant="link" onClick={() => setIsRegister(true)}>Create an account</Button></p>
                                    </>
                                )}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
