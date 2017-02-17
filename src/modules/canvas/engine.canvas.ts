export class Canvas {

    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;
    private width: number;
    private height: number;

    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.generateCanvas();
    }

    public get canvas(): HTMLCanvasElement {
        return this._canvas;
    }

    public get context(): CanvasRenderingContext2D {
        return this._context;
    }

    private generateCanvas() {
        this._canvas = document.createElement('canvas');
        this._context = this._canvas.getContext('2d');
        this._canvas.width = this.width;
        this._canvas.height = this.height;
        this._canvas.classList.add('physics-canvas');
        document.body.appendChild(this._canvas);
    }
}