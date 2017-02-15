import { Draw } from './modules/drawing/engine.draw';
import { Subscription } from 'rxjs';
import { InputMouse } from './modules/input/input.mouse';
import { InputKeyboard } from './modules/input/input.keyboard';
import { Canvas } from './modules/canvas/engine.canvas';
import { Collision } from './modules/collision/engine.collision';
import { PhysicsEngineOptions } from './models/engine-model/engine.model';

export class PhysicsEngine extends Canvas {

    private keyboard: InputKeyboard;
    private draw: Draw;

    constructor(options: PhysicsEngineOptions) {
        super(window.innerWidth, window.innerHeight);
        this.bootstrapEngine(options);
    }

    public getContext() {
        return super.getContext();
    }

    public getCanvas(): HTMLCanvasElement {
        return super.getCanvas();
    }

    private enableCollision(option) {
        if (option) {
            new Collision();
        }
    }

    private bootstrapEngine(options: PhysicsEngineOptions): void {
        this.enableCollision(options.collision);
        this.enableKeyboard(options.keyboard);
        this.enableMouse(options.mouse);
    }

    private enableKeyboard(isEnabled: boolean): void {
        if (isEnabled) {
            this.keyboard = new InputKeyboard(this.getCanvas());
            this.keyboard.keyboardInput$.subscribe(e => console.log(e));
        }
    }

    private enableMouse(isEnabled: boolean): void {
        if (isEnabled) {
            new InputMouse();
        }
    }

}