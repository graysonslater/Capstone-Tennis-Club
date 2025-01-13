// src/components/ImageCarousel.jsx
import React, { useState } from 'react';
import './SlideShow.css'; 

const images = [
    './LandingPagePhotos/photo1.jpg', 
    './LandingPagePhotos/photo2.jpg',
    './LandingPagePhotos/photo3.jpg',
];

const SlideShow = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="Slideshow">
            <button onClick={prevSlide} className="Slideshow-button">Previous</button>
            <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="Slideshow-image" />
            <button onClick={nextSlide} className="Slideshow-button">Next</button>
        </div>
    );
};

export default SlideShow;
