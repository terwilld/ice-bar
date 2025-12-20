import React, { useState, useEffect } from 'react';
import './Slideshow.css';

import firstVideo from './assets/images/First.MOV';
import secondVideo from './assets/images/second.mov';
import thirdVideo from './assets/images/third.MOV';
import fourthVideo from './assets/images/fourth.MOV';
import fifthVideo from './assets/images/five.mov';

const slides = [
  { type: 'video', src: firstVideo, caption: 'Holiday Party 2025' },
  { type: 'video', src: secondVideo, caption: 'Holiday Party 2025' },
  { type: 'video', src: thirdVideo, caption: 'Holiday Party 2025' },
  { type: 'video', src: fourthVideo, caption: 'Holiday Party 2025' },
  { type: 'video', src: fifthVideo, caption: 'Holiday Party 2025' },
];

function Slideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState('fade-in');
  const [isMuted, setIsMuted] = useState(true);
  const [showPlayButton, setShowPlayButton] = useState(true);

  useEffect(() => {
    const slide = slides[currentIndex];

    if (slide.type === 'video') {
      const video = document.querySelector('video');
      if (video) {
        // Set up ended event listener
        video.onended = () => {
          // Check if this is the last video
          const isLastVideo = currentIndex === slides.length - 1;
          if (isLastVideo) {
            setShowPlayButton(true);
          }
          goToNextSlide();
        };

        // Auto-play if not the first video (play button already clicked)
        if (!showPlayButton && !isMuted) {
          video.play().catch(err => console.log('Video play error:', err));
        }
      }
    } else {
      const timer = setTimeout(() => {
        goToNextSlide();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, showPlayButton, isMuted]);

  const goToNextSlide = () => {
    setFadeClass('fade-out');
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      setFadeClass('fade-in');
    }, 500);
  };

  const currentSlide = slides[currentIndex];

  const handlePlayClick = () => {
    setShowPlayButton(false);
    setIsMuted(false);
    const video = document.querySelector('video');
    if (video) {
      video.muted = false;
      video.play().catch(err => console.log('Video play error:', err));
    }
  };

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

      <div className="content-wrapper">
        <div className="caption">{currentSlide.caption}</div>

        <div className={`slide ${fadeClass}`}>
          <div className="video-wrapper">
            {currentSlide.type === 'image' ? (
              <img src={currentSlide.src} alt={currentSlide.caption} />
            ) : (
              <>
                <video src={currentSlide.src} muted={isMuted} />
                {showPlayButton && (
                  <div className="play-overlay" onClick={handlePlayClick}>
                    <div className="play-icon">▶</div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="text-block">
          <p>Ever wondered how we build our hand-made ICE BAR? 🧊✨</p>
          <p>With the cold finally setting in, our two-week build has officially begun! We're giving you a behind-the-scenes look this year so you can see the craft and sweat that goes into every block.</p>
        </div>
      </div>
    </div>
  );
}

export default Slideshow;
