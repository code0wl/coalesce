import { RigidShape } from '../rigid/engine.rigid';

export class ShapeCollection {
  public collection: Array<RigidShape> = [];
  public selectedObject: any;
  public canvas: HTMLCanvasElement;
}
