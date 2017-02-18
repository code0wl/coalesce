import { Vector } from '../vector/engine.vector';
import { RigidShape } from './engine.rigid';

export class Circle extends RigidShape {

    private rigidShapeType: string;
    private radius: number;
    private startPoint: Vector;

    constructor(center, radius) {
        super(center, radius);
        this.rigidShapeType = 'Circle';
        this.radius = radius;
        this.startPoint = new Vector(this.center.x, this.center.y - radius);
    }

    public render(context) {
        context.beginPath();
        context.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2, true);
        context.moveTo(this.center.x, this.center.y);
        context.lineTo(this.center.x, this.center.y);
        context.closePath();
        context.stroke();
    }

}