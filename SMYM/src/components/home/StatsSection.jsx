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
        <div className="section-padding" style={{ backgroundColor: 'rgba(225, 75, 31, 0.85)', backdropFilter: "blur(10px)", color: 'white' }}>
            <Container>
                <Row className="text-center">
                    <Col xs={12} className="mb-4">
                        <h2 className="text-white fw-bold text-uppercase">Eparchy at a Glance</h2>
                        <div style={{ width: '60px', height: '3px', background: 'white', margin: '0 auto' }}></div>
                    </Col>
                    {stats.map((stat, idx) => (
                        <Col key={idx} md={3} sm={6} className="mb-4 mb-md-0">
                            <div className="p-3">
                                <div className="mb-3 text-white-50">{stat.icon}</div>
                                <h3 className="fw-bold mb-1 display-6 text-white">{stat.count}</h3>
                                <p className="text-uppercase fw-semibold small letter-spacing-1">{stat.label}</p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default StatsSection;
