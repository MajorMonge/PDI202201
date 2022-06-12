var arrayMaxIndex = function (array) {
  return array.indexOf(Math.max.apply(null, array));
};

var arrayMinIndex = function (array) {
  return array.indexOf(Math.min.apply(null, array));
};

function applyHistogram(fromCanvas, fromCanvasCtx, targetCanvasCtx) {
  toGrayScale(fromCanvas, fromCanvasCtx, targetCanvasCtx);

  let imageData = targetCanvasCtx.getImageData(
    0,
    0,
    fromCanvas.width,
    fromCanvas.height
  );

  let histogram = [],
    eqHistogram = [];

  for (i = 0; i < 256; i++) histogram[i] = 0;

  for (let x = 0; x < fromCanvas.width * fromCanvas.height; x += 4) {
    histogram[imageData.data[x]] += 1;
  }

  console.log(histogram);

  accumulatedF = 0;

  for (let x = 0; x < histogram.length; x++) {
    accumulatedF += histogram[x];
    eq = Math.max(
      0,
      Math.round(
        (255 * accumulatedF) / (fromCanvas.width * fromCanvas.height)
      ) - 1
    );

    eqHistogram.push(eq);
  }

  console.log(eqHistogram);

  let pixels = [];

  for (let x = 0; x < fromCanvas.width * fromCanvas.height; x++) {
    eqPixel =
      (eqHistogram[imageData.data[x * 4]] * 255) / Math.max(...eqHistogram);
    pixels.push(eqPixel, eqPixel, eqPixel, 255);
  }

  let newImageData = fromCanvasCtx.createImageData(
    fromCanvas.width,
    fromCanvas.height
  );

  newImageData.data.set(new Uint8ClampedArray(pixels));

  console.log(newImageData);

  targetCanvasCtx.putImageData(newImageData, 0, 0);
}
