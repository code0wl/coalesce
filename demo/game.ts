import { PhysicsEngine } from '2d-physics-engine/src/engine.core';

const engineConfiguration = {
    collision: true,
    keyboard: true,
    mouse: true,
    accelerometer: true
};

class Game {
    private engine: PhysicsEngine;

    constructor() {
        this.engine = new PhysicsEngine(engineConfiguration);
    }
}

new Game();