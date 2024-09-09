import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const EditHackathon = ({ hackathons, setHackathons }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { hackathon } = location.state || {};

    const [name, setName] = useState(hackathon?.name || '');
    const [description, setDescription] = useState(hackathon?.description || '');
    const [startDate, setStartDate] = useState(hackathon?.startDate || '');
    const [endDate, setEndDate] = useState(hackathon?.endDate || '');
    const [level, setLevel] = useState(hackathon?.level || '');

    useEffect(() => {
        if (hackathon) {
            setName(hackathon.name);
            setDescription(hackathon.description);
            setStartDate(hackathon.startDate);
            setEndDate(hackathon.endDate);
            setLevel(hackathon.level);
        }
    }, [hackathon]);

    const handleSave = () => {
        if (!name || !description || !startDate || !endDate || !level) {
            alert('All fields are required.');
            return;
        }

        // Update the specific hackathon in the global state
        const updatedHackathons = hackathons.map(h =>
            h.id === hackathon.id
                ? { ...h, name, description, startDate, endDate, level }
                : h
        );
        setHackathons(updatedHackathons); // Update global state with edited data

        alert('Hackathon updated successfully!');
        navigate('/organizers'); // Redirect to organizers page after saving
    };

    return (
        <div className="container mt-5">
            <h1>Edit Hackathon</h1>
            <Form>
                <Form.Group>
                    <Form.Label>Hackathon Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Level</Form.Label>
                    <Form.Control
                        type="text"
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" onClick={handleSave} className="mt-3 mb-4">
                    Save
                </Button>
            </Form>
        </div>
    );
};

export default EditHackathon;
