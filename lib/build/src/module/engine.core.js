"use strict";
const engine_accelerometer_1 = require("./components/accelerometer/engine.accelerometer");
const engine_draw_1 = require("./components/drawing/engine.draw");
const input_peripheral_1 = require("./components/input/input.peripheral");
const engine_collision_1 = require("./components/collision/engine.collision");
const engine_shape_collection_1 = require("./components/shapes/engine.shape-collection");
class PhysicsEngine {
    constructor(options) {
        this.bootstrapEngine(options);
        this.draw = new engine_draw_1.Draw(options.width, options.height, options.log);
        engine_shape_collection_1.ShapeCollection.canvas.height = options.height;
        engine_shape_collection_1.ShapeCollection.canvas.width = options.width;
    }
    handleInput(keyCode) {
        // TODO: abstract
    }
    ;
    enableCollision(isEnabled) {
        if (isEnabled) {
            this.collision = new engine_collision_1.Collision();
        }
    }
    bootstrapEngine(options) {
        this.enableCollision(options.collision);
        this.enableKeyboard(options.keyboard);
        this.enableMouse(options.mouse);
        this.enableAccelerometer(options.accelerometer);
    }
    enableKeyboard(isEnabled) {
        if (isEnabled) {
            this.keyboard = new input_peripheral_1.InputKeyboard();
            this.keyboard.keyboardInput$
                .map((keyCode) => this.handleInput(keyCode))
                .subscribe();
        }
    }
    enableAccelerometer(isEnabled) {
        if (isEnabled) {
            this.accelerometer = new engine_accelerometer_1.Accelerometer();
        }
    }
    enableMouse(isEnabled) {
        if (isEnabled) {
            this.mouse = new input_peripheral_1.InputMouse();
            this.mouse.mouseInput$.subscribe();
        }
    }
}
exports.PhysicsEngine = PhysicsEngine;
//# sourceMappingURL=engine.core.js.map