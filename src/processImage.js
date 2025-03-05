import { getFoodName } from './getFoodName';
import * as tf from '@tensorflow/tfjs';

const preprocessImg = (image) => {
  try {
    if (!image || !(image instanceof HTMLImageElement)) {
      throw new Error('Invalid image element');
    }

    return tf.browser.fromPixels(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat()
      .div(tf.scalar(255));
  } catch (error) {
    console.error('Image preprocessing error:', error);
    throw error;
  }
};

const classifyImage = async (imageElement, model) => {
  try {
    const tensor = preprocessImg(imageElement);
    const prediction = await model.predict(tensor).data();
    
    // Ensure we're only looking at the first 101 classes (Food101)
    const foodPredictions = Array.from(prediction).slice(0, 101);
    const classIndex = foodPredictions.indexOf(Math.max(...foodPredictions));
    const probability = Math.max(...foodPredictions);

    return { classIndex, probability };
  } catch (error) {
    console.error('Image classification error:', error);
    throw error;
  }
};
const processImage = async (imageElement, model) => {
  try {
    const prediction = await classifyImage(imageElement, model);
    
    const CONFIDENCE_THRESHOLD = 0.50; // Increased threshold

    // Ensure probability is between 0 and 1
    const normalizedProbability = Math.min(Math.max(prediction.probability, 0), 1);

    if (normalizedProbability > CONFIDENCE_THRESHOLD) {
      const foodName = getFoodName(prediction.classIndex);
      console.log(`Detected food: ${foodName} (${(normalizedProbability * 100).toFixed(2)}% confidence)`);
      return foodName;
    } else {
      console.log(`Low confidence: ${(normalizedProbability * 100).toFixed(2)}%. Unable to classify.`);
      return "Not Known Food";
    }
  } catch (error) {
    console.error('Image processing error:', error);
    return "Processing Failed";
  }
};

export default processImage;