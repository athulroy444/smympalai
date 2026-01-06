import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PageHeader from '../components/common/PageHeader';
import { GeoAlt, Envelope, Telephone } from 'react-bootstrap-icons';

function Contact() {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Message sent successfully! (Demo)");
    }

    return (
        <>
            <PageHeader title="Contact Us" subtitle="We'd love to hear from you." />

            <Container className="py-5">
                <Row>
                    {/* Contact Info */}
                    <Col lg={5} className="mb-5 mb-lg-0">
                        <h3 className="mb-4" style={{ color: '#E14B1F' }}>Get in Touch</h3>
                        <div className="d-flex mb-4">
                            <GeoAlt size={24} className="text-primary me-3 flex-shrink-0" />
                            <div>
                                <h5 className="fw-bold">Address</h5>
                                <p className="text-muted">SMYM Office, Bishop's House<br />PB No. 18, Palai - 686 575<br />Kottayam, Kerala</p>
                            </div>
                        </div>
                        <div className="d-flex mb-4">
                            <Telephone size={24} className="text-primary me-3 flex-shrink-0" />
                            <div>
                                <h5 className="fw-bold">Phone</h5>
                                <p className="text-muted">+91 4822 212000</p>
                            </div>
                        </div>
                        <div className="d-flex mb-4">
                            <Envelope size={24} className="text-primary me-3 flex-shrink-0" />
                            <div>
                                <h5 className="fw-bold">Email</h5>
                                <p className="text-muted">smympalai@gmail.com</p>
                            </div>
                        </div>
                    </Col>

                    {/* Contact Form */}
                    <Col lg={7}>
                        <div className="bg-white p-4 shadow-sm border rounded">
                            <h4 className="mb-4">Send us a Message</h4>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Group controlId="formName">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" placeholder="Your Name" required />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group controlId="formEmail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" placeholder="Your Email" required />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group className="mb-3" controlId="formSubject">
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control type="text" placeholder="Subject" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formMessage">
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control as="textarea" rows={4} placeholder="How can we help?" required />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="px-4">Send Message</Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Contact;
