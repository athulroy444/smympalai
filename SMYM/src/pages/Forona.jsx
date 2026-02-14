import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PageHeader from '../components/common/PageHeader';
import { useData } from '../context/DataContext';

function Forona() {
    const { foronaList } = useData();
    const [selectedForona, setSelectedForona] = useState('');
    const [selectedUnit, setSelectedUnit] = useState('');
    const [showDetails, setShowDetails] = useState(false);

    // Effect to handle navigation from Navbar
    React.useEffect(() => {
        const stored = localStorage.getItem('selected_forona');
        if (stored) {
            setSelectedForona(stored);
            localStorage.removeItem('selected_forona');
            // We don't show details yet because a unit isn't selected, 
            // but the Forona dropdown will be pre-filled.
        }
    }, []);

    const currentForonaData = selectedForona
        ? foronaList.find(f => f.name === selectedForona)
        : null;

    const currentUnits = currentForonaData?.units || [];

    const currentUnitData = selectedUnit
        ? currentUnits.find(u => u.name === selectedUnit)
        : null;

    const handleForonaChange = (e) => {
        setSelectedForona(e.target.value);
        setSelectedUnit(''); // Reset unit when forona changes
        setShowDetails(false);
    };

    const handleUnitChange = (e) => {
        setSelectedUnit(e.target.value);
        setShowDetails(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedForona && selectedUnit) {
            setShowDetails(true);
        }
    };

    return (
        <>
            <PageHeader title="Forona & Units" subtitle="Find your local unit details." />
            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <Card className="shadow-sm border-0">
                            <Card.Body className="p-4">
                                <h4 className="mb-4 text-center" style={{ color: '#1A1A1A' }}>Select Location</h4>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold text-muted">Select Forona</Form.Label>
                                        <Form.Select
                                            value={selectedForona}
                                            onChange={handleForonaChange}
                                            className="form-select-lg fs-6"
                                        >
                                            <option value="">-- Choose Forona --</option>
                                            {foronaList.map((f, idx) => (
                                                <option key={idx} value={f.name}>{f.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>

                                    {/* Display Forona Executives if Forona is selected */}
                                    {currentForonaData?.executives?.length > 0 && (
                                        <div className="mb-4 p-3 bg-light rounded border">
                                            <h6 className="text-primary mb-2">Forona Executives</h6>
                                            <ul className="list-unstyled mb-0">
                                                {currentForonaData.executives.map((exec, idx) => (
                                                    <li key={idx} className="small">
                                                        <strong>{exec.name}</strong> - <span className="text-muted">{exec.post}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <Form.Group className="mb-4">
                                        <Form.Label className="fw-bold text-muted">Select Unit</Form.Label>
                                        <Form.Select
                                            value={selectedUnit}
                                            onChange={handleUnitChange}
                                            disabled={!selectedForona}
                                            className="form-select-lg fs-6"
                                        >
                                            <option value="">-- Choose Unit --</option>
                                            {currentUnits.map((u, idx) => (
                                                <option key={idx} value={u.name}>{u.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>

                                    <div className="d-grid">
                                        <Button
                                            variant="primary"
                                            type="submit"
                                            disabled={!selectedForona || !selectedUnit}
                                            className="py-2 fw-bold"
                                            style={{
                                                backgroundColor: '#E14B1F',
                                                borderColor: '#E14B1F',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px'
                                            }}
                                        >
                                            View Unit Details
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {!showDetails && !selectedForona && (
                    <Row className="mt-4 g-4">
                        <Col xs={12}>
                            <h3 className="text-center mb-5 fw-bold" style={{ letterSpacing: '1px' }}>EXPLORE OUR FORONAS</h3>
                        </Col>
                        {foronaList.map((f, i) => (
                            <Col key={i} xl={3} lg={4} md={6} sm={6}>
                                <Card
                                    className="h-100 border-0 shadow-sm forona-grid-card"
                                    onClick={() => {
                                        setSelectedForona(f.name);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    style={{ cursor: 'pointer', transition: 'all 0.3s ease', borderRadius: '15px', overflow: 'hidden' }}
                                >
                                    <Card.Body className="d-flex flex-column align-items-center justify-content-center py-4" style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(5px)' }}>
                                        <div className="mb-3 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', background: 'rgba(225, 75, 31, 0.1)', color: '#E14B1F' }}>
                                            <span className="fw-bold fs-4">{f.name.charAt(0)}</span>
                                        </div>
                                        <Card.Title className="h5 fw-bold text-dark text-center mb-2">{f.name}</Card.Title>
                                        <div className="text-muted small text-uppercase fw-bold ls-1" style={{ fontSize: '0.65rem' }}>
                                            {f.units?.length || 0} Units Available
                                        </div>
                                    </Card.Body>
                                    <div className="card-footer-glow"></div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}

                {showDetails && currentUnitData && (
                    <Row className="mt-5 justify-content-center fade-in-up">
                        <Col md={10}>
                            {/* ... (Existing Unit Details Card) */}
                            <Card className="shadow border-0" style={{ borderRadius: '20px', overflow: 'hidden' }}>
                                <Card.Header className="bg-white border-bottom-0 pt-5 pb-0 text-center">
                                    <div className="text-uppercase text-primary fw-bold small mb-2" style={{ letterSpacing: '2px' }}>{selectedForona} Forona</div>
                                    <h1 className="display-5 fw-900" style={{ color: '#1A1A1A' }}>{currentUnitData.name} Unit</h1>
                                    <div style={{ width: '60px', height: '4px', background: '#E14B1F', margin: '20px auto' }}></div>
                                </Card.Header>
                                <Card.Body className="p-4 p-md-5">
                                    {/* Display Unit Executives */}
                                    {currentUnitData.executives?.length > 0 ? (
                                        <div className="mb-4">
                                            <h4 className="text-center mb-4 fw-bold">Unit Executives</h4>
                                            <Row className="justify-content-center g-3">
                                                {currentUnitData.executives.map((exec, idx) => (
                                                    <Col key={idx} lg={4} md={6}>
                                                        <Card className="h-100 border-0 shadow-sm text-center bg-light p-3" style={{ borderRadius: '12px' }}>
                                                            <div className="role-chip mb-2">{exec.post}</div>
                                                            <h6 className="fw-bold mb-0">{exec.name}</h6>
                                                        </Card>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </div>
                                    ) : (
                                        <div className="text-center py-4 bg-light rounded" style={{ border: '1px dashed #ccc' }}>
                                            <p className="text-muted mb-0">No executives listed for this unit yet.</p>
                                        </div>
                                    )}

                                    <div className="text-center mt-5">
                                        <Button variant="outline-dark" className="rounded-pill px-4" onClick={() => setShowDetails(false)}>
                                            Back to Selection
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )}
            </Container>

            <style>
                {`
                .forona-grid-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important;
                    background: #fff !important;
                }
                .forona-grid-card:hover .card-title {
                    color: #E14B1F !important;
                }
                .card-footer-glow {
                    height: 4px;
                    width: 0;
                    background: #E14B1F;
                    transition: width 0.3s ease;
                }
                .forona-grid-card:hover .card-footer-glow {
                    width: 100%;
                }
                .role-chip {
                    font-size: 0.6rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    color: #E14B1F;
                    letter-spacing: 1px;
                }
                .ls-1 { letter-spacing: 1px; }
                .fw-900 { font-weight: 900; }
                .fade-in-up {
                    animation: fadeInUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) both;
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                `}
            </style>
        </>
    );
}

export default Forona;
