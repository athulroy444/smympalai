import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import image1 from '../../assets/jubilee.jpeg';

function HeroCarousel() {
  return (
    <Carousel fade>
      {/* Slide 1 */}
      <Carousel.Item>
        <div style={{ position: 'relative', height: '600px' }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.4)', // Dark overlay
              zIndex: 1
            }}
          />
          <img
            className="d-block w-100 h-100"
            src={image1}
            alt="Jubilee Celebration"
            style={{ objectFit: 'cover' }}
          />
          <Carousel.Caption style={{ zIndex: 2, top: '50%', transform: 'translateY(-50%)', bottom: 'auto' }}>
            <h1 className="display-3 fw-bold text-white mb-3">Faith in Action</h1>
            <p className="lead text-white mb-4">Empowering the youth of Palai Eparchy to lead with Christ.</p>
            <Button variant="primary" size="lg">Join Our Mission</Button>
          </Carousel.Caption>
        </div>
      </Carousel.Item>

      {/* Slide 2 */}
      <Carousel.Item>
        <div style={{ position: 'relative', height: '600px', backgroundColor: '#333' }}>
          {/* Fallback pattern background if no image */}
          <div style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(45deg, #1A1A1A 0%, #2c3e50 100%)'
          }}>
            <Carousel.Caption style={{ top: '50%', transform: 'translateY(-50%)', bottom: 'auto' }}>
              <h1 className="display-3 fw-bold text-white mb-3">Deep Roots, Strong Faith</h1>
              <p className="lead text-white mb-4">Celebrating our heritage and building a future together.</p>
              <Button variant="outline-light" size="lg">Explore History</Button>
            </Carousel.Caption>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}
export default HeroCarousel;