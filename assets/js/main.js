var testVar;
var imgVar = null;
var imgFileButton = document.getElementById("inputFile");

var ogCanvas = document.getElementById("og-canvas");
var cpCanvas = document.getElementById("cp-canvas");

var ctxOgCanvas = ogCanvas.getContext("2d");
var ctxCpCanvas = cpCanvas.getContext("2d");

function loadImage(imgSrc) {
  imgVar = new Image();
  imgVar.crossOrigin = "anonymous";
  imgVar.src = window.URL.createObjectURL(imgSrc);

  drawImage();
}

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
  };
}

function copyImage(fromCanvas, toCanvas, toContext) {
  toCanvas.width = fromCanvas.width;
  toCanvas.height = fromCanvas.height;
  toContext.clearRect(0, 0, toCanvas.width, toCanvas.height);
  toContext.drawImage(fromCanvas, 0, 0);
}
