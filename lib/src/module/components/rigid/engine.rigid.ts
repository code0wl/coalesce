import { ShapeCollection } from '../shapes/engine.shape-collection';
import { Vector } from '../vector/engine.vector';

export class RigidShape {
    public fix: any;

    constructor(public center: any, public angle: any) {
        ShapeCollection.collection.push(this);
    }

    public move(v: Vector) {
        // override
    }

    public render(context: CanvasRenderingContext2D) {
        // override;
    }

    public update(context: CanvasRenderingContext2D) {
        if (this.center.y < ShapeCollection.canvas.height && this.fix !== 0) {
            this.move(new Vector(0, 1));
        }
    }
}
