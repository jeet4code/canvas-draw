// Settings
const fontName = "Verdana";
const textureFontSize = 100;

let textureCoordinates;

// String to show
let string = ["Some text", "\n", "to sample", "\n", "with Canvas"].join("");

// Create canvas to sample the text
const textCanvas = document.querySelector("#canvas");
const textCtx = textCanvas.getContext("2d");

sampleCoordinates();

// ---------------------------------------------------------------

function sampleCoordinates() {
  // Parse text
  console.log("start");
  const lines = string.split(`\n`);
  const linesMaxLength = [...lines].sort((a, b) => b.length - a.length)[0]
    .length;
  const wTexture = textureFontSize * 0.7 * linesMaxLength;
  const hTexture = lines.length * textureFontSize;

  // Draw text
  const linesNumber = lines.length;
  textCanvas.width = wTexture;
  textCanvas.height = hTexture;
  textCtx.font = "100 " + textureFontSize + "px " + fontName;
  textCtx.fillStyle = "#2a9d8f";
  textCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);
  for (let i = 0; i < linesNumber; i++) {
    textCtx.fillText(lines[i], 0, ((i + 0.8) * hTexture) / linesNumber);
  }

  textureCoordinates = [];
  const samplingStep = 1;
  if (wTexture > 0) {
    const imageData = textCtx.getImageData(
      0,
      0,
      textCanvas.width,
      textCanvas.height
    );
    for (let i = 0; i < textCanvas.height; i += samplingStep) {
      for (let j = 0; j < textCanvas.width; j += samplingStep) {
        // Checking if R-channel is not zero since the background RGBA is (0,0,0,0)
        if (imageData.data[(j + i * textCanvas.width) * 4] > 0) {
          textureCoordinates.push({
            x: j,
            y: i
          });
        }
      }
    }
  }

  drawDots();
}

function drawDots() {
  const dotsCanvas = document.createElement("canvas");
  const dotsCtx = dotsCanvas.getContext("2d");
  document.body.appendChild(dotsCanvas);

  dotsCanvas.width = textCanvas.width;
  dotsCanvas.height = textCanvas.height;
  dotsCtx.fillStyle = "#ff0000";

  dotsCtx.clearRect(0, 0, dotsCanvas.width, dotsCanvas.height);
  for (let i = 0; i < textureCoordinates.length; i++) {
    drawShape4(dotsCtx, textureCoordinates[i].x, textureCoordinates[i].y);
    //drawShape2(dotsCtx, textureCoordinates[i].x, textureCoordinates[i].y);
  }
}
function drawShape(dotsCtx, x, y) {
  dotsCtx.beginPath();
  dotsCtx.arc(x, y, 1.5, 0, Math.PI + Math.PI, true);
  dotsCtx.closePath();
  dotsCtx.fill();
}

function drawShape3(dotsCtx, x, y) {
  dotsCtx.beginPath();
  dotsCtx.arc(
    x,
    y,
    1.5,
    Math.random() * Math.PI,
    Math.random() * Math.PI + Math.PI,
    true
  );
  dotsCtx.closePath();
  dotsCtx.fill();
}

function drawShape2(ctx, x, y) {
  ctx.beginPath();
  ctx.rect(x, y, Math.random() * 3 + 1, Math.random() * 10 + 5);
  ctx.fill();
}

function drawShape4(ctx, x, y) {
  ctx.beginPath();
  ctx.rect(
    x + Math.random() * 5,
    y + Math.random() * 5,
    Math.random() * 1 + 1,
    Math.random() * 5 + 2
  );
  ctx.fill();
}
