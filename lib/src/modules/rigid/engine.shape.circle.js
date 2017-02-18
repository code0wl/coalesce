"use strict";
const engine_vector_1 = require("./../vector/engine.vector");
const engine_rigid_1 = require("./engine.rigid");
class Circle extends engine_rigid_1.RigidShape {
    constructor(center, radius) {
        super(center, radius);
        this.rigidShapeType = 'Circle';
        this.radius = radius;
        this.startPoint = new engine_vector_1.Vector(this.center.x, this.center.y - radius);
    }
    render(context) {
        context.beginPath();
        context.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2, true);
        context.moveTo(this.center.x, this.center.y);
        context.lineTo(this.center.x, this.center.y);
        context.closePath();
        context.stroke();
    }
}
exports.Circle = Circle;
//# sourceMappingURL=engine.shape.circle.js.map