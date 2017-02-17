import { ShapeCollection } from '../shapes/engine.shape-collection';

export class RigidShape {
    constructor(public center: any, public angle: any) {
        ShapeCollection.collection.push(this);
        console.log(ShapeCollection.collection);
    }

}
