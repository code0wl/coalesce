"use strict";
class Canvas {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.generateCanvas();
    }
    get canvas() {
        return this._canvas;
    }
    get context() {
        return this._context;
    }
    generateCanvas() {
        this._canvas = document.createElement('canvas');
        this._context = this._canvas.getContext('2d');
        this._canvas.width = this.width;
        this._canvas.height = this.height;
        this._canvas.classList.add('physics-canvas');
        document.body.appendChild(this._canvas);
    }
}
exports.Canvas = Canvas;
//# sourceMappingURL=engine.canvas.js.map