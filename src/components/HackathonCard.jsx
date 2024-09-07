import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Card, Button, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const HackathonCard = () => {
    const [hackathons, setHackathons] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredHackathons, setFilteredHackathons] = useState([]);
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
        if (searchQuery) {
            const filtered = hackathons.filter(hackathon =>
                hackathon.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredHackathons(filtered);
        } else {
            setFilteredHackathons(hackathons);
        }
    }, [searchQuery, hackathons]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleViewDetails = (hackathon) => {
        navigate('/details', { state: { hackathon } });
    };

    


    return (
        <div>
            
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
                                <Badge bg={getBadgeColor(hackathon.level)} className="mb-2">
                                    {hackathon.level}
                                </Badge>
                                <Card.Text>
                                    {hackathon.description}
                                </Card.Text>
                                <Button variant="primary" onClick={() => handleViewDetails(hackathon)}>View Details</Button>
                                <Button href="/" variant="primary" className="me-2 mb-3">Back to Hackathons</Button>
                               
                            </Card.Body>
                        </Col>
                    </Card>
                ))}
            </div>
        </div>
    );
};


export default HackathonCard;
