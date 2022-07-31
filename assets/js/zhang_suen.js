function applyZhangSuen(fromCanvas, fromCanvasCtx, targetCanvasCtx) {
  toGrayScale(fromCanvas, fromCanvasCtx, targetCanvasCtx);

  let imageData = targetCanvasCtx.getImageData(
    0,
    0,
    fromCanvas.width,
    fromCanvas.height
  ).data;

  let pixels = [],
    toRemove = [],
    hasChanged = false,
    steps = 0;

  for (let y = 0; y < fromCanvas.height; y++) {
    pixels.push([]);
    for (let x = 0; x < fromCanvas.width; x++) {
      pixels[y].push(imageData[(y * fromCanvas.width + x) * 4] > 0 ? 1 : 0);
    }
  }

  console.log(pixels);

  do {
    hasChanged = false;

    //PASSO 1
    for (let i = 0; i < pixels.length; i++) {
      for (let j = 0; j < pixels[i].length; j++) {
        if (pixels[i][j] === 1) {
          let checkCount = 0;

          let count = 0;

          pixels[i - 1][j] === 1 ? count++ : null; // P2
          pixels[i - 1][j + 1] === 1 ? count++ : null; // P3
          pixels[i][j + 1] === 1 ? count++ : null; // P4
          pixels[i + 1][j + 1] === 1 ? count++ : null; // P5
          pixels[i + 1][j] === 1 ? count++ : null; // P6
          pixels[i + 1][j - 1] === 1 ? count++ : null; // P7
          pixels[i][j - 1] === 1 ? count++ : null; // P8
          pixels[i - 1][j - 1] === 1 ? count++ : null; // P9

          if (count >= 2 && count <= 6) {
            checkCount++;
          }

          if (count < 8) {
            count = 0;

            pixels[i - 1][j] == 0 && pixels[i - 1][j + 1] == 1 ? count++ : null; // P2 -> P3 = 0 -> 1
            pixels[i - 1][j + 1] == 0 && pixels[i][j + 1] == 1 ? count++ : null; // P3 -> P4 = 0 -> 1
            pixels[i][j + 1] == 0 && pixels[i + 1][j + 1] == 1 ? count++ : null; // P4 -> P5 = 0 -> 1
            pixels[i + 1][j + 1] == 0 && pixels[i + 1][j] == 1 ? count++ : null; // P5 -> P6 = 0 -> 1
            pixels[i + 1][j] == 0 && pixels[i + 1][j - 1] == 1 ? count++ : null; // P6 -> P7 = 0 -> 1
            pixels[i + 1][j - 1] == 0 && pixels[i][j - 1] == 1 ? count++ : null; // P7 -> P8 = 0 -> 1
            pixels[i][j - 1] == 0 && pixels[i - 1][j - 1] == 1 ? count++ : null; // P8 -> P9 = 0 -> 1
            pixels[i - 1][j - 1] == 0 && pixels[i - 1][j] == 1 ? count++ : null; // P9 -> P2 = 0 -> 1

            if (count == 1) {
              checkCount++;
            }

            // P2 * P4 * P6 = 0
            if (pixels[i - 1][j] * pixels[i][j + 1] * pixels[i + 1][j] == 0) {
              checkCount++;
            }

            // P4 * P6 * P8 = 0
            if (pixels[i][j + 1] * pixels[i + 1][j] * pixels[i][j - 1] == 0) {
              checkCount++;
            }

            if (checkCount == 4) {
              toRemove.push([i, j]);
              hasChanged = true;
            }
          }
        }
      }
    }

    //"Remove" os pixels marcados, 1 -> 0
    pixels = removeMarked(pixels, toRemove);

    //PASSO 2
    for (let i = 0; i < pixels.length; i++) {
      for (let j = 0; j < pixels[i].length; j++) {
        if (pixels[i][j] === 1) {
          let checkCount = 0;

          let count = 0;

          pixels[i - 1][j] === 1 ? count++ : null; // P2
          pixels[i - 1][j + 1] === 1 ? count++ : null; // P3
          pixels[i][j + 1] === 1 ? count++ : null; // P4
          pixels[i + 1][j + 1] === 1 ? count++ : null; // P5
          pixels[i + 1][j] === 1 ? count++ : null; // P6
          pixels[i + 1][j - 1] === 1 ? count++ : null; // P7
          pixels[i][j - 1] === 1 ? count++ : null; // P8
          pixels[i - 1][j - 1] === 1 ? count++ : null; // P9

          if (count >= 2 && count <= 6) {
            checkCount++;
          }

          if (count < 8) {
            count = 0;

            pixels[i - 1][j] == 0 && pixels[i - 1][j + 1] == 1 ? count++ : null; // P2 -> P3 = 0 -> 1
            pixels[i - 1][j + 1] == 0 && pixels[i][j + 1] == 1 ? count++ : null; // P3 -> P4 = 0 -> 1
            pixels[i][j + 1] == 0 && pixels[i + 1][j + 1] == 1 ? count++ : null; // P4 -> P5 = 0 -> 1
            pixels[i + 1][j + 1] == 0 && pixels[i + 1][j] == 1 ? count++ : null; // P5 -> P6 = 0 -> 1
            pixels[i + 1][j] == 0 && pixels[i + 1][j - 1] == 1 ? count++ : null; // P6 -> P7 = 0 -> 1
            pixels[i + 1][j - 1] == 0 && pixels[i][j - 1] == 1 ? count++ : null; // P7 -> P8 = 0 -> 1
            pixels[i][j - 1] == 0 && pixels[i - 1][j - 1] == 1 ? count++ : null; // P8 -> P9 = 0 -> 1
            pixels[i - 1][j - 1] == 0 && pixels[i - 1][j] == 1 ? count++ : null; // P9 -> P2 = 0 -> 1

            if (count == 1) {
              checkCount++;
            }

            // P2 * P4 * P8 = 0
            if (pixels[i - 1][j] * pixels[i][j + 1] * pixels[i][j - 1] == 0) {
              checkCount++;
            }

            // P2 * P6 * P8 = 0
            if (pixels[i - 1][j] * pixels[i + 1][j] * pixels[i][j - 1] == 0) {
              checkCount++;
            }

            if (checkCount == 4) {
              toRemove.push([i, j]);
              hasChanged = true;
            }
          }
        }
      }
    }

    pixels = removeMarked(pixels, toRemove);

    steps++;
  } while (hasChanged === true || steps < 1);

  let newPixelData = [];
  for (let i = 0; i < pixels.length; i++) {
    for (let j = 0; j < pixels[i].length; j++) {
      if (pixels[i][j] === 1) {
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

function removeMarked(pixels, toRemove) {
  toRemove.forEach((removeIndex) => {
    pixels[removeIndex[0]][removeIndex[1]] = 0;
  });
  return pixels;
}
