function applyOtsu(fromCanvas, fromCanvasCtx, targetCanvasCtx) {
  toGrayScale(fromCanvas, fromCanvasCtx, targetCanvasCtx);

  let imageData = targetCanvasCtx.getImageData(
    0,
    0,
    fromCanvas.width,
    fromCanvas.height
  );

  let histogram = [];

  for (i = 0; i < 256; i++) histogram[i] = 0;

  for (let x = 0; x < fromCanvas.width * fromCanvas.height; x += 4) {
    histogram[imageData.data[x]] += 1;
  }

  let sum = 0,
    sumB = 0,
    wB = 0,
    wF = 0,
    varMax = 0,
    threshold = 0,
    total = 0;

  for (let t = 0; t < 256; t++) total += histogram[t];
  for (let t = 0; t < 256; t++) sum += t * histogram[t];

  for (let t = 0; t < 256; t++) {
    wB += histogram[t];
    if (wB == 0) continue;
    wF = total - wB;
    if (wF == 0) break;
    sumB += t * histogram[t];
    let mB = sumB / wB,
      mF = (sum - sumB) / wF;
    let varBetween = wB * wF * (mB - mF) * (mB - mF);

    if (varBetween > varMax) {
      varMax = varBetween;
      threshold = t;
    }
  }

  console.log(threshold);

  alert("Melhor limiar calculado pelo metodo de Otsu: " + threshold);
}
