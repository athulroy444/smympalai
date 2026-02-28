import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Tab, Tabs, Badge, Modal } from 'react-bootstrap';
import { Plus, Trash, BoxArrowRight, CalendarEvent, CheckCircle, FileEarmarkText, PersonBadge, People, Building } from 'react-bootstrap-icons';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';

function Profile() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const {
        foronaList, updateExecutivesDirectly, fetchMembers,
        addMember, deleteMember, fetchEvents,
        registerForEvent, fetchRegistrations
    } = useData();

    const [members, setMembers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ fullName: '', dob: '', houseName: '', phone: '' });
    const [executives, setExecutives] = useState([]);
    const [showExecForm, setShowExecForm] = useState(false);
    const [execFormData, setExecFormData] = useState({ name: '', post: '' });
    const [events, setEvents] = useState([]);
    const [registrations, setRegistrations] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [showProofModal, setShowProofModal] = useState(false);
    const [proofEvent, setProofEvent] = useState(null);

    // Parish Activities
    const [unitActivities, setUnitActivities] = useState([]);
    const [showActivityForm, setShowActivityForm] = useState(false);
    const [activityFormData, setActivityFormData] = useState({ title: '', description: '', date: '' });
    const { fetchUnitActivities, addUnitActivity, deleteUnitActivity } = useData();

    // --- EFFECTS ---
    useEffect(() => {
        const loadInitialData = async () => {
            if (user?.role === 'unit' && user?.entityId) {
                const [memberData, eventData, regData, actData] = await Promise.all([
                    fetchMembers(user.entityId),
                    fetchEvents(),
                    fetchRegistrations(user.entityId),
                    fetchUnitActivities(user.entityId)
                ]);
                setMembers(memberData);
                setEvents(eventData);
                setRegistrations(regData);
                setUnitActivities(actData);

                // Find executives for this specific unit ID
                let foundExecs = [];
                for (const forona of foronaList) {
                    const unit = forona.units.find(u => u.id === user.entityId);
                    if (unit) {
                        foundExecs = unit.executives || [];
                        break;
                    }
                }
                setExecutives(foundExecs);
            }
        };
        loadInitialData();
    }, [user, fetchMembers, fetchEvents, fetchRegistrations, foronaList]);

    // --- HANDLERS ---
    const handleLogout = () => { logout(); navigate('/'); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newMember = await addMember({ ...formData, unitId: user.entityId });
        if (newMember) {
            setMembers([...members, newMember]);
            setFormData({ fullName: '', dob: '', houseName: '', phone: '' });
            setShowForm(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Permanently delete this member?")) {
            const success = await deleteMember(id);
            if (success) setMembers(members.filter(m => m.id !== id));
        }
    };

    const handleExecSubmit = async (e) => {
        e.preventDefault();
        const newExecs = [...executives, { ...execFormData, id: Date.now() }];
        const success = await updateExecutivesDirectly('unit', user.entityId, newExecs);
        if (success) {
            setExecutives(newExecs);
            setExecFormData({ name: '', post: '' });
            setShowExecForm(false);
        }
    };

    const handleExecDelete = async (id) => {
        if (window.confirm("Delete this executive?")) {
            const newExecs = executives.filter(ex => ex.id !== id);
            const success = await updateExecutivesDirectly('unit', user.entityId, newExecs);
            if (success) setExecutives(newExecs);
        }
    };

    const confirmRegistration = async () => {
        const success = await registerForEvent({
            eventId: selectedEventId,
            memberIds: selectedMembers,
            unitId: user.entityId
        });
        if (success) {
            const regData = await fetchRegistrations(user.entityId);
            setRegistrations(regData);
            setShowModal(false);
        }
    };

    const handleActivitySubmit = async (e) => {
        e.preventDefault();
        const result = await addUnitActivity({ ...activityFormData, unitId: user.entityId });
        if (result) {
            setUnitActivities([result, ...unitActivities]);
            setActivityFormData({ title: '', description: '', date: '' });
            setShowActivityForm(false);
        }
    };

    const handleDeleteActivity = async (id) => {
        if (window.confirm("Delete this activity report?")) {
            const success = await deleteUnitActivity(id);
            if (success) setUnitActivities(unitActivities.filter(a => a.id !== id));
        }
    };

    const getRegistrationCount = (eventId) => registrations.filter(r => r.event_id === eventId).length;

    return (
        <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <style>{`
                .nav-tabs .nav-link { border: none; color: #6c757d; font-weight: 500; padding: 1rem 1.5rem; }
                .nav-tabs .nav-link.active { color: #0d6efd; border-bottom: 3px solid #0d6efd; background: transparent; }
                .glass-card { background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px); border-radius: 15px; }
                .hover-card { transition: transform 0.2s; }
                .hover-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important; }
                .action-btn { border-radius: 8px; font-weight: 600; }
                .receipt-table { font-size: 0.9rem; }
            `}</style>

            <PageHeader title="Unit Workspace" subtitle="Manage your members and event participation" />

            <Container className="py-4">
                {/* --- HEADER SECTION --- */}
                <Card className="mb-4 shadow-sm border-0 glass-card">
                    <Card.Body className="p-4 d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <div className="bg-primary text-white p-3 rounded-circle me-3">
                                <Building size={24} />
                            </div>
                            <div>
                                <h4 className="fw-bold mb-0">{user?.name}</h4>
                                <Badge bg="primary-soft" className="text-primary border border-primary-subtle mt-1">
                                    Official Unit Portal
                                </Badge>
                            </div>
                        </div>
                        <Button variant="outline-danger" className="action-btn" onClick={handleLogout}>
                            <BoxArrowRight className="me-2" /> Sign Out
                        </Button>
                    </Card.Body>
                </Card>

                {/* --- CONTENT TABS --- */}
                <Tabs defaultActiveKey="members" className="mb-4 custom-tabs">
                    <Tab eventKey="members" title={<><People className="me-2" />Members & Team</>}>

                        {/* Unit Executives Section */}
                        <div className="d-flex justify-content-between align-items-center mb-3 mt-4">
                            <h5 className="fw-bold"><PersonBadge className="me-2 text-primary" />Unit Executives</h5>
                            <Button variant="primary" size="sm" className="action-btn" onClick={() => setShowExecForm(true)}>
                                <Plus size={18} /> New Executive
                            </Button>
                        </div>

                        <Row className="mb-4">
                            {executives.map(exec => (
                                <Col md={3} key={exec.id} className="mb-3">
                                    <Card className="border-0 shadow-sm h-100 bg-white">
                                        <Card.Body className="d-flex align-items-center justify-content-between py-2">
                                            <div className="overflow-hidden">
                                                <div className="fw-bold text-truncate" style={{ maxWidth: '150px' }}>{exec.name}</div>
                                                <div className="text-muted x-small" style={{ fontSize: '0.75rem' }}>{exec.post}</div>
                                            </div>
                                            <Button variant="link" className="text-danger p-0" onClick={() => handleExecDelete(exec.id)}>
                                                <Trash size={14} />
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>

                        <hr className="text-muted opacity-25" />

                        {/* General Members Section */}
                        <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
                            <h5 className="fw-bold"><People className="me-2 text-primary" />Member Directory</h5>
                            <Button variant="outline-primary" size="sm" onClick={() => setShowForm(true)}>
                                <Plus size={18} /> Add Member
                            </Button>
                        </div>

                        <Card className="shadow-sm border-0 rounded-4 overflow-hidden">
                            <Table responsive hover className="align-middle mb-0">
                                <thead className="bg-light text-muted small text-uppercase">
                                    <tr>
                                        <th className="ps-4">Member Details</th>
                                        <th>Date of Birth</th>
                                        <th>House</th>
                                        <th>Contact</th>
                                        <th className="text-end pe-4">Manage</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {members.map(member => (
                                        <tr key={member.id}>
                                            <td className="ps-4 fw-bold text-dark">{member.fullName || member.full_name}</td>
                                            <td className="text-muted">{new Date(member.dob).toLocaleDateString('en-GB')}</td>
                                            <td>{member.houseName || member.house_name}</td>
                                            <td><Badge bg="light" className="text-dark fw-normal border">{member.phone}</Badge></td>
                                            <td className="text-end pe-4">
                                                <Button variant="light" size="sm" className="text-danger border" onClick={() => handleDelete(member.id)}>
                                                    <Trash size={16} />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card>
                    </Tab>

                    <Tab eventKey="events" title={<><CalendarEvent className="me-2" />Event Center</>}>
                        <div className="py-4">
                            <h5 className="fw-bold mb-4">Available Registrations</h5>
                            <Row>
                                {events.map(event => {
                                    const regCount = getRegistrationCount(event.id);
                                    return (
                                        <Col md={4} key={event.id} className="mb-4">
                                            <Card className="h-100 border-0 shadow-sm hover-card glass-card">
                                                <Card.Body className="p-4">
                                                    <div className="d-flex justify-content-between mb-3">
                                                        <div className="text-primary fw-bold" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>
                                                            {new Date(event.event_date).toLocaleDateString('default', { month: 'long', year: 'numeric' })}
                                                        </div>
                                                        {regCount > 0 && <Badge bg="success-subtle" className="text-success border border-success-subtle">Registered</Badge>}
                                                    </div>
                                                    <h5 className="fw-bold mb-2">{event.title}</h5>
                                                    <p className="text-muted small"><CalendarEvent className="me-2" />{event.location}</p>

                                                    {regCount > 0 ? (
                                                        <div className="mt-4">
                                                            <div className="d-grid gap-2">
                                                                <Button variant="success" className="action-btn" disabled>
                                                                    <CheckCircle className="me-2" /> {regCount} Members
                                                                </Button>
                                                                <Button variant="link" className="text-primary text-decoration-none small">
                                                                    <FileEarmarkText className="me-1" /> Download Receipt
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <Button variant="primary" className="w-100 mt-4 action-btn" onClick={() => { setSelectedEventId(event.id); setShowModal(true); }}>
                                                            Enroll Members
                                                        </Button>
                                                    )}
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    );
                                })}
                            </Row>
                        </div>
                    </Tab>

                    <Tab eventKey="unitActivities" title={<><FileEarmarkText className="me-2" />Parish Activities</>}>
                        <div className="py-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h5 className="fw-bold mb-0">Parish Youth Activities</h5>
                                <Button variant="primary" className="action-btn" onClick={() => setShowActivityForm(true)}>
                                    <Plus size={20} /> Add Activity
                                </Button>
                            </div>

                            {unitActivities.length === 0 ? (
                                <div className="text-center py-5 bg-white rounded-4 shadow-sm">
                                    <FileEarmarkText size={40} className="text-muted mb-3 opacity-25" />
                                    <p className="text-muted">No activities recorded yet. Start by adding one!</p>
                                </div>
                            ) : (
                                <Row>
                                    {unitActivities.map(act => (
                                        <Col md={6} key={act.id} className="mb-4">
                                            <Card className="border-0 shadow-sm h-100 bg-white">
                                                <Card.Body className="p-4">
                                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                                        <Badge bg="primary-soft" className="text-primary border border-primary-subtle">
                                                            {act.activity_date ? new Date(act.activity_date).toLocaleDateString('en-GB') : 'No Date'}
                                                        </Badge>
                                                        <Button variant="link" className="text-danger p-0" onClick={() => handleDeleteActivity(act.id)}>
                                                            <Trash size={18} />
                                                        </Button>
                                                    </div>
                                                    <h5 className="fw-bold mb-2">{act.title}</h5>
                                                    <p className="text-muted small mb-0" style={{ whiteSpace: 'pre-wrap' }}>{act.description}</p>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            )}
                        </div>
                    </Tab>
                </Tabs>
            </Container>

            {/* --- ADD MEMBER MODAL --- */}
            <Modal show={showForm} onHide={() => setShowForm(false)} centered className="rounded-4">
                <Modal.Header closeButton className="border-0">
                    <Modal.Title className="fw-bold">Member Information</Modal.Title>
                </Modal.Header>
                <Modal.Body className="px-4 pb-4">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-bold">Full Name</Form.Label>
                            <Form.Control
                                required
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                placeholder="Enter member name"
                            />
                        </Form.Group>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="small fw-bold">Date of Birth</Form.Label>
                                    <Form.Control
                                        type="date"
                                        required
                                        value={formData.dob}
                                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="small fw-bold">Phone Number</Form.Label>
                                    <Form.Control
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="10-digit number"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-4">
                            <Form.Label className="small fw-bold">House Name</Form.Label>
                            <Form.Control
                                required
                                value={formData.houseName}
                                onChange={(e) => setFormData({ ...formData, houseName: e.target.value })}
                                placeholder="E.g. Kizhakkethil House"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100 action-btn py-2">
                            Add to Directory
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* --- ADD EXECUTIVE MODAL --- */}
            <Modal show={showExecForm} onHide={() => setShowExecForm(false)} centered>
                <Modal.Header closeButton className="border-0 pb-0">
                    <Modal.Title className="fw-bold">New Executive</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <Form onSubmit={handleExecSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-bold text-uppercase">Full Name</Form.Label>
                            <Form.Control
                                required
                                value={execFormData.name}
                                onChange={(e) => setExecFormData({ ...execFormData, name: e.target.value })}
                                placeholder="E.g. John Doe"
                            />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label className="small fw-bold text-uppercase">Position/Post</Form.Label>
                            <Form.Control
                                required
                                value={execFormData.post}
                                onChange={(e) => setExecFormData({ ...execFormData, post: e.target.value })}
                                placeholder="E.g. Secretary"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100 action-btn py-2">
                            Save Designation
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* --- ADD ACTIVITY MODAL --- */}
            <Modal show={showActivityForm} onHide={() => setShowActivityForm(false)} centered>
                <Modal.Header closeButton className="border-0 pb-0">
                    <Modal.Title className="fw-bold">Report Parish Activity</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <Form onSubmit={handleActivitySubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-bold text-uppercase">Activity Title</Form.Label>
                            <Form.Control
                                required
                                value={activityFormData.title}
                                onChange={(e) => setActivityFormData({ ...activityFormData, title: e.target.value })}
                                placeholder="E.g. Yard Cleaning, Prayer Meet"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-bold text-uppercase">Date</Form.Label>
                            <Form.Control
                                type="date"
                                required
                                value={activityFormData.date}
                                onChange={(e) => setActivityFormData({ ...activityFormData, date: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label className="small fw-bold text-uppercase">Description / Details</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                required
                                value={activityFormData.description}
                                onChange={(e) => setActivityFormData({ ...activityFormData, description: e.target.value })}
                                placeholder="Tell us more about what happened..."
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100 action-btn py-2">
                            Post Activity Report
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Profile;