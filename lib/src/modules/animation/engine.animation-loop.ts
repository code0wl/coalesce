import { ShapeCollection } from '../shapes/engine.shape-collection';
import { Logger } from '../logger/engine.logger';

export class AnimationLoop {

    private context: CanvasRenderingContext2D;
    private width: number;
    private logger: boolean;
    private loggable: Logger;
    private height: number;

    public constructor(context, width, height, logger) {
        this.context = context;
        this.width = width;
        this.logger = logger;
        this.height = height;
        this.createLogger();
        this.animationLoop();
    }

    private createLogger() {
        if (this.logger) {
            this.loggable = new Logger();
        }
    }

    private updateLogger(): void {
        if (this.logger) {
            this.loggable.logStats();
        }
    }

    private draw() {
        this.context.clearRect(0, 0, this.width, this.height);
        ShapeCollection.collection.map((item, index) => {
            this.context.strokeStyle = 'blue';
            if (index === ShapeCollection.selectedObject) {
                this.context.strokeStyle = 'red';
            }
            ShapeCollection.collection[index].render(this.context);
        });
    }

    private animationLoop() {
        requestAnimationFrame(() => this.animationLoop());
        this.updateLogger();
        this.draw();
    }

}