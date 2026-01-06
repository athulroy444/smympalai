import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Facebook, Instagram, Youtube, GeoAlt, Envelope, Telephone } from 'react-bootstrap-icons';

function Footer() {
    return (
        <footer className="pt-5 pb-2 text-white" style={{ backgroundColor: '#1A1A1A' }}>
            <Container>
                <Row className="mb-5">
                    {/* Column 1: About */}
                    <Col lg={4} md={6} className="mb-4 mb-lg-0">
                        <h5 className="text-uppercase mb-4 fw-bold text-white">SMYM Palai</h5>
                        <p className="text-white-50 small mb-4">
                            The Syro-Malabar Youth Movement (SMYM) is the official youth movement of the Syro-Malabar Church.
                            In the Eparchy of Palai, we strive to bring youth closer to Christ and the Church.
                        </p>
                        <div className="d-flex gap-3">
                            <a href="#" className="text-white border rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}><Facebook /></a>
                            <a href="#" className="text-white border rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}><Instagram /></a>
                            <a href="#" className="text-white border rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}><Youtube /></a>
                        </div>
                    </Col>

                    {/* Column 2: Quick Links */}
                    <Col lg={2} md={6} className="mb-4 mb-lg-0">
                        <h6 className="text-uppercase mb-4 fw-bold" style={{ color: '#E14B1F' }}>Quick Links</h6>
                        <ul className="list-unstyled text-white-50 small">
                            <li className="mb-2"><a href="#" className="text-decoration-none text-white-50 hover-white">Home</a></li>
                            <li className="mb-2"><a href="#" className="text-decoration-none text-white-50 hover-white">About Us</a></li>
                            <li className="mb-2"><a href="#" className="text-decoration-none text-white-50 hover-white">History</a></li>
                            <li className="mb-2"><a href="/forona" className="text-decoration-none text-white-50 hover-white">Forona</a></li>
                            <li className="mb-2"><a href="#" className="text-decoration-none text-white-50 hover-white">Contact</a></li>
                        </ul>
                    </Col>

                    {/* Column 3: Important Links */}
                    <Col lg={3} md={6} className="mb-4 mb-lg-0">
                        <h6 className="text-uppercase mb-4 fw-bold" style={{ color: '#E14B1F' }}>Resources</h6>
                        <ul className="list-unstyled text-white-50 small">
                            <li className="mb-2"><a href="#" className="text-decoration-none text-white-50 hover-white">Registration</a></li>
                            <li className="mb-2"><a href="#" className="text-decoration-none text-white-50 hover-white">Downloads</a></li>
                            <li className="mb-2"><a href="#" className="text-decoration-none text-white-50 hover-white">Publications</a></li>
                            <li className="mb-2"><a href="#" className="text-decoration-none text-white-50 hover-white">Liturgy</a></li>
                        </ul>
                    </Col>

                    {/* Column 4: Contact */}
                    <Col lg={3} md={6}>
                        <h6 className="text-uppercase mb-4 fw-bold" style={{ color: '#E14B1F' }}>Contact Us</h6>
                        <ul className="list-unstyled text-white-50 small">
                            <li className="mb-3 d-flex">
                                <GeoAlt className="me-2 text-primary mt-1" size={18} />
                                <span>SMYM Office, Bishop's House,<br />PB No. 18, Palai - 686 575<br />Kottayam, Kerala</span>
                            </li>
                            <li className="mb-3 d-flex">
                                <Telephone className="me-2 text-primary mt-1" size={16} />
                                <span>+91 4822 212000</span>
                            </li>
                            <li className="mb-3 d-flex">
                                <Envelope className="me-2 text-primary mt-1" size={16} />
                                <span>smympalai@gmail.com</span>
                            </li>
                        </ul>
                    </Col>
                </Row>
                <hr className="border-secondary" />
                <Row className="pt-2">
                    <Col className="text-center text-white-50 small">
                        &copy; {new Date().getFullYear()} SMYM Eparchy of Palai. All Rights Reserved.
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
