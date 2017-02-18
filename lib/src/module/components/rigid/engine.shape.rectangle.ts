import { RigidShape } from './engine.rigid';

export class Rectangle extends RigidShape {

    private rigidShapeType: string;
    private height: number;
    private width: number;
    private vertexes: Array<any>;

    constructor(center, width, height) {
        super(center, width);
        this.rigidShapeType = 'Rectangle';
        this.height = height;
        this.center = center;
        this.width = width;
        this.vertexes = [];
    }

    public render(context: CanvasRenderingContext2D) {
        context.save();
        context.translate(this.vertexes[0].x, this.vertexes[0].y);
        context.rotate(this.angle);
        context.strokeRect(0, 0, this.width, this.height);
        context.restore();
    }

}