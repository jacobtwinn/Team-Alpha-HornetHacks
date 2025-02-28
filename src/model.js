import * as tf from "@tensorflow/tfjs";

export const loadModel = async () => {
    // Use a direct TensorFlow.js model URL that's already properly formatted
    const model = await tf.loadGraphModel(
        "https://storage.googleapis.com/tfjs-models/savedmodel/mobilenet_v2_1.0_224/model.json"
    );
    return model;
};