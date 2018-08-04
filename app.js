let ball;
let boxes = [];
let points;
const width = 800;
const height = 400;
const G = 0.011;

function setup() {
  createCanvas(width, height);
  ball = new Ball(width / 2, height / 5, 25);
  boxes.push(new Box);
  frameRate(60)
}

function draw() {
  clear();
  background(240);
  textSize(40);
  textAlign(RIGHT)
  text(ball.counter, width - 10, 40);
  fill(66, 134, 244);

  for (box of boxes) {
    box.show();
    if (ball.boxhit === 0) ball.boxCollision(box);
    box.x -= box.y > height - height / 2 ? 2.5 : 2;
  }
  if (boxes[boxes.length - 1].x < width / 3) boxes.push(new Box());
  if (frameCount != 0 && frameCount % 560 == 0) boxes.shift();

  ball.update();
  ball.show();

  if (keyIsDown(65)) ball.acc.x = ball.isRest ? -0.5 : -0.2;
  if (keyIsDown(68)) ball.acc.x = ball.isRest ? 0.5 : 0.2;
}

function keyPressed() {
  if (keyCode == 87) {
    if (ball.jumps > 0) {
      ball.isRest = false;
      ball.acc.y = 0;
      ball.vel.y = -7;
      ball.jumps--;
    }
  }
}
