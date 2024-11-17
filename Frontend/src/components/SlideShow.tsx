import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import "react-alice-carousel/lib/scss/alice-carousel.scss";

const handleDragStart = (e: React.DragEvent) => e.preventDefault();

const items = [
  <img src="../../public/assets/images/test.jpg" onDragStart={handleDragStart} role="presentation" style={{ height: '700px', width: '100%', }} />,
  <img src="../../public/assets/images/image3.jpg" onDragStart={handleDragStart} role="presentation" style={{ height: '700px', width: '100%', }} />,
  <img src="../../public/assets/images/image4.png" onDragStart={handleDragStart} role="presentation" style={{ height: '700px', width: '100%', }} />,
];

export default function Gallery() {
  return (
    <AliceCarousel
      mouseTracking
      items={items}
      autoPlay // Enable automatic movement between images
      autoPlayInterval={1000} // Set the interval between image changes (in milliseconds)
      // infinite // Enable infinite loop
      disableButtonsControls // Disable navigation buttons
      // disableDotsControls
      responsive={{
        0: { items: 1 }, //  Adjust the number of items shown on different screen sizes
        1024: { items: 1 },
      }}

    />
  );
}
