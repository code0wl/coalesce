import { Canvas } from './../canvas/engine.canvas';

export class Draw extends Canvas {

    public constructor() {
        super(window.innerWidth, window.innerHeight);
        
    }

    public drawRectangle() {
        console.log('should draw rectangle');
        super.context.strokeRect(Math.random() * super.canvasWidth * 0.8, 
        Math.random() * super.canvasHeight * 0.8, 
        Math.random() * 30 + 10, Math.random() * 30 + 10);
    }

    public drawCircle() {
        console.log('should draw circle');
        super.context.beginPath();
        super.context.arc(Math.random() * super.canvasWidth * 0.8,
        Math.random() * this.canvasHeight * 0.8,
        Math.random() * 30 + 10, 0, Math.PI * 2, true);

        super.context.closePath();
        super.context.stroke();
    }

    private generateRandomPosition(canvasDimension: number, randomnessThreshold: number) {
        console.log('should return random position');
    }

}
