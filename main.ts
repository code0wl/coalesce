import { PhysicsEngineOptions } from './src/engine-model/engine.model';
import { PhysicsEngine } from './src/app';

// move to demo project
const engineConfiguration: PhysicsEngineOptions = {
    collision: true
}

new PhysicsEngine(engineConfiguration);
