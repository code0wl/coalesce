export class Canvas {

	private canvas: HTMLCanvasElement;
	private context: CanvasRenderingContext2D;
	private width: number;
	private height: number;

	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.generateCanvas();
	}

	public getCanvas(): HTMLCanvasElement {
		return this.canvas;
	}

	public getContext(): CanvasRenderingContext2D {
		return this.context;
	}

	private generateCanvas() {
		this.canvas = document.createElement("canvas");
		this.context = this.canvas.getContext("2d");
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.canvas.classList.add("physics-canvas");
		document.body.appendChild(this.canvas);
	}
}