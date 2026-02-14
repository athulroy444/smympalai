import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PageHeader from '../components/common/PageHeader';
import image1 from '../assets/Frame 1.png';

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
                        <h3 style={{ color: '#E14B1F' }}>Syro-Malabar Youth Movement (SMYM)</h3>

                        <blockquote className="blockquote text-muted border-start border-4 border-warning ps-3 my-4">
                            <p className="mb-2 fst-italic">"Dear young people, let yourselves be taken over by the light of Christ, and spread that light wherever you are."</p>
                            <footer className="blockquote-footer mt-1">- St. John Paul II</footer>
                        </blockquote>

                        <p className="mb-3">
                            Youth is the age of dreaming about life and striving to achieve that dream. A community's strength is its youth. Today's church and society need young people who offer Jesus's comfort and stand together in times of crisis. Each one of us as young people in the Syro-Malabar Church, known as the 'Marthoma Nazranis', formed by the legacy of the faith of St. Thomas, must move forward together. As the church faces powerful challenges every day, the time has come to call out the power of youth.
                        </p>

                        <p className="mb-3">
                            The Syro-Malabar Church, founded in India as a result of the evangelization of St. Thomas the Apostle in the first century, is today the largest Catholic body in the world, with 5.01 million members. However, the lack of a platform to mobilize the youth of our congregation under one umbrella should be noted. All the Catholic Youth Organizations in Kerala are known as K.C.Y.M and the dioceses outside Kerala youths work under I.C.Y.M is a matter of pride. But as the boundaries of the Syro-Malabar Church expanded beyond Kerala and especially outside India, the opportunity to work together with our brothers and sisters in those regions became vital.
                        </p>

                        <p className="mb-3">
                            As a result of these efforts, Syro-Malabar Youth Movement (SMYM) was formed. SMYM is a collective of youth of Syro-Malabar Church growing through the hands of believers in 32 dioceses within and outside India. The organisation calls for a united movement with the motto <strong>"Youth in the Society for God's Kingdom."</strong>
                        </p>

                        <p>
                            We should be able to know the pain of the missionaries and the youth serving in the mission dioceses outside Kerala and help them. S.M.Y.M is committed to study and acknowledge their culture and tradition and to inculcate the thought that all of us known as 'Marthoma Nazranis' are equal in heritage, spirituality, and liturgy.
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
                            <p className="text-muted small">MIJO JOY</p>
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
