import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import PageHeader from '../components/common/PageHeader';
import { useData } from '../context/DataContext';
import { Search, Map, People, Calendar3, ArrowLeft, ArrowRight } from 'react-bootstrap-icons';

function Forona() {
    const { foronaList = [], loading } = useData();
    const [selectedForona, setSelectedForona] = useState('');
    const [selectedUnit, setSelectedUnit] = useState('');
    const [showDetails, setShowDetails] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const detailsRef = useRef(null);

    // Flat list of all units for searching
    const allUnits = (foronaList || []).flatMap(f =>
        (f.units || []).map(u => ({ ...u, foronaName: f.name }))
    );

    const filteredUnits = searchTerm.length > 1
        ? allUnits.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : [];

    const handleSearchSelect = (unit) => {
        setSelectedForona(unit.foronaName);
        setSelectedUnit(unit.name);
        setShowDetails(true);
        setSearchTerm('');
        setSearchParams({ name: unit.foronaName, unit: unit.name });
    };

    // Sync state with URL params
    useEffect(() => {
        const foronaParam = searchParams.get('name');
        const unitParam = searchParams.get('unit');

        if (foronaParam) {
            setSelectedForona(foronaParam);
            if (unitParam) {
                setSelectedUnit(unitParam);
                setShowDetails(true);
                // Delay scroll to ensure content is rendered
                setTimeout(() => {
                    detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 300);
            } else {
                setShowDetails(false);
                setSelectedUnit('');
            }
        } else {
            setSelectedForona('');
            setShowDetails(false);
            setSelectedUnit('');
        }
    }, [searchParams]);

    const currentForonaData = selectedForona
        ? foronaList.find(f => f.name === selectedForona)
        : null;

    const currentUnits = currentForonaData?.units || [];

    const currentUnitData = selectedUnit
        ? currentUnits.find(u => u.name === selectedUnit)
        : null;

    const foronaActivities = currentForonaData
        ? currentForonaData.units.flatMap(u => (u.activities || []).map(a => ({ ...a, unitName: u.name })))
            .sort((a, b) => new Date(b.activity_date) - new Date(a.activity_date))
        : [];

    const handleForonaChange = (e) => {
        const val = e.target.value;
        setSelectedForona(val);
        setSelectedUnit('');
        setShowDetails(false);
        if (val) setSearchParams({ name: val });
        else setSearchParams({});
    };

    const handleUnitChange = (e) => {
        const val = e.target.value;
        setSelectedUnit(val);
        setShowDetails(false);
    };

    const handleSubmit = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        if (selectedForona && selectedUnit) {
            setShowDetails(true);
            setSearchParams({ name: selectedForona, unit: selectedUnit });
        }
    };

    const resetView = () => {
        setSelectedForona('');
        setSelectedUnit('');
        setShowDetails(false);
        setSearchParams({});
    };

    return (
        <div style={{ backgroundColor: '#fcfcfc', minHeight: '100vh' }}>
            <PageHeader title="Eparchial Directory" subtitle="Navigate through Foronas and Parish Units of Palai." />

            <Container className="py-5">
                {/* --- SELECTION BOX (The "Browse Unit" Interface) --- */}
                <Row className="justify-content-center mb-5 mt-n5">
                    <Col lg={10}>
                        <Card className="border-0 shadow-lg selection-card-container overflow-hidden" style={{ borderRadius: '20px', marginTop: '-60px', zIndex: 10 }}>
                            <Card.Body className="p-0">
                                <Row className="g-0">
                                    <Col md={4} className="bg-dark text-white p-4 d-flex flex-column justify-content-center">
                                        <h4 className="fw-bold mb-2">Manual Lookup</h4>
                                        <p className="small opacity-75 mb-0">Select your forona and unit to access direct records.</p>
                                    </Col>
                                    <Col md={8} className="p-4 bg-white">
                                        <Form onSubmit={handleSubmit}>
                                            <Row className="g-3">
                                                <Col md={5}>
                                                    <Form.Label className="small fw-bold text-muted text-uppercase mb-2">Forona Region</Form.Label>
                                                    <Form.Select
                                                        value={selectedForona}
                                                        onChange={handleForonaChange}
                                                        className="directory-select"
                                                        disabled={loading || foronaList.length === 0}
                                                    >
                                                        <option value="">{loading ? 'Fetching...' : '-- Select Forona --'}</option>
                                                        {foronaList.map((f, idx) => (
                                                            <option key={idx} value={f.name}>{f.name}</option>
                                                        ))}
                                                    </Form.Select>
                                                </Col>
                                                <Col md={5}>
                                                    <Form.Label className="small fw-bold text-muted text-uppercase mb-2">Parish Unit</Form.Label>
                                                    <Form.Select
                                                        value={selectedUnit}
                                                        onChange={handleUnitChange}
                                                        disabled={loading || !selectedForona || currentUnits.length === 0}
                                                        className="directory-select"
                                                    >
                                                        <option value="">-- Select Unit --</option>
                                                        {currentUnits.map((u, idx) => (
                                                            <option key={idx} value={u.name}>{u.name}</option>
                                                        ))}
                                                    </Form.Select>
                                                </Col>
                                                <Col md={2} className="d-flex align-items-end">
                                                    <Button
                                                        variant="primary"
                                                        type="submit"
                                                        disabled={loading || !selectedForona || !selectedUnit}
                                                        className="w-100 py-2 fw-bold directory-btn"
                                                    >
                                                        GO
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* --- QUICK SEARCH (Optional alternative) --- */}
                {!showDetails && !selectedForona && (
                    <div className="search-teaser text-center mb-5">
                        <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap">
                            <span className="text-muted small fw-bold text-uppercase">Or use Quick Search:</span>
                            <div className="position-relative" style={{ minWidth: '300px' }}>
                                <Search className="position-absolute translate-middle-y top-50 start-0 ms-3 text-muted" />
                                <Form.Control
                                    placeholder="Type unit name..."
                                    className="rounded-pill border-0 shadow-sm ps-5 py-2"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                {searchTerm && filteredUnits.length > 0 && (
                                    <div className="quick-results-pop shadow">
                                        {filteredUnits.slice(0, 5).map((u, i) => (
                                            <div key={i} className="q-result-item" onClick={() => handleSearchSelect(u)}>
                                                <span className="fw-bold">{u.name}</span> <span className="text-muted x-small">({u.foronaName})</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>
                        <p className="mt-2 text-muted">Refreshing records...</p>
                    </div>
                ) : (foronaList.length === 0) ? (
                    <div className="text-center py-5 bg-white shadow-sm rounded-4 border-dashed">
                        <h2 className="fw-bold text-danger">Data Sync Issue</h2>
                        <p className="text-muted">The directory service is temporarily unavailable.</p>
                        <Button variant="outline-primary" onClick={() => window.location.reload()}>Reconnect</Button>
                    </div>
                ) : (
                    <>
                        {/* --- VIEW 1: EXPLORE ALL --- */}
                        {!showDetails && !selectedForona && (
                            <div className="fade-in-up">
                                <Row className="mb-4">
                                    <Col className="text-center">
                                        <h3 className="fw-bold mb-4">Parochial Distribution</h3>
                                        <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
                                            The Eparchy of Palai is divided into {foronaList.length} Foronas, each presiding over local parish units. Select a region below to explore leadership.
                                        </p>
                                    </Col>
                                </Row>
                                <Row className="g-3">
                                    {foronaList.map((f, i) => (
                                        <Col key={i} xl={3} lg={4} md={6}>
                                            <Card
                                                className="h-100 border-0 shadow-sm forona-card-reveal"
                                                onClick={() => {
                                                    setSearchParams({ name: f.name });
                                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                                }}
                                            >
                                                <Card.Body className="p-4 d-flex align-items-center">
                                                    <div className="region-avatar me-3">
                                                        {f.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="fw-bold text-dark">{f.name}</div>
                                                        <div className="x-small text-muted">{f.units?.length || 0} Units</div>
                                                    </div>
                                                    <ArrowRight className="ms-auto text-muted icon-arrow" />
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        )}

                        {/* --- VIEW 2: FORONA SPECIFIC --- */}
                        {!showDetails && selectedForona && (
                            <div className="fade-in-up">
                                <div className="d-flex align-items-center mb-5">
                                    <Button variant="link" className="text-dark p-0 me-3 text-decoration-none" onClick={resetView}>
                                        <ArrowLeft size={24} />
                                    </Button>
                                    <div>
                                        <h2 className="fw-bold mb-0">{selectedForona} Forona</h2>
                                        <p className="text-muted mb-0 small text-uppercase ls-2">Regional Leadership & Units</p>
                                    </div>
                                </div>

                                {/* Forona Leaderboard - PREMIUM VERSION */}
                                {currentForonaData?.executives?.length > 0 && (
                                    <div className="mb-5">
                                        <div className="text-center mb-5">
                                            <h4 className="fw-bold text-uppercase ls-2 position-relative d-inline-block pb-3" style={{ letterSpacing: '3px' }}>
                                                Forona Executive Council
                                                <span className="position-absolute bottom-0 start-50 translate-middle-x bg-primary" style={{ height: '3px', width: '40px' }}></span>
                                            </h4>
                                        </div>
                                        <Row className="justify-content-center g-4 mb-5">
                                            {currentForonaData.executives.map((exec, idx) => (
                                                <Col key={idx} xs={12} sm={6} md={4} lg={3}>
                                                    <Card className="border-0 shadow-sm h-100 forona-leader-card overflow-hidden">
                                                        <div className="leader-photo-wrap">
                                                            {exec.image_url ? (
                                                                <img
                                                                    src={exec.image_url.startsWith('http') ? exec.image_url : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${exec.image_url}`}
                                                                    alt={exec.name}
                                                                    className="leader-img"
                                                                />
                                                            ) : (
                                                                <div className="leader-fallback">
                                                                    <People size={40} />
                                                                </div>
                                                            )}
                                                            <div className="leader-overlay">
                                                                <div className="leader-post-tag">{exec.post}</div>
                                                            </div>
                                                        </div>
                                                        <Card.Body className="text-center p-3">
                                                            <h6 className="fw-bold mb-1 text-dark">{exec.name}</h6>
                                                            <p className="text-muted x-small mb-0">{exec.phone || 'Contact via Forona Secretariat'}</p>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                    </div>
                                )}

                                <Row className="g-4 mb-5">
                                    <Col lg={12}>
                                        <div className="d-flex align-items-center mb-4">
                                            <div className="icon-circle bg-warning-soft text-warning me-3">
                                                <Calendar3 size={20} />
                                            </div>
                                            <h4 className="fw-bold mb-0">Regional Activity Feed</h4>
                                        </div>
                                        {foronaActivities.length > 0 ? (
                                            <Row className="g-4">
                                                {foronaActivities.slice(0, 6).map((act, i) => (
                                                    <Col md={6} lg={4} key={i}>
                                                        <Card className="border-0 shadow-sm h-100 activity-feed-card">
                                                            <Card.Body className="p-4">
                                                                <div className="d-flex justify-content-between mb-2">
                                                                    <Badge bg="warning-soft" className="text-warning border border-warning-subtle">
                                                                        {new Date(act.activity_date).toLocaleDateString('en-GB')}
                                                                    </Badge>
                                                                    <span className="text-muted x-small fw-bold text-uppercase">{act.unitName}</span>
                                                                </div>
                                                                <h6 className="fw-bold mb-2">{act.title}</h6>
                                                                <p className="text-muted small mb-0 line-clamp-2">{act.description}</p>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                ))}
                                            </Row>
                                        ) : (
                                            <div className="p-5 text-center bg-light rounded-4 border-dashed">
                                                <p className="text-muted mb-0">No recent activities reported from units in this region.</p>
                                            </div>
                                        )}
                                    </Col>
                                </Row>
                            </div>
                        )}

                        {/* --- VIEW 3: UNIT DETAILS --- */}
                        {showDetails && currentUnitData && (
                            <div className="fade-in-up mt-4" ref={detailsRef}>
                                <Card className="border-0 shadow-lg unit-profile-card overflow-hidden" style={{ borderRadius: '25px' }}>
                                    <div className="card-top-accent bg-primary text-white p-4 p-md-5 d-flex justify-content-between align-items-center">
                                        <div>
                                            <div className="text-uppercase fw-bold opacity-75 small mb-1 ls-2">{selectedForona} Forona</div>
                                            <h1 className="fw-bold mb-0">{currentUnitData.name} Parish Unit</h1>
                                        </div>
                                        <Button
                                            variant="light"
                                            className="rounded-circle p-3 d-none d-md-flex align-items-center justify-content-center"
                                            style={{ width: '50px', height: '50px' }}
                                            onClick={() => setShowDetails(false)}
                                        >
                                            <ArrowLeft size={20} />
                                        </Button>
                                    </div>
                                    <Card.Body className="p-4 p-md-5 bg-white">
                                        <Row>
                                            <Col lg={7} className="mb-5 mb-lg-0">
                                                <div className="d-flex align-items-center mb-4">
                                                    <div className="icon-circle bg-success-soft text-success me-3">
                                                        <Calendar3 size={20} />
                                                    </div>
                                                    <h4 className="fw-bold mb-0">Parish Youth Activities</h4>
                                                </div>

                                                {currentUnitData.activities?.length > 0 ? (
                                                    <div className="official-timeline">
                                                        {currentUnitData.activities.map((act, idx) => (
                                                            <div key={idx} className="timeline-node">
                                                                <div className="node-date">
                                                                    {new Date(act.activity_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                                </div>
                                                                <div className="node-content">
                                                                    <div className="fw-bold text-dark mb-1">{act.title}</div>
                                                                    <p className="text-muted small mb-0">{act.description}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="p-5 text-center bg-light rounded-4 border-dashed">
                                                        <p className="text-muted mb-0">No documented activities found for this term.</p>
                                                    </div>
                                                )}
                                            </Col>

                                            <Col lg={5}>
                                                <div className="d-flex align-items-center mb-4">
                                                    <div className="icon-circle bg-primary-soft text-primary me-3">
                                                        <People size={20} />
                                                    </div>
                                                    <h4 className="fw-bold mb-0">Executive Council</h4>
                                                </div>

                                                {currentUnitData.executives?.length > 0 ? (
                                                    <div className="prime-exec-list">
                                                        {currentUnitData.executives.map((exec, idx) => (
                                                            <div key={idx} className="prime-exec-card d-flex align-items-center p-3 mb-3" style={{ borderRadius: '15px' }}>
                                                                <div className="prime-exec-avatar me-3">
                                                                    {exec.image_url ?
                                                                        <img src={exec.image_url.startsWith('http') ? exec.image_url : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${exec.image_url}`} alt={exec.name} /> :
                                                                        <span>{exec.name.charAt(0)}</span>
                                                                    }
                                                                </div>
                                                                <div>
                                                                    <div className="fw-bold text-dark mb-0">{exec.name}</div>
                                                                    <div className="text-primary small fw-bold text-uppercase x-small" style={{ letterSpacing: '1px' }}>{exec.post}</div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="p-5 text-center bg-light rounded-4 border-dashed">
                                                        <p className="text-muted mb-0">Executive details are being updated.</p>
                                                    </div>
                                                )}
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                    <div className="bg-light p-4 text-center border-top">
                                        <Button variant="outline-dark" className="px-5 rounded-pill fw-bold" onClick={resetView}>
                                            Explore Other Parishes
                                        </Button>
                                    </div>
                                </Card>
                            </div>
                        )}
                    </>
                )}
            </Container>

            <style>
                {`
                .selection-card-container {
                    background: #fff;
                    position: relative;
                }
                .directory-select {
                    border: 1px solid #e1e5eb !important;
                    padding: 12px 15px !important;
                    border-radius: 10px !important;
                    font-size: 0.95rem !important;
                    background-color: #f8f9fa !important;
                }
                .directory-select:focus {
                    border-color: #0d6efd !important;
                    box-shadow: none !important;
                    background-color: #fff !important;
                }
                .directory-btn {
                    border-radius: 10px !important;
                    background: #0d6efd !important;
                    box-shadow: 0 4px 10px rgba(13, 110, 253, 0.2) !important;
                    border: none !important;
                }
                .region-avatar {
                    width: 50px;
                    height: 50px;
                    background: #f0f7ff;
                    color: #0d6efd;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 800;
                    font-size: 1.2rem;
                }
                .forona-card-reveal {
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
                    border: 1px solid #f0f0f0 !important;
                    border-radius: 15px !important;
                }
                .forona-card-reveal:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 30px rgba(0,0,0,0.08) !important;
                    border-color: #0d6efd !important;
                }
                .icon-arrow {
                    transition: transform 0.3s;
                }
                .forona-card-reveal:hover .icon-arrow {
                    transform: translateX(5px);
                    color: #0d6efd !important;
                }
                .unit-hover-tile {
                    cursor: pointer;
                    transition: all 0.3s;
                    border: 1px solid #f0f0f0 !important;
                    border-radius: 15px !important;
                }
                .unit-hover-tile:hover {
                    background: #f8f9fa;
                    border-color: #0d6efd !important;
                }
                .badge-view {
                    opacity: 0;
                    transition: opacity 0.3s;
                    font-size: 0.7rem;
                }
                .unit-hover-tile:hover .badge-view {
                    opacity: 1;
                }
                .bg-primary-soft { background: rgba(13, 110, 253, 0.1); }
                .bg-success-soft { background: rgba(25, 135, 84, 0.1); }
                .icon-circle {
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .official-timeline {
                    border-left: 2px solid #e1e5eb;
                    padding-left: 30px;
                    margin-left: 15px;
                }
                .timeline-node {
                    position: relative;
                    padding-bottom: 35px;
                }
                .timeline-node::before {
                    content: '';
                    position: absolute;
                    left: -41px;
                    top: 0;
                    width: 20px;
                    height: 20px;
                    background: #fff;
                    border: 3px solid #198754;
                    border-radius: 50%;
                }
                .node-date {
                    font-size: 0.75rem;
                    font-weight: 800;
                    color: #198754;
                    text-transform: uppercase;
                    margin-bottom: 5px;
                    letter-spacing: 0.5px;
                }
                .prime-exec-card {
                    background: #fcfcfc;
                    border: 1px solid #f0f0f0;
                    border-radius: 12px;
                    transition: all 0.3s;
                }
                .prime-exec-avatar {
                    width: 42px;
                    height: 42px;
                    border-radius: 50%;
                    background: #0d6efd;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    overflow: hidden;
                }
                .prime-exec-avatar img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .exec-photo-box {
                    width: 60px;
                    height: 60px;
                    background: #f0f0f0;
                    border-radius: 15px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    border: 1px solid #dee2e6;
                }
                .exec-photo-box img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .quick-results-pop {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: white;
                    border-radius: 10px;
                    margin-top: 5px;
                    z-index: 100;
                    text-align: left;
                    overflow: hidden;
                    border: 1px solid #eee;
                }
                .q-result-item {
                    padding: 10px 15px;
                    cursor: pointer;
                    border-bottom: 1px solid #f8f9fa;
                }
                .q-result-item:hover {
                    background: #f0f7ff;
                }
                .x-small { font-size: 0.7rem; }
                .ls-2 { letter-spacing: 2px; }
                
                /* New Leader Card Styles */
                .forona-leader-card {
                    border-radius: 20px !important;
                    transition: all 0.3s ease;
                    border: 1px solid #f0f0f0 !important;
                }
                .forona-leader-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
                    border-color: #0d6efd !important;
                }
                .leader-photo-wrap {
                    position: relative;
                    padding-bottom: 120%; /* Portrait aspect ratio */
                    overflow: hidden;
                    background: #f8f9fa;
                }
                .leader-img {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s ease;
                }
                .forona-leader-card:hover .leader-img {
                    transform: scale(1.08);
                }
                .leader-fallback {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #dee2e6;
                }
                .leader-overlay {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    padding: 15px;
                    background: linear-gradient(transparent, rgba(0,0,0,0.7));
                    display: flex;
                    justify-content: center;
                }
                .leader-post-tag {
                    background: #0d6efd;
                    color: white;
                    font-size: 0.65rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    padding: 4px 12px;
                    border-radius: 50px;
                    letter-spacing: 1px;
                }
                
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .fade-in-up {
                    animation: fadeInUp 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
                }
                .border-dashed {
                    border: 2px dashed #e1e5eb !important;
                }
                .bg-warning-soft { background: rgba(255, 193, 7, 0.1); }
                .ls-2 { letter-spacing: 2px; }
                .x-small { font-size: 0.75rem; }
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .activity-feed-card {
                    transition: transform 0.2s;
                    border-radius: 15px !important;
                }
                .activity-feed-card:hover {
                    transform: translateY(-5px);
                }
                `}
            </style>
        </div>
    );
}

export default Forona;
