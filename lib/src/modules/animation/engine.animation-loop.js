"use strict";
const engine_shape_collection_1 = require("../shapes/engine.shape-collection");
class AnimationLoop {
    constructor(context, width, height) {
        this.context = context;
        this.width = width;
        this.height = height;
        this.animationLoop();
        const ui = document.createElement('div');
        ui.classList.add('uiEchoString');
        ui.style.zIndex = '1';
        ui.style.position = 'absolute';
        ui.style.top = `0px`;
        ui.style.left = `0px`;
        document.body.appendChild(ui);
    }
    updateUIEcho() {
        if (engine_shape_collection_1.ShapeCollection.collection.length) {
            document.querySelector('.uiEchoString').innerHTML =
                `<p><b>Selected Object:</b></p> 
            <ul style="margin:-10px"> 
            <li>Id: ${engine_shape_collection_1.ShapeCollection.selectedObject} </li>
            <li>Center: ${engine_shape_collection_1.ShapeCollection.collection[engine_shape_collection_1.ShapeCollection.selectedObject].center.x.toPrecision(3)},
            ${engine_shape_collection_1.ShapeCollection.collection[engine_shape_collection_1.ShapeCollection.selectedObject].center.y.toPrecision(3)}</li>
            </ul> <hr><p><b>Control</b>: of selected object</p>
            <ul style="margin:-10px">
            <li><b>Num</b> or <b>Up/Down Arrow</b>:SelectObject</li>
            </ul> <hr>
            <b>F/G</b>: Spawn [Rectangle/Circle] at random location <hr>`;
        }
    }
    draw() {
        this.context.clearRect(0, 0, this.width, this.height);
        engine_shape_collection_1.ShapeCollection.collection.map((item, index) => {
            this.context.strokeStyle = 'blue';
            if (index === engine_shape_collection_1.ShapeCollection.selectedObject) {
                this.context.strokeStyle = 'red';
            }
            engine_shape_collection_1.ShapeCollection.collection[index].render(this.context);
        });
    }
    animationLoop() {
        requestAnimationFrame(() => this.animationLoop());
        this.updateUIEcho();
        this.draw();
    }
}
exports.AnimationLoop = AnimationLoop;
//# sourceMappingURL=engine.animation-loop.js.map