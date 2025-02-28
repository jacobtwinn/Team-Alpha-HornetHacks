import React, { useRef, useCallback } from 'react';
import Webcam from 'react-webcam';

const Camera = () => {
    const webcamRef = useRef(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
    }, [webcamRef]);

    return (
        <div>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat='image/jpeg'
        />

        <button onClick={capture}>Capture Photo</button>
        </div>
    );
};

export default Camera;


