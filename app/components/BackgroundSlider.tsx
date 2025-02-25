'use client';

import { useState, useEffect } from 'react';
import DigitalTimer from './DigitalTimer';
import SpotifyWidget from './SpotifyWidget';

const BackgroundSlider = ({ duration }: { duration: number }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [initialMinutes, setInitialMinutes] = useState(25);

  useEffect(() => {
    async function loadImages() {
      try {
        const response = await fetch('/api/getBackgrounds');
        const imageList = await response.json();
        setImages(imageList);
      } catch (error) {
        console.error('Error loading background images:', error);
      }
    }
    loadImages();
  }, []);

  useEffect(() => {
    if (images.length === 0) return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, duration * 1000);

    return () => clearInterval(timer);
  }, [duration, images.length]);

  return (
    <>
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-1000 -z-10"
        style={{
          backgroundImage: images[currentImageIndex] ? `url(${images[currentImageIndex]})` : 'none',
        }}
      />
      <div className="fixed top-24 sm:top-32 left-1/2 -translate-x-1/2 text-center">
        <h1 className="text-5xl sm:text-6xl font-light text-white/90 tracking-widest mb-2">
          GHIBLI TIMER
        </h1>
        <p className="text-white/70 text-sm sm:text-base tracking-wider uppercase">
          Focus with Ghibli backgrounds
        </p>
      </div>
      <DigitalTimer initialMinutes={initialMinutes} setInitialMinutes={setInitialMinutes} />
      <SpotifyWidget />
    </>
  );
};

export default BackgroundSlider;