import { ShapeCollection } from '../shapes/engine.shape-collection';
import { Vector } from '../vector/engine.vector';

export class RigidShape {

    public radius: number;

    constructor(public center: any, public angle: any, public shapeCollection: ShapeCollection) {
        this.shapeCollection = shapeCollection;
        this.shapeCollection.collection.push(this);
        this.radius = 0;
    }

    public move(v: Vector) {
        // override
    }

    public boundTest(shape) {
        const vectorDifference = shape.center.subtract(this.center);
        const angleSum = this.angle + shape.angle;
        const distance = vectorDifference.lengthCalculation();
        console.log(distance, angleSum);
        if (distance > angleSum) {
            console.log('not touching');
            return false;
        }
        console.log('touching');
        return true;
    };

    public render(context: CanvasRenderingContext2D) {
        // override;
    }

    public rotate(angle: number, center?: number) {
        // override;
    }

    public update(context: CanvasRenderingContext2D) {
        // if (this.center.y < this.shapeCollection.canvas.height && this.fix !== 0) {
        //     this.move(new Vector(0, 1));
        // }
    }
}
