import { Canvas } from './modules/canvas/engine.canvas.module';
import { Collision } from './modules/collision/engine.collision.module';
import { PhysicsEngineOptions } from './engine-model/engine.model';

export class PhysicsEngine extends Canvas {

    private isCollisionEnabled: boolean;

    constructor(options: PhysicsEngineOptions) {
        super(window.innerWidth, window.innerHeight);
        this.collision = options.collision;
    }

    public getContext() {
        return super.getContext();
    }

    public getCanvas() {
        return super.getCanvas();
    }

    private set collision(option) {
        this.isCollisionEnabled = option;
        if (option) {
            new Collision();
        }
    }

}