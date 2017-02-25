"use strict";
const _2d_physics_engine_1 = require('2d-physics-engine');
const controls_model_1 = require('./models/input-model/controls.model');
console.log(_2d_physics_engine_1.PhysicsEngine);
const engineConfiguration = {
    collision: true,
    keyboard: true,
    mouse: true,
    accelerometer: true,
    width: window.innerWidth,
    height: window.innerHeight,
    log: true
};
class Game {
    constructor() {
        this.engine = new _2d_physics_engine_1.PhysicsEngine(engineConfiguration);
        this.width = engineConfiguration.width;
        this.gameInput = this.gameInput.bind(this);
        this.height = engineConfiguration.height;
        this.engine.handleInput = this.gameInput;
    }
    gameInput(keyCode) {
        if (keyCode >= controls_model_1.Controls.one && keyCode <= controls_model_1.Controls.nine) {
            if (keyCode - controls_model_1.Controls.one < ShapeCollection.collection.length) {
                ShapeCollection.selectedObject = keyCode - controls_model_1.Controls.one;
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
                ShapeCollection.collection[ShapeCollection.selectedObject].rotate(-0.1);
                break;
            case controls_model_1.Controls.left:
                ShapeCollection.collection[ShapeCollection.selectedObject].rotate(0.1);
                break;
            case controls_model_1.Controls.rectangle:
                this.engine.draw.drawRectangle();
                break;
            case controls_model_1.Controls.gravity:
                if (ShapeCollection.collection[ShapeCollection.selectedObject].fix === 0) {
                    ShapeCollection.collection[ShapeCollection.selectedObject].fix = 1;
                }
                else {
                    ShapeCollection.collection[ShapeCollection.selectedObject].fix = 0;
                }
                break;
            case controls_model_1.Controls.circle:
                this.engine.draw.drawCircle();
                break;
        }
    }
    decrementObject() {
        if (ShapeCollection.selectedObject > 0) {
            ShapeCollection.selectedObject--;
        }
    }
    incrementObject() {
        if (ShapeCollection.selectedObject < ShapeCollection.collection.length - 1) {
            ShapeCollection.selectedObject++;
        }
    }
}
new Game();
//# sourceMappingURL=game.js.map