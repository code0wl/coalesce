import { RigidShape } from '../rigid/engine.rigid';

export class ShapeCollection {
    public collection: Array<RigidShape> = [];
    public selectedObject: number = 0;
    public canvas: any = {};
}
