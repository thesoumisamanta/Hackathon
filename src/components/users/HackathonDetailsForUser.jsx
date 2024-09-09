import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Button, Row, Col, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const HackathonDetailsForUser = () => {
    const [hackathons, setHackathons] = useState([]);
    const [filteredHackathons, setFilteredHackathons] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const { hackathon } = location.state || {};

    if (!hackathon) {
        return <div>No hackathon data found.</div>;
    }



    const handleJoinClick = (hackathon) => {
        navigate('/register', { state: { hackathon } });
    };

    


    return (
        <Container className="mt-5 text-center">
            <Row className="justify-content-center">
                <Col md={8}>
                    <h1>{hackathon.name}</h1>
                    <p><strong>Start Date:</strong> {new Date(hackathon.startDate).toLocaleDateString()}</p>
                    <p><strong>End Date:</strong> {new Date(hackathon.endDate).toLocaleDateString()}</p>
                    <p><strong>Status:</strong> {hackathon.status}</p>
                    <p><strong>Description:</strong> {hackathon.description}</p>
                    <p><strong>Location:</strong> {hackathon.location}</p>
                    <p><strong>Registration Deadline:</strong> {new Date(hackathon.registrationDeadline).toLocaleDateString()}</p>
                    <p><strong>Participants:</strong> {hackathon.participants}</p>
                    <p><strong>Website:</strong> <a href={hackathon.website} target="_blank"
                        rel="noopener noreferrer">{hackathon.website}</a></p>
                    <p><strong>Contact Email:</strong> <a href={`mailto:${hackathon.contactEmail}`}>{hackathon.contactEmail}</a></p>

                    <h4>Prizes</h4>
                    <ListGroup className="mx-auto mb-3" style={{ maxWidth: '500px' }}>
                        {hackathon.prizes.map((prize, index) => (
                            <ListGroup.Item key={index}>{prize}</ListGroup.Item>
                        ))}
                    </ListGroup>

                    <h4>Organizers</h4>
                    <ListGroup className="mx-auto mb-3" style={{ maxWidth: '500px' }}>
                        {hackathon.organizers.map((org, index) => (
                            <ListGroup.Item key={index}>
                                <a href={org.website} target="_blank" rel="noopener noreferrer">{org.name}</a>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                    <h4>Sponsors</h4>
                    <ListGroup className="mx-auto mb-3" style={{ maxWidth: '500px' }}>
                        {hackathon.sponsors.map((sponsor, index) => (
                            <ListGroup.Item key={index}>{sponsor}</ListGroup.Item>
                        ))}
                    </ListGroup>

                    <h4>Tags</h4>
                    <p>{hackathon.tags.join(', ')}</p>

                    <h4>Rules</h4>
                    <p>{hackathon.rules}</p>

                    <h4>Submission Requirements</h4>
                    <p>{hackathon.submissionRequirements}</p>


                    <Button variant="success" className="me-2 mb-4" onClick={() => handleJoinClick(hackathon)}>
                        Join Hackathon
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default HackathonDetailsForUser;


















