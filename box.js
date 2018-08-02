function Box(x) {
  this.w = random(50, 200);
  this.h = random(20, 140);
  this.x = width;
  this.y = random(height / 6, height);
}

Box.prototype.show = function() {
  fill(200, 134, 244);
  noStroke()
  rect(this.x, this.y, this.w, this.h);
}
