import React from "react";

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel = ({ images }: ImageCarouselProps) => {
  if (images.length <= 0) {
    return <div>No Image</div>;
  }

  return (
    <div className="w-84 carousel">
      {images.map((image, index) => (
        <div key={index} className="carousel-item w-full">
          <img src={image} className="w-full" alt="product-image" />
        </div>
      ))}
    </div>
  );
};

export default ImageCarousel;
