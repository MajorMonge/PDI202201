function invertColors(fromCanvas, fromCanvasCtx, targetCanvasCtx) {
  const imageData = fromCanvasCtx.getImageData(
    0,
    0,
    fromCanvas.width,
    fromCanvas.height
  );

  const data = imageData.data;

  for (var i = 0; i < data.length; i += 4) {
    data[i] = 255 - data[i]; // R
    data[i + 1] = 255 - data[i + 1]; // G
    data[i + 2] = 255 - data[i + 2]; // B
  }

  targetCanvasCtx.putImageData(imageData, 0, 0);
}
