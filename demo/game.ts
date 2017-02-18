import { PhysicsEngine } from '2d-physics-engine';

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
        console.log('initiliased bruh');
        this.engine = new PhysicsEngine(engineConfiguration);
        this.width = engineConfiguration.width;
        this.height = engineConfiguration.height;
        this.engine.handleInput((keyCode) => {
            console.log(keyCode, 'simple handler');
        });
        console.log('handle', this.engine);
    }
}

new Game();