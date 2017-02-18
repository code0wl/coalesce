"use strict";
const engine_shape_collection_1 = require("../shapes/engine.shape-collection");
const engine_vector_1 = require("../vector/engine.vector");
class RigidShape {
    constructor(center, angle) {
        this.center = center;
        this.angle = angle;
        engine_shape_collection_1.ShapeCollection.collection.push(this);
    }
    move(v) {
        // override
    }
    render(context) {
        // override;
    }
    update(context) {
        if (this.center.y < engine_shape_collection_1.ShapeCollection.canvas.height && this.fix !== 0) {
            this.move(new engine_vector_1.Vector(0, 1));
        }
    }
}
exports.RigidShape = RigidShape;
//# sourceMappingURL=engine.rigid.js.map