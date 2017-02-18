"use strict";
class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    lengthCalculation() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    addition(vector) {
        return new Vector(vector.x + this.x, vector.y + this.y);
    }
    subtraction(vector) {
        return new Vector(vector.x - this.x, vector.y - this.y);
    }
    scale(nth) {
        return new Vector(this.x * nth, this.y * nth);
    }
    dot(vector) {
        return (this.x * vector.x + this.y * vector.y);
    }
    cross(vector) {
        return (this.x * vector.y - this.y * vector.x);
    }
    rotate(center, angle) {
        const r = [];
        const x = this.x - center.x;
        const y = this.y - center.y;
        r[0] = x * Math.cos(angle) - y * Math.sin(angle);
        r[1] = x * Math.sin(angle) + y * Math.cos(angle);
        r[0] += center.x;
        r[1] += center.y;
        return new Vector(r[0], r[1]);
    }
    normalize() {
        const calc = this.lengthCalculation();
        const len = calc > 0 ? 1 / calc : calc;
        return new Vector(this.x * len, this.y * len);
    }
    distance(vector) {
        const x = this.x - vector.x;
        const y = this.y - vector.y;
        return Math.sqrt(x * x + y * y);
    }
    ;
}
exports.Vector = Vector;
//# sourceMappingURL=engine.vector.js.map