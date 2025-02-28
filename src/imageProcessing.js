const preprocessImg = (image) => {
    return tf.browser.fromPixels(image) // Use the 'image' parameter passed to the function
        .resizeNearestNeighbor([224, 224]) // Resize the image to the input size required by the model
        .expandDims() // Add a batch dimension
        .toFloat() // Convert to float type (required for model input)
        .div(tf.scalar(225)); // Normalize pixel values (assuming the model was trained on images scaled to 225)
};
