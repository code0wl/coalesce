import { Collision } from './modules/collision'

export class PhysicsEngine {

    private collisionEnabled: boolean = false;

    constructor(options) {
        this.enableCollision();
    }

    private enableCollision() {
        this.collisionEnabled = true;
    }

}