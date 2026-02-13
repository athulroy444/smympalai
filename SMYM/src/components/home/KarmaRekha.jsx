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
        <section className="py-5 text-white" style={{ background: 'linear-gradient(45deg, #1a237e 0%, #283593 100%)' }}>
            <Container>
                <div className="position-relative p-4 border border-light rounded" style={{ background: 'rgba(255,255,255,0.1)' }}>
                    {isAdmin && (
                        <Button
                            variant="light"
                            size="sm"
                            className="position-absolute top-0 end-0 m-3 text-primary fw-bold"
                            onClick={openEdit}
                        >
                            <Pencil className="me-1" /> Edit
                        </Button>
                    )}

                    <Row className="align-items-center text-center text-md-start">
                        <Col md={8}>
                            <h2 className="fw-bold mb-2">കർമ്മരേഖ</h2>
                            <h4 className="mb-3 text-warning">{karmaRekha?.title || 'Karma Rekha 2025'}</h4>
                            <p className="mb-0 text-white-50">
                                The official action plan and guidelines for SMYM Eparchy of Palai.
                                Download the digital copy to stay updated with our mission and vision.
                            </p>
                        </Col>
                        <Col md={4} className="text-center mt-3 mt-md-0">
                            <Button
                                variant="warning"
                                size="lg"
                                href={karmaRekha?.link || '#'}
                                target="_blank"
                                className="fw-bold px-4 py-3 rounded-pill shadow"
                            >
                                <Download className="me-2" /> Download PDF
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Container>

            {/* Edit Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Update Karma Rekha</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title (Year)</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>PDF Link (URL)</Form.Label>
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
        </section>
    );
}

export default KarmaRekha;
