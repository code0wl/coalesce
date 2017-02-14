export class Canvas {

    public canvas: HTMLCanvasElement;
    private width: number;
    private height: number;

    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.generateCanvas();
    }

    private generateCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.classList.add('physics-canvas');
        document.body.appendChild(this.canvas);
    }
}