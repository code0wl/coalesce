import { ShapeCollection } from './../shapes/engine.shape-collection';

export abstract class RigidShape {
    public shapeCollection = ShapeCollection;
    constructor(public center: any, public angle: number) {
        this.shapeCollection.push(this);
    }
}
