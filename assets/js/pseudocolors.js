function applyPseudoColor(fromCanvas, fromCanvasCtx, targetCanvasCtx) {
  toGrayScale(fromCanvas, fromCanvasCtx, targetCanvasCtx);

  const imageData = targetCanvasCtx.getImageData(
    0,
    0,
    fromCanvas.width,
    fromCanvas.height
  );

  /* let shades = [];

  for (let x = 0; x < fromCanvas.width * fromCanvas.height; x += 4) {
    if (!shades.includes(imageData.data[x])) shades.push(imageData.data[x]);
  }

  shades = shades.sort(function (a, b) {
    return a - b;
  });

  console.log(shades); */

  let colors = [
    { r: 0, g: 0, b: 0 }, //PRETO
    { r: 255, g: 0, b: 255 }, //MAGENTA
    { r: 0, g: 0, b: 255 }, //AZUL
    { r: 0, g: 255, b: 255 }, //CIANO
    { r: 0, g: 255, b: 0 }, //VERDE
    { r: 255, g: 255, b: 0 }, //AMARELO
    { r: 255, g: 0, b: 0 }, //VERMELHO
  ];

  let hues = [];

  for (let colorIndex = 0; colorIndex < colors.length - 1; colorIndex++) {
    let currentColor = colors[colorIndex],
      nextColor = colors[colorIndex + 1];
    for (let i = 0; i < 256; i++) {
      let red, green, blue;
      if (currentColor.r < nextColor.r) {
        r = currentColor.r + i;
      } else if (currentColor.r == nextColor.r) {
        r = currentColor.r;
      } else {
        r = currentColor.r - i;
      }
      if (currentColor.g < nextColor.g) {
        g = currentColor.g + i;
      } else if (currentColor.g == nextColor.g) {
        g = currentColor.g;
      } else {
        g = currentColor.g - i;
      }
      if (currentColor.b < nextColor.b) {
        b = currentColor.b + i;
      } else if (currentColor.b == nextColor.b) {
        b = currentColor.b;
      } else {
        b = currentColor.b - i;
      }

      hues.push({ r: r, g: g, b: b });
    }
  }

  console.log(hues);

  let pixels = [];

  for (let x = 0; x < fromCanvas.width * fromCanvas.height; x++) {
    let hueIndex = Math.round(
      ((hues.length - 1) * imageData.data[x * 4]) / 255
    );

    let r = hues[hueIndex].r,
      g = hues[hueIndex].g,
      b = hues[hueIndex].b;

    pixels.push(r, g, b, 255);
  }

  console.log(pixels);

  let newImageData = fromCanvasCtx.createImageData(
    fromCanvas.width,
    fromCanvas.height
  );

  newImageData.data.set(new Uint8ClampedArray(pixels));

  console.log(newImageData);

  targetCanvasCtx.putImageData(newImageData, 0, 0);
}
