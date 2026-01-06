import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import image1 from '../../assets/jubilee.jpeg';

function HistorySection() {
    return (
        <div className="section-padding bg-light">
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
                        <h2 className="mb-4">A Legacy of Faith & Youth</h2>
                        <p className="text-secondary mb-4">
                            The Syro-Malabar Youth Movement (SMYM) of Palai Eparchy has been a beacon of light for decades.
                            Established to unite the youth under the banner of Christ and the Church, we have grown
                            into a vibrant community dedicated to social service, spiritual growth, and cultural preservation.
                        </p>
                        <p className="text-secondary mb-4">
                            From humble beginnings in a few parishes, SMYM Palai now spans across the entire diocese,
                            organizing life-changing camps, leadership training, and charitable initiatives that touch
                            thousands of lives.
                        </p>
                        <Button variant="outline-dark" className="rounded-0 px-4">Read Full Story</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default HistorySection;
