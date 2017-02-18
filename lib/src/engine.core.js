"use strict";
const engine_accelerometer_1 = require("./modules/accelerometer/engine.accelerometer");
const engine_draw_1 = require("./modules/drawing/engine.draw");
const input_peripheral_1 = require("./modules/input/input.peripheral");
const engine_collision_1 = require("./modules/collision/engine.collision");
const controls_model_1 = require("./models/input-model/controls.model");
const engine_shape_collection_1 = require("./modules/shapes/engine.shape-collection");
class PhysicsEngine {
    constructor(options) {
        this.bootstrapEngine(options);
        this.width = options.width;
        this.height = options.height;
        this.initializeDrawingModule();
    }
    initializeDrawingModule() {
        this.draw = new engine_draw_1.Draw(this.width, this.height);
    }
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
    // move to domain specific implementation
    handleInput(keyCode) {
        // ew
        if (keyCode >= controls_model_1.Controls.one && keyCode <= controls_model_1.Controls.nine) {
            if (keyCode - controls_model_1.Controls.one < engine_shape_collection_1.ShapeCollection.collection.length) {
                engine_shape_collection_1.ShapeCollection.selectedObject = keyCode - controls_model_1.Controls.one;
            }
        }
        switch (keyCode) {
            case controls_model_1.Controls.down:
                this.incrementObject();
                break;
            case controls_model_1.Controls.up:
                this.decrementObject();
                break;
            case controls_model_1.Controls.right:
                console.log('right');
                break;
            case controls_model_1.Controls.left:
                console.log('left');
                break;
            case controls_model_1.Controls.rectangle:
                this.draw.drawRectangle();
                break;
            case controls_model_1.Controls.circle:
                this.draw.drawCircle();
                break;
        }
    }
    decrementObject() {
        if (engine_shape_collection_1.ShapeCollection.selectedObject > 0) {
            engine_shape_collection_1.ShapeCollection.selectedObject--;
        }
    }
    incrementObject() {
        if (engine_shape_collection_1.ShapeCollection.selectedObject < engine_shape_collection_1.ShapeCollection.collection.length - 1) {
            engine_shape_collection_1.ShapeCollection.selectedObject++;
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