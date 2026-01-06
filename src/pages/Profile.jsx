import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import PageHeader from '../components/common/PageHeader';
import { Plus, Trash, BoxArrowRight, CalendarEvent, CheckCircle, FileEarmarkText } from 'react-bootstrap-icons';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Member Management State
    const [members, setMembers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        dob: '',
        houseName: '',
        phone: ''
    });

    // Event Registration State
    const [events, setEvents] = useState([
        { id: 1, title: 'Youth Camp 2024', date: '2024-04-15', location: 'Pala', registered: false, registeredMembers: [] },
        { id: 2, title: 'Bible Kalotsavam', date: '2024-05-20', location: 'Kottayam', registered: false, registeredMembers: [] },
        { id: 3, title: 'Leadership Summit', date: '2024-06-10', location: 'Bharananganam', registered: false, registeredMembers: [] },
    ]);

    // Modal State for Event Registration
    const [showModal, setShowModal] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [selectedMembers, setSelectedMembers] = useState([]);

    // Modal State for Proof
    const [showProofModal, setShowProofModal] = useState(false);
    const [proofEvent, setProofEvent] = useState(null);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // --- Member Handlers ---
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
        setFormData({ fullName: '', dob: '', houseName: '', phone: '' });
        setShowForm(false);
    };

    const handleDelete = (id) => {
        setMembers(members.filter(member => member.id !== id));
    };

    // --- Event Registration Handlers ---
    const openRegistrationModal = (eventId) => {
        setSelectedEventId(eventId);
        setSelectedMembers([]);
        setShowModal(true);
    };

    const handleMemberSelect = (memberId) => {
        if (selectedMembers.includes(memberId)) {
            setSelectedMembers(selectedMembers.filter(id => id !== memberId));
        } else {
            setSelectedMembers([...selectedMembers, memberId]);
        }
    };

    const confirmRegistration = () => {
        if (selectedMembers.length === 0) {
            alert("Please select at least one member to register.");
            return;
        }

        setEvents(events.map(event =>
            event.id === selectedEventId
                ? { ...event, registered: true, registeredMembers: selectedMembers }
                : event
        ));
        setShowModal(false);
    };

    // --- Proof View Handler ---
    const viewProof = (event) => {
        const registeredEventMembers = members.filter(m => event.registeredMembers.includes(m.id));
        setProofEvent({ ...event, memberDetails: registeredEventMembers });
        setShowProofModal(true);
    };

    const printProof = () => {
        window.print();
    };

    return (
        <>
            <PageHeader title="Unit Dashboard" subtitle={`Welcome, ${user?.name || 'Unit'}`} />
            <Container className="py-5">

                {/* Dashboard Header */}
                <Card className="mb-5 shadow-sm border-0">
                    <Card.Body className="d-flex justify-content-between align-items-center">
                        <div>
                            <h4 className="fw-bold mb-0 text-primary">{user?.name}</h4>
                            <small className="text-muted">Unit Account</small>
                        </div>
                        <Button variant="outline-danger" onClick={handleLogout}>
                            <BoxArrowRight className="me-2" /> Logout
                        </Button>
                    </Card.Body>
                </Card>

                <Tabs
                    defaultActiveKey="members"
                    id="profile-tabs"
                    className="mb-4"
                    fill
                >
                    {/* --- TAB 1: MEMBERS MANAGEMENT --- */}
                    <Tab eventKey="members" title="Manage Members">
                        <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
                            <h3>Unit Members</h3>
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
                                            <th className="py-3">Date of Birth</th>
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
                                                    <td className="align-middle">{member.dob}</td>
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
                    </Tab>

                    {/* --- TAB 2: EVENT REGISTRATION --- */}
                    <Tab eventKey="events" title="Event Registration">
                        <div className="mt-4">
                            <h3 className="mb-4">Upcoming Events</h3>
                            {members.length === 0 && (
                                <div className="alert alert-warning">
                                    You need to add members in the "Manage Members" tab before you can register for events.
                                </div>
                            )}
                            <Row>
                                {events.map(event => (
                                    <Col md={4} key={event.id} className="mb-4">
                                        <Card className="h-100 shadow-sm border-0 hover-card">
                                            <Card.Body>
                                                <div className="d-flex justify-content-between align-items-start mb-3">
                                                    <div className="bg-light p-2 rounded text-center" style={{ minWidth: '60px' }}>
                                                        <span className="d-block fw-bold text-primary">{new Date(event.date).getDate()}</span>
                                                        <small className="text-uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</small>
                                                    </div>
                                                    {event.registered && <Badge bg="success">Registered</Badge>}
                                                </div>
                                                <Card.Title className="fw-bold fs-5">{event.title}</Card.Title>
                                                <Card.Text className="text-muted mb-4">
                                                    <CalendarEvent className="me-2" />
                                                    {new Date(event.date).toLocaleDateString()} <br />
                                                    <small>{event.location}</small>
                                                </Card.Text>

                                                {event.registered ? (
                                                    <div>
                                                        <Button variant="outline-success" className="w-100 rounded-pill mb-2" disabled>
                                                            <CheckCircle className="me-2" /> Registered ({event.registeredMembers.length})
                                                        </Button>
                                                        <Button
                                                            variant="link"
                                                            className="w-100 text-decoration-none"
                                                            onClick={() => viewProof(event)}
                                                        >
                                                            <FileEarmarkText className="me-1" /> View Receipt
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <Button
                                                        variant="primary"
                                                        className="w-100 rounded-pill"
                                                        onClick={() => openRegistrationModal(event.id)}
                                                        disabled={members.length === 0}
                                                    >
                                                        Register Members
                                                    </Button>
                                                )}
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </Tab>
                </Tabs>

                {/* Registration Modal */}
                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Select Members to Register</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className="text-muted mb-3">Please select the members who will be attending this event.</p>
                        {members.length > 0 ? (
                            <Form>
                                {members.map(member => (
                                    <div key={member.id} className="mb-2 p-2 border rounded d-flex align-items-center bg-light">
                                        <Form.Check
                                            type="checkbox"
                                            id={`member-${member.id}`}
                                            label={
                                                <div>
                                                    <strong>{member.fullName}</strong>
                                                    <div className="small text-muted">{member.phone}</div>
                                                </div>
                                            }
                                            checked={selectedMembers.includes(member.id)}
                                            onChange={() => handleMemberSelect(member.id)}
                                            className="w-100 mb-0"
                                        />
                                    </div>
                                ))}
                            </Form>
                        ) : (
                            <p className="text-danger">No members found. Please add members first.</p>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={confirmRegistration} disabled={selectedMembers.length === 0}>
                            Confirm Registration
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Registration Proof/Receipt Modal */}
                <Modal show={showProofModal} onHide={() => setShowProofModal(false)} size="lg" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Registration Receipt</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="p-4" id="printable-area">
                        {proofEvent && (
                            <div className="border p-4 rounded bg-white">
                                <div className="text-center mb-4 border-bottom pb-3">
                                    <h2 className="text-primary fw-bold">SMYM Eparchy of Palai</h2>
                                    <h4 className="text-uppercase mb-2">{proofEvent.title}</h4>
                                    <p className="text-muted mb-0">
                                        <strong>Date:</strong> {new Date(proofEvent.date).toLocaleDateString()} |
                                        <strong> Location:</strong> {proofEvent.location}
                                    </p>
                                </div>

                                <div className="mb-4">
                                    <h5 className="fw-bold">Unit Details</h5>
                                    <p>
                                        <strong>Unit Name:</strong> {user?.name}
                                    </p>
                                </div>

                                <div>
                                    <h5 className="fw-bold mb-3">Registered Members List</h5>
                                    <Table bordered size="sm">
                                        <thead className="bg-light">
                                            <tr>
                                                <th>#</th>
                                                <th>Full Name</th>
                                                <th>House Name</th>
                                                <th>Phone</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {proofEvent.memberDetails && proofEvent.memberDetails.map((member, index) => (
                                                <tr key={member.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{member.fullName}</td>
                                                    <td>{member.houseName}</td>
                                                    <td>{member.phone}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>

                                <div className="mt-5 text-end pt-3 text-muted small">
                                    <p>Generated on: {new Date().toLocaleString()}</p>
                                </div>
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowProofModal(false)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={printProof}>
                            <FileEarmarkText className="me-2" /> Print Receipt
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Container>
        </>
    );
}

export default Profile;
