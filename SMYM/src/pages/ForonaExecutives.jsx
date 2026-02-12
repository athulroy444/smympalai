import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import PageHeader from '../components/common/PageHeader';
import { Plus, Trash } from 'react-bootstrap-icons';
import { useData } from '../context/DataContext';

function ForonaExecutives() {
    const { foronaList, updateForonaExecutives, updateUnitExecutives } = useData();
    const [activeTab, setActiveTab] = useState('forona');

    // --- FORONA EXECUTIVES STATE ---
    const [selectedForona, setSelectedForona] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', post: '', phone: '' });

    // --- UNIT EXECUTIVES STATE ---
    const [selectedUnitForona, setSelectedUnitForona] = useState('');
    const [selectedUnit, setSelectedUnit] = useState('');
    const [showUnitForm, setShowUnitForm] = useState(false);
    const [unitFormData, setUnitFormData] = useState({ name: '', post: '', phone: '' });

    // Derived Data
    const currentForona = foronaList.find(f => f.name === selectedForona);
    const foronaExecutives = currentForona ? (currentForona.executives || []) : [];

    const currentUnitForonaData = foronaList.find(f => f.name === selectedUnitForona);
    const unitList = currentUnitForonaData ? currentUnitForonaData.units : [];
    const currentUnitData = unitList.find(u => u.name === selectedUnit);
    const unitExecutives = currentUnitData ? (currentUnitData.executives || []) : [];


    // --- FORONA HANDLERS ---
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedForona) return;

        const newExecs = [...foronaExecutives, { ...formData, id: Date.now() }];
        updateForonaExecutives(selectedForona, newExecs);

        setFormData({ name: '', post: '', phone: '' });
        setShowForm(false);
    };

    const handleDelete = (id) => {
        if (!selectedForona) return;
        const newExecs = foronaExecutives.filter((exec, idx) => (exec.id || idx) !== id);
        updateForonaExecutives(selectedForona, newExecs);
    };


    // --- UNIT HANDLERS ---
    const handleUnitInputChange = (e) => {
        const { name, value } = e.target;
        setUnitFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleUnitSubmit = (e) => {
        e.preventDefault();
        if (!selectedUnitForona || !selectedUnit) return;

        const newExecs = [...unitExecutives, { ...unitFormData, id: Date.now() }];
        updateUnitExecutives(selectedUnitForona, selectedUnit, newExecs);

        setUnitFormData({ name: '', post: '', phone: '' });
        setShowUnitForm(false);
    };

    const handleUnitDelete = (id) => {
        if (!selectedUnitForona || !selectedUnit) return;
        const newExecs = unitExecutives.filter((exec, idx) => (exec.id || idx) !== id);
        updateUnitExecutives(selectedUnitForona, selectedUnit, newExecs);
    };


    return (
        <>
            <PageHeader title="Manage Executives" subtitle="Administrate Forona and Unit level executives" />
            <Container className="py-5">

                <Tabs
                    id="executives-tabs"
                    activeKey={activeTab}
                    onSelect={(k) => setActiveTab(k)}
                    className="mb-4"
                    fill
                >
                    {/* --- TAB 1: FORONA EXECUTIVES --- */}
                    <Tab eventKey="forona" title="Forona Executives">
                        <Row className="justify-content-center">
                            <Col md={8} lg={6}>
                                <Card className="shadow-sm border-0 mb-4">
                                    <Card.Body>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-bold">Select Forona to Manage</Form.Label>
                                            <Form.Select
                                                value={selectedForona}
                                                onChange={(e) => setSelectedForona(e.target.value)}
                                                className="form-select-lg"
                                            >
                                                <option value="">-- Select Forona --</option>
                                                {foronaList.map((f, idx) => (
                                                    <option key={idx} value={f.name}>{f.name}</option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                        {selectedForona && (
                            <>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h4 className="text-secondary">{selectedForona} Executives</h4>
                                    <Button variant="primary" onClick={() => setShowForm(!showForm)}>
                                        <Plus size={20} className="me-1" /> Add Executive
                                    </Button>
                                </div>

                                {showForm && (
                                    <Card className="mb-4 shadow-sm slide-in-bottom">
                                        <Card.Header className="bg-light fw-bold">Add New Forona Executive</Card.Header>
                                        <Card.Body>
                                            <Form onSubmit={handleSubmit}>
                                                <Row>
                                                    <Col md={4} className="mb-3">
                                                        <Form.Control type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} required />
                                                    </Col>
                                                    <Col md={4} className="mb-3">
                                                        <Form.Control type="text" name="post" placeholder="Post (e.g. Director)" value={formData.post} onChange={handleInputChange} required />
                                                    </Col>
                                                    <Col md={4} className="mb-3">
                                                        <Form.Control type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} required />
                                                    </Col>
                                                </Row>
                                                <div className="d-flex justify-content-end">
                                                    <Button variant="secondary" className="me-2" onClick={() => setShowForm(false)}>Cancel</Button>
                                                    <Button variant="primary" type="submit">Save</Button>
                                                </div>
                                            </Form>
                                        </Card.Body>
                                    </Card>
                                )}

                                <Table responsive hover striped className="mb-0 border">
                                    <thead className="bg-light">
                                        <tr>
                                            <th>Name</th>
                                            <th>Post</th>
                                            <th>Phone</th>
                                            <th className="text-end">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {foronaExecutives.map((exec, idx) => (
                                            <tr key={idx}>
                                                <td>{exec.name}</td>
                                                <td>{exec.post}</td>
                                                <td>{exec.phone || '-'}</td>
                                                <td className="text-end">
                                                    <Button variant="link" className="text-danger p-0" onClick={() => handleDelete(exec.id || idx)}>
                                                        <Trash size={18} />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                        {foronaExecutives.length === 0 && <tr><td colSpan="4" className="text-center text-muted py-4">No executives found.</td></tr>}
                                    </tbody>
                                </Table>
                            </>
                        )}
                    </Tab>

                    {/* --- TAB 2: UNIT EXECUTIVES --- */}
                    <Tab eventKey="unit" title="Unit Executives">
                        <Row className="justify-content-center">
                            <Col md={8} lg={8}>
                                <Card className="shadow-sm border-0 mb-4">
                                    <Card.Body>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="fw-bold">1. Select Forona</Form.Label>
                                                    <Form.Select
                                                        value={selectedUnitForona}
                                                        onChange={(e) => { setSelectedUnitForona(e.target.value); setSelectedUnit(''); }}
                                                        className="form-select-lg"
                                                    >
                                                        <option value="">-- Select Forona --</option>
                                                        {foronaList.map((f, idx) => (
                                                            <option key={idx} value={f.name}>{f.name}</option>
                                                        ))}
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="fw-bold">2. Select Unit</Form.Label>
                                                    <Form.Select
                                                        value={selectedUnit}
                                                        onChange={(e) => setSelectedUnit(e.target.value)}
                                                        className="form-select-lg"
                                                        disabled={!selectedUnitForona}
                                                    >
                                                        <option value="">-- Select Unit --</option>
                                                        {unitList.map((u, idx) => (
                                                            <option key={idx} value={u.name}>{u.name}</option>
                                                        ))}
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                        {selectedUnitForona && selectedUnit && (
                            <>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h4 className="text-secondary">{selectedUnit} Executives</h4>
                                    <Button variant="success" onClick={() => setShowUnitForm(!showUnitForm)}>
                                        <Plus size={20} className="me-1" /> Add Unit Exec
                                    </Button>
                                </div>

                                {showUnitForm && (
                                    <Card className="mb-4 shadow-sm slide-in-bottom border-success">
                                        <Card.Header className="bg-success text-white fw-bold">Add New Unit Executive</Card.Header>
                                        <Card.Body>
                                            <Form onSubmit={handleUnitSubmit}>
                                                <Row>
                                                    <Col md={4} className="mb-3">
                                                        <Form.Control type="text" name="name" placeholder="Full Name" value={unitFormData.name} onChange={handleUnitInputChange} required />
                                                    </Col>
                                                    <Col md={4} className="mb-3">
                                                        <Form.Control type="text" name="post" placeholder="Post" value={unitFormData.post} onChange={handleUnitInputChange} required />
                                                    </Col>
                                                    <Col md={4} className="mb-3">
                                                        <Form.Control type="text" name="phone" placeholder="Phone" value={unitFormData.phone} onChange={handleUnitInputChange} required />
                                                    </Col>
                                                </Row>
                                                <div className="d-flex justify-content-end">
                                                    <Button variant="secondary" className="me-2" onClick={() => setShowUnitForm(false)}>Cancel</Button>
                                                    <Button variant="success" type="submit">Save</Button>
                                                </div>
                                            </Form>
                                        </Card.Body>
                                    </Card>
                                )}

                                <Table responsive hover striped className="mb-0 border">
                                    <thead className="bg-light">
                                        <tr>
                                            <th>Name</th>
                                            <th>Post</th>
                                            <th>Phone</th>
                                            <th className="text-end">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {unitExecutives.map((exec, idx) => (
                                            <tr key={idx}>
                                                <td>{exec.name}</td>
                                                <td>{exec.post}</td>
                                                <td>{exec.phone || '-'}</td>
                                                <td className="text-end">
                                                    <Button variant="link" className="text-danger p-0" onClick={() => handleUnitDelete(exec.id || idx)}>
                                                        <Trash size={18} />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                        {unitExecutives.length === 0 && <tr><td colSpan="4" className="text-center text-muted py-4">No unit executives found.</td></tr>}
                                    </tbody>
                                </Table>
                            </>
                        )}
                    </Tab>
                </Tabs>
            </Container>
        </>
    );
}

export default ForonaExecutives;
