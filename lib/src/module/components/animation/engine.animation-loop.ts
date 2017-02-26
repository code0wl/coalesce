import { Logger } from '../logger/engine.logger';
import { PhysicsEngine } from '../../../engine.core';
import { RigidShape } from '../rigid/engine.rigid';

export class AnimationLoop {

    public width: number;
    public height: number;
    private context: CanvasRenderingContext2D;
    private engine: PhysicsEngine;
    private log: boolean;
    private loggable: Logger;

    public constructor(context, width, height, log, engine) {
        this.context = context;
        this.log = log;
        this.width = width;
        this.engine = engine;
        this.height = height;
        this.createLogger();
        this.animationLoop();
    }

    private createLogger() {
        console.log('creating logger with', this.engine);
        if (this.log) {
            this.loggable = new Logger(this.engine);
        }
    }

    private calculateCollision(): void {
        this.engine.collision.observeCollision();
    }

    private updateLogger(): void {
        if (this.log) {
            this.loggable.logStats();
        }
    }

    private draw() {
        this.context.clearRect(0, 0, this.width, this.height);
        this.engine.shapeCollection.collection.map((item: RigidShape, index: number): void => {
            this.context.strokeStyle = 'blue';
            if (index === this.engine.shapeCollection.selectedObject) {
                this.context.strokeStyle = 'red';
            }
            this.engine.shapeCollection.collection[index].render(this.context);
        });
    }

    private animationLoop() {
        requestAnimationFrame(() => this.animationLoop());
        this.updateLogger();
        this.calculateCollision();
        this.draw();
    }

}