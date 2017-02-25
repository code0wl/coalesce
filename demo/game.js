"use strict";
const _2d_physics_engine_1 = require('2d-physics-engine');
const controls_model_1 = require('./models/input-model/controls.model');
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
            if (keyCode - controls_model_1.Controls.one < this.engine.shapeCollection.collection.length) {
                this.engine.shapeCollection.selectedObject = keyCode - controls_model_1.Controls.one;
            }
        }
        switch (keyCode) {
            case controls_model_1.Controls.down:
                this.incrementObject();
                break;
            case controls_model_1.Controls.up:
                this.decrementObject();
                break;
            case controls_model_1.Controls.arrowUp:
                this.engine.shapeCollection.collection[this.engine.shapeCollection.selectedObject].move(this.engine.vector.createVectorShape(0, -10));
                break;
            case controls_model_1.Controls.arrowDown:
                this.engine.shapeCollection.collection[this.engine.shapeCollection.selectedObject].move(this.engine.vector.createVectorShape(0, +10));
                break;
            case controls_model_1.Controls.right:
                this.engine.shapeCollection.collection[this.engine.shapeCollection.selectedObject].rotate(-0.1);
                break;
            case controls_model_1.Controls.left:
                this.engine.shapeCollection.collection[this.engine.shapeCollection.selectedObject].rotate(0.1);
                break;
            case controls_model_1.Controls.rectangle:
                this.engine.draw.drawRectangle();
                break;
            case controls_model_1.Controls.gravity:
                if (this.engine.shapeCollection.collection[this.engine.shapeCollection.selectedObject].fix === 0) {
                    this.engine.shapeCollection.collection[this.engine.shapeCollection.selectedObject].fix = 1;
                }
                else {
                    this.engine.shapeCollection.collection[this.engine.shapeCollection.selectedObject].fix = 0;
                }
                break;
            case controls_model_1.Controls.circle:
                this.engine.draw.drawCircle();
                break;
        }
    }
    decrementObject() {
        if (this.engine.shapeCollection.selectedObject > 0) {
            this.engine.shapeCollection.selectedObject--;
        }
    }
    incrementObject() {
        if (this.engine.shapeCollection.selectedObject < this.engine.shapeCollection.collection.length - 1) {
            this.engine.shapeCollection.selectedObject++;
        }
    }
}
new Game();
//# sourceMappingURL=game.js.map