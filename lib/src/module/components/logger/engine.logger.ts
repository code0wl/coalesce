import { ShapeCollection } from '../shapes/engine.shape-collection';

declare const console: any;

export class Logger {

    constructor() {
        console.info('logging performance');
        const ui = document.createElement('div');
        ui.classList.add('uiEchoString');
        ui.style.zIndex = '1';
        ui.style.position = 'absolute';
        ui.style.top = '0';
        ui.style.right = '0';
        document.body.appendChild(ui);
    }

    public logStats(): void {
        // move ugly pseudo code to logger
        if (ShapeCollection.collection.length) {
            document.querySelector('.uiEchoString').innerHTML = `
            <p><b>Selected Object:</b></p> 
            <ul> 
            <li>Id: ${ShapeCollection.selectedObject} </li>
            <li>
                Center: ${ShapeCollection.collection[ShapeCollection.selectedObject].center.x.toPrecision(3)},
                ${ShapeCollection.collection[ShapeCollection.selectedObject].center.y.toPrecision(3)}
            </li>
            <li>Angle:  ${ShapeCollection.collection[ShapeCollection.selectedObject].angle.toPrecision(3)} </li>
            </ul> 
            <hr>
            <p><b>Control</b>: of selected object</p>
            <ul>
            <li><b>Arrow keys</b> <b>QE</b>: Position [Move + Rotate]</li>
            <li>
                <b>Num</b> or  
                <b>Up/Down Arrow</b>:SelectObject</li>
            </ul>
            <p><b>H</b>: Fix object</p>
            <p><b>R</b>: Reset System</p>
            <hr>
            <b>F/G</b>: Spawn [Rectangle/Circle] at random location <hr>`;
            this.fpsMeter();
        }

    }

    private fpsMeter() {
        let currentTime,
            elapsedTime,
            previousTime = Date.now(),
            lagTime = 0;

        const kFPS = 60;
        const kFrameTime = 1 / kFPS;
        const mUpdateIntervalInSeconds = kFrameTime;
        const kMPF = 1000 * kFrameTime;

        currentTime = Date.now();
        elapsedTime = currentTime - previousTime;
        previousTime = currentTime;

        lagTime += elapsedTime;

        while (lagTime >= kMPF) {
            lagTime -= kMPF;
        }
    }

}