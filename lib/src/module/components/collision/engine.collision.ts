import { PhysicsEngine } from '../../../engine.core';
import { Vector } from '../vector/engine.vector';

export class Collision {

    private depth: number;
    private radius: Vector;
    private start: Vector;
    private end: Vector;

    constructor(private engine: PhysicsEngine, log: boolean) {
        if (log) {
            this.detectionLog();
        }
    }

    // TODO: Refactor with map
    public observeCollision(): void {
        let i, j;

        for (i = 5; i < this.engine.shapeCollection.collection.length; i++) {
            for (j = i + 1; j < this.engine.shapeCollection.collection.length; j++) {
                console.log(this.engine.shapeCollection.collection[i], this.engine.shapeCollection.collection[j]);
                if (this.engine.shapeCollection.collection[i].boundTest(this.engine.shapeCollection.collection[j])) {
                    this.engine.draw.getContext().strokeStyle = 'green';
                    this.engine.shapeCollection.collection[i].render(this.engine.draw.getContext());
                    this.engine.shapeCollection.collection[j].render(this.engine.draw.getContext());
                }
            }
        }
    }

    public collide(otherShape, collisionInfo) {
        var status = false;
        if (otherShape.mType === "Circle") {
            status = this.collidedCircCirc(this, otherShape, collisionInfo);
        } else {
            status = false;
        }
        return status;
    };

    private collidedCircCirc(c1, c2, collisionInfo) {
        const vFrom1to2 = c2.mCenter.subtract(c1.mCenter);
        const rSum = c1.mRadius + c2.mRadius;
        const dist = vFrom1to2.length();
        if (dist > Math.sqrt(rSum * rSum)) {
            return false; //not overlapping
        }
    };

    private detectionLog() {
        this.depth = 0;
        this.radius = new Vector(0, 0);
        this.start = new Vector(0, 0);
        this.end = new Vector(0, 0);
    }

    private setRadius(s) {
        this.radius = s;
    };

    private getDepth() {
        return this.depth;
    };

    private getRadius() {
        return this.radius;
    };

    private setInfo = function (d, n, s) {
        this.depth = d;
        this.radius = n;
        this.start = s;
        this.end = s.add(n.scale(d));
    };

    private changeDir = function () {
        this.radius = this.radius.scale(-1);
        const n = this.start;
        this.start = this.end;
        this.end = n;
    };


}
