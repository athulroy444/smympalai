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

                {showDetails && currentUnitData && (
                    <Row className="mt-5 justify-content-center fade-in-up">
                        <Col md={10}>
                            <Card className="shadow border-0">
                                <Card.Header className="bg-white border-bottom-0 pt-4 pb-0 text-center">
                                    <h2 style={{ color: '#E14B1F' }}>{currentUnitData.name} Unit</h2>
                                    <p className="text-muted">{selectedForona} Forona</p>
                                </Card.Header>
                                <Card.Body className="p-5">
                                    <div className="text-center mb-4">
                                        <div className="p-4 bg-light rounded mb-3">
                                            <p className="mb-0 fs-5 text-secondary">
                                                Specific details about the <strong>{currentUnitData.name}</strong> unit.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Display Unit Executives */}
                                    {currentUnitData.executives?.length > 0 ? (
                                        <div className="mb-4">
                                            <h4 className="text-center mb-4 border-bottom pb-2">Unit Executives</h4>
                                            <Row className="justify-content-center">
                                                {currentUnitData.executives.map((exec, idx) => (
                                                    <Col key={idx} md={4} sm={6} className="mb-3">
                                                        <Card className="h-100 border-0 shadow-sm text-center bg-light">
                                                            <Card.Body>
                                                                <Card.Title className="h6">{exec.name}</Card.Title>
                                                                <Card.Subtitle className="mb-2 text-muted small">{exec.post}</Card.Subtitle>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </div>
                                    ) : (
                                        <p className="text-center text-muted">No executives listed for this unit.</p>
                                    )}

                                    <div className="text-center mt-4">
                                        <Button variant="outline-dark" size="sm">Coming Soon</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )}
            </Container>

            <style>
                {`
                .fade-in-up {
                    animation: fadeInUp 0.5s ease-out;
                }
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                `}
            </style>
        </>
    );
}

export default Forona;
