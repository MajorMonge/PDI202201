const doCompression = (imageData, c, gamma) => {
  let result = imageData;

  for (let i = 0; i < result.length; i += 4) {
    result[i] = 255 * (c * Math.pow(result[i] / 255, gamma));
    result[i + 1] = 255 * (c * Math.pow(result[i + 1] / 255, gamma));
    result[i + 2] = 255 * (c * Math.pow(result[i + 2] / 255, gamma));
    result[i + 3] = 255;
  }

  return result;
};

function applyCompression(
  fromCanvas,
  fromCanvasCtx,
  targetCanvasCtx,
  targetCanvasRCtx,
  targetCanvasGCtx,
  targetCanvasBCtx
) {
  let GU = parseFloat(prompt("Digite o valor do gamma", "0.5"));

  if (isNaN(GU)) {
    GU = 0.5;
  }

  let CU = parseInt(prompt("Digite o valor de C", "1"));

  if (isNaN(CU)) {
    CU = 1;
  }

  toGrayScale(fromCanvas, fromCanvasCtx, targetCanvasCtx);

  //0.3 R
  let imageData = targetCanvasCtx.getImageData(
    0,
    0,
    fromCanvas.width,
    fromCanvas.height
  );

  let dataR;
  dataR = doCompression(imageData.data, 1, 0.3);

  console.log(dataR);
  let newImageDataR = targetCanvasRCtx.createImageData(
    fromCanvas.width,
    fromCanvas.height
  );

  newImageDataR.data.set(new Uint8ClampedArray(dataR));

  targetCanvasRCtx.putImageData(newImageDataR, 0, 0);

  //0.4 G
  imageData = targetCanvasCtx.getImageData(
    0,
    0,
    fromCanvas.width,
    fromCanvas.height
  );

  let dataG;
  dataG = doCompression(imageData.data, 1, 0.4);

  console.log(dataG);
  let newImageDataG = targetCanvasGCtx.createImageData(
    fromCanvas.width,
    fromCanvas.height
  );

  newImageDataG.data.set(new Uint8ClampedArray(dataG));

  targetCanvasGCtx.putImageData(newImageDataG, 0, 0);

  //0.6 B
  imageData = targetCanvasCtx.getImageData(
    0,
    0,
    fromCanvas.width,
    fromCanvas.height
  );

  let dataB;
  dataB = doCompression(imageData.data, 1, 0.6);

  console.log(dataB);
  let newImageDataB = targetCanvasBCtx.createImageData(
    fromCanvas.width,
    fromCanvas.height
  );

  newImageDataB.data.set(new Uint8ClampedArray(dataB));

  targetCanvasBCtx.putImageData(newImageDataB, 0, 0);

  //USER
  toGrayScale(fromCanvas, fromCanvasCtx, targetCanvasCtx);
  imageData = targetCanvasCtx.getImageData(
    0,
    0,
    fromCanvas.width,
    fromCanvas.height
  );

  let dataU;
  dataU = doCompression(imageData.data, CU, GU);

  console.log(dataU, CU, GU);
  let newImageDataU = targetCanvasCtx.createImageData(
    fromCanvas.width,
    fromCanvas.height
  );

  newImageDataU.data.set(new Uint8ClampedArray(dataU));

  targetCanvasCtx.putImageData(newImageDataU, 0, 0);
}
