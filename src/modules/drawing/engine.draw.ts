export class Draw {

    constructor() {
        
    }

    public drawRectangle() {
        console.log('should draw rectangle');
    }

    public drawCircle() {
        console.log('should draw circle');
    }

    private randomPosition() {
        console.log('should return random position');
    }

    // if (keycode === 70) { //f
    //           //create new Rectangle at random position
    //           context.strokeRect(Math.random() * width * 0.8,
    //           // x position of center
    //           Math.random() * height * 0.8,
    //           // y position of center
    //           Math.random() * 30 + 10, Math.random() * 30 + 10);
    //           // width and height location
    //       }
    //       if (keycode === 71) { //g
    //           //create new Circle at random position
    //           context.beginPath();
    //           //draw a circle
    //           context.arc(Math.random() * width * 0.8,
    //           // x position of center
    //           Math.random() * height * 0.8,
    //           // y position of center
    //           Math.random() * 30 + 10, 0, Math.PI * 2, true);
    // radius
    // context.closePath();
    // context.stroke();
    // }

}
