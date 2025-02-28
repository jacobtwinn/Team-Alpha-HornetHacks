import React, { useRef, useCallback } from 'react';
import Webcam from 'react-webcam';

const Camera = ({ onCapture }) => {
    const webcamRef = useRef(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        onCapture(imageSrc); // Pass the image data to the parent component
    }, [webcamRef, onCapture]);

    return (
        <div className="flex">
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width="100%" // Or any specific width, like 640px
            />
            <button onClick={capture}>Capture Photo</button>
        </div>
    );
};

export default Camera;
