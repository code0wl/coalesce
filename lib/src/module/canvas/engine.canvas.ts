export class Canvas {
  public canvasElement: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;
  public width: number;
  public height: number;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.generateCanvas();
  }

  public getCanvas(): HTMLCanvasElement {
    return this.canvasElement;
  }

  public getContext(): CanvasRenderingContext2D {
    return this.context;
  }

  private generateCanvas() {
    this.canvasElement = document.createElement('canvas');
    this.context = this.canvasElement.getContext('2d');
    this.canvasElement.width = this.width;
    this.canvasElement.height = this.height;
    this.canvasElement.classList.add('physics-canvas');
    document.body.appendChild(this.canvasElement);
  }
}
