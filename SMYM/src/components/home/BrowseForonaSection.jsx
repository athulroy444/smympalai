import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Map, ArrowRight, Search } from 'react-bootstrap-icons';

const BrowseForonaSection = () => {
    const { foronaList = [] } = useData();
    const navigate = useNavigate();
    const [selForona, setSelForona] = useState('');
    const [selUnit, setSelUnit] = useState('');

    const currentForona = foronaList.find(f => f.name === selForona);
    const units = currentForona?.units || [];

    const handleView = () => {
        if (selForona && selUnit) {
            navigate(`/forona?name=${encodeURIComponent(selForona)}&unit=${encodeURIComponent(selUnit)}`);
        } else if (selForona) {
            navigate(`/forona?name=${encodeURIComponent(selForona)}`);
        }
    };

    return (
        <section className="browse-forona-section py-5">
            <Container>
                <div className="glass-panel p-4 p-md-5 position-relative overflow-hidden">
                    <div className="bg-decoration"></div>
                    <Row className="align-items-center position-relative">
                        <Col lg={5} className="mb-4 mb-lg-0">
                            <div className="d-flex align-items-center mb-3">
                                <span className="badge-pro">Directory</span>
                            </div>
                            <h2 className="display-6 fw-bold text-white mb-3">Browse Forona & Units</h2>
                            <p className="text-light opacity-75 mb-4">
                                Quickly find details about your local unit, including their executive team and recent activities.
                            </p>
                            <div className="d-none d-lg-block">
                                <div className="stat-mini d-flex align-items-center text-white opacity-50">
                                    <Map size={16} className="me-2" />
                                    <span>20 Foronas • Across Palai Eparchy</span>
                                </div>
                            </div>
                        </Col>
                        <Col lg={7}>
                            <div className="selection-card p-4">
                                <Row className="g-3">
                                    <Col md={6}>
                                        <Form.Label className="small fw-bold text-uppercase text-muted mb-2">Select Forona</Form.Label>
                                        <Form.Select
                                            value={selForona}
                                            onChange={(e) => { setSelForona(e.target.value); setSelUnit(''); }}
                                            className="custom-select-pro"
                                        >
                                            <option value="">-- Choose Forona --</option>
                                            {foronaList.map((f, i) => (
                                                <option key={i} value={f.name}>{f.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Label className="small fw-bold text-uppercase text-muted mb-2">Select Unit</Form.Label>
                                        <Form.Select
                                            value={selUnit}
                                            onChange={(e) => setSelUnit(e.target.value)}
                                            disabled={!selForona}
                                            className="custom-select-pro"
                                        >
                                            <option value="">-- Choose Unit --</option>
                                            {units.map((u, i) => (
                                                <option key={i} value={u.name}>{u.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                    <Col xs={12} className="mt-4">
                                        <Button
                                            variant="primary"
                                            className="w-100 py-3 fw-bold d-flex align-items-center justify-content-center btn-browse"
                                            onClick={handleView}
                                            disabled={!selForona}
                                        >
                                            {selUnit ? `View ${selUnit} Unit` : 'Browse Forona Units'}
                                            <ArrowRight size={18} className="ms-2" />
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>

            <style>
                {`
                .browse-forona-section {
                    background-color: #050a18;
                    margin-top: -1px;
                }
                .glass-panel {
                    background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 30px;
                    box-shadow: 0 25px 50px rgba(0,0,0,0.3);
                }
                .bg-decoration {
                    position: absolute;
                    top: -50px;
                    right: -50px;
                    width: 300px;
                    height: 300px;
                    background: radial-gradient(circle, rgba(225, 75, 31, 0.15) 0%, transparent 70%);
                    filter: blur(40px);
                }
                .badge-pro {
                    background: #E14B1F;
                    color: white;
                    padding: 5px 12px;
                    border-radius: 6px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .selection-card {
                    background: rgba(255, 255, 255, 0.95);
                    border-radius: 20px;
                    box-shadow: 0 15px 35px rgba(0,0,0,0.2);
                }
                .custom-select-pro {
                    border: 1px solid #ddd !important;
                    border-radius: 12px !important;
                    padding: 12px 15px !important;
                    font-size: 0.95rem !important;
                    transition: border-color 0.3s ease !important;
                }
                .custom-select-pro:focus {
                    border-color: #E14B1F !important;
                    box-shadow: 0 0 0 0.25rem rgba(225, 75, 31, 0.1) !important;
                }
                .btn-browse {
                    background-color: #1a1a1a !important;
                    border: none !important;
                    border-radius: 12px !important;
                    transition: all 0.3s ease !important;
                }
                .btn-browse:hover:not(:disabled) {
                    background-color: #E14B1F !important;
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px rgba(225, 75, 31, 0.3) !important;
                }
                .btn-browse:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
                `}
            </style>
        </section>
    );
};

export default BrowseForonaSection;
