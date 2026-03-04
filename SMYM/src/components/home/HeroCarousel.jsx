import Carousel from 'react-bootstrap/Carousel';
import { useData } from '../../context/DataContext';
import image1 from '../../assets/Frame 2.png';
import image2 from '../../assets/Frame 1.png';

function HeroCarousel() {
  console.log("HeroCarousel: Rendering...");
  const { heroSlides } = useData();

  // Default slides if none uploaded in admin
  const defaultSlides = [
    { image_url: image2, title: "" },
    { image_url: image1, title: "" }
  ];

  const slidesToDisplay = heroSlides.length > 0 ? heroSlides : defaultSlides;

  return (
    <Carousel fade interval={5000} pause={false} style={{ zIndex: 0 }} indicators={true}>
      {slidesToDisplay.map((slide, idx) => (
        <Carousel.Item key={slide.id || idx}>
          <div className="hero-carousel-item" style={{ zIndex: 0 }}>
            <div className="hero-overlay" />
            <img
              className="hero-img d-block w-100"
              src={slide.image_url}
              alt={slide.title}
            />
            <Carousel.Caption className="text-start d-flex flex-column justify-content-center h-100 pb-5 ps-4 ps-md-5" style={{ zIndex: 2, top: 0, bottom: 0 }}>
              {/* <span className="section-subtitle text-white border-start border-4 border-primary ps-3 mb-4">Eparchy of Palai</span> */}
              {/* <h1 className="hero-title fw-extrabold">{slide.title || "Syro Malabar Youth Movement"}</h1> */}
              {/* <p className="hero-subtitle lead mb-5">{slide.subtitle || "Leading the youth through faith, leadership, and service."}</p> */}
              <div className="d-flex gap-3 mt-4">
                {/* <button className="btn-premium">Join Movement</button> */}
                {/* <button className="btn-outline-premium border-white text-white">Learn More</button> */}
              </div>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default HeroCarousel;