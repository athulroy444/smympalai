import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PageHeader from '../components/common/PageHeader';

function Forona() {
    const [selectedForona, setSelectedForona] = useState('');
    const [selectedUnit, setSelectedUnit] = useState('');
    const [showDetails, setShowDetails] = useState(false);

    // Mock Data - Typically this would come from an API
    const foronaList = [
        { name: "Pala", units: ["Cathedral", "Lalam", "Kadanad", "Pravithanam"] },
        { name: "Erattupetta", units: ["Aruvithura", "Poonjar", "Thidanad", "Erattupetta"] },
        { name: "Kuravilangad", units: ["Kuravilangad", "Kalathoor", "Mannara", "Uzhavoor"] },
        { name: "Ramapuram", units: ["Ramapuram", "Koodappulam", "Vellilappilly", "Kurinji"] },
        { name: "Cherpunkal", units: ["Cherpunkal", "Kidangoor", "Ayarkunnam", "Punnathura"] },
        { name: "Kaduthuruthy", units: ["Kaduthuruthy", "Muttuchira", "Neezhoor", "Manjoor"] },
        { name: "Aruvithura", units: ["Aruvithura", "Kondadu", "Peringalam"] },
        { name: "Athirampuzha", units: ["Athirampuzha", "Ettumanoor", "Sreekanda", "Parampuzha"] }
    ];

    const currentUnits = selectedForona
        ? foronaList.find(f => f.name === selectedForona)?.units || []
        : [];

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
                                                <option key={idx} value={u}>{u}</option>
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

                {showDetails && (
                    <Row className="mt-5 justify-content-center fade-in-up">
                        <Col md={10}>
                            <Card className="shadow border-0">
                                <Card.Header className="bg-white border-bottom-0 pt-4 pb-0 text-center">
                                    <h2 style={{ color: '#E14B1F' }}>{selectedUnit} Unit</h2>
                                    <p className="text-muted">{selectedForona} Forona</p>
                                </Card.Header>
                                <Card.Body className="p-5 text-center">
                                    <div className="p-4 bg-light rounded mb-3">
                                        <p className="mb-0 fs-5 text-secondary">
                                            Here you can display specific details about the <strong>{selectedUnit}</strong> unit,
                                            such as upcoming events, unit members, or gallery photos specific to this unit.
                                        </p>
                                    </div>
                                    <Button variant="outline-dark" size="sm">Coming Soon</Button>
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
