import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Container, Button, Row, Col, ListGroup } from 'react-bootstrap';

const HackathonDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { hackathon } = location.state || {};

    if (!hackathon) {
        return <div>No hackathon data found.</div>;
    }

    const handleEdit = () => {
        // Navigate to the EditHackathon page with the hackathon data in state
        navigate('/edit-hackathon', { state: { hackathon } });
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this hackathon?")) {
            // Perform delete operation here
            navigate('/organizers');
        }
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
                    <p><strong>Website:</strong> <a href={hackathon.website} target="_blank" rel="noopener noreferrer">{hackathon.website}</a></p>
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

                    <Button variant="primary" className="me-2 mb-4" onClick={handleEdit}>
                        Edit
                    </Button>
                    <Button className="mb-4" variant="danger" onClick={() => handleDelete(hackathon.id)}>
                        Delete
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default HackathonDetails;
