import PhysicsEngine from '2d-physics-engine';
import ShapeCollection  from '2d-physics-engine';

import { Controls } from './models/input-model/controls.model';

const engineConfiguration = {
    collision: true,
    keyboard: true,
    mouse: true,
    accelerometer: true,
    width: window.innerWidth,
    height: window.innerHeight,
    log: true
};

console.log(PhysicsEngine)

class Game {
    private engine: PhysicsEngine;
    public height: number;
    public width: number;

    constructor() {
        this.engine = new PhysicsEngine(engineConfiguration);
        this.width = engineConfiguration.width;
        this.gameInput = this.gameInput.bind(this);
        this.height = engineConfiguration.height;
        this.engine.handleInput = this.gameInput;
    }

    public gameInput(keyCode) {
        if (keyCode >= Controls.one && keyCode <= Controls.nine) {
            if (keyCode - Controls.one < ShapeCollection.collection.length) {
                ShapeCollection.selectedObject = keyCode - Controls.one;
            }
        }

        switch (keyCode) {
            case Controls.down:
                this.incrementObject();
                break;

            case Controls.up:
                this.decrementObject();
                break;

            case Controls.right:
                ShapeCollection.collection[ShapeCollection.selectedObject].rotate(-0.1);
                break;

            case Controls.left:
                ShapeCollection.collection[ShapeCollection.selectedObject].rotate(0.1);
                break;

            case Controls.rectangle:
                this.engine.draw.drawRectangle();
                break;

            case Controls.gravity:
                if (ShapeCollection.collection[ShapeCollection.selectedObject].fix === 0) {
                    ShapeCollection.collection[ShapeCollection.selectedObject].fix = 1;
                } else {
                    ShapeCollection.collection[ShapeCollection.selectedObject].fix = 0;
                }
                break;

            case Controls.circle:
                this.engine.draw.drawCircle();
                break;
        }
    }

    private decrementObject() {
        if (ShapeCollection.selectedObject > 0) {
            ShapeCollection.selectedObject--;
        }
    }

    private incrementObject() {
        if (ShapeCollection.selectedObject < ShapeCollection.collection.length - 1) {
            ShapeCollection.selectedObject++;
        }
    }

}

new Game();