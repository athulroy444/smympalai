import { useState, useEffect } from 'react';
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
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const {
        foronaList,
        updateUnitExecutives,
        fetchMembers,
        addMember,
        deleteMember,
        fetchEvents,
        registerForEvent,
        fetchRegistrations
    } = useData();

    // Find the logged-in unit's details (kept for legacy unit executive logic)
    const findMyUnit = () => {
        if (!user || user.role !== 'unit') return { forona: null, unit: null };
        for (const forona of foronaList) {
            const unit = forona.units.find(u => u.name === user.name);
            if (unit) return { forona, unit };
        }
        return { forona: null, unit: null };
    };

    const { forona: myForona, unit: myUnit } = findMyUnit();

    // --- STATES ---

    // Member State
    const [members, setMembers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ fullName: '', dob: '', houseName: '', phone: '' });

    // Executive State (Legacy)
    const [executives, setExecutives] = useState(myUnit?.executives || []);
    const [showExecForm, setShowExecForm] = useState(false);
    const [execFormData, setExecFormData] = useState({ name: '', post: '' });

    // Event State
    const [events, setEvents] = useState([]); // Fetched from DB
    const [registrations, setRegistrations] = useState([]); // Fetched from DB

    // Modal State
    const [showModal, setShowModal] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [showProofModal, setShowProofModal] = useState(false);
    const [proofEvent, setProofEvent] = useState(null);

    // --- EFFECTS ---

    // 1. Fetch Members on Load (if user is unit)
    useEffect(() => {
        const loadMembers = async () => {
            if (user?.role === 'unit' && user?.entityId) {
                // If we have entityId (unit id), fetch members
                // Note: Auth might need to return entityId. 
                // Currently user object in AuthContext only has name.
                // Assuming we stored it, or using a fallback. 
                // For now, let's assume we can fetch by name or pass ID if available.
                // Since my updated AuthContext returned entityId, use it.
                if (user.entityId) {
                    const data = await fetchMembers(user.entityId);
                    setMembers(data);
                }
            }
        };
        loadMembers();
    }, [user, fetchMembers]);

    // 2. Fetch Events & Registrations
    useEffect(() => {
        const loadEventsAndRegs = async () => {
            if (user?.role === 'unit') {
                const eventData = await fetchEvents();
                setEvents(eventData);

                if (user.entityId) {
                    const regData = await fetchRegistrations(user.entityId);
                    setRegistrations(regData);
                }
            }
        };
        loadEventsAndRegs();
    }, [user, fetchEvents, fetchRegistrations]);

    // 3. Sync Executives (Legacy)
    useEffect(() => {
        if (myUnit) {
            setExecutives(myUnit.executives || []);
        }
    }, [myUnit]);


    // --- HANDLERS ---

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Member Handlers
    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user?.entityId) return alert("Unit ID missing. Relogin.");

        const newMember = await addMember({ ...formData, unitId: user.entityId });
        if (newMember) {
            setMembers([...members, newMember]);
            setFormData({ fullName: '', dob: '', houseName: '', phone: '' });
            setShowForm(false);
        } else {
            alert("Failed to add member.");
        }
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure?")) {
            const success = await deleteMember(id);
            if (success) {
                setMembers(members.filter(m => m.id !== id));
            } else {
                alert("Failed to delete member.");
            }
        }
    };

    // Executive Handlers (Legacy Local Search Sync)
    const handleExecInputChange = (e) => setExecFormData({ ...execFormData, [e.target.name]: e.target.value });
    const syncExecutivesGlobal = (newExecutives) => {
        if (myForona && myUnit) {
            updateUnitExecutives(myForona.name, myUnit.name, newExecutives);
        }
    };
    const handleExecSubmit = (e) => {
        e.preventDefault();
        const newExecs = [...executives, { ...execFormData, id: Date.now() }];
        setExecutives(newExecs);
        syncExecutivesGlobal(newExecs);
        setExecFormData({ name: '', post: '' });
        setShowExecForm(false);
    };
    const handleExecDelete = (id) => {
        const newExecs = executives.filter(ex => ex.id !== id);
        setExecutives(newExecs);
        syncExecutivesGlobal(newExecs);
    };

    // Event Registration Handlers
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

    const confirmRegistration = async () => {
        if (selectedMembers.length === 0) {
            alert("Please select at least one member to register.");
            return;
        }

        const success = await registerForEvent({
            eventId: selectedEventId,
            memberIds: selectedMembers,
            unitId: user.entityId // Ensure this exists from login
        });

        if (success) {
            alert("Registration Successful!");
            // Refresh registrations
            const regData = await fetchRegistrations(user.entityId);
            setRegistrations(regData);
            setShowModal(false);
        } else {
            alert("Registration Failed.");
        }
    };

    // Check if event is registered (simple check if any member registered)
    const getRegistrationCount = (eventId) => {
        return registrations.filter(r => r.event_id === eventId).length;
    };

    const isRegistered = (eventId) => {
        return getRegistrationCount(eventId) > 0;
    };

    // View Proof
    const viewProof = (event) => {
        // Find members who registered for this event
        const registeredMemberIds = registrations
            .filter(r => r.event_id === event.id)
            .map(r => r.member_id);

        const registeredEventMembers = members.filter(m => registeredMemberIds.includes(m.id));
        setProofEvent({ ...event, memberDetails: registeredEventMembers });
        setShowProofModal(true);
    };

    const printProof = () => window.print();

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

                <Tabs defaultActiveKey="members" id="profile-tabs" className="mb-4" fill>

                    {/* --- TAB 1: MANAGING MEMBERS --- */}
                    <Tab eventKey="members" title="Manage Members">

                        {/* Unit Executives (Attributes to Mock Data / Search) */}
                        <div className="d-flex justify-content-between align-items-center mb-3 mt-4">
                            <h3 className="text-primary">Unit Executives</h3>
                            {!myForona && <small className="text-danger ms-2">(Not synced to search)</small>}
                            <Button variant="outline-primary" onClick={() => setShowExecForm(!showExecForm)}>
                                <Plus size={20} className="me-1" /> Add Executive
                            </Button>
                        </div>

                        {showExecForm && (
                            <Card className="mb-4 shadow-sm slide-in-bottom border-primary">
                                <Card.Header className="bg-primary text-white fw-bold">Add Link Executive</Card.Header>
                                <Card.Body>
                                    <Form onSubmit={handleExecSubmit}>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Control placeholder="Name" name="name" value={execFormData.name} onChange={handleExecInputChange} required />
                                            </Col>
                                            <Col md={6}>
                                                <Form.Control placeholder="Post" name="post" value={execFormData.post} onChange={handleExecInputChange} required />
                                            </Col>
                                        </Row>
                                        <div className="mt-3 text-end"><Button type="submit">Save</Button></div>
                                    </Form>
                                </Card.Body>
                            </Card>
                        )}
                        <div className="row mb-5">
                            {executives.map(exec => (
                                <Col md={4} key={exec.id} className="mb-3">
                                    <Card className="h-100 shadow-sm border-0">
                                        <Card.Body className="d-flex justify-content-between">
                                            <div><strong>{exec.name}</strong><br /><small>{exec.post}</small></div>
                                            <Button variant="link" className="text-danger" onClick={() => handleExecDelete(exec.id)}><Trash /></Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </div>

                        <hr className="my-5" />

                        {/* General Members (Backend Connected) */}
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h3>General Members</h3>
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
                                                <Form.Label>Full Name</Form.Label>
                                                <Form.Control type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
                                            </Col>
                                            <Col md={6} className="mb-3">
                                                <Form.Label>Date of Birth</Form.Label>
                                                <Form.Control type="date" name="dob" value={formData.dob} onChange={handleInputChange} required />
                                            </Col>
                                            <Col md={6} className="mb-3">
                                                <Form.Label>House Name</Form.Label>
                                                <Form.Control type="text" name="houseName" value={formData.houseName} onChange={handleInputChange} required />
                                            </Col>
                                            <Col md={6} className="mb-3">
                                                <Form.Label>Phone</Form.Label>
                                                <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required />
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
                            <Table responsive hover className="mb-0">
                                <thead className="bg-light">
                                    <tr>
                                        <th className="ps-4">Full Name</th>
                                        <th>Date of Birth</th>
                                        <th>House Name</th>
                                        <th>Phone</th>
                                        <th className="text-end pe-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {members.length === 0 ? (
                                        <tr><td colSpan="5" className="text-center py-5 text-muted">No members found.</td></tr>
                                    ) : (
                                        members.map(member => (
                                            <tr key={member.id}>
                                                <td className="ps-4 fw-bold">{member.fullName || member.full_name}</td>
                                                <td>{member.dob ? new Date(member.dob).toLocaleDateString() : ''}</td>
                                                <td>{member.houseName || member.house_name}</td>
                                                <td>{member.phone}</td>
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
                        </Card>
                    </Tab>

                    {/* --- TAB 2: EVENT REGISTRATION --- */}
                    <Tab eventKey="events" title="Event Registration">
                        <div className="mt-4">
                            <h3 className="mb-4">Upcoming Events</h3>
                            {members.length === 0 && <div className="alert alert-warning">Add members first.</div>}

                            <Row>
                                {events.map(event => {
                                    const registeredCount = getRegistrationCount(event.id);
                                    const registered = registeredCount > 0;

                                    return (
                                        <Col md={4} key={event.id} className="mb-4">
                                            <Card className="h-100 shadow-sm border-0 hover-card">
                                                <Card.Body>
                                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                                        <div className="bg-light p-2 rounded text-center" style={{ minWidth: '60px' }}>
                                                            <span className="d-block fw-bold text-primary">{new Date(event.event_date).getDate()}</span>
                                                            <small className="text-uppercase">{new Date(event.event_date).toLocaleString('default', { month: 'short' })}</small>
                                                        </div>
                                                        {registered && <Badge bg="success">Registered</Badge>}
                                                    </div>
                                                    <Card.Title className="fw-bold fs-5">{event.title}</Card.Title>
                                                    <Card.Text className="text-muted mb-4">
                                                        <CalendarEvent className="me-2" />
                                                        {new Date(event.event_date).toLocaleDateString()} <br />
                                                        <small>{event.location}</small>
                                                    </Card.Text>

                                                    {registered ? (
                                                        <div>
                                                            <Button variant="outline-success" className="w-100 rounded-pill mb-2" disabled>
                                                                <CheckCircle className="me-2" /> Registered ({registeredCount})
                                                            </Button>
                                                            <Button variant="link" className="w-100 text-decoration-none" onClick={() => viewProof(event)}>
                                                                <FileEarmarkText className="me-1" /> View Receipt
                                                            </Button>
                                                        </div>
                                                    ) : (
                                                        <Button variant="primary" className="w-100 rounded-pill" onClick={() => openRegistrationModal(event.id)} disabled={members.length === 0}>
                                                            Register Members
                                                        </Button>
                                                    )}
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    );
                                })}
                                {events.length === 0 && <p className="text-center text-muted col-12">No upcoming events found.</p>}
                            </Row>
                        </div>
                    </Tab>
                </Tabs>

                {/* Registration Modal */}
                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                    <Modal.Header closeButton><Modal.Title>Select Members</Modal.Title></Modal.Header>
                    <Modal.Body>
                        <p className="text-muted mb-3">Select members attending this event.</p>
                        {members.length > 0 ? (
                            <Form>
                                {members.map(member => (
                                    <div key={member.id} className="mb-2 p-2 border rounded d-flex align-items-center bg-light">
                                        <Form.Check
                                            type="checkbox"
                                            id={`member-${member.id}`}
                                            label={<strong>{member.fullName || member.full_name}</strong>}
                                            checked={selectedMembers.includes(member.id)}
                                            onChange={() => handleMemberSelect(member.id)}
                                            className="w-100 mb-0"
                                        />
                                    </div>
                                ))}
                            </Form>
                        ) : <p className="text-danger">No members found.</p>}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                        <Button variant="primary" onClick={confirmRegistration} disabled={selectedMembers.length === 0}>Confirm</Button>
                    </Modal.Footer>
                </Modal>

                {/* Proof Modal */}
                <Modal show={showProofModal} onHide={() => setShowProofModal(false)} size="lg" centered>
                    <Modal.Header closeButton><Modal.Title>Registration Receipt</Modal.Title></Modal.Header>
                    <Modal.Body className="p-4" id="printable-area">
                        {proofEvent && (
                            <div className="border p-4 rounded bg-white">
                                <h2 className="text-center text-primary mb-3">SMYM Eparchy of Palai</h2>
                                <h4 className="text-center mb-4">{proofEvent.title}</h4>
                                <Table bordered>
                                    <thead><tr><th>#</th><th>Name</th><th>Phone</th></tr></thead>
                                    <tbody>
                                        {proofEvent.memberDetails?.map((m, i) => (
                                            <tr key={m.id}><td>{i + 1}</td><td>{m.fullName || m.full_name}</td><td>{m.phone}</td></tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowProofModal(false)}>Close</Button>
                        <Button variant="primary" onClick={printProof}>Print</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
}

export default Profile;
