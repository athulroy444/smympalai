import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Trophy, ArrowRight } from 'react-bootstrap-icons';
import { useAuth } from '../../context/AuthContext';

const SportsTeaser = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleRegisterClick = () => {
        if (user) {
            navigate('/sports-registration');
        } else {
            // Redirect to login if not unit/user is not logged in
            navigate('/login');
        }
    };

    return (
        <section className="section-padding" style={{ backgroundColor: '#ffffff' }}>
            <Container>
                <div className="glass-card p-5 overflow-hidden position-relative" style={{ background: 'linear-gradient(135deg, var(--secondary) 0%, #000 100%)', border: 'none' }}>
                    {/* Decorative pattern */}
                    <div className="position-absolute top-0 end-0 p-4 opacity-10">
                        <Trophy size={180} className="text-white" />
                    </div>

                    <div className="position-relative z-1 d-lg-flex align-items-center justify-content-between g-4">
                        <div className="mb-4 mb-lg-0 text-center text-lg-start">
                            <span className="section-subtitle text-primary mb-2">Sports & Games</span>
                            <h2 className="display-5 fw-800 text-white mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Eparchial Team Championships 2025</h2>
                            <p className="text-white opacity-75 lead mb-0">Cricket, Football, Volleyball & more. Unite your parish, compete for glory!</p>
                        </div>
                        <div className="text-center">
                            <button
                                className="btn-premium btn-lg py-3 px-5 shadow-2xl"
                                onClick={handleRegisterClick}
                            >
                                Register Your Team <ArrowRight size={20} className="ms-3" />
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default SportsTeaser;
