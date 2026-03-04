import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { ArrowRight } from 'react-bootstrap-icons';
import image1 from '../../assets/FRAME 3.jpeg';

function HistorySection() {
    return (
        <div className="section-padding" style={{ background: '#f8fafc' }}>
            <Container>
                <Row className="align-items-center g-5">
                    <Col lg={6} className="mb-4 mb-lg-0">
                        <div className="position-relative p-3">
                            <div
                                className="position-absolute"
                                style={{
                                    top: '0',
                                    right: '0',
                                    width: '90%',
                                    height: '90%',
                                    border: '8px solid var(--accent)',
                                    borderRadius: '30px',
                                    zIndex: 0,
                                    opacity: 0.3
                                }}
                            />
                            <img
                                src={image1}
                                alt="History of SMYM"
                                className="img-fluid position-relative shadow-2xl"
                                style={{
                                    zIndex: 1,
                                    width: '100%',
                                    borderRadius: '30px',
                                    boxShadow: '0 30px 60px -12px rgba(50,50,93,0.25), 0 18px 36px -18px rgba(0,0,0,0.3)'
                                }}
                            />
                        </div>
                    </Col>
                    <Col lg={6} className="ps-lg-5">
                        <span className="section-subtitle">Since 1978</span>
                        <h2 className="section-title">Syro-Malabar Youth Movement</h2>

                        <div className="glass-card p-4 mb-4 border-start border-4 border-primary">
                            <p className="fs-5 fst-italic text-dark mb-2" style={{ lineHeight: '1.6', opacity: 0.9 }}>
                                "Dear young people, let yourselves be taken over by the light of Christ, and spread that light wherever you are."
                            </p>
                            <footer className="fw-bold text-primary small mt-2">— St. John Paul II</footer>
                        </div>

                        <p className="text-muted mb-4 lead" style={{ fontSize: '1.1rem' }}>
                            Youth is the age of dreaming about life and striving to achieve that dream. A community's strength is its youth.
                        </p>
                        <p className="text-muted mb-5">
                            SMYM is a collective of youth of Syro-Malabar Church, creating a unified movement with the motto <strong>"Youth in the Society for God's Kingdom"</strong>.
                            Today's church and society need young people who offer Jesus's comfort and stand together in times of crisis.
                        </p>

                        <button className="btn-premium">
                            Discover Our Journey <ArrowRight size={18} className="ms-2" />
                        </button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default HistorySection;
