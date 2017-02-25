import { Vector } from './engine.vector';

export class VectorFactory {
    public createVectorShape(x, y): Vector {
        return new Vector(x, y);
    }
}