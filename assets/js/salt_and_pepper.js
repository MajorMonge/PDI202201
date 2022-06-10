function addSaltAndPepper(fromCanvas, fromCanvasCtx, targetCanvasCtx) {
  let pixels = [];

  const imageData = fromCanvasCtx.getImageData(
    0,
    0,
    fromCanvas.width,
    fromCanvas.height
  );

  for (i = 0; i < imageData.data.length; i += 4) {
    let chance = Math.floor(Math.random() * (100 - 1 + 1)) + 1;

    if (chance <= 5) {
      if (chance % 2 == 0) {
        pixels.push(255, 255, 255, 255);
      } else {
        pixels.push(0, 0, 0, 255);
      }
    } else {
      pixels.push(
        imageData.data[i],
        imageData.data[i + 1],
        imageData.data[i + 2],
        255
      );
    }
  }

  let newImageData = fromCanvasCtx.createImageData(
    fromCanvas.width,
    fromCanvas.height
  );

  newImageData.data.set(new Uint8ClampedArray(pixels));

  targetCanvasCtx.putImageData(newImageData, 0, 0);
}
