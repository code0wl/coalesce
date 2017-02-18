"use strict";
const engine_vector_1 = require("./../vector/engine.vector");
const engine_rigid_1 = require("./engine.rigid");
class Rectangle extends engine_rigid_1.RigidShape {
    constructor(center, width, height) {
        super(center, width);
        this.rigidShapeType = 'Rectangle';
        this.height = height;
        this.center = center;
        this.width = width;
        this.vertexes = [];
        this.compass = [];
        this.generateDummyObjects();
    }
    generateDummyObjects() {
        const vectorOne = new engine_vector_1.Vector(this.center.x - this.width / 2, this.center.y - this.height / 2); // TopLeft 
        const vectorTwo = new engine_vector_1.Vector(this.center.x + this.width / 2, this.center.y - this.height / 2); // TopRight
        const vectorThree = new engine_vector_1.Vector(this.center.x + this.width / 2, this.center.y + this.height / 2); // BottomRight
        const vectorFour = new engine_vector_1.Vector(this.center.x - this.width / 2, this.center.y + this.height / 2); // BottomLeft
        this.vertexes.push(vectorOne, vectorTwo, vectorThree, vectorFour);
        // this.compass[0] = this.vertexes[1].subtract(this.vertexes[2]);
        // this.compass[0] = this.compass[0].normalize();
        // this.compass[1] = this.vertexes[2].subtract(this.vertexes[3]);
        // this.compass[1] = this.compass[1].normalize();
        // this.compass[2] = this.vertexes[3].subtract(this.vertexes[0]);
        // this.compass[2] = this.compass[2].normalize();
        // this.compass[3] = this.vertexes[0].subtract(this.vertexes[1]);
        // this.compass[3] = this.compass[3].normalize();
    }
    render(context) {
        context.save();
        context.translate(this.vertexes[0].x, this.vertexes[0].y);
        context.rotate(this.angle);
        context.strokeRect(0, 0, this.width, this.height);
        context.restore();
    }
}
exports.Rectangle = Rectangle;
//# sourceMappingURL=engine.shape.rectangle.js.map