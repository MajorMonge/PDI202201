function applyMedian(fromCanvas, fromCanvasCtx, targetCanvasCtx) {
  toGrayScale(fromCanvas, fromCanvasCtx, targetCanvasCtx);

  let imageData = targetCanvasCtx.getImageData(
    0,
    0,
    fromCanvas.width,
    fromCanvas.height
  );

  let pixels = [],
    mask = [1, 1, 1, 1, 1, 1, 1, 1, 1];

  const getPixel = (x, y) => {
    return imageData.data[(y * imageData.width + x) * 4];
  };

  for (let y = 0; y < fromCanvas.height; y++) {
    for (let x = 0; x < fromCanvas.width; x++) {
      mask[0] = getPixel(x - 1, y - 1);
      mask[1] = getPixel(x, y - 1);
      mask[2] = getPixel(x + 1, y - 1);
      mask[3] = getPixel(x - 1, y);
      mask[4] = getPixel(x, y);
      mask[5] = getPixel(x + 1, y);
      mask[6] = getPixel(x - 1, y + 1);
      mask[7] = getPixel(x, y + 1);
      mask[8] = getPixel(x + 1, y + 1);

      bubbleSort(mask, mask.length);

      pixels.push(mask[4], mask[4], mask[4], 255);
    }
  }

  let newImageData = fromCanvasCtx.createImageData(
    fromCanvas.width,
    fromCanvas.height
  );

  newImageData.data.set(new Uint8ClampedArray(pixels));

  targetCanvasCtx.putImageData(newImageData, 0, 0);
}
