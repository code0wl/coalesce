import { Canvas } from './../canvas/engine.canvas';

export class Draw extends Canvas {

    public constructor() {
        super(window.innerWidth, window.innerHeight);

    }

    public drawRectangle() {
        super.context.strokeRect(
            this.generateRandomPosition(super.canvasWidth, 0.8),
            this.generateRandomPosition(super.canvasHeight, 0.8),
            this.generateRandomPosition(2, 40),
            this.generateRandomPosition(4, 40)
        );
    }

    public drawCircle() {
        super.context.beginPath();
        super.context.arc(
            this.generateRandomPosition(super.canvasWidth, 0.8),
            this.generateRandomPosition(super.canvasHeight, 0.8),
            this.generateRandomPosition(2, 40),
            0, Math.PI * 2, true);

        super.context.closePath();
        super.context.stroke();
    }

    private generateRandomPosition(canvasDimension: number, randomnessThreshold: number): number {
        return Math.random() * canvasDimension * randomnessThreshold;
    }

}
