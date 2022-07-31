function applyBinarization(fromCanvas, fromCanvasCtx, targetCanvasCtx) {
  toGrayScale(fromCanvas, fromCanvasCtx, targetCanvasCtx);
  let t = parseInt(prompt("Digite o valor do limiar:", "128"));

  let imageData = targetCanvasCtx.getImageData(
    0,
    0,
    fromCanvas.width,
    fromCanvas.height
  ).data;

  for (let i = 0; i < imageData.length; i += 4) {
    if (imageData[i] < t) {
      imageData[i] = 0;
      imageData[i + 1] = 0;
      imageData[i + 2] = 0;
    } else {
      imageData[i] = 255;
      imageData[i + 1] = 255;
      imageData[i + 2] = 255;
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
