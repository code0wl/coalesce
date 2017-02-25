import { Accelerometer } from './module/components/accelerometer/engine.accelerometer';
import { Draw } from './module/components/drawing/engine.draw';
import { InputKeyboard, InputMouse } from './module/components/input/input.peripheral';
import { Collision } from './module/components/collision/engine.collision';
import { PhysicsEngineOptions } from './models/engine-model/engine.model';
import { ShapeCollection } from './module/components/shapes/engine.shape-collection';
const json = require('../package.json');

export default class PhysicsEngine {
    private keyboard: InputKeyboard;
    private mouse: InputMouse;
    public draw: Draw;
    private version: string = json.version;
    public collision: Collision;
    public accelerometer: Accelerometer;

    public constructor(options: PhysicsEngineOptions) {
        console.log(`Engine started, running version ${this.version}`);
        this.bootstrapEngine(options);
        this.draw = new Draw(options.width, options.height, options.log);
        ShapeCollection.canvas.height = options.height;
        ShapeCollection.canvas.width = options.width;
    }

    public handleInput(keyCode): void {
        // TODO: abstract
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
