let canvasWidth = 600;
let canvasHeight = 600;
let level = 5;

const getRandomColor = () => {
  return color(random(0, 255), random(0, 255), random(0, 255));
};

const drawSeirpinskiCarpet = (sq, depth) => {
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

  drawSeirpinskiCarpet(sq1, depth + 1);
  drawSeirpinskiCarpet(sq2, depth + 1);
  drawSeirpinskiCarpet(sq3, depth + 1);
  drawSeirpinskiCarpet(sq4, depth + 1);
  drawSeirpinskiCarpet(sq5, depth + 1);
  drawSeirpinskiCarpet(sq6, depth + 1);
  drawSeirpinskiCarpet(sq7, depth + 1);
  drawSeirpinskiCarpet(sq8, depth + 1);
};

class Square {
  constructor(x, y, sideLength) {
    this.x = x;
    this.y = y;
    this.sideLength = sideLength;
  }

  drawSubsequentSquare() {
    noStroke();
    fill(getRandomColor());
    square(this.x, this.y, this.sideLength);
  }

  drawInitialSquare() {
    noStroke();
    fill(getRandomColor());
    square(this.x, this.y, this.sideLength);
  }
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  noLoop();
}

function draw() {
  // background(51);
  let initialSquare = new Square(0, 0, 500);
  // initialSquare.draw();
  initialSquare.drawInitialSquare();
  drawSeirpinskiCarpet(initialSquare, 0);
}
