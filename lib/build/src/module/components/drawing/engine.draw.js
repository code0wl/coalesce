"use strict";
const engine_animation_loop_1 = require("./../animation/engine.animation-loop");
const engine_vector_1 = require("./../vector/engine.vector");
const engine_shape_circle_1 = require("./../rigid/engine.shape.circle");
const engine_shape_rectangle_1 = require("./../rigid/engine.shape.rectangle");
const engine_canvas_1 = require("./../canvas/engine.canvas");
const engine_shape_collection_1 = require("../shapes/engine.shape-collection");
class Draw extends engine_canvas_1.Canvas {
    constructor(width, height, logger) {
        super(width, height);
        this.logger = logger;
        this.startEngine();
        console.info(`drawing engine enabled with dimension: ${width}px X ${height}px`);
    }
    startEngine() {
        this.animationLoop = new engine_animation_loop_1.AnimationLoop(super.context, super.canvas.width, super.canvas.height, this.logger);
    }
    // createShape and move drawing responsibility to draw method
    drawRectangle() {
        new engine_shape_rectangle_1.Rectangle(new engine_vector_1.Vector(Math.random() * super.canvas.width * 0.8, Math.random() * super.canvas.height * 0.8), Math.random() * 30 + 10, Math.random() * 30 + 10);
    }
    update() {
        engine_shape_collection_1.ShapeCollection.collection.map((item) => {
            item.update(super.context);
        });
    }
    // createShape and move drawing responsibility to draw method
    drawCircle() {
        new engine_shape_circle_1.Circle(new engine_vector_1.Vector(Math.random() * super.canvas.width * 0.8, Math.random() * super.canvas.height * 0.8), Math.random() * 10 + 20);
    }
}
exports.Draw = Draw;
//# sourceMappingURL=engine.draw.js.map