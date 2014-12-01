Experiment that converts an image to text using the mapping from:
http://larc.unt.edu/ian/art/ascii/shader/

Exposes the ITT (for Image To Text) namespace with the
loadedImageToText function.

[Demo](https://g-k.github.io/image-to-text/)

Example (Demo Source):


```html
<div>
  <h2>Image to Text</h2>
  <img id="src" src="Shaun-McAvinney-alt.jpg">
  <pre id="target" style="font-family: monospace;"></pre>
</div>
<script src="imageToText.js"></script>
<script>
var img = document.getElementById("src");
var target = document.getElementById("target");

var showImageAsText = function () {
  // scale result font size to try to make the whole text image visible
  target.style.fontSize = Math.max((img.width / 100), 2) | 0 +"px";

  // returns newline delimited 64x64 string:
  // I*************I**IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIVV
  // *********************IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIVVIVV
  // *********************IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIVV
  // *********************IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIVVV
  // *********************IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIVV
  // *IIIIIIII***************IIIIIIIIVMMVM*IIIIIIIIIIIIIIIIIIIIIIIVV
  // FVFVVFFFFFFFNNNI**I*****IIIIII*NMNVMIMMIIIIIIIIIIIIIIIIIIIIIIIV
  // VVVVVVVVVVFFFNNMM*******IIII*MMMMMMMMMMMMMMIIIIIIIIIIIIIIIIIIIV
  // IIVIIIVVVVVFVVMMMMM*******IIMMMMMMMMMMMMMMMMMFIIIIIIIIIIIIIIIIV
  // IIIIIIVVFVVVVVFMMMMM**I**I*FMMMMMMMMMMMMMMMMMMFFFFNNNVIIIIIIIIV
  // IIIIVVVVVFIVVIVNMMMMM***IIIIMMMMMMMMMMMMMMMMIVVVVFFFFFNMFIIIIII
  //
  // etc.
  var text = window.ITT.loadedImageToText(img,  // image element to get data from
					  64,   // target number of columns
					  64);  // target number of rows

  console.log(text);
  target.textContent = text;
};

img.addEventListener("load", showImageAsText);
window.addEventListener("load", showImageAsText);
</script>
```

Optional TODO:
- [ ] Use custom mappings
- [ ] Use WebGL shader when supported
- [ ] Handle video / animation
