let FourKernel = [0, -1, 0, -1, 4, -1, 0, -1, 0];

function applyLaplaceByFour(fromCanvas, fromCanvasCtx, targetCanvasCtx) {
  toGrayScale(fromCanvas, fromCanvasCtx, targetCanvasCtx);

  const imageData = targetCanvasCtx.getImageData(
    0,
    0,
    fromCanvas.width,
    fromCanvas.height
  );

  let pixels = [];

  const getPixel = (x, y) => {
    return imageData.data[(y * imageData.width + x) * 4];
  };

  for (let y = 0; y < imageData.height; y++) {
    for (let x = 0; x < imageData.width; x++) {
      let pixel = Math.round(
        FourKernel[0] * getPixel(x - 1, y - 1) +
          FourKernel[1] * getPixel(x, y - 1) +
          FourKernel[2] * getPixel(x + 1, y - 1) +
          FourKernel[3] * getPixel(x - 1, y) +
          FourKernel[4] * getPixel(x, y) +
          FourKernel[5] * getPixel(x + 1, y) +
          FourKernel[6] * getPixel(x - 1, y + 1) +
          FourKernel[7] * getPixel(x, y + 1) +
          FourKernel[8] * getPixel(x + 1, y + 1)
      );

      pixels.push(pixel, pixel, pixel, 255);
    }
  }

  let newImageData = fromCanvasCtx.createImageData(
    fromCanvas.width,
    fromCanvas.height
  );

  newImageData.data.set(new Uint8ClampedArray(pixels));

  console.log(newImageData);

  targetCanvasCtx.putImageData(newImageData, 0, 0);
}
