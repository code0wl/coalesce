import * as PhysicsEngine from "2d-physics-engine-core";
import {Controls} from "./models/input-model/controls.model";

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
    private engine: PhysicsEngine;
    public height: number;
    public width: number;

    constructor() {
        this.engine = new PhysicsEngine(engineConfiguration);
        this.width = engineConfiguration.width;
        this.gameInput = this.gameInput.bind(this);
        this.height = engineConfiguration.height;
    }

    public gameInput(keyCode: number) {
        if (keyCode >= Controls.one && keyCode <= Controls.nine) {
            if (keyCode - Controls.one < this.engine.shapeCollection.collection.length) {
                this.engine.shapeCollection.selectedObject = keyCode - Controls.one;
            }
        }

        switch (keyCode) {
            case Controls.down:
                this.incrementObject();
                break;

            case Controls.up:
                this.decrementObject();
                break;

            case Controls.arrowUp:
                this.engine.shapeCollection.collection[this.engine.shapeCollection.selectedObject].move(this.engine.vector.createVectorShape(0, -10));
                break;

            case Controls.arrowDown:
                this.engine.shapeCollection.collection[this.engine.shapeCollection.selectedObject].move(this.engine.vector.createVectorShape(0, +10));
                break;

            case Controls.right:
                this.engine.shapeCollection.collection[this.engine.shapeCollection.selectedObject].rotate(-0.1);
                break;

            case Controls.left:
                this.engine.shapeCollection.collection[this.engine.shapeCollection.selectedObject].rotate(0.1);
                break;

            case Controls.rectangle:
                this.engine.draw.drawRectangle();
                break;

            case Controls.gravity:
                if (this.engine.shapeCollection.collection[this.engine.shapeCollection.selectedObject].fix === 0) {
                    this.engine.shapeCollection.collection[this.engine.shapeCollection.selectedObject].fix = 1;
                } else {
                    this.engine.shapeCollection.collection[this.engine.shapeCollection.selectedObject].fix = 0;
                }
                break;

            case Controls.circle:
                this.engine.draw.drawCircle();
                break;
        }
    }

    private decrementObject() {
        if (this.engine.shapeCollection.selectedObject > 0) {
            this.engine.shapeCollection.selectedObject--;
        }
    }

    private incrementObject() {
        if (this.engine.shapeCollection.selectedObject < this.engine.shapeCollection.collection.length - 1) {
            this.engine.shapeCollection.selectedObject++;
        }
    }

}

new Game();