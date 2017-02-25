import { Vector } from '../vector/engine.vector';
import { RigidShape } from './engine.rigid';

export class Circle extends RigidShape {

    private rigidShapeType: string;
    private radius: number;
    public fix: number;
    private startPoint: Vector;

    public constructor(center, radius, shapeCollection, fix?) {
        super(center, radius, shapeCollection);
        this.rigidShapeType = 'Circle';
        this.radius = radius;
        this.fix = fix;
        this.startPoint = new Vector(this.center.x, this.center.y - radius);
    }

    public render(context): void {
        context.beginPath();
        context.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2, true);
        context.moveTo(this.center.x, this.center.y);
        context.lineTo(this.center.x, this.center.y);
        context.closePath();
        context.stroke();
    }

    public rotate(angle: number): void {
        this.angle += angle;
        this.startPoint = this.startPoint.rotate(angle, this.center);
    };

    public move(vector: Vector): Circle {
        this.startPoint = this.startPoint.add(vector);
        this.center = this.center.add(vector);
        return this;
    };
}
