# Trinetra

An accessible camera MVP for real-time object detection, feedback, and correction.

## Overview

**Trinetra** is a modern web application focused on accessibility and real-time feedback from camera input. Its primary goal is to make visual environments more accessible, particularly for users with disabilities, by detecting objects in camera frames and providing immediate spoken feedback. Users can also correct detection errors, which are saved and managed for improving the system.

The project consists of a client (front-end) and server (back-end):

- **Client (React)**: Handles camera access, object detection, live announcements, and speech output.
- **Server (Node.js/Express/MongoDB)**: Stores user corrections and serves API endpoints.

## Fundamentals

### 1. Camera Access & Detection (Frontend)
- Uses browser APIs to access the user's camera.
- Displays video stream and overlays detection results using a canvas.
- Employs a detection hook that simulates object detection (can be extended for real models).
- Announces detected objects via speech synthesis for accessibility.

### 2. Accessibility Features
- **Speech Feedback**: Detected objects are spoken aloud using browser speech synthesis.
- **Live Region**: Uses ARIA live region for screen readers, updating as new objects are detected.

### 3. Smoothing & Aggregation
- The `Smoother` class maintains a window of recent detections, aggregates them, and returns the most persistent/high-confidence objects.

### 4. Correction System (Backend)
- Users can submit corrections if the system misidentifies an object.
- Corrections are stored in MongoDB, including the detected label, corrected label, image metadata, and optional notes.
- Admins can review recent corrections.

### 5. API Endpoints
- `POST /api/corrections`: Save a user-submitted correction.
- `GET /api/corrections`: Retrieve recent corrections (admin use).

## Quickstart

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/STYLO009/Ideaon.git
   ```
2. **Client Setup**
   ```bash
   cd trinetra/client
   npm install
   npm start
   ```
3. **Server Setup**
   ```bash
   cd trinetra/server
   npm install
   npm start
   ```
   > Ensure MongoDB is running locally or set up `MONGO_URI` in `.env`.

### Usage

- Open the client in your browser.
- Allow camera permissions.
- The app will start detecting objects and announce them.
- Pause/resume detection or stop the camera as needed.
- Submit corrections through the interface (if available).

## Extensibility

- Replace the dummy detector logic with a real ML model (TensorFlow.js, ONNX, etc.).
- Expand correction handling for more robust learning and feedback.
- Enhance accessibility features based on user needs.

## Contributing

1. Fork the project and create your feature branch.
2. Commit your changes with clear messages.
3. Push to your branch and open a pull request.

## License

MIT License

## Contact

Maintainer: [STYLO009](https://github.com/STYLO009)

---

> For more details, review the source code and open issues, or contact the maintainer.
