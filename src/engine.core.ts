import { InputMouse } from './modules/input/input.mouse';
import { InputKeyboard } from './modules/input/input.keyboard';
import { Canvas } from './modules/canvas/engine.canvas';
import { Collision } from './modules/collision/engine.collision';
import { PhysicsEngineOptions } from './models/engine-model/engine.model';

export class PhysicsEngine extends Canvas {

    constructor(options: PhysicsEngineOptions) {
        super(window.innerWidth, window.innerHeight);
        this.enableCollision(options.collision);
        this.enableKeyboard(options.keyboard);
        this.enableMouse(options.mouse);
    }

    public getContext() {
        return super.getContext();
    }

    public getCanvas() {
        return super.getCanvas();
    }

    private enableCollision(option) {
        if (option) {
            new Collision();
        }
    }

    private enableKeyboard(option) {
        if (option) {
            new InputKeyboard();
        }
    }

    private enableMouse(option) {
        if (option) {
            new InputMouse();
        }
    }

}