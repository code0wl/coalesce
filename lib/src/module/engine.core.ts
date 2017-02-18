import { Accelerometer } from './components/accelerometer/engine.accelerometer';
import { Draw } from './components/drawing/engine.draw';
import { InputKeyboard, InputMouse } from './components/input/input.peripheral';
import { Collision } from './components/collision/engine.collision';
import { PhysicsEngineOptions } from '../models/engine-model/engine.model';

export class PhysicsEngine {
    private keyboard: InputKeyboard;
    private mouse: InputMouse;
    public draw: Draw;
    public collision: Collision;
    public accelerometer: Accelerometer;

    public constructor(options: PhysicsEngineOptions) {
        this.bootstrapEngine(options);
        this.draw = new Draw(options.width, options.height, options.log);
    }

    public handleInput(keyCode): void {
    };

    private enableCollision(isEnabled) {
        if (isEnabled) {
            this.collision = new Collision();
        }
    }

    private bootstrapEngine(options: PhysicsEngineOptions): void {
        this.enableCollision(options.collision);
        this.enableKeyboard(options.keyboard);
        this.enableMouse(options.mouse);
        this.enableAccelerometer(options.accelerometer);
    }

    private enableKeyboard(isEnabled: boolean): void {
        if (isEnabled) {
            this.keyboard = new InputKeyboard();
            this.keyboard.keyboardInput$
                .map((keyCode) => this.handleInput(keyCode))
                .subscribe();
        }
    }

    private enableAccelerometer(isEnabled: boolean): void {
        if (isEnabled) {
            this.accelerometer = new Accelerometer();
        }
    }

    private enableMouse(isEnabled: boolean): void {
        if (isEnabled) {
            this.mouse = new InputMouse();
            this.mouse.mouseInput$.subscribe();
        }
    }

}
