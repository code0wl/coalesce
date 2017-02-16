import { ShapeCollection } from './../shapes/engine.shape-collection';

export class RigidShape {

    public shapeCollection = ShapeCollection;

    constructor(public center: any, public angle: any) {
        this.shapeCollection.push(this);
        console.log(this.shapeCollection);
    }

}
