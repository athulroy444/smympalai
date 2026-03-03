import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import PageHeader from '../components/common/PageHeader';
import { Person, CreditCard, ShieldCheck, CheckCircleFill, Trophy, Plus, Dash, PeopleFill, GeoAltFill } from 'react-bootstrap-icons';
import sportsBanner from '../assets/sports_event_banner.png';

const SportsRegistration = () => {
    const { foronaList, registerTeamEvent } = useData();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        teamName: '',
        captainName: '',
        captainPhone: '',
        foronaName: '',
        unitName: '',
        eventName: 'Eparchial Cricket League 2025',
        amount: 1500,
        playerCount: 1,
        playersList: ['']
    });

    // Auto-fill if unit is logged in
    useEffect(() => {
        if (user && user.role === 'unit' && foronaList && foronaList.length > 0) {
            const unitName = user.username;
            // Case-insensitive search
            const parentForona = foronaList.find(f =>
                f.units && f.units.some(u => u.name.toLowerCase() === unitName.toLowerCase())
            );

            if (parentForona) {
                setFormData(prev => ({
                    ...prev,
                    foronaName: parentForona.name,
                    unitName: unitName
                }));
            }
        }
    }, [user, foronaList]);

    const events = [
        { name: "Eparchial Cricket League 2025", fee: 1500, type: 'group' },
        { name: "Golden Boot Football Tournament", fee: 1200, type: 'group' },
        { name: "Volleyball Championship", fee: 800, type: 'group' },
        { name: "Tug of War", fee: 500, type: 'group' }
    ];

    const currentForona = foronaList.find(f => f.name === formData.foronaName);
    const availableUnits = currentForona ? currentForona.units : [];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'eventName') {
            const selectedEvent = events.find(ev => ev.name === value);
            setFormData(prev => ({ ...prev, [name]: value, amount: selectedEvent.fee }));
        } else if (name === 'foronaName') {
            setFormData(prev => ({ ...prev, [name]: value, unitName: '' })); // Reset unit on Forona change
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handlePlayerChange = (index, value) => {
        const newList = [...formData.playersList];
        newList[index] = value;
        setFormData(prev => ({ ...prev, playersList: newList }));
    };

    const addPlayer = () => {
        setFormData(prev => ({
            ...prev,
            playersList: [...prev.playersList, ''],
            playerCount: prev.playerCount + 1
        }));
    };

    const removePlayer = (index) => {
        if (formData.playerCount > 1) {
            const newList = formData.playersList.filter((_, i) => i !== index);
            setFormData(prev => ({
                ...prev,
                playersList: newList,
                playerCount: prev.playerCount - 1
            }));
        }
    };

    const handleNext = () => {
        if (formData.teamName && formData.captainName && formData.foronaName && formData.unitName && formData.playersList.every(p => p.trim() !== '')) {
            setStep(2);
        } else {
            alert("Please fill all required team and parish details.");
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        const result = await registerTeamEvent(formData);
        if (result) {
            setStep(3);
        } else {
            alert("Registration failed. Please check your connection.");
        }
        setLoading(false);
    };

    return (
        <div className="sports-glass-page pb-5">
            <style>{`
                .sports-glass-page {
                    background: linear-gradient(rgba(10, 25, 47, 0.8), rgba(10, 25, 47, 0.9)), url('${sportsBanner}');
                    background-size: cover;
                    background-position: center;
                    background-attachment: fixed;
                    min-height: 100vh;
                    font-family: 'Outfit', sans-serif;
                }
                .glass-container {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 30px;
                    overflow: hidden;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                }
                .form-glass {
                    background: rgba(255, 255, 255, 0.95);
                    border-radius: 20px;
                    padding: 30px;
                    color: #1e293b;
                }
                .step-indicator {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 40px;
                }
                .step-dot {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.2);
                    margin: 0 10px;
                    transition: all 0.3s ease;
                }
                .step-dot.active {
                    background: #ff5722;
                    transform: scale(1.5);
                    box-shadow: 0 0 15px rgba(255, 87, 34, 0.6);
                }
                .input-premium {
                    background: #f8fafc;
                    border: 1.5px solid #e2e8f0;
                    border-radius: 12px;
                    padding: 12px 16px;
                    font-weight: 500;
                }
                .input-premium:focus {
                    background: #fff;
                    border-color: #ff5722;
                    box-shadow: 0 0 0 4px rgba(255, 87, 34, 0.1);
                }
                .player-input-row {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 10px;
                }
                .btn-add {
                    background: #10b981;
                    border: none;
                    border-radius: 10px;
                    color: white;
                    font-weight: bold;
                }
                .btn-remove {
                    background: #ef4444;
                    border: none;
                    border-radius: 10px;
                    color: white;
                }
                .summary-glass {
                    background: #f1f5f9;
                    border-radius: 15px;
                    padding: 20px;
                }
                .success-pulse {
                    animation: pulse 2s infinite;
                }
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }
            `}</style>

            <Container className="pt-5 pb-5">
                <div className="text-center text-white mb-5">
                    <Trophy size={50} className="text-warning mb-3" />
                    <h1 className="fw-black display-4">GROUP EVENT REGISTRATION</h1>
                    <p className="lead opacity-75">Register your team for the grand Eparchial Championships</p>

                    <div className="step-indicator">
                        <div className={`step-dot ${step === 1 ? 'active' : ''}`}></div>
                        <div className={`step-dot ${step === 2 ? 'active' : ''}`}></div>
                        <div className={`step-dot ${step === 3 ? 'active' : ''}`}></div>
                    </div>
                </div>

                <Row className="justify-content-center">
                    <Col lg={10} xl={8}>
                        <div className="glass-container">
                            <div className="form-glass shadow-lg">
                                {step === 1 && (
                                    <div className="fade-in">
                                        <h4 className="fw-bold mb-4 d-flex align-items-center">
                                            <PeopleFill className="me-2 text-danger" /> Team & Event Details
                                        </h4>
                                        <Row className="g-3">
                                            <Col md={12}>
                                                <Form.Label className="small fw-bold text-muted text-uppercase">Select Sporting Event</Form.Label>
                                                <Form.Select name="eventName" value={formData.eventName} onChange={handleInputChange} className="input-premium text-danger fw-bold">
                                                    {events.map((ev, i) => (
                                                        <option key={i} value={ev.name}>{ev.name} (₹{ev.fee})</option>
                                                    ))}
                                                </Form.Select>
                                            </Col>

                                            <Col md={6}>
                                                <Form.Label className="small fw-bold text-muted text-uppercase">Team Name</Form.Label>
                                                <Form.Control name="teamName" placeholder="Enter Team Name" value={formData.teamName} onChange={handleInputChange} className="input-premium" />
                                            </Col>
                                            <Col md={6}>
                                                <Form.Label className="small fw-bold text-muted text-uppercase">Captain Name</Form.Label>
                                                <Form.Control name="captainName" placeholder="Captain Full Name" value={formData.captainName} onChange={handleInputChange} className="input-premium" />
                                            </Col>

                                            <Col md={6}>
                                                <Form.Label className="small fw-bold text-muted text-uppercase">Select Forona</Form.Label>
                                                <Form.Select name="foronaName" value={formData.foronaName} onChange={handleInputChange} className="input-premium" disabled={user?.role === 'unit'}>
                                                    <option value="">-- Choose Forona --</option>
                                                    {foronaList.map((f, i) => (
                                                        <option key={i} value={f.name}>{f.name}</option>
                                                    ))}
                                                </Form.Select>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Label className="small fw-bold text-muted text-uppercase">Select Unit</Form.Label>
                                                <Form.Select name="unitName" value={formData.unitName} onChange={handleInputChange} className="input-premium" disabled={!formData.foronaName || user?.role === 'unit'}>
                                                    <option value="">-- Choose Unit --</option>
                                                    {availableUnits.map((u, i) => (
                                                        <option key={i} value={u.name}>{u.name}</option>
                                                    ))}
                                                </Form.Select>
                                            </Col>

                                            <Col md={12} className="mt-4">
                                                <div className="d-flex justify-content-between align-items-center mb-3">
                                                    <h6 className="fw-bold mb-0 text-muted">PLAYER REGISTRATION LIST</h6>
                                                    <Button variant="outline-success" size="sm" onClick={addPlayer} className="fw-bold">
                                                        <Plus /> Add Player
                                                    </Button>
                                                </div>
                                                {formData.playersList.map((player, idx) => (
                                                    <div key={idx} className="player-input-row">
                                                        <Form.Control
                                                            placeholder={`Player #${idx + 1} Name`}
                                                            value={player}
                                                            onChange={(e) => handlePlayerChange(idx, e.target.value)}
                                                            className="input-premium"
                                                        />
                                                        {idx > 0 && (
                                                            <Button onClick={() => removePlayer(idx)} className="btn-remove">
                                                                <Dash />
                                                            </Button>
                                                        )}
                                                    </div>
                                                ))}
                                                <div className="p-2 text-center text-muted small mt-2">
                                                    Total Players: <Badge bg="dark">{formData.playerCount}</Badge>
                                                </div>
                                            </Col>

                                            <Col md={12} className="mt-4">
                                                <Button onClick={handleNext} className="w-100 py-3 fw-bold rounded-pill shadow" style={{ background: '#ff5722', border: 'none' }}>
                                                    Proceed to Secured Payment
                                                </Button>
                                            </Col>
                                        </Row>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="fade-in">
                                        <h4 className="fw-bold mb-4 d-flex align-items-center">
                                            <CreditCard className="me-2 text-danger" /> Checkout Area
                                        </h4>
                                        <div className="summary-glass mb-4">
                                            <Row className="mb-2">
                                                <Col xs={4} className="text-muted">Event:</Col>
                                                <Col xs={8} className="fw-bold text-end">{formData.eventName}</Col>
                                            </Row>
                                            <Row className="mb-2">
                                                <Col xs={4} className="text-muted">Team:</Col>
                                                <Col xs={8} className="fw-bold text-end text-danger">{formData.teamName}</Col>
                                            </Row>
                                            <Row className="mb-2">
                                                <Col xs={4} className="text-muted">From:</Col>
                                                <Col xs={8} className="text-end small">{formData.unitName}, {formData.foronaName}</Col>
                                            </Row>
                                            <hr />
                                            <Row className="align-items-center">
                                                <Col xs={6} className="fw-bold fs-5">TOTAL PAYABLE</Col>
                                                <Col xs={6} className="text-end display-6 fw-black text-danger">₹{formData.amount}</Col>
                                            </Row>
                                        </div>

                                        <div className="payment-options mb-4">
                                            <div className="d-flex justify-content-center gap-3">
                                                <div className="border p-3 rounded-4 text-center flex-fill" style={{ background: '#fff' }}>
                                                    <strong className="d-block small text-muted">G-Pay / UPI</strong>
                                                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo.png" height="20" alt="UPI" />
                                                </div>
                                                <div className="border p-3 rounded-4 text-center flex-fill opacity-50">
                                                    <strong className="d-block small text-muted">Net Banking</strong>
                                                    <Badge bg="secondary">OFFLINE</Badge>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex gap-2">
                                            <Button variant="light" className="px-5 py-3 rounded-pill fw-bold" onClick={() => setStep(1)}>Back</Button>
                                            <Button
                                                className="flex-grow-1 py-3 fw-bold rounded-pill shadow"
                                                style={{ background: '#ff5722', border: 'none' }}
                                                onClick={handleSubmit}
                                                disabled={loading}
                                            >
                                                {loading ? 'Securing Payment...' : `Complete Team Payment`}
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="text-center py-5 fade-in">
                                        <CheckCircleFill size={90} className="text-success success-pulse mb-4" />
                                        <h2 className="fw-black text-dark">TEAM REGISTERED!</h2>
                                        <p className="text-muted lead">
                                            Congratulations <strong>{formData.teamName}</strong>!<br />
                                            Your unit ({formData.unitName}) index has been officially entered for the tournament.
                                        </p>
                                        <div className="mt-5 d-flex justify-content-center gap-3">
                                            <Button variant="outline-dark" className="px-4 py-3 rounded-pill fw-bold" onClick={() => navigate('/')}>Return Home</Button>
                                            <Button variant="dark" className="px-4 py-3 rounded-pill fw-bold shadow">Download Schedule</Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default SportsRegistration;
