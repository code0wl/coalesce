import { Vector } from './../vector/engine.vector';
import { RigidShape } from './engine.rigid';

export class Circle extends RigidShape {

    private rigidShapeType: string;
    private radius: number;
    private startPoint: Circle;

    constructor(center, radius) {
        super(center, null);
        this.rigidShapeType = 'Circle';
        this.radius = radius;
        this.startPoint = new Circle(super.center.x, super.center.y - radius);
        this.generateDummyObjects();
    }

    // test compass direction
    private generateDummyObjects() {

    }

    public render(context: CanvasRenderingContext2D) {
        context.beginPath();
        //draw a circle
        context.arc(this.center.x, this.center.y,
            this.radius, 0, Math.PI * 2, true);
        //draw a line from start point toward center
        context.moveTo(this.startPoint.center.x, this.startPoint.center.y);
        context.lineTo(this.center.x, this.center.y);
        context.closePath();
        context.stroke();
    }

}