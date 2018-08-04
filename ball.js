function Ball(x, y, d) {
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.isRest = false;
  this.d = d;
  this.r = d / 2;
  this.boxhit = 0;
  this.counter = 0;
  this.jumps = 2;
  this.box;
}

// physics
Ball.prototype.update = function() {
  if (!this.isRest) this.acc.y += G;
  else this.acc.y = 0;

  this.vel.add(this.acc);
  this.pos.add(this.vel);

  if (this.hitsCeiling() || this.boxhit === 2) {
    if (this.boxhit === 2) this.pos.y = this.box.y + this.box.h + this.r;
    else this.pos.y = 0 + this.r;

    this.vel.rotate(-2 * this.vel.heading());

  } else if (this.hitsRightWall() || this.boxhit === 3) {
    if (this.boxhit === 3) {
      this.pos.x = this.box.x - this.r;
      this.vel.add(this.box.speed, 0); // account for pushing momentum of box
    } else this.pos.x = width - this.r;

    if (this.vel.heading() > 0) this.vel.rotate(PI - 2 * this.vel.heading());
    else this.vel.rotate(-PI - 2 * this.vel.heading());
    this.vel.mult(0.8)

  } else if (this.hitsLefttWall() || this.boxhit === 4) {
    if (this.boxhit === 4) this.pos.x = this.box.x + this.box.w + this.r;
    else this.pos.x = this.r;

    if (this.vel.heading() > 0) this.vel.rotate(PI - 2 * this.vel.heading());
    else this.vel.rotate(-PI - 2 * this.vel.heading());
    this.vel.mult(0.8);
  }

  if (this.hitsFloor() || this.boxhit === 1) {
    if (this.boxhit === 1) {
      this.pos.y = this.box.y - this.r;
      if (!this.box.travelled) {
        this.counter++;
        this.box.travelled = true;
      }
    } else {
      this.pos.y = height - this.r;
      this.counter = 0;
    }

    if (this.hitsFloor() && abs(this.vel.y) > 0.5 || this.boxhit === 1 && abs(this.vel.y) > 4.5) {
      this.vel.rotate(-2 * this.vel.heading());
      this.vel.y *= 0.75;
    } else {
      this.rest();
      this.vel.y = 0;
    }
    this.jumps = 2;
  }

  if (this.isRest === true && this.box === null && !this.hitsFloor()) this.isRest = false;
  if (abs(this.vel.x) > 0.03) this.vel.x *= 0.99;
  if (abs(this.acc.x) > 0.1) this.acc.x *= 0.7;
  else this.acc.x = 0;
  this.boxhit = 0;
  this.box = null;
}

// draw the ball
Ball.prototype.show = function() {
  strokeWeight(0);
  fill(66, 134, 244)
  ellipse(this.pos.x, this.pos.y, this.d);
}

Ball.prototype.rest = function() {
  this.isRest = true;
}

// collision
Ball.prototype.hitsRightWall = function() {
  return this.pos.x + this.r > width;
}

Ball.prototype.hitsLefttWall = function() {
  return this.pos.x - this.r < 0;
}

Ball.prototype.hitsCeiling = function() {
  return this.pos.y - this.r < 0;
}

Ball.prototype.hitsFloor = function() {
  return this.pos.y + this.r >= height;
}

Ball.prototype.boxCollision = function(box) {
  if ((this.pos.x + this.r > box.x && this.pos.x - this.r < box.x + box.w)) {
    if (this.pos.y + this.r > box.y && this.pos.y + this.r < box.y + 20) {
      this.box = box;
      this.boxhit = 1;
    } else if (this.pos.y - this.r < box.y + box.h && this.pos.y - this.r > box.y + box.h - 15) {
      this.box = box;
      this.boxhit = 2;
    } else if (this.pos.y + this.r > box.y + 5 && this.pos.y - this.r < box.y + box.h - 5) {
      if (this.pos.x + this.r > box.x - 10 && this.pos.x + this.r < box.x + 15) {
        this.box = box;
        this.boxhit = 3;
      } else if (this.pos.x - this.r < box.x + box.w + 10 && this.pos.x - this.r > box.x + box.w - 15) {
        this.box = box;
        this.boxhit = 4;
      }
    }
  }
}
