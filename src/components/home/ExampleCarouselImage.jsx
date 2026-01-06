// src/components/ExampleCarouselImage.jsx
import React from "react";
import PropTypes from "prop-types";

const ExampleCarouselImage = ({ src, alt, height = "400px" }) => {
  return (
    <div style={{ width: "100%", height, overflow: "hidden" }}>
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "10px",
        }}
      />
    </div>
  );
};

ExampleCarouselImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  height: PropTypes.string,
};

export default ExampleCarouselImage;