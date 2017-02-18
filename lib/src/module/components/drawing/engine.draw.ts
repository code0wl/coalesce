import { AnimationLoop } from './../animation/engine.animation-loop';
import { Vector } from './../vector/engine.vector';
import { Circle } from './../rigid/engine.shape.circle';
import { Rectangle } from './../rigid/engine.shape.rectangle';
import { Canvas } from './../canvas/engine.canvas';
import { ShapeCollection } from '../shapes/engine.shape-collection';

declare const console: any;
declare const Math: any;

export class Draw extends Canvas {

    private logger: boolean;
    private animationLoop: AnimationLoop;

    public constructor(width, height, logger) {
        super(width, height);
        this.logger = logger;
        this.startEngine();
        console.info(`drawing engine enabled with dimension: ${width}px X ${height}px`);
    }

    private startEngine() {
        this.animationLoop = new AnimationLoop(super.context, super.canvas.width, super.canvas.height, this.logger);
        console.info('Animation lifecycle activated');
    }

    // createShape and move drawing responsibility to draw method
    public drawRectangle(): void {
        new Rectangle(new Vector(
                Math.random() * super.canvas.width * 0.8,
                Math.random() * super.canvas.height * 0.8),
            Math.random() * 30 + 10,
            Math.random() * 30 + 10);
    }

    public update() {
        ShapeCollection.collection.map((item) => {
            item.update(super.context);
        });
    }

    // createShape and move drawing responsibility to draw method
    public drawCircle() {
        new Circle(
            new Vector(
                Math.random() * super.canvas.width * 0.8,
                Math.random() * super.canvas.height * 0.8),
            Math.random() * 10 + 20);
    }
}
