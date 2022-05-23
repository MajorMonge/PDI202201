const gradientX = [-1.0, 0.0, +1.0, -2.0, 0.0, +2.0, -1.0, 0.0, +1.0]; //Kernel X

const gradientY = [-1.0, -2.0, -1.0, 0.0, 0.0, 0.0, +1.0, +2.0, +1.0]; //Kernel Y

function applySobel(fromCanvas, fromCanvasCtx, targetCanvasCtx) {
  toGrayScale(fromCanvas, fromCanvasCtx, targetCanvasCtx);

  const imageData = fromCanvasCtx.getImageData(
    0,
    0,
    fromCanvas.width,
    fromCanvas.height
  );

  let pixels = [];

  const getPixel = (data, width, x, y) => {
    return data[(y * width + x) * 4];
  }; //Retorna o pixel relativo a imagedata

  for (let y = 0; y < imageData.height; y++) {
    for (let x = 0; x < imageData.width; x++) {
      let pX =
        gradientX[0] * getPixel(imageData.data, imageData.width, x - 1, y - 1) +
        gradientX[1] * getPixel(imageData.data, imageData.width, x, y - 1) +
        gradientX[2] * getPixel(imageData.data, imageData.width, x + 1, y - 1) +
        gradientX[3] * getPixel(imageData.data, imageData.width, x - 1, y) +
        gradientX[4] * getPixel(imageData.data, imageData.width, x, y) +
        gradientX[5] * getPixel(imageData.data, imageData.width, x + 1, y) +
        gradientX[6] * getPixel(imageData.data, imageData.width, x - 1, y + 1) +
        gradientX[7] * getPixel(imageData.data, imageData.width, x, y + 1) +
        gradientX[8] * getPixel(imageData.data, imageData.width, x + 1, y + 1);

      let pY =
        gradientY[0] * getPixel(imageData.data, imageData.width, x - 1, y - 1) +
        gradientY[1] * getPixel(imageData.data, imageData.width, x, y - 1) +
        gradientY[2] * getPixel(imageData.data, imageData.width, x + 1, y - 1) +
        gradientY[3] * getPixel(imageData.data, imageData.width, x - 1, y) +
        gradientY[4] * getPixel(imageData.data, imageData.width, x, y) +
        gradientY[5] * getPixel(imageData.data, imageData.width, x + 1, y) +
        gradientY[6] * getPixel(imageData.data, imageData.width, x - 1, y + 1) +
        gradientY[7] * getPixel(imageData.data, imageData.width, x, y + 1) +
        gradientY[8] * getPixel(imageData.data, imageData.width, x + 1, y + 1);

      let magnitude = Math.sqrt(pX * pX + pY * pY);

      pixels.push(magnitude, magnitude, magnitude, 255);
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
