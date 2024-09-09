import React, { useState } from 'react';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterForHackathon = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        teamInfo: '',
        experienceLevel: '',
        projectIdea: '',
        eligibility: false,
        terms: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form Data Submitted:', formData);
    };

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">Register for Hackathon</h1>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="formTeamInfo" className="mt-3">
                    <Form.Label>Team Information</Form.Label>
                    <Form.Control
                        type="text"
                        name="teamInfo"
                        value={formData.teamInfo}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formExperienceLevel" className="mt-3">
                    <Form.Label>Experience Level</Form.Label>
                    <Form.Control
                        as="select"
                        name="experienceLevel"
                        value={formData.experienceLevel}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Level</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formProjectIdea" className="mt-3">
                    <Form.Label>Project Idea</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="projectIdea"
                        value={formData.projectIdea}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formEligibility" className="mt-3">
                    <Form.Check
                        type="checkbox"
                        name="eligibility"
                        label="I have read and agree to the eligibility requirements for this hackathon: Above legal age of majority in country of residence, All countries/territories, excluding standard exceptions."
                        checked={formData.eligibility}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formTerms" className="mt-3">
                    <Form.Check
                        type="checkbox"
                        name="terms"
                        label="I have read and agree to be bound by the Official Rules and the Devpost Terms of Service."
                        checked={formData.terms}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-4 mb-3">
                    Register
                </Button>
            </Form>
        </Container>
    );
};

export default RegisterForHackathon;
