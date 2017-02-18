"use strict";
const engine_shape_collection_1 = require("../shapes/engine.shape-collection");
class RigidShape {
    constructor(center, angle) {
        this.center = center;
        this.angle = angle;
        engine_shape_collection_1.ShapeCollection.collection.push(this);
        console.log(engine_shape_collection_1.ShapeCollection.collection);
    }
    render(context) {
        // Remove as it violates solid, needs polymorphism
    }
}
exports.RigidShape = RigidShape;
//# sourceMappingURL=engine.rigid.js.map