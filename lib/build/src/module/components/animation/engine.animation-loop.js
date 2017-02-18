"use strict";
const engine_shape_collection_1 = require("../shapes/engine.shape-collection");
const engine_logger_1 = require("../logger/engine.logger");
class AnimationLoop {
    constructor(context, width, height, logger) {
        this.context = context;
        this.width = width;
        this.logger = logger;
        this.height = height;
        this.createLogger();
        this.animationLoop();
    }
    createLogger() {
        if (this.logger) {
            this.loggable = new engine_logger_1.Logger();
        }
    }
    updateLogger() {
        if (this.logger) {
            this.loggable.logStats();
        }
    }
    draw() {
        this.context.clearRect(0, 0, this.width, this.height);
        engine_shape_collection_1.ShapeCollection.collection.map((item, index) => {
            this.context.strokeStyle = 'blue';
            if (index === engine_shape_collection_1.ShapeCollection.selectedObject) {
                this.context.strokeStyle = 'red';
            }
            engine_shape_collection_1.ShapeCollection.collection[index].render(this.context);
        });
    }
    animationLoop() {
        requestAnimationFrame(() => this.animationLoop());
        this.updateLogger();
        this.draw();
    }
}
exports.AnimationLoop = AnimationLoop;
//# sourceMappingURL=engine.animation-loop.js.map