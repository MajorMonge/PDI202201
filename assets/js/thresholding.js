function applyThreshold(fromCanvas, fromCanvasCtx, targetCanvasCtx) {
  let t = parseInt(prompt("Digite o valor do limiar (0 - 255)", "150"));

  if (!Number.isInteger(t) || t < 0) {
    t = 0;
  } else if (t > 255) {
    t = 255;
  }

  toGrayScale(fromCanvas, fromCanvasCtx, targetCanvasCtx);

  let imageData = targetCanvasCtx.getImageData(
    0,
    0,
    fromCanvas.width,
    fromCanvas.height
  ).data;

  console.log(t, imageData);
  for (let i = 0; i < imageData.length; i += 4) {
    if (imageData[i] <= t) {
      imageData[i] = 0;
      imageData[i + 1] = 0;
      imageData[i + 2] = 0;
    }
  }

  let newImageData = fromCanvasCtx.createImageData(
    fromCanvas.width,
    fromCanvas.height
  );

  newImageData.data.set(new Uint8ClampedArray(imageData));

  console.log(newImageData);

  targetCanvasCtx.putImageData(newImageData, 0, 0);
}
