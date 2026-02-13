import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import image1 from '../../assets/Frame 1.png';
import image2 from '../../assets/Frame 2.png';

function HeroCarousel() {
  return (
    <Carousel fade interval={5000} pause={false}>
      {/* Slide 1 - Frame 2 */}
      <Carousel.Item>
        {/* Height increased by 5% (from 45vh to 50vh) */}
        <div className="hero-carousel-item" style={{ height: '75vh', minHeight: '380px', overflow: 'hidden', position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.4)',
              zIndex: 1
            }}
          />
          <img
            className="d-block w-100 h-100"
            src={image2}
            alt="Palai Eparchy"
            style={{
              objectFit: 'cover',
              objectPosition: 'top center'
            }}
          />
          {/* <Carousel.Caption style={{ zIndex: 2, top: '55%', transform: 'translateY(-50%)', bottom: 'auto' }}>
            <h2 className="fw-bold text-white mb-2" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', letterSpacing: '-0.02em' }}>Faith in Action</h2>
            <p className="text-white mb-4" style={{ fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto', opacity: 0.95 }}>
              Empowering the youth of Palai Eparchy to lead with Christ.
            </p>
            <Button variant="primary" style={{ borderRadius: '50px', padding: '10px 28px', fontWeight: '600', border: 'none', backgroundColor: '#fbbf24', color: '#000' }}>
              Join Our Mission
            </Button>
          </Carousel.Caption> */}
        </div>
      </Carousel.Item>

      {/* Slide 2 - Frame 1 */}
      <Carousel.Item>
        <div className="hero-carousel-item" style={{ height: '75vh', minHeight: '380px', overflow: 'hidden', position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.35)',
              zIndex: 1
            }}
          />
          <img
            className="d-block w-100 h-100"
            src={image1}
            alt="Jubilee Celebration"
            style={{
              objectFit: 'cover',
              objectPosition: 'top center'
            }}
          />
          {/* <Carousel.Caption style={{ zIndex: 2, top: '55%', transform: 'translateY(-50%)', bottom: 'auto' }}>
            <h2 className="fw-bold text-white mb-2" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', letterSpacing: '-0.02em' }}>Deep Roots, Strong Faith</h2>
            <p className="text-white mb-4" style={{ fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto', opacity: 0.95 }}>
              Celebrating our heritage and building a future together.
            </p>
            <Button variant="outline-light" style={{ borderRadius: '50px', padding: '10px 28px', fontWeight: '600', borderWidth: '2px' }}>
              Explore History
            </Button>
          </Carousel.Caption> */}
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default HeroCarousel;