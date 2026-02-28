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
    <Carousel fade interval={5000} pause={false}>
      {slidesToDisplay.map((slide, idx) => (
        <Carousel.Item key={slide.id || idx}>
          <div className="hero-carousel-item">
            <div className="hero-overlay" />
            <img
              className="hero-img d-block w-100"
              src={slide.image_url}
              alt={slide.title}
            />
            {(slide.title || slide.subtitle) && (
              <Carousel.Caption className="text-start pb-5 mb-5 ps-4">
                <h1 className="fw-bold display-3 slide-in-top">{slide.title}</h1>
                <p className="lead slide-in-bottom">{slide.subtitle}</p>
              </Carousel.Caption>
            )}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default HeroCarousel;