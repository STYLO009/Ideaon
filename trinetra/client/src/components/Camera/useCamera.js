// src/Camera/useCamera.js
export async function initCamera(videoRef, constraints = { video: true }) {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error('Camera API not supported');
  }

  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  if (videoRef.current) {
    videoRef.current.srcObject = stream;
    await videoRef.current.play();
  }

  return stream;
}
