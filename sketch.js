let level = 5;
let initialSideOfSquare;

const getRandomColor = () => {
  return color(random(0, 255), random(0, 255), random(0, 255));
};

const drawSierpińskiCarpet = (sq, depth) => {
  if (depth === level) {
    return;
  }
  let newSquarePointX = sq.x + sq.sideLength / 3;
  let newSquarePointY = sq.y + sq.sideLength / 3;
  let newSquareLength = sq.sideLength / 3;
  let newSquare = new Square(newSquarePointX, newSquarePointY, newSquareLength);
  newSquare.drawSubsequentSquare();

  let sq1 = new Square(sq.x, sq.y, newSquareLength);
  let sq2 = new Square(sq.x + sq.sideLength / 3, sq.y, newSquareLength);
  let sq3 = new Square(sq.x + (2 * sq.sideLength) / 3, sq.y, newSquareLength);
  let sq4 = new Square(sq.x, sq.y + sq.sideLength / 3, newSquareLength);
  let sq5 = new Square(
    sq.x + (2 * sq.sideLength) / 3,
    sq.y + sq.sideLength / 3,
    newSquareLength
  );
  let sq6 = new Square(sq.x, sq.y + (2 * sq.sideLength) / 3, newSquareLength);
  let sq7 = new Square(
    sq.x + sq.sideLength / 3,
    sq.y + (2 * sq.sideLength) / 3,
    newSquareLength
  );
  let sq8 = new Square(
    sq.x + (2 * sq.sideLength) / 3,
    sq.y + (2 * sq.sideLength) / 3,
    newSquareLength
  );

  drawSierpińskiCarpet(sq1, depth + 1);
  drawSierpińskiCarpet(sq2, depth + 1);
  drawSierpińskiCarpet(sq3, depth + 1);
  drawSierpińskiCarpet(sq4, depth + 1);
  drawSierpińskiCarpet(sq5, depth + 1);
  drawSierpińskiCarpet(sq6, depth + 1);
  drawSierpińskiCarpet(sq7, depth + 1);
  drawSierpińskiCarpet(sq8, depth + 1);
};

class Square {
  constructor(x, y, sideLength) {
    this.x = x;
    this.y = y;
    this.sideLength = sideLength;
  }

  drawSubsequentSquare() {
    noStroke();
    fill(subsequentSquareColorPicker.color());
    square(this.x, this.y, this.sideLength);
  }

  drawInitialSquare() {
    noStroke();
    fill(bigSquareColorPicker.color());
    square(this.x, this.y, this.sideLength);
  }
}

function windowResized() {
  if (windowWidth < 400) {
    let canvasWidth = windowWidth - 10;
    resizeCanvas(canvasWidth, canvasWidth);
    initialSideOfSquare = canvasWidth - 10;
  } else {
    resizeCanvas(400, 400);
    initialSideOfSquare = 400;
  }
}

function setup() {
  let carpetCanvas;
  if (innerWidth < 400) {
    let canvasWidth = innerWidth - 10;
    carpetCanvas = createCanvas(canvasWidth, canvasWidth);
    initialSideOfSquare = canvasWidth;
  } else {
    carpetCanvas = createCanvas(400, 400);
    initialSideOfSquare = 400;
  }
  carpetCanvas.parent("carpet-canvas");

  levelSlider = createSlider(2, 6, 5, 1);
  bigSquareColorPicker = createColorPicker("#F8A488");
  subsequentSquareColorPicker = createColorPicker("#FD726C");
  levelSlider.id("levelSliderID");
  levelSlider.parent("levelSlider");
  bigSquareColorPicker.id("bigSquareColorID");
  bigSquareColorPicker.parent("bigSquareColor");
  subsequentSquareColorPicker.id("subsequentSquareColorID");
  subsequentSquareColorPicker.parent("subsequentSquareColor");
}

function draw() {
  let initialSquare = new Square(0, 0, initialSideOfSquare);
  initialSquare.drawInitialSquare();
  level = levelSlider.value();
  drawSierpińskiCarpet(initialSquare, 0);
}
