import { Vector } from './../vector/engine.vector';
import { RigidShape } from './engine.rigid';

export class Rectangle extends RigidShape {

    private rigidShapeType: string;
    private height: number;
    private width: number;
    private vertexes: Array<any>;
    private compass: Array<any>;

    constructor(center, width, height) {
        super(center, width);
        this.rigidShapeType = 'Rectangle';
        this.height = height;
        this.center = center;
        this.width = width;
        this.vertexes = [];
        this.compass = [];

        this.generateDummyObjects();
    }

    // test compass direction
    private generateDummyObjects() {
        const vectorOne = new Vector(this.center.x - this.width / 2, this.center.y - this.height / 2); // TopLeft 
        const vectorTwo = new Vector(this.center.x + this.width / 2, this.center.y - this.height / 2); // TopRight
        const vectorThree = new Vector(this.center.x + this.width / 2, this.center.y + this.height / 2); // BottomRight
        const vectorFour = new Vector(this.center.x - this.width / 2, this.center.y + this.height / 2); // BottomLeft
        this.vertexes.push(vectorOne, vectorTwo, vectorThree, vectorFour);
    }

    public render(context: CanvasRenderingContext2D) {
        context.save();
        context.translate(this.vertexes[0].x, this.vertexes[0].y);
        context.rotate(this.angle);
        context.strokeRect(0, 0, this.width, this.height);
        context.restore();
    }

}