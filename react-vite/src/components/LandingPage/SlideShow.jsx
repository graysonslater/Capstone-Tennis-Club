// src/components/ImageCarousel.jsx
import { useState } from 'react';
import './SlideShow.css'; 
import photo1 from './LandingPagePhotos/photo1.jpg';
import photo2 from './LandingPagePhotos/photo2.jpg';
import photo3 from './LandingPagePhotos/photo3.jpg';

const images = [photo1, photo2, photo3];

const SlideShow = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // const nextSlide = () => {
    //     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    // };

    // const prevSlide = () => {
    //     setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    // };

    return (
        <div className="Slideshow">
            <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="Slideshow-image" />
            <div className="Slideshow-dots">
                {images.map((_, index) => (
                <span 
                    key={index} 
                    className={`Slideshow-dot ${index === currentIndex ? 'active' : ''}`}
                    onClick={() => setCurrentIndex(index)}
                ></span>
                ))}
            </div>
        </div>
    );
};

export default SlideShow;
