import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { FaGoogle } from 'react-icons/fa';

const LoginPage = () => {
    const [loginData, setLoginData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        rememberMe: false
    });

    const [isRegister, setIsRegister] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setLoginData({
            ...loginData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., send data to server)
        console.log(loginData);
        // Redirect or display a success message here
    };

    return (
        <div>
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh', width: '130vh' }}>
                <Row className="justify-content-center w-100">
                    <Col md={6}>
                        <Card className="shadow">
                            <Card.Body>
                                <h2 className="text-center mb-4">
                                    {isRegister ? 'Register' : 'Login'}
                                </h2>

                                {/* Sign in/up with Google Button */}
                                <div className="d-flex justify-content-center mb-3">
                                    <Button variant="outline-primary" className="me-2">
                                        <FaGoogle /> {isRegister ? 'Sign up with Google' : 'Sign in with Google'}
                                    </Button>
                                </div>

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

                                    {isRegister && (
                                        <Form.Group className="mb-3">
                                            <Form.Label>Confirm Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="confirmPassword"
                                                value={loginData.confirmPassword}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    )}

                                    {!isRegister && (
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <Form.Check
                                                type="checkbox"
                                                label="Remember me"
                                                name="rememberMe"
                                                checked={loginData.rememberMe}
                                                onChange={handleChange}
                                            />
                                            <Button variant="link" className="p-0">Forgot Password?</Button>
                                        </div>
                                    )}

                                    <Button variant="primary" type="submit" className="w-100 mb-3">
                                        {isRegister ? 'Sign up' : 'Login'}
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
        </div>
    );
};

export default LoginPage;
