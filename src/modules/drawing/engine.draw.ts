import { Circle } from './../rigid/engine.shape.circle';
import { Rectangle } from './../rigid/engine.shape.rectangle';
import { Canvas } from './../canvas/engine.canvas';

export class Draw extends Canvas {

    private _shapeCollection: Array<any> = [];
    private rectangle: Rectangle;
    private circle: Circle;

    public constructor() {
        super(window.innerWidth, window.innerHeight);
        // this.rectangle = new Rectangle(1, 2, 3);
        // this.circle = new Circle(1, 2);
    }

    // createShape and move drawing responsibility to draw method
    public drawRectangle(): void {
        const rectangle = super.context.strokeRect(
            this.generateRandomPosition(super.canvasWidth, 0.8),
            this.generateRandomPosition(super.canvasHeight, 0.8),
            this.generateRandomPosition(2, 40),
            this.generateRandomPosition(4, 40)
        );
        // move all rendering / drawing to draw class
        // this.rectangle.render(super.context);
    }

    // TODO: Implement drawing class
    private drawShape(shapeType: string) {
        // should accept any shape and draw it on the canvas;
    }

    // createShape and move drawing responsibility to draw method
    public drawCircle() {
        super.context.beginPath();
        const circle = super.context.arc(
            this.generateRandomPosition(super.canvasWidth, 0.8),
            this.generateRandomPosition(super.canvasHeight, 0.8),
            this.generateRandomPosition(2, 40),
            0, Math.PI * 2, true
        );
        super.context.closePath();
        super.context.stroke();
        // this.circle.render(super.context);
    }

    private generateRandomPosition(canvasDimension: number, randomnessThreshold: number): number {
        return Math.random() * canvasDimension * randomnessThreshold;
    }

}
