import { PhysicsEngine } from '../../../engine.core';
declare const console: any;

export class Logger {

    private lagTime: number = 0;
    private engine: PhysicsEngine;
    private color: string;

    constructor(engine) {
        this.engine= engine;
        console.info('logging performance');
        const ui = document.createElement('div');
        ui.classList.add('render-info');
        ui.style.zIndex = '1';
        ui.style.position = 'absolute';
        ui.style.top = '0';
        ui.style.right = '0';
        document.body.appendChild(ui);
    }

    public logStats(): void {
        if (this.engine.shapeCollection.collection.length) {
            document.querySelector('.render-info').innerHTML = `
            <p><b>Selected Object:</b></p>
            <p style="color: ${this.color}">Missed rendering frames meter: ${this.lagTime}</p>
            <ul> 
                <li>Id: ${this.engine.shapeCollection.selectedObject} </li>
                <li>
                    Center: ${this.engine.shapeCollection.collection[this.engine.shapeCollection.selectedObject].center.x.toPrecision(3)},
                    ${this.engine.shapeCollection.collection[this.engine.shapeCollection.selectedObject].center.y.toPrecision(3)}
                </li>
                <li>Angle:  ${this.engine.shapeCollection.collection[this.engine.shapeCollection.selectedObject].angle.toPrecision(3)} </li>
            </ul> 
            <hr>
            <p>
                <b>Control</b>: of selected object
            </p>
            <ul>
            <li>
                <b>Arrow keys</b> 
                <b>QE</b>: Position [Move + Rotate]
            </li>
            <li>
                <b>key W/ key S</b>:SelectObject</li>
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
            previousTime = Date.now();

        const kFPS = 60;
        const kFrameTime = 1 / kFPS;
        const kMPF = 1000 * kFrameTime;

        currentTime = Date.now();
        elapsedTime = currentTime - previousTime;

        this.lagTime += elapsedTime;

        while (this.lagTime >= kMPF) {
            this.lagTime -= kMPF;
        }
        this.color = this.lagTime > 10 ? 'red' : 'green';
    }

}