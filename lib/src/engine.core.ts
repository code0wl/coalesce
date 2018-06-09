import {PhysicsEngineOptions} from './models/engine/engine';
import {Accelerometer} from './module/accelerometer/engine.accelerometer';
import {Collision} from './module/collision/engine.collision';
import {Draw} from './module/drawing/engine.draw';
import {InputKeyboard, InputMouse} from './module/input/input.peripheral';
import {ShapeCollection} from './module/shapes/engine.shape-collection';
import {VectorFactory} from './module/vector/vector.factory';

const json = require('../../package.json');

declare const require: any;

export class PhysicsEngine {
    public draw: Draw;
    public shapeCollection: ShapeCollection;
    public vector: VectorFactory;
    public collision: Collision;
    public accelerometer: Accelerometer;
    private version: string = json.version;
    private keyboard: InputKeyboard;
    private mouse: InputMouse;

    public constructor(options: PhysicsEngineOptions) {
        console.log(`Engine started, running version ${this.version}`);
        this.shapeCollection = new ShapeCollection();
        this.shapeCollection.canvas.height = options.height;
        this.shapeCollection.canvas.width = options.width;
        this.vector = new VectorFactory();
        this.collision = new Collision(this, options.log);
        this.draw = new Draw(options.width, options.height, options.log, this);
        this.bootstrapEngine(options);
    }

    public handleInput(keyCode): void {
        // TODO: abstract
    };

    private bootstrapEngine(options: PhysicsEngineOptions): void {
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
