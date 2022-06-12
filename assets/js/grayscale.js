function toGrayScale(fromCanvas, fromCanvasCtx, targetCanvasCtx) {
  const imageData = fromCanvasCtx.getImageData(
    0,
    0,
    fromCanvas.width,
    fromCanvas.height
  );
  const data = imageData.data;

  for (var i = 0; i < data.length; i += 4) {
    var average = (data[i] + data[i + 1] + data[i + 2]) / 3;

    data[i] = average; // R
    data[i + 1] = average; // G
    data[i + 2] = average; // B
  }

  targetCanvasCtx.putImageData(imageData, 0, 0);
}
