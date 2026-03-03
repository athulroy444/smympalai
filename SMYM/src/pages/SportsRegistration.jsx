import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Tabs, Tab, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import PageHeader from '../components/common/PageHeader';
import { Person, Calendar, Telephones, Geo, CreditCard, ShieldCheck, CheckCircleFill, Trophy } from 'react-bootstrap-icons';
import sportsBanner from '../assets/sports_event_banner_1772538309321.png';

const SportsRegistration = () => {
    const { foronaList, registerSportsEvent } = useData();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        fullName: '',
        dob: '',
        phone: '',
        unitName: '',
        eventName: 'Eparchial Sports Meet 2025',
        amount: 250
    });

    const events = [
        { name: "Eparchial Sports Meet 2025", fee: 250 },
        { name: "Unit Football Tournament", fee: 500 },
        { name: "Athletics Championship", fee: 150 }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'eventName') {
            const selectedEvent = events.find(ev => ev.name === value);
            setFormData(prev => ({ ...prev, [name]: value, amount: selectedEvent.fee }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleNext = () => {
        if (formData.fullName && formData.dob && formData.phone && formData.unitName) {
            setStep(2);
        } else {
            alert("Please fill all personal details first.");
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        const result = await registerSportsEvent(formData);
        if (result) {
            setSuccess(true);
            setStep(3);
        } else {
            alert("Registration failed. Please try again.");
        }
        setLoading(false);
    };

    // Flatten units for selection
    const allUnits = foronaList.flatMap(f => f.units.map(u => u.name)).sort();

    return (
        <div className="sports-reg-page pb-5" style={{ backgroundColor: '#f4f7fe', minHeight: '100vh' }}>
            <PageHeader
                title="Sports Event Registration"
                subtitle="Join the grandest sporting celebration of SMYM Palai. Register now and showcase your talent!"
            />

            <Container className="mt-n5">
                <Row className="justify-content-center">
                    <Col lg={10}>
                        <Card className="border-0 shadow-lg overflow-hidden" style={{ borderRadius: '24px', marginTop: '-40px' }}>
                            <Row className="g-0">
                                <Col lg={4} className="d-none d-lg-block">
                                    <div className="h-100 position-relative">
                                        <img
                                            src={sportsBanner}
                                            alt="Sports Event"
                                            className="h-100 w-100 object-fit-cover"
                                            style={{ filter: 'brightness(0.7)' }}
                                        />
                                        <div className="position-absolute top-50 start-50 translate-middle text-center w-100 px-4">
                                            <Trophy size={60} className="text-warning mb-4" />
                                            <h3 className="text-white fw-bold mb-3">Victory Awaits!</h3>
                                            <p className="text-white-50">"Hard work beats talent when talent doesn't work hard."</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={8} className="bg-white p-4 p-md-5">
                                    <div className="registration-stepper mb-5 d-flex justify-content-between">
                                        <div className={`step-item ${step >= 1 ? 'active' : ''}`}>
                                            <div className="step-circle">1</div>
                                            <span className="step-label">Details</span>
                                        </div>
                                        <div className="step-line"></div>
                                        <div className={`step-item ${step >= 2 ? 'active' : ''}`}>
                                            <div className="step-circle">2</div>
                                            <span className="step-label">Payment</span>
                                        </div>
                                        <div className="step-line"></div>
                                        <div className={`step-item ${step >= 3 ? 'active' : ''}`}>
                                            <div className="step-circle">3</div>
                                            <span className="step-label">Complete</span>
                                        </div>
                                    </div>

                                    {step === 1 && (
                                        <div className="fade-in">
                                            <h4 className="fw-bold mb-4 text-dark d-flex align-items-center">
                                                <Person className="me-2 text-primary" /> Participant Information
                                            </h4>
                                            <Row className="g-3">
                                                <Col md={12}>
                                                    <Form.Label className="small fw-bold text-muted text-uppercase mb-2">Full Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter your full name"
                                                        name="fullName"
                                                        value={formData.fullName}
                                                        onChange={handleInputChange}
                                                        className="form-control-premium"
                                                    />
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Label className="small fw-bold text-muted text-uppercase mb-2">Date of Birth</Form.Label>
                                                    <Form.Control
                                                        type="date"
                                                        name="dob"
                                                        value={formData.dob}
                                                        onChange={handleInputChange}
                                                        className="form-control-premium"
                                                    />
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Label className="small fw-bold text-muted text-uppercase mb-2">Phone Number</Form.Label>
                                                    <Form.Control
                                                        type="tel"
                                                        placeholder="Your mobile number"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                        className="form-control-premium"
                                                    />
                                                </Col>
                                                <Col md={12}>
                                                    <Form.Label className="small fw-bold text-muted text-uppercase mb-2">Parish Unit</Form.Label>
                                                    <Form.Select
                                                        name="unitName"
                                                        value={formData.unitName}
                                                        onChange={handleInputChange}
                                                        className="form-control-premium"
                                                    >
                                                        <option value="">-- Select Your Parish --</option>
                                                        {allUnits.map((u, i) => (
                                                            <option key={i} value={u}>{u}</option>
                                                        ))}
                                                    </Form.Select>
                                                </Col>
                                                <Col md={12}>
                                                    <Form.Label className="small fw-bold text-muted text-uppercase mb-2">Select Event</Form.Label>
                                                    <Form.Select
                                                        name="eventName"
                                                        value={formData.eventName}
                                                        onChange={handleInputChange}
                                                        className="form-control-premium text-primary fw-bold"
                                                    >
                                                        {events.map((ev, i) => (
                                                            <option key={i} value={ev.name}>{ev.name} (₹{ev.fee})</option>
                                                        ))}
                                                    </Form.Select>
                                                </Col>
                                                <Col md={12} className="mt-4">
                                                    <Button
                                                        variant="primary"
                                                        className="w-100 py-3 fw-bold rounded-pill shadow-sm btn-premium-action"
                                                        onClick={handleNext}
                                                    >
                                                        Continue to Payment
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    )}

                                    {step === 2 && (
                                        <div className="fade-in">
                                            <h4 className="fw-bold mb-4 text-dark d-flex align-items-center">
                                                <CreditCard className="me-2 text-primary" /> Payment Area
                                            </h4>

                                            <div className="payment-summary p-4 mb-4 rounded-4" style={{ backgroundColor: '#f8fafd', border: '1px dashed #cfe2ff' }}>
                                                <div className="d-flex justify-content-between mb-2">
                                                    <span className="text-muted">Participant:</span>
                                                    <span className="fw-bold">{formData.fullName}</span>
                                                </div>
                                                <div className="d-flex justify-content-between mb-2">
                                                    <span className="text-muted">Event:</span>
                                                    <span className="fw-bold">{formData.eventName}</span>
                                                </div>
                                                <hr />
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span className="fw-bold text-dark">Total Registration Fee:</span>
                                                    <span className="display-6 fw-black text-primary">₹{formData.amount}</span>
                                                </div>
                                            </div>

                                            <div className="payment-options mb-4">
                                                <p className="small fw-bold text-muted text-uppercase mb-3 text-center">Select Payment Method</p>
                                                <Row className="g-2">
                                                    <Col xs={4}>
                                                        <div className="pay-method-card active">
                                                            <div className="pay-icon upi"></div>
                                                            <span>UPI</span>
                                                        </div>
                                                    </Col>
                                                    <Col xs={4}>
                                                        <div className="pay-method-card opacity-50">
                                                            <div className="pay-icon card"></div>
                                                            <span>Card</span>
                                                        </div>
                                                    </Col>
                                                    <Col xs={4}>
                                                        <div className="pay-method-card opacity-50">
                                                            <div className="pay-icon wallet"></div>
                                                            <span>Wallet</span>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>

                                            <Alert variant="info" className="border-0 rounded-4 p-3 d-flex align-items-center">
                                                <ShieldCheck size={24} className="me-3" />
                                                <span className="small">Your payment is secured by industry-leading 256-bit encryption.</span>
                                            </Alert>

                                            <div className="d-flex gap-3 mt-4">
                                                <Button variant="light" className="px-4 py-3 rounded-pill fw-bold border" onClick={() => setStep(1)}>Back</Button>
                                                <Button
                                                    variant="primary"
                                                    className="flex-grow-1 py-3 fw-bold rounded-pill shadow btn-premium-action"
                                                    onClick={handleSubmit}
                                                    disabled={loading}
                                                >
                                                    {loading ? 'Processing...' : `Pay ₹${formData.amount} & Register`}
                                                </Button>
                                            </div>
                                        </div>
                                    )}

                                    {step === 3 && (
                                        <div className="text-center py-5 fade-in">
                                            <div className="success-animation mb-4">
                                                <CheckCircleFill size={80} className="text-success shadow-lg rounded-circle" />
                                            </div>
                                            <h2 className="fw-bold text-dark mb-2">Registration Confirmed!</h2>
                                            <p className="text-muted mb-4 lead">
                                                Thank you, <strong>{formData.fullName}</strong>! You have successfully registered for the {formData.eventName}.
                                            </p>

                                            <Card className="bg-light border-0 rounded-4 p-4 mb-4 mx-auto" style={{ maxWidth: '400px' }}>
                                                <div className="small text-muted text-uppercase ls-1 mb-2">Receipt Generated</div>
                                                <div className="fw-black fs-4 text-dark mb-0">INV-#{Math.floor(Math.random() * 90000) + 10000}</div>
                                                <div className="text-success fw-bold">Payment Status: SUCCESS</div>
                                            </Card>

                                            <div className="d-flex justify-content-center gap-3">
                                                <Button variant="outline-primary" className="px-5 py-3 rounded-pill fw-bold" onClick={() => navigate('/')}>Home</Button>
                                                <Button variant="primary" className="px-5 py-3 rounded-pill fw-bold shadow btn-premium-action">Download Ticket</Button>
                                            </div>
                                        </div>
                                    )}
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <style>{`
                .sports-reg-page {
                    font-family: 'Outfit', 'Inter', sans-serif;
                }
                .mt-n5 { margin-top: -3rem !important; }
                .form-control-premium {
                    background-color: #f8f9fa !important;
                    border: 1.5px solid #edf1f7 !important;
                    border-radius: 12px !important;
                    padding: 12px 16px !important;
                    font-size: 1rem !important;
                    transition: all 0.3s ease !important;
                }
                .form-control-premium:focus {
                    background-color: #fff !important;
                    border-color: #0d6efd !important;
                    box-shadow: 0 0 0 4px rgba(13, 110, 253, 0.1) !important;
                }
                .registration-stepper {
                    position: relative;
                }
                .step-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    z-index: 2;
                    flex: 1;
                }
                .step-circle {
                    width: 40px;
                    height: 40px;
                    background: #e9ecef;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 800;
                    color: #adb5bd;
                    margin-bottom: 8px;
                    transition: all 0.3s ease;
                }
                .step-label {
                    font-size: 0.75rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    color: #adb5bd;
                    transition: all 0.3s ease;
                }
                .step-item.active .step-circle {
                    background: #0d6efd;
                    color: white;
                    box-shadow: 0 4px 10px rgba(13, 110, 253, 0.3);
                }
                .step-item.active .step-label {
                    color: #0d6efd;
                }
                .step-line {
                    height: 2px;
                    background: #e9ecef;
                    flex-grow: 1;
                    margin-top: 20px;
                }
                .pay-method-card {
                    border: 2px solid #edf1f7;
                    border-radius: 16px;
                    padding: 16px;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .pay-method-card.active {
                    border-color: #0d6efd;
                    background: #f0f7ff;
                }
                .pay-method-card span {
                    font-size: 0.75rem;
                    font-weight: 800;
                    display: block;
                    margin-top: 8px;
                }
                .pay-icon {
                    height: 24px;
                    background-repeat: no-repeat;
                    background-position: center;
                }
                .btn-premium-action {
                    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
                }
                .btn-premium-action:hover {
                    transform: translateY(-4px) scale(1.02);
                    box-shadow: 0 10px 20px rgba(13, 110, 253, 0.2) !important;
                }
                .fade-in {
                    animation: fadeIn 0.6s ease-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .ls-1 { letter-spacing: 1px; }
                .fw-black { font-weight: 900; }
            `}</style>
        </div>
    );
};

export default SportsRegistration;
