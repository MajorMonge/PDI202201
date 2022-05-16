function invertColors(targetCanvas, targetCanvasCtx) {
  const imageData = targetCanvasCtx.getImageData(
    0,
    0,
    targetCanvas.width,
    targetCanvas.height
  );

  const data = imageData.data;

  for (var i = 0; i < data.length; i += 4) {
    data[i] = 255 - data[i]; // R
    data[i + 1] = 255 - data[i + 1]; // G
    data[i + 2] = 255 - data[i + 2]; // B
  }

  targetCanvasCtx.putImageData(imageData, 0, 0);
}
