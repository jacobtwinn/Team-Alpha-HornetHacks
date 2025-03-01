import React, { useState, useEffect } from 'react';
import Camera from './components/CameraFrame';
import { loadModel } from './model';
import { getFoodName } from './getFoodName';
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
    processImage(image);
  };

  const processImage = async (image) => {
    if (model && image) {
      const imgElement = await loadImage(image);
      const tensor = preprocessImg(imgElement);

      // Make the prediction
      const prediction = await model.predict(tensor).data();

      // Get the predicted class index (most confident prediction)
      const classIndex = prediction.indexOf(Math.max(...prediction));

      // Get the food name based on the class index
      const name = getFoodName(classIndex);
      setFoodName(name);
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

  const preprocessImg = (image) => {
    return tf.browser.fromPixels(image)
      .resizeNearestNeighbor([224, 224]) // Resize the image to the input size required by the model
      .expandDims() // Add a batch dimension
      .toFloat() // Convert to float type (required for model input)
      .div(tf.scalar(255)); // Normalize pixel values (assuming the model was trained on images scaled to 255)
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