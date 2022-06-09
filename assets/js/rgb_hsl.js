function rgbToHSL(r, g, b) {
  (r /= 255), (g /= 255), (b /= 255);
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;

  if (max == min) {
    h = s = 0;
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [Math.round(h * 239), Math.round(s * 240), Math.round(l * 240)];
}

function hslToRGB(h, s, l) {
  (h /= 239), (s /= 240), (l /= 240);

  var r, g, b;

  if (s == 0) {
    r = g = b = l;
  } else {
    var hueToRGB = function hueToRGB(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hueToRGB(p, q, h + 1 / 3);
    g = hueToRGB(p, q, h);
    b = hueToRGB(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

let rInput = document.getElementById("rInput"),
  gInput = document.getElementById("gInput"),
  bInput = document.getElementById("bInput"),
  hInput = document.getElementById("hInput"),
  sInput = document.getElementById("sInput"),
  lInput = document.getElementById("lInput"),
  colorBox = document.getElementById("convertion-square");

function updateRGB() {
  res = rgbToHSL(rInput.value, gInput.value, bInput.value);

  hInput.value = res[0];
  sInput.value = res[1];
  lInput.value = res[2];

  colorBox.style.background = `rgb(${rInput.value}, ${gInput.value}, ${bInput.value})`;
}

function updateHSL() {
  res = hslToRGB(hInput.value, sInput.value, lInput.value);

  rInput.value = res[0];
  gInput.value = res[1];
  bInput.value = res[2];

  colorBox.style.background = `hsl(${Math.round(hInput.value/239 * 360)}, ${Math.round(sInput.value/240 * 100)}%, ${Math.round(lInput.value/240 * 100)}%)`;
}

rInput.onchange = (e) => {
  updateRGB();
};

gInput.onchange = (e) => {
  updateRGB();
};

bInput.onchange = (e) => {
  updateRGB();
};

hInput.onchange = (e) => {
  updateHSL();
};

sInput.onchange = (e) => {
  updateHSL();
};

lInput.onchange = (e) => {
  updateHSL();
};
