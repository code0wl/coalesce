"use strict";
const _2d_physics_engine_1 = require('2d-physics-engine');
const _2d_physics_engine_2 = require('2d-physics-engine');
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
console.log(_2d_physics_engine_1.default);
class Game {
    constructor() {
        this.engine = new _2d_physics_engine_1.default(engineConfiguration);
        this.width = engineConfiguration.width;
        this.gameInput = this.gameInput.bind(this);
        this.height = engineConfiguration.height;
        this.engine.handleInput = this.gameInput;
    }
    gameInput(keyCode) {
        if (keyCode >= controls_model_1.Controls.one && keyCode <= controls_model_1.Controls.nine) {
            if (keyCode - controls_model_1.Controls.one < _2d_physics_engine_2.default.collection.length) {
                _2d_physics_engine_2.default.selectedObject = keyCode - controls_model_1.Controls.one;
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
                _2d_physics_engine_2.default.collection[_2d_physics_engine_2.default.selectedObject].rotate(-0.1);
                break;
            case controls_model_1.Controls.left:
                _2d_physics_engine_2.default.collection[_2d_physics_engine_2.default.selectedObject].rotate(0.1);
                break;
            case controls_model_1.Controls.rectangle:
                this.engine.draw.drawRectangle();
                break;
            case controls_model_1.Controls.gravity:
                if (_2d_physics_engine_2.default.collection[_2d_physics_engine_2.default.selectedObject].fix === 0) {
                    _2d_physics_engine_2.default.collection[_2d_physics_engine_2.default.selectedObject].fix = 1;
                }
                else {
                    _2d_physics_engine_2.default.collection[_2d_physics_engine_2.default.selectedObject].fix = 0;
                }
                break;
            case controls_model_1.Controls.circle:
                this.engine.draw.drawCircle();
                break;
        }
    }
    decrementObject() {
        if (_2d_physics_engine_2.default.selectedObject > 0) {
            _2d_physics_engine_2.default.selectedObject--;
        }
    }
    incrementObject() {
        if (_2d_physics_engine_2.default.selectedObject < _2d_physics_engine_2.default.collection.length - 1) {
            _2d_physics_engine_2.default.selectedObject++;
        }
    }
}
new Game();
//# sourceMappingURL=game.js.map