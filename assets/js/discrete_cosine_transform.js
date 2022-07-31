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

      pixels.push(pixel);
    }
  }

  let newPixels = [];

  for (let i = 0; i < pixels.length; i++) {
    newPixels.push(pixels[i], pixels[i], pixels[i], 255);
  }

  let newImageData = fromCanvasCtx.createImageData(
    fromCanvas.width,
    fromCanvas.height
  );

  console.log(newPixels);

  newImageData.data.set(new Uint8ClampedArray(newPixels));

  console.log(newImageData);

  targetCanvasCtx.putImageData(newImageData, 0, 0);
}

function applyIDCT(fromCanvas, fromCanvasCtx, targetCanvasCtx) {
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

          sum = sum + dtc1 * ci * cj;
        }
      }

      let pixel = sum;

      pixels.push(pixel);
    }
  }

  let max = Math.max(...pixels),
    min = Math.min(...pixels);

  for (let i = 0; i < pixels.length; i++) {
    pixels[i] = (255 * (pixels[i] - min)) / (max - min);
  }

  let newPixels = [];

  for (let i = 0; i < pixels.length; i++) {
    newPixels.push(pixels[i], pixels[i], pixels[i], 255);
  }

  let newImageData = fromCanvasCtx.createImageData(
    fromCanvas.width,
    fromCanvas.height
  );

  console.log(pixels);

  newImageData.data.set(new Uint8ClampedArray(newPixels));

  console.log(newImageData);

  targetCanvasCtx.putImageData(newImageData, 0, 0);
}

function applyLowPass(fromCanvas, fromCanvasCtx, targetCanvasCtx) {
  toGrayScale(fromCanvas, fromCanvasCtx, targetCanvasCtx);
  let t = parseInt(prompt("Digite o valor do corte:", "77"));

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

  for (let y = 0; y < fromCanvas.width; y++) {
    for (let x = 0; x < fromCanvas.height; x++) {
      if (x + y * x + y  <= t) {
        let pixel = getPixel(x, y);
        pixels.push(pixel, pixel, pixel, 255);
      } else {
        pixels.push(0, 0, 0, 255);
      }
    }
  }

  let newImageData = fromCanvasCtx.createImageData(
    fromCanvas.width,
    fromCanvas.height
  );

  console.log(pixels);

  newImageData.data.set(new Uint8ClampedArray(pixels));

  console.log(newImageData);

  targetCanvasCtx.putImageData(newImageData, 0, 0);
}

function applyHighpass(fromCanvas, fromCanvasCtx, targetCanvasCtx) {
  toGrayScale(fromCanvas, fromCanvasCtx, targetCanvasCtx);
  let t = parseInt(prompt("Digite o valor do corte:", "77"));

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

  for (let y = 0; y < fromCanvas.width; y++) {
    for (let x = 0; x < fromCanvas.height; x++) {
      if (x + y * x + y >= t) {
        let pixel = getPixel(x, y);
        pixels.push(pixel, pixel, pixel, 255);
      } else {
        pixels.push(0, 0, 0, 255);
      }
    }
  }

  let newImageData = fromCanvasCtx.createImageData(
    fromCanvas.width,
    fromCanvas.height
  );

  console.log(pixels);

  newImageData.data.set(new Uint8ClampedArray(pixels));

  console.log(newImageData);

  targetCanvasCtx.putImageData(newImageData, 0, 0);
}
