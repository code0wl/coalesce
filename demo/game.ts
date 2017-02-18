import { PhysicsEngine } from '2d-physics-engine/src/engine.core';

const engineConfiguration = {
    collision: true,
    keyboard: true,
    mouse: true,
    accelerometer: true,
    width: window.innerWidth,
    height: window.innerHeight
};

class Game {
    private engine: PhysicsEngine;
    public height: number;
    public width: number;

    constructor() {
        this.engine = new PhysicsEngine(engineConfiguration);
        this.width = engineConfiguration.width;
        this.height = engineConfiguration.height;
        this.initialiseControls();
    }

    initialiseControls(): void {
        // const up = new Rectangle(new Vec2(width / 2, 0), width, 3);
        // const down = new Rectangle(new Vec2(width / 2, height), width, 3);
        // const left = new Rectangle(new Vec2(0, height / 2), 3, height);
        // const right = new Rectangle(new Vec2(width, height / 2), 3, height);
    }
}

new Game();