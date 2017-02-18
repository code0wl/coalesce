import { RigidShape } from '../rigid/engine.rigid';

export class ShapeCollection {
    public static collection: Array<RigidShape> = [];
    public static selectedObject: number = 0;
    public static canvas: any = {};
}
