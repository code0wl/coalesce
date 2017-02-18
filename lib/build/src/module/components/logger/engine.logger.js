"use strict";
const engine_shape_collection_1 = require("../shapes/engine.shape-collection");
class Logger {
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
    logStats() {
        // move ugly pseudo code to logger
        if (engine_shape_collection_1.ShapeCollection.collection.length) {
            document.querySelector('.uiEchoString').innerHTML = `
            <p><b>Selected Object:</b></p> 
            <ul> 
            <li>Id: ${engine_shape_collection_1.ShapeCollection.selectedObject} </li>
            <li>
                Center: ${engine_shape_collection_1.ShapeCollection.collection[engine_shape_collection_1.ShapeCollection.selectedObject].center.x.toPrecision(3)},
                ${engine_shape_collection_1.ShapeCollection.collection[engine_shape_collection_1.ShapeCollection.selectedObject].center.y.toPrecision(3)}
            </li>
            <li>Angle:  ${engine_shape_collection_1.ShapeCollection.collection[engine_shape_collection_1.ShapeCollection.selectedObject].angle.toPrecision(3)} </li>
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
    fpsMeter() {
        let currentTime, elapsedTime, previousTime = Date.now(), lagTime = 0;
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
exports.Logger = Logger;
//# sourceMappingURL=engine.logger.js.map