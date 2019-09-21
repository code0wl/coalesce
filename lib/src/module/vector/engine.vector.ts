export class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  add(vec) {
    return new Vector(vec.x + this.x, vec.y + this.y);
  }

  subtract(vec) {
    return new Vector(this.x - vec.x, this.y - vec.y);
  }

  scale(n) {
    return new Vector(this.x * n, this.y * n);
  }

  dot(vec) {
    return this.x * vec.x + this.y * vec.y;
  }

  cross(vec) {
    return this.x * vec.y - this.y * vec.x;
  }

  rotate(center, angle) {
    //rotate in counterclockwise
    var r = [];

    var x = this.x - center.x;
    var y = this.y - center.y;

    r[0] = x * Math.cos(angle) - y * Math.sin(angle);
    r[1] = x * Math.sin(angle) + y * Math.cos(angle);

    r[0] += center.x;
    r[1] += center.y;

    return new Vector(r[0], r[1]);
  }

  normalize() {
    var len = this.length();
    if (len > 0) {
      len = 1 / len;
    }
    return new Vector(this.x * len, this.y * len);
  }

  distance(vec) {
    var x = this.x - vec.x;
    var y = this.y - vec.y;
    return Math.sqrt(x * x + y * y);
  }
}
