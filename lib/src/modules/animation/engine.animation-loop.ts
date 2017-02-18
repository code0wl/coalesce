import { ShapeCollection } from '../shapes/engine.shape-collection';

export class AnimationLoop {

    private context: CanvasRenderingContext2D;
    private width: number;
    private height: number;

    public constructor(context, width, height) {
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

    private updateUIEcho() {
        if (ShapeCollection.collection.length) {
            document.querySelector('.uiEchoString').innerHTML =
                `<p><b>Selected Object:</b></p> 
            <ul style="margin:-10px"> 
            <li>Id: ${ShapeCollection.selectedObject} </li>
            <li>Center: ${ShapeCollection.collection[ShapeCollection.selectedObject].center.x.toPrecision(3)},
            ${ShapeCollection.collection[ShapeCollection.selectedObject].center.y.toPrecision(3)}</li>
            </ul> <hr><p><b>Control</b>: of selected object</p>
            <ul style="margin:-10px">
            <li><b>Num</b> or <b>Up/Down Arrow</b>:SelectObject</li>
            </ul> <hr>
            <b>F/G</b>: Spawn [Rectangle/Circle] at random location <hr>`
        }
    }

    private draw() {
        this.context.clearRect(0, 0, this.width, this.height);
        ShapeCollection.collection.map((item, index) => {
            this.context.strokeStyle = 'blue';
            if (index === ShapeCollection.selectedObject) {
                this.context.strokeStyle = 'red';
            }
            ShapeCollection.collection[index].render(this.context);
        });
    }

    private animationLoop() {
        requestAnimationFrame(() => this.animationLoop());
        this.updateUIEcho();
        this.draw();
    }

}