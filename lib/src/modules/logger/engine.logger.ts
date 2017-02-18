import { ShapeCollection } from '../shapes/engine.shape-collection';

declare const console: any;

export class Logger {

    constructor() {
        console.info('logging performance');
        const ui = document.createElement('div');
        ui.classList.add('uiEchoString');
        ui.style.zIndex = '1';
        ui.style.position = 'absolute';
        ui.style.top = `0px`;
        ui.style.left = `0px`;
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
            </ul> 
            <hr>
            <p><b>Control</b>: of selected object</p>
            <ul>
            <li>
                <b>Num</b> or  
                <b>Up/Down Arrow</b>:SelectObject</li>
            </ul> 
            <hr>
            <b>F/G</b>: Spawn [Rectangle/Circle] at random location <hr>`;
        }

    }

}