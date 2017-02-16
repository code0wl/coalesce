import { Vector } from './../vector/engine.vector';
import { Circle } from './../rigid/engine.shape.circle';
import { Rectangle } from './../rigid/engine.shape.rectangle';
import { Canvas } from './../canvas/engine.canvas';

export class Draw extends Canvas {

    private _shapeCollection: Array<any> = [];
    private rectangle: Rectangle;
    private circle: Circle;

    public constructor() {
        super(window.innerWidth, window.innerHeight);
    }

    // createShape and move drawing responsibility to draw method
    public drawRectangle(): void {
        const rectangleOne = new Rectangle(new Vector(
            Math.random() * super.canvas.width * 0.8,
            Math.random() * super.canvas.height * 0.8),
            Math.random() * 30 + 10,
            Math.random() * 30 + 10);
    }

    // TODO: Implement drawing class
    private drawShape(shapeType: string) {
        // should accept any shape and draw it on the canvas;
    }

    // createShape and move drawing responsibility to draw method
    public drawCircle() {
        const r1 = new Circle(new Vector(
            Math.random() * super.canvas.width * 0.8,
            Math.random() * super.canvas.height * 0.8),
            Math.random() * 10 + 20);
    }

    private generateRandomPosition(canvasDimension: number, randomnessThreshold: number): number {
        return Math.random() * canvasDimension * randomnessThreshold;
    }

}
