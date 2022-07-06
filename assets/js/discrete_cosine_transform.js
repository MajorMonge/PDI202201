function applyDCT(fromCanvas, fromCanvasCtx, targetCanvasCtx) {
  toGrayScale(fromCanvas, fromCanvasCtx, targetCanvasCtx);

  let pixels = [];

  let ci, cj, dtc1, sum;

  const imageData = targetCanvasCtx.getImageData(
    0,
    0,
    fromCanvas.width,
    fromCanvas.height
  );

  const getPixel = (x, y) => {
    return imageData.data[(y * imageData.width + x) * 4];
  };

  console.time("Execution Time");
  for (let i = 0; i < fromCanvas.width; i++) {
    for (let j = 0; j < fromCanvas.height; j++) {
      if (i == 0) {
        ci = 1 / Math.sqrt(fromCanvas.width);
      } else {
        ci = Math.sqrt(2) / Math.sqrt(fromCanvas.width);
      }

      if (j == 0) {
        cj = 1 / Math.sqrt(fromCanvas.height);
      } else {
        cj = Math.sqrt(2) / Math.sqrt(fromCanvas.height);
      }

      sum = 0;

      for (let k = 0; k < fromCanvas.width; k++) {
        for (let l = 0; l < fromCanvas.height; l++) {
          let p = getPixel(k, l);

          dtc1 =
            p *
            Math.cos(((2 * k + 1) * i * 3.142857) / (2 * fromCanvas.width)) *
            Math.cos(((2 * l + 1) * j * 3.142857) / (2 * fromCanvas.height));

          sum = sum + dtc1;
        }
      }

      let pixel = ci * cj * sum;

      pixels.push(pixel, pixel, pixel, 255); // pixels.push(pixel, pixel, pixel, 1);
    }
  }

  console.timeEnd("Execution Time");

  let newImageData = fromCanvasCtx.createImageData(
    fromCanvas.width,
    fromCanvas.height
  );

  console.log(pixels);

  newImageData.data.set(new Uint8ClampedArray(pixels)); //Clamp já normaliza até 255

  console.log(newImageData);

  targetCanvasCtx.putImageData(newImageData, 0, 0);
}
