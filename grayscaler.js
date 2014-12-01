var c = document.getElementById("canvas");
var ctx = c.getContext('2d');
var img = document.getElementById("src");
var ascii = document.getElementById("ascii");


var grayValueToAsciiMap = {
  245: ".",
  237: ":",
  218: "*",
  197: "I",
  191: "$",
  188: "J",
  187: "T",
  186: "L",
  184: "C",
  183: "Y",
  181: "V",
  175: "S",
  174: "U",
  173: "G",
  172: "P",
  169: "A",
  169: "O",
  169: "X",
  168: "F",
  166: "E",
  162: "#",
  160: "R",
  159: "K",
  158: "H",
  157: "B",
  156: "N",
  146: "W",
  144: "M",
};

var mappedValues = [];
for (k in grayValueToAsciiMap) { mappedValues.push(parseInt(k, 10)); };

var grayToAscii = function (grayValue) {
  grayValue = Math.round(grayValue);
  for (var i = 0; i < mappedValues.length; i++) {
    if (grayValue < mappedValues[i]) {
      return grayValueToAsciiMap[mappedValues[Math.max(i-1, 0)]];
    }
  }
  return grayValueToAsciiMap[144];
};

img.onload = function () {
  c.width = img.width;
  c.height = img.height;

  ctx.drawImage(img, 0, 0, img.width, img.height);
  var data = ctx.getImageData(0, 0, c.width, c.height).data;

  var grays = [];
  var grayData = ctx.createImageData(c.width, c.height);

  for (var i = 0; i < data.length; i += 4) {
      var r = data[i];
      var g = data[i + 1];
      var b = data[i + 2];
      var gray = (r + b + g) / 3;
	// var gray = (0.2126 * r + 0.7152 * b +  0.0722 * g) / 3; // needs to cast [0,255] to [0,1]
      grays.push(gray);
      grayData.data[i] = grayData.data[i+1] = grayData.data[i+2] = gray;
      if (gray) {
	  grayData.data[i+3] = 255;
      }

  }
  ctx.putImageData(grayData, 0, 0);
  var asciied = grays.map(grayToAscii);
  // console.log(grays, grays.length, asciied);
  var result = "";
  for (var j = 0; j < (c.height * c.width); j += c.width) {
    console.log(j+1, j+c.width);
    result += asciied.slice(j+1, j+c.width).join("") + "\n";
  }
  ascii.textContent = result;
};
