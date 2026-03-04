import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Eye, Bullseye, Compass } from 'react-bootstrap-icons';
import visionImg from '../../assets/vision_orange.jpg';
import mottoImg from '../../assets/motto_blue.png';

const MissionVision = () => {
    const pillars = [
        {
            title: "",
            desc: "",
            icon: <div className="overflow-hidden rounded-lg shadow-sm w-100" style={{ height: '300px' }}><img src={visionImg} className="w-100 h-100 object-contain" alt="Vision" /></div>,
            color: "#fff"
        },
        {
            title: "Our Mission",
            desc: "To create a unified platform for the youth of Syro-Malabar Church, fostering their holistic development and involving them in the mission of the Church.",
            icon: <Bullseye size={60} className="text-primary" />,
            color: "#f8fafc"
        },
        {
            title: "",
            desc: "",
            icon: <div className="overflow-hidden rounded-lg shadow-sm w-100" style={{ height: '300px' }}><img src={mottoImg} className="w-100 h-100 object-contain" alt="Motto" /></div>,
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
                            <div className="glass-card stat-box h-100 p-4 d-flex flex-column align-items-center justify-content-center text-center">
                                <div className="mb-0 w-100 d-inline-flex align-items-center justify-content-center">
                                    {p.icon}
                                </div>
                                {p.title && <h3 className="fw-bold mb-3 mt-4">{p.title}</h3>}
                                {p.desc && (
                                    <p className="text-muted leading-relaxed mb-0" style={{ fontSize: '1.05rem', opacity: 0.8 }}>
                                        {p.desc}
                                    </p>
                                )}
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default MissionVision;
