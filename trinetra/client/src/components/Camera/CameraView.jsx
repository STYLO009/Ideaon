import React, { useRef, useEffect, useState } from 'react';
import CameraView from './components/Camera/CameraView';
import { initCamera } from './useCamera';
import useDetector from '../Detector/useDetector';
import useSpeech from '../Accessibility/useSpeech';

export default function CameraView() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [streamActive, setStreamActive] = useState(false);
  const [isDetecting, setIsDetecting] = useState(true);
  const speak = useSpeech();

  // start camera on mount
  useEffect(() => {
    let stream;
    (async () => {
      try {
        stream = await initCamera(videoRef, { facingMode: 'user' });
        setStreamActive(true);
      } catch (e) {
        console.error('Camera init error:', e);
        speak('Cannot access camera. Please allow camera permissions.');
      }
    })();

    return () => {
      if (stream) {
        stream.getTracks().forEach(t => t.stop());
      }
    };
  }, [speak]);

  // detector hook handles model loading and frame analysis
  useDetector({
    videoRef,
    canvasRef,
    enabled: streamActive && isDetecting,
    onSpeak: (text) => speak(text)
  });

  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:12}}>
      <div style={{position:'relative'}}>
        <video
          ref={videoRef}
          style={{width: 640, height: 480, background: '#000'}}
          playsInline
          muted
        />
        <canvas
          ref={canvasRef}
          width={640}
          height={480}
          style={{position:'absolute', left:0, top:0, pointerEvents:'none'}}
        />
      </div>

      <div style={{display:'flex', gap:8}}>
        <button onClick={() => { setIsDetecting(v => !v); speak(isDetecting ? 'Detecting paused' : 'Detecting resumed'); }}>
          {isDetecting ? 'Pause Detection' : 'Resume Detection'}
        </button>
        <button onClick={() => {
          if (videoRef.current?.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(t => t.stop());
            videoRef.current.srcObject = null;
            setStreamActive(false);
            speak('Camera stopped');
          }
        }}>Stop Camera</button>
      </div>
    </div>
  );
}
