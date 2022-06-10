function getRGBChannels(
  fromCanvas,
  fromCanvasCtx,
  targetRCtx,
  targetGCtx,
  targetBCtx
) {
  let r = [],
    g = [],
    b = [];

  const imageData = fromCanvasCtx.getImageData(
    0,
    0,
    fromCanvas.width,
    fromCanvas.height
  );

  for (i = 0; i < imageData.data.length; i += 4) {
    r.push(imageData.data[i], 0, 0, 255);
    g.push(0, imageData.data[i + 1], 0, 255);
    b.push(0, 0, imageData.data[i + 2], 255);
  }

  console.log(r, g, b);

  let newRData = fromCanvasCtx.createImageData(
    fromCanvas.width,
    fromCanvas.height
  );

  newRData.data.set(new Uint8ClampedArray(r));

  let newGData = fromCanvasCtx.createImageData(
    fromCanvas.width,
    fromCanvas.height
  );

  newGData.data.set(new Uint8ClampedArray(g));

  let newBData = fromCanvasCtx.createImageData(
    fromCanvas.width,
    fromCanvas.height
  );

  newBData.data.set(new Uint8ClampedArray(b));

  targetRCtx.putImageData(newRData, 0, 0);

  targetGCtx.putImageData(newGData, 0, 0);

  targetBCtx.putImageData(newBData, 0, 0);
}
