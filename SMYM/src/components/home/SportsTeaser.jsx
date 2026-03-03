import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Trophy, ArrowRight } from 'react-bootstrap-icons';

const SportsTeaser = () => {
    const navigate = useNavigate();

    return (
        <section className="sports-teaser-section py-5">
            <Container>
                <div className="teaser-card p-4 p-md-5 d-md-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center mb-4 mb-md-0">
                        <div className="icon-badge me-4">
                            <Trophy size={40} className="text-warning" />
                        </div>
                        <div>
                            <h2 className="fw-black text-white mb-1">Eparchial Team Championships 2025</h2>
                            <p className="text-white-50 mb-0">Cricket, Football, Volleyball & more. Register your unit team today!</p>
                        </div>
                    </div>
                    <Button
                        variant="warning"
                        size="lg"
                        className="rounded-pill px-5 py-3 fw-bold d-flex align-items-center shadow-lg hover-scale"
                        onClick={() => navigate('/sports-registration')}
                    >
                        Register Now <ArrowRight className="ms-3" />
                    </Button>
                </div>
            </Container>

            <style>{`
                .sports-teaser-section {
                    background-color: #f4f7fe;
                }
                .teaser-card {
                    background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%);
                    border-radius: 30px;
                    box-shadow: 0 20px 40px rgba(13, 71, 161, 0.2);
                    position: relative;
                    overflow: hidden;
                }
                .teaser-card::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    right: -10%;
                    width: 300px;
                    height: 300px;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 50%;
                }
                .icon-badge {
                    width: 80px;
                    height: 80px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .fw-black { font-weight: 900; }
                .hover-scale {
                    transition: transform 0.3s ease;
                }
                .hover-scale:hover {
                    transform: scale(1.05);
                }
            `}</style>
        </section>
    );
};

export default SportsTeaser;
