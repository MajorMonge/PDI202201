var testVar;
var imgVar = null;
var imgFileButton = document.getElementById("inputFile");

var ogCanvas = document.getElementById("og-canvas");
var cpCanvas = document.getElementById("cp-canvas");
var rCanvas = document.getElementById("r-canvas");
var gCanvas = document.getElementById("g-canvas");
var bCanvas = document.getElementById("b-canvas");

var ctxOgCanvas = ogCanvas.getContext("2d");
var ctxCpCanvas = cpCanvas.getContext("2d");
var ctxRCanvas = rCanvas.getContext("2d");
var ctxGCanvas = gCanvas.getContext("2d");
var ctxBCanvas = bCanvas.getContext("2d");

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

    //Copia as dimensões do canvas para o auxiliar e os de canais de cores;
    cpCanvas.width = ogCanvas.width;
    rCanvas.width = ogCanvas.width;
    gCanvas.width = ogCanvas.width;
    bCanvas.width = ogCanvas.width;
    cpCanvas.height = ogCanvas.height;
    rCanvas.height = ogCanvas.height;
    gCanvas.height = ogCanvas.height;
    bCanvas.height = ogCanvas.height;

    //EVENTOS PARA OBTER PIXEL AO MOVER O MOUSE
    ogCanvas.addEventListener("mousemove", function (event) {
      pixelColorPick(
        event,
        ogCanvas,
        ctxOgCanvas,
        focusText,
        focusPosText,
        focusColor
      );
    });
    cpCanvas.addEventListener("mousemove", function (event) {
      pixelColorPick(
        event,
        cpCanvas,
        ctxCpCanvas,
        focusText,
        focusPosText,
        focusColor
      );
    });

    //EVENTOS PARA OBTER PIXEL AO CLICAR COM O MOUSE
    ogCanvas.addEventListener("click", function (event) {
      drawPixel(event, ogCanvas, ctxOgCanvas);
    });
    cpCanvas.addEventListener("click", function (event) {
      drawPixel(event, cpCanvas, ctxCpCanvas);
    });

    //EVENTOS PARA DESENHAR PIXEL
    ogCanvas.addEventListener("contextmenu", function (event) {
      pixelColorPick(
        event,
        ogCanvas,
        ctxOgCanvas,
        clickText,
        clickPosText,
        clickColor
      );
    });
    cpCanvas.addEventListener("contextmenu", function (event) {
      pixelColorPick(
        event,
        cpCanvas,
        ctxCpCanvas,
        clickText,
        clickPosText,
        clickColor
      );
    });

    //EVENTOS PARA DESENHAR LINHA
    let downE;
    ogCanvas.addEventListener("mousedown", function (downEvent) {
      downE = downEvent;
    });

    ogCanvas.addEventListener("mouseup", function (upEvent) {
      drawLine(downE, upEvent, ogCanvas, ctxOgCanvas);
    });

    cpCanvas.addEventListener("mousedown", function (downEvent) {
      downE = downEvent;
    });

    cpCanvas.addEventListener("mouseup", function (upEvent) {
      drawLine(downE, upEvent, cpCanvas, ctxCpCanvas);
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

//[FUNÇÃO PARA DESENHAR PIXEL]
function drawPixel(event, targetCanvas, targetContext) {
  let rect = targetCanvas.getBoundingClientRect();

  let x = event.clientX - rect.left,
    y = Math.round(event.clientY - rect.top);

  targetContext.fillStyle = `rgb(${rInput.value}, ${gInput.value}, ${bInput.value})`;
  targetContext.fillRect(x, y, 1, 1);
}

//[FUNÇÃO PARA DESENHAR LINHA]
function drawLine(eventDown, eventUp, targetCanvas, targetContext) {
  let rect = targetCanvas.getBoundingClientRect();
  let downX = eventDown.clientX - rect.left,
    downY = Math.round(eventDown.clientY - rect.top),
    upX = eventUp.clientX - rect.left,
    upY = Math.round(eventUp.clientY - rect.top);

  targetContext.beginPath();
  targetContext.moveTo(downX, downY);
  targetContext.lineTo(upX, upY);
  targetContext.strokeStyle = `rgb(${rInput.value}, ${gInput.value}, ${bInput.value})`;
  targetContext.stroke();
  targetContext.closePath();
}

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

  let x = Math.round(event.clientX - rect.left),
    y = Math.round(event.clientY - rect.top),
    pixel = targetContext.getImageData(x, y, 1, 1),
    data = pixel.data;

  const rgba = `${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255}`;
  const pos = `${x} , ${Math.round(y)}`;

  targetPosText.textContent = `(${pos})`;
  targetText.textContent = `(${rgba})`;
  targetColor.style.background = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${
    data[3] / 255
  })`;

  event.preventDefault();
}
