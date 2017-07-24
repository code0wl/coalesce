import {PhysicsEngine} from "../../../engine.core";
import {Logger} from "../logger/engine.logger";
import {RigidShape} from "../rigid/engine.rigid";

export class AnimationLoop {

	public width: number;
	public height: number;

	private context: CanvasRenderingContext2D;
	public engine: PhysicsEngine;
	private log: boolean;
	private loggable: Logger;

	private currentTime: number;
	private elapsedTime: number;
	private previousTime: number = Date.now();
	private lagTime: number = 0;
	private fps: number = 60;
	private frameTime: number = 1 / this.fps;
	private mUpdateIntervalInSeconds: number = this.frameTime;
	private kMPF = 1000 * this.frameTime;

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
		if (this.log) {
			this.loggable = new Logger(this);
		}
	}

	public calculateCollision(): void {
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
			this.context.strokeStyle = "blue";
			if (index === this.engine.shapeCollection.selectedObject) {
				this.context.strokeStyle = "red";
			}
			this.engine.shapeCollection.collection[index].render(this.context);
		});
	}

	private animationCost() {
		this.currentTime = Date.now();
		this.elapsedTime = this.currentTime - this.previousTime;
		this.previousTime = this.currentTime;
		this.lagTime += this.elapsedTime;

		while (this.lagTime >= this.kMPF) {
			this.lagTime -= this.kMPF;
			this.calculateCollision();
		}
	}

	private animationLoop() {
		requestAnimationFrame(() => this.animationLoop());
		this.updateLogger();
		this.animationCost();
		this.draw();
	}

}