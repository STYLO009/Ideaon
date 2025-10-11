// src/Detector/useDetector.js
import { useEffect } from 'react';

export default function useDetector({ videoRef, canvasRef, enabled, onSpeak }) {
  useEffect(() => {
    if (!enabled) return;

    let interval;
    const ctx = canvasRef.current?.getContext('2d');

    const detect = () => {
      if (!videoRef.current || !ctx) return;
      ctx.drawImage(videoRef.current, 0, 0, 640, 480);
      // placeholder: detection logic here
      // simulate detection output
      const randomObjects = ['person', 'chair', 'laptop', 'cup', 'phone'];
      const detected = randomObjects[Math.floor(Math.random() * randomObjects.length)];
      onSpeak(`Detected ${detected}`);
    };

    interval = setInterval(detect, 4000);
    return () => clearInterval(interval);
  }, [enabled, videoRef, canvasRef, onSpeak]);
}
