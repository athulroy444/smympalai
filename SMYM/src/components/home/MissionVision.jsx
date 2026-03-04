import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Eye, Bullseye, Compass } from 'react-bootstrap-icons';

const MissionVision = () => {
    const pillars = [
        {
            title: "Our Vision",
            desc: "To empower youth to be vibrant witnesses of the Gospel and proactive leaders in the Church and society through spiritual, social, and cultural integration.",
            icon: <Eye size={40} className="text-primary" />,
            color: "#fff"
        },
        {
            title: "Our Mission",
            desc: "To create a unified platform for the youth of Syro-Malabar Church, fostering their holistic development and involving them in the mission of the Church.",
            icon: <Bullseye size={40} className="text-primary" />,
            color: "#f8fafc"
        },
        {
            title: "Our Motto",
            desc: "\"Youth in the Society for God's Kingdom.\" We strive to build a just and humane society based on Gospel values and the teachings of the Church.",
            icon: <Compass size={40} className="text-primary" />,
            color: "#fff"
        }
    ];

    return (
        <section className="section-padding" style={{ backgroundColor: '#ffffff' }}>
            <Container>
                <div className="text-center mb-5 pb-4">
                    <span className="section-subtitle">Core Philosophy</span>
                    <h2 className="section-title">Vision & Mission</h2>
                    <div style={{ width: '80px', height: '4px', background: 'var(--primary)', margin: '0 auto' }}></div>
                </div>

                <Row className="g-4">
                    {pillars.map((p, i) => (
                        <Col key={i} lg={4}>
                            <div className="glass-card stat-box h-100 p-5 d-flex flex-column align-items-center text-center">
                                <div className="mb-4 p-4 rounded-circle bg-light shadow-sm d-inline-flex align-items-center justify-content-center" style={{ width: '100px', height: '100px' }}>
                                    {p.icon}
                                </div>
                                <h3 className="fw-bold mb-3">{p.title}</h3>
                                <p className="text-muted leading-relaxed" style={{ fontSize: '1.05rem', opacity: 0.8 }}>
                                    {p.desc}
                                </p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default MissionVision;
