import { RigidShape } from '../rigid/engine.rigid';
import { Circle } from '../../models/shape-model/circle.model';
import { Rectangle } from '../../models/shape-model/rectangle.model';

export class ShapeCollection {
    public static collection: Array<RigidShape> = [];
    public static selectedObject: number = 0;
}

