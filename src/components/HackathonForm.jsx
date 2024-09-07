import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HackathonForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        startDate: '',
        endDate: '',
        status: '',
        description: '',
        location: '',
        registrationDeadline: '',
        participants: '',
        website: '',
        contactEmail: '',
        prizes: [],
        organizers: [],
        sponsors: [],
        tags: '',
        rules: '',
        submissionRequirements: '',
    });

    const [showFlashMessage, setShowFlashMessage] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handlePrizesChange = (e, index) => {
        const newPrizes = [...formData.prizes];
        newPrizes[index] = e.target.value;
        setFormData({ ...formData, prizes: newPrizes });
    };

    const handleOrganizersChange = (e, index) => {
        const newOrganizers = [...formData.organizers];
        newOrganizers[index] = e.target.value;
        setFormData({ ...formData, organizers: newOrganizers });
    };

    const handleSponsorsChange = (e, index) => {
        const newSponsors = [...formData.sponsors];
        newSponsors[index] = e.target.value;
        setFormData({ ...formData, sponsors: newSponsors });
    };

    const addField = (field) => {
        setFormData({ ...formData, [field]: [...formData[field], ''] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., send data to server)
        console.log(formData);

        // Show flash message
        setShowFlashMessage(true);

        // Hide flash message after 3 seconds
        setTimeout(() => {
            setShowFlashMessage(false);
            navigate('/organizers'); // Redirect after submission if needed
        }, 3000);
    };

    return (
        <Container className="mt-5">
            <h2>Create Hackathon</h2>

            {/* Flash message */}
            {showFlashMessage && (
                <Alert variant="success">
                    A new hackathon has been created!
                </Alert>
            )}


            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                        type="text"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Registration Deadline</Form.Label>
                    <Form.Control
                        type="date"
                        name="registrationDeadline"
                        value={formData.registrationDeadline}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Participants</Form.Label>
                    <Form.Control
                        type="text"
                        name="participants"
                        value={formData.participants}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Website</Form.Label>
                    <Form.Control
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Contact Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Prizes</Form.Label>
                    {formData.prizes.map((prize, index) => (
                        <Form.Control
                            key={index}
                            type="text"
                            value={prize}
                            onChange={(e) => handlePrizesChange(e, index)}
                            placeholder={`Prize ${index + 1}`}
                            className="mb-2"
                        />
                    ))}
                    <Button variant="outline-primary" onClick={() => addField('prizes')}>
                        Add Prize
                    </Button>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Organizers</Form.Label>
                    {formData.organizers.map((organizer, index) => (
                        <Form.Control
                            key={index}
                            type="text"
                            value={organizer}
                            onChange={(e) => handleOrganizersChange(e, index)}
                            placeholder={`Organizer ${index + 1}`}
                            className="mb-2"
                        />
                    ))}
                    <Button variant="outline-primary" onClick={() => addField('organizers')}>
                        Add Organizer
                    </Button>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Sponsors</Form.Label>
                    {formData.sponsors.map((sponsor, index) => (
                        <Form.Control
                            key={index}
                            type="text"
                            value={sponsor}
                            onChange={(e) => handleSponsorsChange(e, index)}
                            placeholder={`Sponsor ${index + 1}`}
                            className="mb-2"
                        />
                    ))}
                    <Button variant="outline-primary" onClick={() => addField('sponsors')}>
                        Add Sponsor
                    </Button>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Tags</Form.Label>
                    <Form.Control
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        placeholder="Comma separated tags"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Rules</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="rules"
                        value={formData.rules}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Submission Requirements</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="submissionRequirements"
                        value={formData.submissionRequirements}
                        onChange={handleChange}
                    />
                </Form.Group>


                {/* Organizers, Sponsors, Tags, etc. */}
                <Button className='mb-4' variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

export default HackathonForm;




















































   