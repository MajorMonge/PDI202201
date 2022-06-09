var testVar;
var imgVar = null;
var imgFileButton = document.getElementById("inputFile");

var ogCanvas = document.getElementById("og-canvas");
var cpCanvas = document.getElementById("cp-canvas");

var ctxOgCanvas = ogCanvas.getContext("2d");
var ctxCpCanvas = cpCanvas.getContext("2d");

//[FUNÇÃO PARA SALVAR A IMAGEM]
function downloadImage() {
  let canvasUrl = cpCanvas.toDataURL();
  const downloadElement = document.createElement("a");
  downloadElement.href = canvasUrl;
  downloadElement.download = "canvas-" + new Date().toLocaleString();
  downloadElement.click();
  downloadElement.remove();
}

//[FUNÇÃO PARA CARREGAR A IMAGEM]
function loadImage(imgSrc) {
  imgVar = new Image();
  imgVar.crossOrigin = "anonymous";
  imgVar.src = window.URL.createObjectURL(imgSrc);

  drawImage();
}

//[FUNÇÃO PARA DESENHAR IMAGEM NO CANVAS]
function drawImage() {
  ctxOgCanvas.clearRect(0, 0, ogCanvas.width, ogCanvas.height);

  imgVar.onload = function () {
    var mRatio = Math.min(450 / imgVar.width, 450 / ogCanvas.height);

    imgVar.width > 450
      ? (ogCanvas.width = mRatio * imgVar.width)
      : (ogCanvas.width = imgVar.width);

    imgVar.height > 450
      ? (ogCanvas.height = mRatio * imgVar.height)
      : (ogCanvas.height = imgVar.height);

    //Calcular a proporção da imagem em relação ao Canvas para aplicar "Fit";
    var hRatio = ogCanvas.width / imgVar.width;
    var vRatio = ogCanvas.height / imgVar.height;
    mRatio = Math.min(hRatio, vRatio);

    //Calculo o centro para posicionar a imagem em relação a canvas;
    var centerX = (ogCanvas.width - imgVar.width * mRatio) / 2;
    var centerY = (ogCanvas.height - imgVar.height * mRatio) / 2;

    //Desenha a imagem no canvas;
    ctxOgCanvas.drawImage(
      imgVar,
      centerX,
      centerY,
      imgVar.width * mRatio,
      imgVar.height * mRatio
    );

    //Copia as dimensões do canvas para o auxiliar;
    cpCanvas.width = ogCanvas.width;
    cpCanvas.height = ogCanvas.height;

    //EVENTOS PARA OBTER PIXEL AO MOVER O MOUSE
    ogCanvas.addEventListener("mousemove", function (event) {
      pixelColorPick(event, ogCanvas, ctxOgCanvas, focusText, focusPosText, focusColor);
    });
    cpCanvas.addEventListener("mousemove", function (event) {
      pixelColorPick(event, cpCanvas, ctxCpCanvas, focusText, focusPosText, focusColor);
    });

    //EVENTOS PARA OBTER PIXEL AO CLICAR COM O MOUSE
    ogCanvas.addEventListener("click", function (event) {
      pixelColorPick(event, ogCanvas, ctxOgCanvas, clickText, clickPosText, clickColor);
    });
    cpCanvas.addEventListener("click", function (event) {
      pixelColorPick(event, cpCanvas, ctxCpCanvas, clickText, clickPosText, clickColor);
    });
  };
} //Coloca a imagem no canvas, centralizada e com a escala máxima de 450x450 (se maior que este tamanho).

//[FUNÇÃO PARA COPIAR IMAGEM]
function copyImage(fromCanvas, toCanvas, toContext) {
  toCanvas.width = fromCanvas.width;
  toCanvas.height = fromCanvas.height;
  toContext.clearRect(0, 0, toCanvas.width, toCanvas.height);
  toContext.drawImage(fromCanvas, 0, 0);
} //Copia a imagem entre os canvas

var focusPosText = document.getElementById("focus-pos-value");
var focusText = document.getElementById("focus-rgba-value");
var focusColor = document.getElementById("focus-square");
var clickPosText = document.getElementById("click-pos-value");
var clickText = document.getElementById("click-rgba-value");
var clickColor = document.getElementById("click-square");

//[FUNÇÃO PARA OBTER E EXIBIR INFORMAÇÕES DO PIXEL]
function pixelColorPick(
  event,
  targetCanvas,
  targetContext,
  targetText,
  targetPosText,
  targetColor
) {
  let rect = targetCanvas.getBoundingClientRect();

  let x = event.clientX - rect.left,
    y = event.clientY - rect.top,
    pixel = targetContext.getImageData(x, y, 1, 1),
    data = pixel.data;

  const rgba = `${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255}`;
  const pos = `${x} , ${Math.round(y)}`;


  targetPosText.textContent = `(${pos})`;
  targetText.textContent = `(${rgba})`;
  targetColor.style.background = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${
    data[3] / 255
  })`;
}
