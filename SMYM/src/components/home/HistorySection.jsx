import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import image1 from '../../assets/Frame 1.png';

function HistorySection() {
    return (
        <div className="section-padding">
            <Container>
                <Row className="align-items-center">
                    <Col lg={6} className="mb-4 mb-lg-0">
                        <div className="position-relative">
                            <div style={{
                                position: 'absolute',
                                top: '-15px',
                                left: '-15px',
                                width: '100%',
                                height: '100%',
                                border: '3px solid #E14B1F',
                                zIndex: 0
                            }}></div>
                            <img
                                src={image1}
                                alt="History of SMYM"
                                className="img-fluid position-relative shadow-lg"
                                style={{ zIndex: 1, width: '100%' }}
                            />
                        </div>
                    </Col>
                    <Col lg={6} className="ps-lg-5">
                        <h5 className="text-primary text-uppercase fw-bold mb-2">Our History</h5>
                        <h2 className="mb-4">Syro-Malabar Youth Movement</h2>

                        <figure className="text-start mb-4">
                            <blockquote className="blockquote border-start border-4 border-warning ps-3">
                                <p className="fs-6 fst-italic text-secondary">"Dear young people, let yourselves be taken over by the light of Christ, and spread that light wherever you are."</p>
                            </blockquote>
                            <figcaption className="blockquote-footer mt-1 ms-3">
                                St. John Paul II
                            </figcaption>
                        </figure>

                        <p className="text-secondary mb-4">
                            Youth is the age of dreaming about life and striving to achieve that dream. A community's strength is its youth.
                            Today's church and society need young people who offer Jesus's comfort and stand together in times of crisis.
                        </p>
                        <p className="text-secondary mb-4">
                            SMYM is a collective of youth of Syro-Malabar Church, creating a unified movement with the motto <strong>"Youth in the Society for God's Kingdom"</strong>.
                        </p>

                        <Button href="/about" variant="outline-dark" className="rounded-0 px-4">Read Full Story</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default HistorySection;
