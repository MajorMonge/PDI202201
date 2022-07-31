const erosionMask = [
  [0, 1, 0],
  [1, 1, 1],
  [0, 1, 0],
];

function applyErosion(fromCanvas, fromCanvasCtx, targetCanvasCtx) {
  toGrayScale(fromCanvas, fromCanvasCtx, targetCanvasCtx);

  let imageData = targetCanvasCtx.getImageData(
    0,
    0,
    fromCanvas.width,
    fromCanvas.height
  ).data;

  let pixels = [],
    bPixels = [];

  for (let i = 0; i < imageData.length; i += 4) {
    bPixels.push(0);
  }

  for (let i = 0; i < imageData.length; i += 4) {
    pixels.push(imageData[i] > 0 ? 1 : 0);
  }

  for (let i = 0; i < pixels.length; i++) {
    if (pixels[i] == 1) {
      let remove = false;
      for (let j = -1; j <= 1; j++) {
        for (let k = -1; k <= 1; k++) {
          if (erosionMask[j + 1][k + 1] === 1 && pixels[i + j + k] === 0) {
            remove = true;
          }

          if (remove) {
            bPixels[i] = 0;
          } else {
            bPixels[i] = 1;
          }
        }
      }
    }
  }

  let newPixelData = [];

  for (let i = 0; i < bPixels.length; i++) {
    if (bPixels[i] === 1) {
      newPixelData.push(255, 255, 255, 255);
    } else {
      newPixelData.push(0, 0, 0, 255);
    }
  }

  console.log(newPixelData);

  let newImageData = fromCanvasCtx.createImageData(
    fromCanvas.width,
    fromCanvas.height
  );

  newImageData.data.set(new Uint8ClampedArray(newPixelData));

  targetCanvasCtx.putImageData(newImageData, 0, 0);
}
