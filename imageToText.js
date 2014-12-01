;(function (parent) {
  var module = {};

  // from: http://larc.unt.edu/ian/art/ascii/shader/
  var grayValueToTextMap = module._grayValueToTextMap = {
    245: ".",
    237: ":",
    218: "*",
    197: "I",
    // 191: "$",
    // 188: "J",
    // 187: "T",
    // 186: "L",
    // 184: "C",
    // 183: "Y",
    181: "V",
    // 175: "S",
    // 174: "U",
    // 173: "G",
    // 172: "P",
    // 169: "A",
    // 169: "O",
    // 169: "X",
    168: "F",
    // 166: "E",
    // 162: "#",
    // 160: "R",
    // 159: "K",
    // 158: "H",
    // 157: "B",
    156: "N",
    // 146: "W",
    144: "M",
  };

  var mappedValues = [];
  for (k in grayValueToTextMap) { mappedValues.push(parseInt(k, 10)); };

  var grayValueToText = module._grayValueToText = function (grayValue) {
    grayValue = Math.round(grayValue);
    for (var i = 1; i < mappedValues.length; i++) {
      if (grayValue < mappedValues[i]) {
	return grayValueToTextMap[mappedValues[i-1]];
      }
    }
    return grayValueToTextMap[mappedValues[mappedValues.length-1]];
  };

  var loadedImageToText = module.loadedImageToText = function (loadedImage, columns, rows) {
    var resultWidth = columns || loadedImage.width;
    var resultHeight = rows || loadedImage.height;

    var canvas = window.document.createElement('canvas');
    var context = canvas.getContext('2d');

    canvas.width = resultWidth;
    canvas.height = resultHeight;
    context.drawImage(loadedImage, 0, 0, canvas.width, canvas.height);

    var data = context.getImageData(0, 0, canvas.width, canvas.height).data;

    var grays = [];

    for (var i = 0; i < data.length; i += 4) {
      var r = data[i];
      var g = data[i + 1];
      var b = data[i + 2];
      grays.push((r + b + g) / 3);
    }

    var texted = grays.map(grayValueToText);

    var result = "";
    for (var j = 0; j < (canvas.height * canvas.width); j += canvas.width) {
      result += texted.slice(j+1, j+canvas.width).join("") + "\n";
    }

    return result;
  };

  parent.ITT = module;
})(self);
