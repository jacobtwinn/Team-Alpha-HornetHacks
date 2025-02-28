import { loadModel } from "./model"

const classifyImage = async(imageElement) => {
    const model = await loadModel();
    const tensor = preprocessImg(imageElement);

    const predictions = await model.predict(tensor).data();

    const topPrediction = Array.from(predictions)
    .map((prob, i) => ({probability: prob, classIndex: i}))
    .sort((a, b) => b.probability - a.probability)[0];

    return topPrediction;
}