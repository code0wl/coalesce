import { Draw } from './modules/drawing/engine.draw';
import { Subscription } from 'rxjs';
import { InputKeyboard, InputMouse } from './modules/input/input.peripheral';
import { Canvas } from './modules/canvas/engine.canvas';
import { Collision } from './modules/collision/engine.collision';
import { PhysicsEngineOptions } from './models/engine-model/engine.model';

export class PhysicsEngine {

    private keyboard: InputKeyboard;
    private mouse: InputMouse;
    private draw: Draw;
    private collision: Collision;

    constructor(options: PhysicsEngineOptions) {
        this.bootstrapEngine(options);
    }

    private enableCollision(option) {
        if (option) {
            this.collision = new Collision();
        }
    }

    private bootstrapEngine(options: PhysicsEngineOptions): void {
        this.enableCollision(options.collision);
        this.enableKeyboard(options.keyboard);
        this.enableMouse(options.mouse);
    }

    private enableKeyboard(isEnabled: boolean): void {
        if (isEnabled) {
            this.keyboard = new InputKeyboard();
            this.keyboard.keyboardInput$.subscribe(e => console.log(e));
        }
    }

    private enableMouse(isEnabled: boolean): void {
        if (isEnabled) {
            this.mouse = new InputMouse();
            this.mouse.mouseInput$.subscribe(e => console.log(e));
        }
    }

}
