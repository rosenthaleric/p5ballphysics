let ball;
let boxes = [];
const width = 800;
const height = 400;
const G = 0.011;

function setup() {
  createCanvas(width, height);
  ball = new Ball(width / 2, height / 5, 25);
  boxes.push(new Box());
  frameRate(60)
}

function draw() {
  background(240);
  for (box of boxes) {
    box.show();
    if (ball.boxhit === 0) ball.boxCollision(box);
    box.x -= 1;
  }
  if(boxes[boxes.length - 1].x < width - width / 6) boxes.push(new Box());
  if(frameCount != 0 && frameCount % 850 == 0) boxes.shift();
  ball.update();
  ball.show();

  if (keyIsDown(65)) {
    if (ball.isRest) ball.acc.x = -0.5;
    else ball.acc.x = -0.2;
  }
  if (keyIsDown(68)) {
    if (ball.isRest) ball.acc.x = 0.5;
    else ball.acc.x = 0.2;
  }
}

function keyPressed() {
  if (keyCode == 87) {
    ball.isRest = false;
    ball.acc.y = 0;
    ball.vel.y = -7;
  }
  return false;
}
