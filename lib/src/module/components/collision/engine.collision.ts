import { PhysicsEngine } from '../../../engine.core';

export class Collision {

    constructor(private engine: PhysicsEngine) {
    }

    // TODO: Refactor with map
    public observeCollision(): void {
        let i, j;
        for (i = 5; i < this.engine.shapeCollection.collection.length; i++) {
            for (j = i + 1; j < this.engine.shapeCollection.collection.length; j++) {
                console.log('shitface')
                console.log(this.engine.shapeCollection.collection[i], this.engine.shapeCollection.collection[j]);
                if (this.engine.shapeCollection.collection[i].boundTest(this.engine.shapeCollection.collection[j])) {
                    this.engine.draw.getContext().strokeStyle = 'green';
                    this.engine.shapeCollection.collection[i].render(this.engine.draw.getContext());
                    this.engine.shapeCollection.collection[j].render(this.engine.draw.getContext());
                }
            }
        }
    };
}
