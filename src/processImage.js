const processImage = async (imageElement) => {
    const prediction = await classifyImage(imageElement);
  
    if (prediction.probability > 0.50) {
      const foodName = getFoodName(prediction.classIndex);
      console.log(`Detected food: ${foodName} (${(prediction.probability * 100).toFixed(2)}% confidence)`);
      return foodName;
    } else {
      console.log("Uncertain detection, try again.");
      return null;
    }
  };
  