import React, { useState, useEffect } from 'react';
import './Slideshow.css';

import previous1 from './assets/images/Previous_2025.JPG';
import previous2 from './assets/images/previous_2025_1.JPG';
import previous3 from './assets/images/previous_2025_2.JPG';
import previousVideo from './assets/images/Previous_2025.MOV';
import current1 from './assets/images/Current_2026_1.jpg';
import current2 from './assets/images/Current_2026_2.jpg';

const slides = [
  { type: 'image', src: previous1, caption: "Where we're going" },
  { type: 'image', src: previous2, caption: "Where we're going - Last year's celebration" },
  { type: 'image', src: previous3, caption: "Where we're going - Memories from 2024" },
  { type: 'video', src: previousVideo, caption: "Where we're going - A preview of the festivities" },
  { type: 'image', src: current1, caption: 'Current state December 11 2025' },
  { type: 'image', src: current2, caption: 'Current state December 11 2025' },
];

function Slideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState('fade-in');

  useEffect(() => {
    const slide = slides[currentIndex];

    if (slide.type === 'video') {
      const video = document.querySelector('video');
      if (video) {
        video.play().catch(err => console.log('Video play error:', err));
        video.onended = () => {
          goToNextSlide();
        };
      }
    } else {
      const timer = setTimeout(() => {
        goToNextSlide();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  const goToNextSlide = () => {
    setFadeClass('fade-out');
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      setFadeClass('fade-in');
    }, 500);
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="slideshow-container">
      <div className="snowflakes" aria-hidden="true">
        <div className="snowflake">❅</div>
        <div className="snowflake">❆</div>
        <div className="snowflake">❅</div>
        <div className="snowflake">❆</div>
        <div className="snowflake">❅</div>
        <div className="snowflake">❆</div>
        <div className="snowflake">❅</div>
        <div className="snowflake">❆</div>
      </div>

      <div className={`slide ${fadeClass}`}>
        {currentSlide.type === 'image' ? (
          <img src={currentSlide.src} alt={currentSlide.caption} />
        ) : (
          <video src={currentSlide.src} muted />
        )}
        <div className="caption">{currentSlide.caption}</div>
      </div>
    </div>
  );
}

export default Slideshow;
