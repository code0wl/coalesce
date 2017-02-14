export class Canvas {

    private _canvas: HTMLCanvasElement;
    public _context: CanvasRenderingContext2D;
    public width: number;
    public height: number;

    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.generateCanvas();
    }

    public getCanvas(): HTMLCanvasElement {
        return this._canvas;
    }

    public getContext(): CanvasRenderingContext2D {
        return this._context;
    }

    public generateCanvas() {
        this._canvas = document.createElement('canvas');
        this._context = this._canvas.getContext('2d');
        this._canvas.width = this.width;
        this._canvas.height = this.height;
        this._canvas.classList.add('physics-canvas');
        document.body.appendChild(this._canvas);
    }
}