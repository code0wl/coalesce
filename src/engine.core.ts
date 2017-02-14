import { PhysicsEngineOptions } from './engine-model/engine.model';
import { Collision } from './modules/collision/engine.module.collision';

export class PhysicsEngine {

    private collisionEnabled: boolean = false;

    constructor(options: PhysicsEngineOptions) {
        this.collision = options.collision;
    }

    public set collision(option) {
        this.collisionEnabled = option;
        if (option) {
            this.enableCollision();
        }
    }

    private enableCollision(): void {
        new Collision();
    }

}