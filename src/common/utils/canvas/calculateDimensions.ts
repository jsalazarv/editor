interface Dimensions {
  width: number;
  height: number;
}

export function calculateDimensions(
  originalDimensions: Dimensions,
  containerDimensions: Dimensions,
): Dimensions {
  const { width: originalWidth, height: originalHeight } = originalDimensions;
  const { width: containerWidth, height: containerHeight } =
    containerDimensions;

  // Calculate the scaling factors
  const widthRatio = containerWidth / originalWidth;
  const heightRatio = containerHeight / originalHeight;

  // Choose the smaller scaling factor to ensure the image fits within the container
  const scalingFactor = Math.min(widthRatio, heightRatio);

  // Calculate the new dimensions
  const newWidth = originalWidth * scalingFactor;
  const newHeight = originalHeight * scalingFactor;

  return {
    width: newWidth,
    height: newHeight,
  };
}
