import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import PageHeader from '../components/common/PageHeader';
import { Plus, Trash } from 'react-bootstrap-icons';

function UnitMembers() {
    const [members, setMembers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        dob: '',
        houseName: '',
        phone: '',
        post: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMembers([...members, { ...formData, id: Date.now() }]);
        setFormData({ fullName: '', dob: '', houseName: '', phone: '', post: '' });
        setShowForm(false);
    };

    const handleDelete = (id) => {
        setMembers(members.filter(member => member.id !== id));
    };

    return (
        <>
            <PageHeader title="Unit Members" subtitle="Manage your unit members" />
            <Container className="py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3>Members List</h3>
                    <Button variant="primary" onClick={() => setShowForm(!showForm)}>
                        <Plus size={20} className="me-1" /> Add Member
                    </Button>
                </div>

                {showForm && (
                    <Card className="mb-4 shadow-sm slide-in-bottom">
                        <Card.Header className="bg-light fw-bold">Add New Member</Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Group controlId="fullName">
                                            <Form.Label>Full Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group controlId="dob">
                                            <Form.Label>Date of Birth</Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="dob"
                                                value={formData.dob}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group controlId="houseName">
                                            <Form.Label>House Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="houseName"
                                                value={formData.houseName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group controlId="phone">
                                            <Form.Label>Phone Number</Form.Label>
                                            <Form.Control
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>

                                    {/* Added Post / Position Field */}
                                    <Col md={6} className="mb-3">
                                        <Form.Group controlId="post">
                                            <Form.Label>Post / Designation (Optional)</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="post"
                                                placeholder="e.g. President, Secretary"
                                                value={formData.post}
                                                onChange={handleInputChange}
                                            />
                                            <Form.Text className="text-muted">
                                                Leave blank if they are a regular member.
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>

                                </Row>
                                <div className="d-flex justify-content-end">
                                    <Button variant="secondary" className="me-2" onClick={() => setShowForm(false)}>Cancel</Button>
                                    <Button variant="primary" type="submit">Save Member</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                )}

                <Card className="shadow-sm border-0">
                    <Card.Body className="p-0">
                        <Table responsive hover className="mb-0">
                            <thead className="bg-light text-secondary">
                                <tr>
                                    <th className="py-3 ps-4">Full Name</th>
                                    <th className="py-3">Position</th>
                                    <th className="py-3">House Name</th>
                                    <th className="py-3">Phone</th>
                                    <th className="py-3 text-end pe-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-5 text-muted">
                                            No members added yet. Click "Add Member" to get started.
                                        </td>
                                    </tr>
                                ) : (
                                    members.map(member => (
                                        <tr key={member.id}>
                                            <td className="ps-4 align-middle fw-bold">{member.fullName}</td>
                                            <td className="align-middle">
                                                {member.post ? (
                                                    <span className="badge bg-primary rounded-pill">{member.post}</span>
                                                ) : (
                                                    <span className="text-muted small">Member</span>
                                                )}
                                            </td>
                                            <td className="align-middle">{member.houseName}</td>
                                            <td className="align-middle">{member.phone}</td>
                                            <td className="text-end pe-4">
                                                <Button variant="link" className="text-danger p-0" onClick={() => handleDelete(member.id)}>
                                                    <Trash size={18} />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default UnitMembers;
