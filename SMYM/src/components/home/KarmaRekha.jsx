import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FileEarmarkPdf, Download, Pencil } from 'react-bootstrap-icons';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function KarmaRekha() {
    const { karmaRekha, updateKarmaRekha } = useData();
    const { user } = useAuth();
    const isAdmin = user && user.role === 'admin';

    const [showModal, setShowModal] = useState(false);
    const [link, setLink] = useState(karmaRekha?.link || '#');
    const [title, setTitle] = useState(karmaRekha?.title || 'Karma Rekha 2024-2025');

    const handleSave = () => {
        updateKarmaRekha({ title, link });
        setShowModal(false);
    };

    const openEdit = () => {
        setTitle(karmaRekha?.title || 'Karma Rekha 2024-2025');
        setLink(karmaRekha?.link || '#');
        setShowModal(true);
    };

    return (
        <>
            <section className="section-padding" style={{ background: '#f8fafc' }}>
                <Container>
                    <div className="glass-card p-5 overflow-hidden position-relative" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)', border: 'none' }}>
                        {/* Decorative elements */}
                        <div className="position-absolute top-0 end-0 p-5 mt-5 opacity-10">
                            <FileEarmarkPdf size={200} className="text-white" />
                        </div>

                        {isAdmin && (
                            <button
                                className="btn btn-sm glass-card border-0 position-absolute top-0 end-0 m-4 px-3 py-2 text-white fw-bold"
                                style={{ background: 'rgba(255,255,255,0.1)' }}
                                onClick={openEdit}
                            >
                                <Pencil size={14} className="me-2" /> Modify Content
                            </button>
                        )}

                        <Row className="align-items-center position-relative z-1 g-4">
                            <Col lg={8} className="text-center text-lg-start">
                                <span className="section-subtitle text-primary-light mb-2">Annual Action Plan</span>
                                <h2 className="display-4 fw-800 text-white mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>കർമ്മരേഖ</h2>
                                <h4 className="fw-bold text-accent mb-4" style={{ letterSpacing: '2px' }}>{karmaRekha?.title || 'Karma Rekha 2025-26'}</h4>
                                <p className="text-white opacity-75 lead mb-0" style={{ maxWidth: '600px' }}>
                                    The strategic roadmap and official guidelines for SMYM Eparchy of Palai.
                                    Our mission in action, documented for every youth leader.
                                </p>
                            </Col>
                            <Col lg={4} className="text-center">
                                <a
                                    href={karmaRekha?.link || '#'}
                                    target="_blank"
                                    rel="noreferrer"
                                    download="KarmaRekha.pdf"
                                    className="btn-premium btn-lg py-3 px-5 shadow-2xl"
                                    style={{ background: 'white', color: 'var(--primary)', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
                                >
                                    <Download size={22} className="me-3" /> Download PDF
                                </a>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </section>

            {/* Edit Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold">Update Karma Rekha</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-bold">Title (Year)</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-bold">PDF Link (URL)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="https://..."
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleSave}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default KarmaRekha;
