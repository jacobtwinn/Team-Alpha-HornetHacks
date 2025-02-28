import React, { useState, useEffect } from 'react';
import Camera from './components/CameraFrame';
import { loadModel } from './model';
import {getFoodName} from './getFoodName';
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
      // Preprocess the image for the model input
      const tensor = tf.browser.fromPixels(image)
        .resizeNearestNeighbor([224, 224]) // Resize image to fit model's input
        .toFloat() // Convert to float (required for TensorFlow)
        .expandDims(0); // Add batch dimension

      // Make the prediction
      const prediction = await model.predict(tensor).data();

      // Get the predicted class index (most confident prediction)
      const classIndex = prediction.indexOf(Math.max(...prediction));

      // Get the food name based on the class index
      const name = getFoodName(classIndex);
      setFoodName(name);
    }
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
