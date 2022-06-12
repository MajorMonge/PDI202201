function applyBinarization(fromCanvas, fromCanvasCtx, targetCanvasCtx) {
  toGrayScale(fromCanvas, fromCanvasCtx, targetCanvasCtx);

  let imageData = targetCanvasCtx.getImageData(
    0,
    0,
    fromCanvas.width,
    fromCanvas.height
  ).data;

  for (let i = 0; i < imageData.length; i += 4) {
    // R
    if (imageData[i] < 128) {
      imageData[i] = 0;
    } else {
      imageData[i] = 255;
    }
    // G
    if (imageData[i + 1] < 128) {
      imageData[i + 1] = 0;
    } else {
      imageData[i + 1] = 255;
    }
    // B
    if (imageData[i + 2] < 128) {
      imageData[i + 2] = 0;
    } else {
      imageData[i + 2] = 255;
    }
  }

  let newImageData = fromCanvasCtx.createImageData(
    fromCanvas.width,
    fromCanvas.height
  );

  newImageData.data.set(new Uint8ClampedArray(imageData));

  console.log(newImageData);

  targetCanvasCtx.putImageData(newImageData, 0, 0);
}
