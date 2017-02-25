import { Accelerometer } from './module/components/accelerometer/engine.accelerometer';
import { Draw } from './module/components/drawing/engine.draw';
import { InputKeyboard, InputMouse } from './module/components/input/input.peripheral';
import { Collision } from './module/components/collision/engine.collision';
import { PhysicsEngineOptions } from './models/engine-model/engine.model';
import { ShapeCollection } from './module/components/shapes/engine.shape-collection';
import { VectorFactory } from './module/components/vector/vector.factory';

/**
 * @class AsyncSubject<T>
 */
export declare class PhysicsEngine<T> {
    private keyboard: InputKeyboard;
    private mouse: InputMouse;
    public draw: Draw;
    private vector: VectorFactory;
    private version: string;
    public collision: Collision;
    public shapeCollection: ShapeCollection;
    public accelerometer: Accelerometer;

    public handleInput(keyCode): void;
    private enableCollision(isEnabled): void;
    private bootstrapEngine(options: PhysicsEngineOptions): void;
    private enableKeyboard(isEnabled: boolean): void;
    private enableAccelerometer(isEnabled: boolean): void;
    private enableMouse(isEnabled: boolean): void;
}
