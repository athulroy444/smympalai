import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Form, Badge, Button, InputGroup } from 'react-bootstrap';
import { Search, Funnel, People, Building, GeoAlt, Download, PersonBadge } from 'react-bootstrap-icons';
import { useData } from '../context/DataContext';
import PageHeader from '../components/common/PageHeader';

function ExecutiveDirectory() {
    const { fetchAllExecutives, foronaList } = useData();
    const [allExecutives, setAllExecutives] = useState([]);
    const [filteredExecutives, setFilteredExecutives] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedForona, setSelectedForona] = useState('');
    const [selectedUnit, setSelectedUnit] = useState('');

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const data = await fetchAllExecutives();
            setAllExecutives(data || []);
            setFilteredExecutives(data || []);
            setLoading(false);
        };
        loadData();
    }, []);

    // Handle filtering
    useEffect(() => {
        let result = allExecutives;

        if (searchTerm) {
            result = result.filter(e =>
                e.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                e.post?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedForona) {
            result = result.filter(e => e.forona_name === selectedForona);
        }

        if (selectedUnit) {
            result = result.filter(e => e.unit_name === selectedUnit);
        }

        setFilteredExecutives(result);
    }, [searchTerm, selectedForona, selectedUnit, allExecutives]);

    // Available units based on selected Forona
    const availableUnits = selectedForona
        ? foronaList.find(f => f.name === selectedForona)?.units || []
        : [];

    return (
        <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', paddingBottom: '4rem' }}>
            <PageHeader
                title="Executive Directory"
                subtitle="Official list of Forona and Unit level office bearers."
            />

            <Container className="mt-n4">
                {/* --- FILTER SECTION --- */}
                <Card className="shadow-sm border-0 mb-4 p-3" style={{ borderRadius: '15px' }}>
                    <Card.Body>
                        <Row className="g-3 align-items-end">
                            <Col lg={4}>
                                <Form.Label className="small fw-bold text-muted text-uppercase">Search Executive</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text className="bg-white border-end-0">
                                        <Search size={14} />
                                    </InputGroup.Text>
                                    <Form.Control
                                        placeholder="Name or role..."
                                        className="border-start-0"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </InputGroup>
                            </Col>
                            <Col lg={3}>
                                <Form.Label className="small fw-bold text-muted text-uppercase">Forona</Form.Label>
                                <Form.Select
                                    value={selectedForona}
                                    onChange={(e) => { setSelectedForona(e.target.value); setSelectedUnit(''); }}
                                >
                                    <option value="">All Foronas</option>
                                    {foronaList.map((f, i) => (
                                        <option key={i} value={f.name}>{f.name}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col lg={3}>
                                <Form.Label className="small fw-bold text-muted text-uppercase">Unit</Form.Label>
                                <Form.Select
                                    value={selectedUnit}
                                    onChange={(e) => setSelectedUnit(e.target.value)}
                                    disabled={!selectedForona}
                                >
                                    <option value="">All Units</option>
                                    {availableUnits.map((u, i) => (
                                        <option key={i} value={u.name}>{u.name}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col lg={2}>
                                <Button
                                    variant="outline-primary"
                                    className="w-100 fw-bold border-2"
                                    onClick={() => { setSearchTerm(''); setSelectedForona(''); setSelectedUnit(''); }}
                                >
                                    Reset
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                {/* --- EXECUTIVES TABLE --- */}
                <Card className="shadow-sm border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                    <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
                        <h5 className="mb-0 fw-bold">
                            <PersonBadge className="me-2 text-primary" />
                            Office Bearers
                            <Badge bg="primary-soft" className="text-primary ms-2" style={{ fontSize: '0.8rem' }}>
                                {filteredExecutives.length} Records
                            </Badge>
                        </h5>
                        <Button variant="light" size="sm" className="fw-bold">
                            <Download className="me-2" /> Export PDF
                        </Button>
                    </Card.Header>
                    <Card.Body className="p-0">
                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-primary" role="status"></div>
                                <p className="mt-2 text-muted">Fetching official records...</p>
                            </div>
                        ) : filteredExecutives.length > 0 ? (
                            <Table responsive hover className="mb-0 align-middle">
                                <thead className="bg-light text-muted small text-uppercase">
                                    <tr>
                                        <th className="ps-4">Executive Name</th>
                                        <th>Position / Role</th>
                                        <th>Forona</th>
                                        <th>Parish Unit</th>
                                        <th className="pe-4 text-center">Identity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredExecutives.map((exec, idx) => (
                                        <tr key={idx}>
                                            <td className="ps-4">
                                                <div className="d-flex align-items-center">
                                                    <div className="exec-mini-avatar me-3">
                                                        {exec.image_url ? (
                                                            <img
                                                                src={exec.image_url.startsWith('http') ? exec.image_url : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${exec.image_url}`}
                                                                alt={exec.name}
                                                            />
                                                        ) : (
                                                            <span>{exec.name?.charAt(0)}</span>
                                                        )}
                                                    </div>
                                                    <span className="fw-bold text-dark">{exec.name}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <Badge bg="primary-soft" className="text-primary text-uppercase px-2 py-1">
                                                    {exec.post}
                                                </Badge>
                                            </td>
                                            <td>
                                                <span className="text-muted small fw-bold">
                                                    <GeoAlt className="me-1" size={12} /> {exec.forona_name}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <Building size={14} className="me-2 text-muted" />
                                                    <span className={exec.unit_name === 'Forona Council' ? 'text-primary fw-bold italic' : ''}>
                                                        {exec.unit_name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="pe-4 text-center">
                                                <Badge bg={exec.entity_type === 'forona' ? 'danger-subtle' : 'info-subtle'} className={exec.entity_type === 'forona' ? 'text-danger border border-danger-subtle' : 'text-info border border-info-subtle'}>
                                                    {exec.entity_type === 'forona' ? 'FORONA' : 'UNIT'}
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                            <div className="text-center py-5">
                                <p className="text-muted mb-0">No executives found matching your criteria.</p>
                            </div>
                        )}
                    </Card.Body>
                </Card>
            </Container>

            <style>{`
                .bg-primary-soft { background-color: rgba(13, 110, 253, 0.1); }
                .danger-subtle { background-color: rgba(220, 53, 69, 0.1); }
                .info-subtle { background-color: rgba(13, 202, 240, 0.1); }
                .table thead th { border-bottom: none; font-weight: 700; padding: 15px 10px; }
                .table tbody tr { transition: background 0.2s ease; cursor: default; }
                .exec-mini-avatar {
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    background: #f1f5f9;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    color: #0d6efd;
                    overflow: hidden;
                    border: 1px solid #dee2e6;
                }
                .exec-mini-avatar img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .italic { font-style: italic; }
            `}</style>
        </div>
    );
}

export default ExecutiveDirectory;
