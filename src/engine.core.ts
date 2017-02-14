import { Canvas } from './modules/canvas/engine.canvas.module';
import { Collision } from './modules/collision/engine.collision.module';
import { PhysicsEngineOptions } from './engine-model/engine.model';

export class PhysicsEngine {

    private isCollisionEnabled: boolean;

    constructor(options: PhysicsEngineOptions) {
        this.collision = options.collision;
        const canvas = new Canvas(window.innerWidth, window.innerHeight);
    }

    private set collision(option) {
        this.isCollisionEnabled = option;
        if (option) {
            new Collision();
        }
    }

}