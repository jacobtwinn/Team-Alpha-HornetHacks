import React, { useState, useEffect } from 'react';
import Camera from './components/CameraFrame';
import { loadModel } from './model';
// import { getFoodName } from './getFoodName';
import processImage from './processImage';
import * as tf from '@tensorflow/tfjs';

const App = () => {
  const [model, setModel] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [foodName, setFoodName] = useState('');

  useEffect(() => {
    const loadTFModel = async () => {
      try {
        const loadedModel = await loadModel();
        setModel(loadedModel);
        console.log("Model loaded successfully");
      } catch (error) {
        console.error("Error loading model:", error);
      }
    };
    loadTFModel();
  }, []);

  const handleCapture = (image) => {
    setCapturedImage(image);
    processCapturedImage(image);
  };

  const processCapturedImage = async (image) => {
    if (model && image) {
      const imgElement = await loadImage(image);
      const foodName = await processImage(imgElement, model);
      setFoodName(foodName);
    }
  };


  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
    });
  };

  
  return (
    <div>
      <h1>Food Recognition App</h1>
      {model ? <p>Model is up and ready to go!</p> : <p>Loading...</p>}
      <Camera onCapture={handleCapture} />
      {capturedImage && <img src={capturedImage} alt="Captured" />}
      {foodName && <p>Food: {foodName}</p>}
    </div>
  );
};

export default App;