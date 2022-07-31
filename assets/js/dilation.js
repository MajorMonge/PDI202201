const dilationMask = [
  [0, 1, 0],
  [1, 1, 1],
  [0, 1, 0],
];

function applyDilation(fromCanvas, fromCanvasCtx, targetCanvasCtx) {
  toGrayScale(fromCanvas, fromCanvasCtx, targetCanvasCtx);

  let imageData = targetCanvasCtx.getImageData(
    0,
    0,
    fromCanvas.width,
    fromCanvas.height
  ).data;

  let pixels = [],
    bPixels = [];

  for (let y = 0; y < fromCanvas.height; y++) {
    bPixels.push([]);
    for (let x = 0; x < fromCanvas.width; x++) {
      bPixels[y].push(0);
    }
  }

  for (let y = 0; y < fromCanvas.height; y++) {
    pixels.push([]);
    for (let x = 0; x < fromCanvas.width; x++) {
      pixels[y].push(imageData[(y * fromCanvas.width + x) * 4] > 0 ? 1 : 0);
    }
  }

  for (let y = 0; y < pixels.length; y++) {
    for (let x = 0; x < pixels[y].length; x++) {
      if (pixels[y][x] == 1) {
        for (let j = -1; j <= 1; j++) {
          for (let k = -1; k <= 1; k++) {
            if (dilationMask[j + 1][k + 1] === 1) {
              if (bPixels[j + y] !== undefined)
                if (bPixels[j + y][k + x] !== undefined)
                  bPixels[j + y][x + k] = 1;
            }
          }
        }
      }
    }
  }

  let newPixelData = [];
  for (let i = 0; i < bPixels.length; i++) {
    for (let j = 0; j < bPixels[i].length; j++) {
      if (bPixels[i][j] === 1) {
        newPixelData.push(255, 255, 255, 255);
      } else {
        newPixelData.push(0, 0, 0, 255);
      }
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
