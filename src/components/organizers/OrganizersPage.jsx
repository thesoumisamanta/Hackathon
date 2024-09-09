import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Link, NavLink } from 'react-router-dom';

const OrganizersPage = () => {
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
        // Filter and sort hackathons
        let filtered = hackathons;

        
        // window.scrollTo(0, 0);  // This will scroll to the top when the component is mounted
       

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(hackathon =>
                hackathon.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filter by level
        if (filterLevel) {
            filtered = filtered.filter(hackathon => hackathon.level === filterLevel);
        }

        // Filter by status (active, upcoming, past)
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

        // Sort hackathons by date (newest first/oldest first) only if sortOrder is not 'All'
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
        navigate('/details', { state: { hackathon } });
    };

    const handleJoinClick = () => {
        navigate('/register', { state: { hackathon } });
    };


    const renderTimer = (hackathon) => {
        const currentDate = new Date();
        if (new Date(hackathon.startDate) > currentDate) {
            // Upcoming hackathon
            const timeUntilStart = moment(hackathon.startDate).fromNow();
            return <Card.Text>Starts {timeUntilStart}</Card.Text>;
        } else if (new Date(hackathon.endDate) > currentDate) {
            // Active hackathon
            const timeUntilEnd = moment(hackathon.endDate).fromNow();
            return <Card.Text>Ends {timeUntilEnd}</Card.Text>;
        } else {
            // Past hackathon
            return <Card.Text className="text-muted">Ended</Card.Text>;
        }
    };


    return (
        <div>
            <h1 className='text-center mt-5 mb-5'>Manage Your Hackathons</h1>
            <Container className="mt-5 text-center mb-5">
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
                            <Button variant="primary">
                                Search
                            </Button>
                            
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
                            <Button
                                variant="primary"
                                style={{
                                    height: 'calc(1.5em + .75rem + 2px)', 
                                    padding: '0.375rem 1.75rem',        
                                    borderRadius: '0.25rem',              
                                    border: '1px solid #ced4da',                        
                                    fontSize: '1rem',                     // Matching font size
                                    lineHeight: '1.5',
                                    whiteSpace: 'nowrap',                 // Prevent text from wrapping
                                    width: '14rem'                        // Increase width as needed
                                }}
                                as={Link}
                                to="/hackathonForm"
                            >
                                + Create hackathon
                            </Button>

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
                                {/* <Button className="mb-3" variant="success" onClick={handleJoinClick}>Join Hackathon</Button> */}
                            </Card.Body>
                        </Col>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default OrganizersPage;
