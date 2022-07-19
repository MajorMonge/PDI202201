let GaussianKernel = [
  0, 0, -1, 0, 0,
  //
  0, -1, -2, -1, 0,
  //
  -1, -2, 16, -2, -1,
  //
  0, -1, -2, -1, 0,
  //
  0, 0, -1, 0, 0,
];

function applyGaussianLaplace(
  fromCanvas,
  fromCanvasCtx,
  targetCanvasCtx,
  extraCanvasCtx
) {
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
        //
        GaussianKernel[0] * getPixel(x - 2, y - 2) +
          GaussianKernel[1] * getPixel(x - 1, y - 2) +
          GaussianKernel[2] * getPixel(x, y - 2) +
          GaussianKernel[3] * getPixel(x + 1, y - 2) +
          GaussianKernel[4] * getPixel(x + 2, y - 2) +
          //
          GaussianKernel[5] * getPixel(x - 2, y - 1) +
          GaussianKernel[6] * getPixel(x - 1, y - 1) +
          GaussianKernel[7] * getPixel(x, y - 1) +
          GaussianKernel[8] * getPixel(x + 1, y - 1) +
          GaussianKernel[9] * getPixel(x + 2, y - 1) +
          //
          GaussianKernel[10] * getPixel(x - 2, y) +
          GaussianKernel[11] * getPixel(x - 1, y) +
          GaussianKernel[12] * getPixel(x, y) +
          GaussianKernel[13] * getPixel(x + 1, y) +
          GaussianKernel[14] * getPixel(x + 2, y) +
          //
          GaussianKernel[15] * getPixel(x - 2, y + 1) +
          GaussianKernel[16] * getPixel(x - 1, y + 1) +
          GaussianKernel[17] * getPixel(x, y + 1) +
          GaussianKernel[18] * getPixel(x + 1, y + 1) +
          GaussianKernel[19] * getPixel(x + 2, y + 1) +
          //
          GaussianKernel[20] * getPixel(x - 2, y + 2) +
          GaussianKernel[21] * getPixel(x - 1, y + 2) +
          GaussianKernel[22] * getPixel(x, y + 2) +
          GaussianKernel[23] * getPixel(x + 1, y + 2) +
          GaussianKernel[24] * getPixel(x + 2, y + 2)
      );

      pixels.push(pixel, pixel, pixel, 255);
    }
  }

  let newImageData = fromCanvasCtx.createImageData(
    fromCanvas.width,
    fromCanvas.height
  );

  newImageData.data.set(new Uint8ClampedArray(pixels));

  targetCanvasCtx.putImageData(newImageData, 0, 0);
}
