import {Vector} from "../vector/engine.vector";
import {RigidShape} from "./engine.rigid";

export class Rectangle extends RigidShape {

	public radius: number;
	private rigidShapeType: string;
	private height: number;
	private width: number;
	private vertexes: Array<Vector>;
	private compass: Array<any>;

	constructor(center, width, height, shapeCollection) {
		super(center, width, shapeCollection);
		this.rigidShapeType = "Rectangle";
		this.height = height;
		this.center = center;
		this.width = width;
		this.radius = Math.sqrt(width * width + height * height) / 2;
		this.vertexes = [];
		this.compass = [];
		this.registerAngles();
	}

	private registerAngles(): void {
		this.vertexes[0] = new Vector(this.center.x - this.width / 2, this.center.y - this.height / 2);
		this.vertexes[1] = new Vector(this.center.x + this.width / 2, this.center.y - this.height / 2);
		this.vertexes[2] = new Vector(this.center.x + this.width / 2, this.center.y + this.height / 2);
		this.vertexes[3] = new Vector(this.center.x - this.width / 2, this.center.y + this.height / 2);
	}

	public rotate(angle: number): void {
		this.angle += angle;

		this.vertexes.map((vertex, i) => {
			vertex[i] = vertex.rotate(this.center, angle);
		});

		this.compass[0] = this.vertexes[1].subtract(this.vertexes[2]);
		this.compass[0] = this.compass[0].normalize();
		this.compass[1] = this.vertexes[2].subtract(this.vertexes[3]);
		this.compass[1] = this.compass[1].normalize();
		this.compass[2] = this.vertexes[3].subtract(this.vertexes[0]);
		this.compass[2] = this.compass[2].normalize();
		this.compass[3] = this.vertexes[0].subtract(this.vertexes[1]);
		this.compass[3] = this.compass[3].normalize();
	};

	public render(context: CanvasRenderingContext2D): void {
		context.save();
		context.translate(this.center.x, this.center.y);
		context.rotate(this.angle);
		context.strokeRect(0, 0, this.width, this.height);
		context.restore();
	}

	public move(vector: Vector): void {
		// this.vertexes.map((vertex, i) => {
		//     vertex[i] = vertex.add(vector);
		// });
		// this.center = this.center.add(vector);
	};
}
