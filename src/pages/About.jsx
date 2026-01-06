import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PageHeader from '../components/common/PageHeader';
import image1 from '../assets/jubilee.jpeg';

function About() {
    return (
        <>
            <PageHeader title="About Us" subtitle="Learn about our history, mission, and leadership." />

            <Container className="py-5">
                {/* History Section */}
                <Row className="mb-5 align-items-center">
                    <Col lg={6}>
                        <img src={image1} alt="History" className="img-fluid shadow-sm rounded mb-4 mb-lg-0" />
                    </Col>
                    <Col lg={6}>
                        <h3 style={{ color: '#E14B1F' }}>Our History</h3>
                        <p>
                            The Syro-Malabar Youth Movement (SMYM) is the official youth organization of the Syro-Malabar Church.
                            Launched in 2011 by the Synod of Bishops, it replaced various youth movements to create a unified
                            platform for the youth across the globe.
                        </p>
                        <p>
                            In the Eparchy of Palai, SMYM has a rich tradition of forming young leaders who are grounded in
                            faith and active in social service. Our journey began with small prayer groups and has now expanded
                            to include over 170 parish units.
                        </p>
                    </Col>
                </Row>

                {/* Director Section */}
                <Row className="mb-5">
                    <Col xs={12}>
                        <h3 className="mb-4 text-center" style={{ color: '#1A1A1A' }}>Our Leadership</h3>
                    </Col>
                    {/* Placeholder for Director */}
                    <Col md={4} className="text-center mb-4">
                        <div className="bg-light p-4 rounded h-100">
                            <div className="rounded-circle bg-secondary mx-auto mb-3" style={{ width: '120px', height: '120px' }}></div>
                            <h5 className="fw-bold">Fr. Director Name</h5>
                            <p className="text-muted small">Director, SMYM Palai</p>
                            <p className="small">"Youth are the pillars of the church and the hope of the world."</p>
                        </div>
                    </Col>
                    {/* Placeholder for President */}
                    <Col md={4} className="text-center mb-4">
                        <div className="bg-light p-4 rounded h-100">
                            <div className="rounded-circle bg-secondary mx-auto mb-3" style={{ width: '120px', height: '120px' }}></div>
                            <h5 className="fw-bold">Youth President</h5>
                            <p className="text-muted small">President</p>
                        </div>
                    </Col>
                    {/* Placeholder for Animator */}
                    <Col md={4} className="text-center mb-4">
                        <div className="bg-light p-4 rounded h-100">
                            <div className="rounded-circle bg-secondary mx-auto mb-3" style={{ width: '120px', height: '120px' }}></div>
                            <h5 className="fw-bold">Sr. Animator Name</h5>
                            <p className="text-muted small">Animator</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default About;
