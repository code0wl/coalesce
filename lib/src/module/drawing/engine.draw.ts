import { PhysicsEngine } from "../../engine.core";
import { AnimationLoop } from "../animation/engine.animation-loop";
import { Canvas } from "../canvas/engine.canvas";
import { Circle } from "../rigid/engine.shape.circle";
import { Rectangle } from "../rigid/engine.shape.rectangle";
import { Vector } from "../vector/engine.vector";

export class Draw extends Canvas {

	private logger: boolean;
	public engine: PhysicsEngine;
	public animationLoop: AnimationLoop;

	public constructor(width, height, logger, engine) {
		super(width, height);
		this.logger = logger;
		this.engine = engine;
		this.startEngine();
		console.log(`drawing engine enabled with dimension: ${width}px X ${height}px`);
	}

	public getContext(): CanvasRenderingContext2D {
		return super.getContext();
	}

	// TODO: shorten
	public startEngine() {

		this.animationLoop = new AnimationLoop(
			super.getContext(), super.getCanvas().width, super.getCanvas().height, this.logger,
			this.engine);

	}

	// createShape and move drawing responsibility to from draw method
	public drawRectangle(): void {
		new Rectangle(new Vector(
			Math.random() * super.getCanvas().width * 0.8,
			Math.random() * super.getCanvas().height * 0.8),
			Math.random() * 30 + 10,
			Math.random() * 30 + 10, this.engine.shapeCollection);
	}

	// create higher order to take any shape
	public drawCircle() {
		new Circle(
			new Vector(
				Math.random() * super.getCanvas().width * 0.8,
				Math.random() * super.getCanvas().height * 0.8),
			Math.random() * 10 + 20, this.engine.shapeCollection);
	}

	public update() {
		this.engine.shapeCollection.collection.map((item) => {
			item.update(super.getContext());
		});
	}
}
