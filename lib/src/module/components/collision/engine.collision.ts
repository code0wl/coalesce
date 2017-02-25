import { ShapeCollection } from '../shapes/engine.shape-collection';
import { RigidShape } from '../rigid/engine.rigid';
export class Collision {

    constructor(private shapeCollection: ShapeCollection, private context: CanvasRenderingContext2D) {
        console.info('collision enabled');
        this.observeCollision();
    }

    public observeCollision() {
        var i, j;
        for (i = 5; i < this.shapeCollection.collection.length; i++) {
            for (j = i + 1; j < this.shapeCollection.collection.length; j++) {
                if (this.shapeCollection.collection[i].boundTest(this.shapeCollection.collection[j])) {
                    this.context.strokeStyle = 'green';
                    this.shapeCollection.collection[i].render(this.context);
                    this.shapeCollection.collection[j].render(this.context);
                }
            }
        }
    };
}
