import { AnimationLoop } from './../animation/engine.animation-loop';
import { Vector } from './../vector/engine.vector';
import { Circle } from './../rigid/engine.shape.circle';
import { Rectangle } from './../rigid/engine.shape.rectangle';
import { Canvas } from './../canvas/engine.canvas';

export class Draw extends Canvas {

    private animationLoop: AnimationLoop;

    public constructor() {
        super(window.innerWidth, window.innerHeight);
        console.info('drawing engine enabled');
        this.startEngine();
    }

    private startEngine() {
        this.animationLoop = new AnimationLoop(super.context, super.canvas.width, super.canvas.height);
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

    // createShape and move drawing responsibility to draw method
    public drawCircle() {
        new Circle(new Vector(
                Math.random() * super.canvas.width * 0.8,
                Math.random() * super.canvas.height * 0.8),
            Math.random() * 10 + 20);
    }
}
