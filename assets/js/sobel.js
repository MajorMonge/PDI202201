const gradientX = [-1.0, 0.0, +1.0, -2.0, 0.0, +2.0, -1.0, 0.0, +1.0]; //Kernel X

const gradientY = [-1.0, -2.0, -1.0, 0.0, 0.0, 0.0, +1.0, +2.0, +1.0]; //Kernel Y

function applySobel(fromCanvas, fromCanvasCtx, targetCanvas, targetCanvasCtx) {
  toGrayScale(fromCanvas, fromCanvasCtx, targetCanvasCtx);

  const imageData = targetCanvasCtx.getImageData(
    0,
    0,
    fromCanvas.width,
    fromCanvas.height
  );

  let magnitudeArray = [],
    pixels = [];

  let directionArray = [];

  for (i = 0; i < imageData.height * imageData.width; i++)
    directionArray[i] = 0;

  const getPixel = (x, y) => {
    return imageData.data[(y * imageData.width + x) * 4];
  };

  for (let y = 0; y < imageData.height; y++) {
    for (let x = 0; x < imageData.width; x++) {
      let pX =
        gradientX[0] * getPixel(x - 1, y - 1) +
        gradientX[1] * getPixel(x, y - 1) +
        gradientX[2] * getPixel(x + 1, y - 1) +
        gradientX[3] * getPixel(x - 1, y) +
        gradientX[4] * getPixel(x, y) +
        gradientX[5] * getPixel(x + 1, y) +
        gradientX[6] * getPixel(x - 1, y + 1) +
        gradientX[7] * getPixel(x, y + 1) +
        gradientX[8] * getPixel(x + 1, y + 1);

      let pY =
        gradientY[0] * getPixel(x - 1, y - 1) +
        gradientY[1] * getPixel(x, y - 1) +
        gradientY[2] * getPixel(x + 1, y - 1) +
        gradientY[3] * getPixel(x - 1, y) +
        gradientY[4] * getPixel(x, y) +
        gradientY[5] * getPixel(x + 1, y) +
        gradientY[6] * getPixel(x - 1, y + 1) +
        gradientY[7] * getPixel(x, y + 1) +
        gradientY[8] * getPixel(x + 1, y + 1);

      let magnitude = Math.sqrt(pX * pX + pY * pY);

      let direction = Math.tan(isNaN(pY) ? 0 : pY, isNaN(pX) ? 0 : pX) ** -1;

      directionArray[x * y] = isFinite(direction) ? direction : false;

      magnitudeArray.push(isNaN(magnitude) ? 0 : magnitude);
    }
  }

  let minMag = Math.min(...magnitudeArray),
    maxMag = Math.max(...magnitudeArray);

  for (let index = 0; index < magnitudeArray.length; index++) {
    let pixel = ((magnitudeArray[index] - minMag) / maxMag - minMag) * 255;

    pixels.push(pixel, pixel, pixel, 255);
  }

  let newImageData = fromCanvasCtx.createImageData(
    fromCanvas.width,
    fromCanvas.height
  );

  newImageData.data.set(new Uint8ClampedArray(pixels));

  console.log(directionArray, Math.max(...directionArray));

  targetCanvasCtx.putImageData(newImageData, 0, 0);

  var focusDirectionText = document.getElementById("focus-direction-value");
  cpCanvas.addEventListener("mousemove", function (event) {
    let rect = targetCanvas.getBoundingClientRect();

    let x = event.clientX - rect.left,
      y = Math.round(event.clientY - rect.top);

    focusDirectionText.textContent = `(${directionArray[x * y]})`;
  });
}
