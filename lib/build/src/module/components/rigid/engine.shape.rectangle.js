"use strict";
const engine_rigid_1 = require("./engine.rigid");
class Rectangle extends engine_rigid_1.RigidShape {
    constructor(center, width, height, fix) {
        super(center, width);
        this.rigidShapeType = 'Rectangle';
        this.height = height;
        this.center = center;
        this.fix = fix;
        this.width = width;
        this.vertexes = [];
        this.compass = [];
    }
    rotate(angle) {
        this.angle += angle;
        this.vertexes.map((vertex, i) => {
            vertex[i] = vertex.rotate(this.center, angle);
        });
        this.compass[0] = this.vertexes[1].subtract(this.vertexes[2]);
        this.compass[0] = this.compass[0].normalize();
        this.compass[1] = this.vertexes[2].subtract(this.
            vertexes[3]);
        this.compass[1] = this.compass[1].normalize();
        this.compass[2] = this.vertexes[3].subtract(this.
            vertexes[0]);
        this.compass[2] = this.compass[2].normalize();
        this.compass[3] = this.vertexes[0].subtract(this.
            vertexes[1]);
        this.compass[3] = this.compass[3].normalize();
        return this;
    }
    ;
    render(context) {
        context.save();
        context.translate(this.center.x, this.center.y);
        context.rotate(this.angle);
        context.strokeRect(0, 0, this.width, this.height);
        context.restore();
    }
    move(v) {
        this.vertexes.map((vertex, i) => {
            vertex[i] = vertex.addition(v);
        });
        this.center = this.center.addition(v);
        return this;
    }
    ;
}
exports.Rectangle = Rectangle;
//# sourceMappingURL=engine.shape.rectangle.js.map