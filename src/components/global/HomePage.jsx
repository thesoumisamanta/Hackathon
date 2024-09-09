import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
    const [hackathons, setHackathons] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredHackathons, setFilteredHackathons] = useState([]);
    const [sortOrder, setSortOrder] = useState('All');
    const [filterLevel, setFilterLevel] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/hackathons.json')
            .then(response => response.json())
            .then(data => {
                setHackathons(data);
                setFilteredHackathons(data);
            })
            .catch(error => console.error('Error fetching hackathons:', error));
    }, []);

    useEffect(() => {
        let filtered = hackathons;

        if (searchQuery) {
            filtered = filtered.filter(hackathon =>
                hackathon.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (filterLevel) {
            filtered = filtered.filter(hackathon => hackathon.level === filterLevel);
        }

        if (filterStatus) {
            const currentDate = new Date();
            if (filterStatus === 'active') {
                filtered = filtered.filter(hackathon =>
                    new Date(hackathon.startDate) <= currentDate && new Date(hackathon.endDate) >= currentDate
                );
            } else if (filterStatus === 'upcoming') {
                filtered = filtered.filter(hackathon => new Date(hackathon.startDate) > currentDate);
            } else if (filterStatus === 'past') {
                filtered = filtered.filter(hackathon => new Date(hackathon.endDate) < currentDate);
            }
        }

        if (sortOrder === 'oldest') {
            filtered.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
        } else if (sortOrder === 'newest') {
            filtered.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
        }

        setFilteredHackathons(filtered);
    }, [searchQuery, filterLevel, filterStatus, sortOrder, hackathons]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleViewDetails = (hackathon) => {
        navigate('/detailsForUser', { state: { hackathon } });
    };

    const renderTimer = (hackathon) => {
        const currentDate = new Date();
        if (new Date(hackathon.startDate) > currentDate) {
            const timeUntilStart = moment(hackathon.startDate).fromNow();
            return <Card.Text>Starts {timeUntilStart}</Card.Text>;
        } else if (new Date(hackathon.endDate) > currentDate) {
            const timeUntilEnd = moment(hackathon.endDate).fromNow();
            return <Card.Text>Ends {timeUntilEnd}</Card.Text>;
        } else {
            return <Card.Text className="text-muted">Ended</Card.Text>;
        }
    };

    return (
        <div className="homepage-container">
            <div className="bg-image text-light d-flex align-items-center" style={{
                backgroundImage: "url('/assets/bg-1.avif')",
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
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Container className="mt-5 text-center mb-5">
                <h1 className='text-center mt-5 mb-5'>Top Hackathons for You</h1>
                <Row>
                    <Col md={8} className="mx-auto">
                        <Form className="d-flex mb-3">
                            <Form.Control
                                type="search"
                                placeholder="Search your preferred hackathon"
                                className="me-2"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <Button variant="primary">Search</Button>
                        </Form>
                        <div className="d-flex justify-content-between mb-3">
                            <Form.Select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder} className="me-2">
                                <option value="All">All</option>
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                            </Form.Select>
                            <Form.Select onChange={(e) => setFilterLevel(e.target.value)} value={filterLevel} className="me-2">
                                <option value="">All Levels</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </Form.Select>
                            <Form.Select onChange={(e) => setFilterStatus(e.target.value)} value={filterStatus} className="me-2">
                                <option value="">All Statuses</option>
                                <option value="active">Active</option>
                                <option value="upcoming">Upcoming</option>
                                <option value="past">Past</option>
                            </Form.Select>
                        </div>
                    </Col>
                </Row>
            </Container>

            <div className="d-flex flex-wrap justify-content-center">
                {filteredHackathons.map((hackathon, index) => (
                    <Card key={index} className="d-flex flex-row m-3" style={{ width: '38rem' }}>
                        <Col md={4} className="p-0" style={{ margin: '1rem' }}>
                            <div className="d-flex align-items-center justify-content-center" style={{ width: '100%', height: '100%' }}>
                                <Card.Img
                                    variant="top"
                                    src={hackathon.image}
                                    style={{
                                        objectFit: 'cover',
                                        width: '100%',
                                        height: '100%',
                                        margin: '1rem'
                                    }}
                                />
                            </div>
                        </Col>
                        <Col md={8} className="d-flex flex-column overflow-hidden">
                            <Card.Body className="flex-grow-1">
                                <Card.Title>{hackathon.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    {new Date(hackathon.startDate).toLocaleDateString()} - {new Date(hackathon.endDate).toLocaleDateString()}
                                </Card.Subtitle>
                                <Card.Text className='mb-0'>
                                    {hackathon.description}
                                </Card.Text>
                                <Card.Text className='mb-0'>
                                    <strong>Level: </strong>{hackathon.level}
                                </Card.Text>
                                {renderTimer(hackathon)}
                                <Button variant="primary" className="me-2 rounded-xl" onClick={() => handleViewDetails(hackathon)}>View Details</Button>
                            </Card.Body>
                        </Col>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
