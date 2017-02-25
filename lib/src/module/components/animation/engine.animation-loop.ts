import { ShapeCollection } from '../shapes/engine.shape-collection';
import { Logger } from '../logger/engine.logger';

export class AnimationLoop {

    public width: number;
    public height: number;
    private context: CanvasRenderingContext2D;
    private shapeCollection: ShapeCollection;
    private logger: boolean;
    private loggable: Logger;

    public constructor(context, width, height, logger, shapeCollection) {
        this.context = context;
        this.width = width;
        this.shapeCollection = shapeCollection;
        this.logger = logger;
        this.height = height;
        this.createLogger();
        this.animationLoop();
    }

    private createLogger() {
        if (this.logger) {
            this.loggable = new Logger(this.shapeCollection);
        }
    }

    private updateLogger(): void {
        if (this.logger) {
            this.loggable.logStats();
        }
    }

    private draw() {
        this.context.clearRect(0, 0, this.width, this.height);
        this.shapeCollection.collection.map((item, index) => {
            this.context.strokeStyle = 'blue';
            if (index === this.shapeCollection.selectedObject) {
                this.context.strokeStyle = 'red';
            }
            this.shapeCollection.collection[index].render(this.context);
        });
    }

    private animationLoop() {
        requestAnimationFrame(() => this.animationLoop());
        this.updateLogger();
        this.draw();
    }

}