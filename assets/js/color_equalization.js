function RGBToHSL(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    Math.round(60 * h < 0 ? 60 * h + 360 : 60 * h),
    Math.round(
      100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0)
    ),
    Math.round((100 * (2 * l - s)) / 2),
  ];
}

function HSLToRGB(h, s, l) {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [
    Math.round(255 * f(0)),
    Math.round(255 * f(8)),
    Math.round(255 * f(4)),
  ];
}

function applyColorEqualization(fromCanvas, fromCanvasCtx, targetCanvasCtx) {
  let imageData = fromCanvasCtx.getImageData(
    0,
    0,
    fromCanvas.width,
    fromCanvas.height
  );

  let hslImageData = [];
  let histogram = [],
    eqHistogram = [];

  for (i = 0; i < 100; i++) histogram[i] = 0;

  for (let x = 0; x < imageData.data.length; x += 4) {
    let hsl = RGBToHSL(
      imageData.data[x],
      imageData.data[x + 1],
      imageData.data[x + 2]
    );

    hslImageData.push(hsl[0], hsl[1], hsl[2]);

    histogram[hsl[2]] += 1;
  }

  console.log(histogram);

  console.log(hslImageData);

  accumulatedF = 0;

  for (let x = 0; x < histogram.length; x++) {
    accumulatedF += histogram[x];

    eq = Math.max(
      0,
      Math.round(
        (100 * accumulatedF) / (fromCanvas.width * fromCanvas.height)
      ) - 1
    );

    eqHistogram.push(eq);
  }

  console.log(eqHistogram);

  let pixels = [];

  for (let x = 0; x < hslImageData.length; x += 3) {
    let rgb = HSLToRGB(
      hslImageData[x],
      hslImageData[x + 1],
      eqHistogram[hslImageData[x + 2]]
    );

    pixels.push(rgb[0], rgb[1], rgb[2], 255);
  }
  console.log(pixels);

  let newImageData = fromCanvasCtx.createImageData(
    fromCanvas.width,
    fromCanvas.height
  );

  console.log(newImageData.data.length);

  newImageData.data.set(new Uint8ClampedArray(pixels));

  console.log(newImageData);

  targetCanvasCtx.putImageData(newImageData, 0, 0);
}
