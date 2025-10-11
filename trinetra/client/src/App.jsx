import React from 'react';
import CameraView from './components/camera/CameraView';
//import LiveRegion from './components/Accessibility/LiveRegion';

export default function App() {
  return (
    <div>
      <h1 style={{position:'absolute', left:-9999}}>Trinetra — Camera Accessibility (MVP)</h1>
      <CameraView />
      <LiveRegion />
    </div>
  );
}
