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
    private shapeCollection: ShapeCollection;
    private animationLoop: AnimationLoop;

    public constructor(width, height, logger, shapeCollection) {
        super(width, height);
        this.logger = logger;
        this.shapeCollection = shapeCollection;
        this.startEngine();
        console.info(`drawing engine enabled with dimension: ${width}px X ${height}px`);
    }

    public startEngine() {
        this.animationLoop = new AnimationLoop(super.getContext(), super.getCanvas().width, super.getCanvas().height, this.logger, this.shapeCollection);
    }

    // createShape and move drawing responsibility to draw method
    public drawRectangle(): void {
        new Rectangle(new Vector(
                Math.random() * super.getCanvas().width * 0.8,
                Math.random() * super.getCanvas().height * 0.8),
            Math.random() * 30 + 10,
            Math.random() * 30 + 10, this.shapeCollection);
    }

    public update() {
        this.shapeCollection.collection.map((item) => {
            item.update(super.getContext());
        });
    }

    // createShape and move drawing responsibility to draw method
    public drawCircle() {
        new Circle(
            new Vector(
                Math.random() * super.getCanvas().width * 0.8,
                Math.random() * super.getCanvas().height * 0.8),
            Math.random() * 10 + 20, this.shapeCollection);
    }
}
