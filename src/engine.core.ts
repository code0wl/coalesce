import { InputMouse } from './modules/input/input.mouse';
import { InputKeyboard } from './modules/input/input.keyboard';
import { Canvas } from './modules/canvas/engine.canvas';
import { Collision } from './modules/collision/engine.collision';
import { PhysicsEngineOptions } from './models/engine-model/engine.model';

export class PhysicsEngine extends Canvas {
    
    constructor(options: PhysicsEngineOptions) {
        super(window.innerWidth, window.innerHeight);
        this.collision = options.collision;
        this.keyboard = options.keyboard;
        this.mouse = options.mouse;
    }

    public getContext() {
        return super.getContext();
    }

    public getCanvas() {
        return super.getCanvas();
    }

    private set collision(option) {
        if (option) {
            new Collision();
        }
    }

    private set keyboard(option) {
        if (option) {
            new InputKeyboard();
        }
    }

    private set mouse(option) {
        if (option) {
            new InputMouse();
        }
    }

}