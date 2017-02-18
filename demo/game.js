"use strict";
const engine_core_1 = require("2d-physics-engine/build/src/module/engine.core");
const engine_shape_collection_1 = require("2d-physics-engine/build/src/module/components/shapes/engine.shape-collection");
const controls_model_1 = require("./models/input-model/controls.model");
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
        this.engine = new engine_core_1.PhysicsEngine(engineConfiguration);
        this.width = engineConfiguration.width;
        this.gameInput = this.gameInput.bind(this);
        this.height = engineConfiguration.height;
        this.engine.handleInput = this.gameInput;
    }
    gameInput(keyCode) {
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
                this.engine.draw.drawRectangle();
                break;
            case controls_model_1.Controls.circle:
                this.engine.draw.drawCircle();
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
}
new Game();
//# sourceMappingURL=game.js.map