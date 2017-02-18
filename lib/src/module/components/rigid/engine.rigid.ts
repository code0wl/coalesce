import { ShapeCollection } from '../shapes/engine.shape-collection';
import { Vector } from '../vector/engine.vector';

export class RigidShape {

    private fix: number;
    private move: any;

    constructor(public center: any, public angle: any) {
        ShapeCollection.collection.push(this);
        console.log(ShapeCollection.collection);
    }

    public update() {
        if (this.center.y < ShapeCollection.canvas.height && this.fix !== 0)
            this.move(new Vector(0, 1));
    }
}
