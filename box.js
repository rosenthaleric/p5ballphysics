function Box(x) {
  this.w = random(50, 200);
  this.h = random(20, 80);
  this.x = width;
  this.y = random(height / 6, height - 50);
  this.speed = 4;
  this.travelled = false;
}

Box.prototype.show = function() {
  fill(200, 134, 244);
  noStroke();
  rect(this.x, this.y, this.w, this.h);
}
