import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Calendar, ArrowRight } from 'react-bootstrap-icons';
import cardImage from '../../assets/NavLogo.png';

function NewsSection() {
  const newsItems = [
    { title: "Diocesan Youth Assembly 2026", date: "Jan 15, 2026", desc: "Join us for the annual gathering of youth representatives from all parishes." },
    { title: "Charity Drive for Flood Relief", date: "Feb 02, 2026", desc: "SMYM Palai launches a new initiative to support families affected by recent floods." },
    { title: "Lenten Retreat: 'Return to Him'", date: "Mar 10, 2026", desc: "A 3-day spiritual retreat focused on prayer, fasting, and renewal." },
    { title: "New Executive Committee Elected", date: "Jan 05, 2026", desc: "Meet the new leaders who will guide SMYM Palai for the next term." },
  ];

  return (
    <div className="section-padding">
      <Container>
        <div className="text-center mb-5">
          <h5 className="text-primary text-uppercase fw-bold mb-2">Updates</h5>
          <h2 className="mb-3">Latest News & Events</h2>
          <div style={{ width: '60px', height: '3px', background: '#E14B1F', margin: '0 auto' }}></div>
        </div>

        <Row>
          {newsItems.map((item, idx) => (
            <Col key={idx} lg={3} md={6} className="mb-4">
              <Card className="h-100 shadow-sm border-0 h-100-hover-effect">
                <Card.Img
                  variant="top"
                  src={cardImage}
                  style={{ height: '200px', objectFit: 'contain', padding: '20px', backgroundColor: '#f9f9f9' }}
                />
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex align-items-center mb-2 text-muted small">
                    <Calendar size={14} className="me-2 text-primary" /> {item.date}
                  </div>
                  <Card.Title className="fw-bold mb-3 fs-6">{item.title}</Card.Title>
                  <Card.Text className="text-secondary small mb-4 flex-grow-1">
                    {item.desc}
                  </Card.Text>
                  <a href="#" className="text-primary fw-bold text-decoration-none small d-flex align-items-center">
                    Read More <ArrowRight className="ms-1" />
                  </a>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="text-center mt-4">
          <Button variant="outline-primary" className="rounded-0">View All News</Button>
        </div>
      </Container>
    </div>
  );
}

export default NewsSection;