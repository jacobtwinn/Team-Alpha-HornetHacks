import * as tf from "@tensorflow/tfjs";

export const loadModel = async () => {
    const model = await tf.loadGraphModel(
        "https://tfhub.dev/google/imagenet/mobilenet_v2_100_224/classification/5"
        //TODO: Fix cors system to load model.
    );
    return model;
};
