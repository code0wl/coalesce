import { PhysicsEngineOptions } from './src/models/engine-model/engine.model';
import { PhysicsEngine } from './src/engine.core';

// move to demo project
const engineConfiguration: PhysicsEngineOptions = {
    collision: true,
    keyboard: true,
    mouse: true
}

new PhysicsEngine(engineConfiguration);
