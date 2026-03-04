import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { People, Building, Globe, Award } from 'react-bootstrap-icons';

function StatsSection() {
    const stats = [
        { icon: <People size={40} />, count: "18,000+", label: "Youth Members" },
        { icon: <Building size={40} />, count: "170", label: "Parish Units" },
        { icon: <Globe size={40} />, count: "20", label: "Forane Committees" },
        { icon: <Award size={40} />, count: "50+", label: "Years of Service" },
    ];

    return (
        <div className="section-padding" style={{ background: 'linear-gradient(150deg, var(--secondary) 0%, #e1f00cff 100%)', color: 'white' }}>
            <Container>
                <div className="text-center mb-5 pb-4">
                    <span className="section-subtitle text-primary">Our Impact</span>
                    <h2 className="section-title text-white">Eparchy at a Glance</h2>
                    <div style={{ width: '80px', height: '4px', background: 'var(--primary)', margin: '0 auto' }}></div>
                </div>

                <Row className="g-4">
                    {stats.map((stat, idx) => (
                        <Col key={idx} md={3} sm={6}>
                            <div className="glass-card stat-box h-100 p-4" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
                                <div className="mb-4 text-primary d-inline-block p-3 rounded-circle" style={{ backgroundColor: 'rgba(225, 75, 31, 0.1)' }}>
                                    {stat.icon}
                                </div>
                                <h3 className="stat-number fw-800 text-white mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>{stat.count}</h3>
                                <p className="stat-label text-white opacity-75 small">{stat.label}</p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default StatsSection;
