"use strict";
var engine_core_1 = require("2d-physics-engine/src/engine.core");
var engineConfiguration = {
    collision: true,
    keyboard: true,
    mouse: true,
    accelerometer: true,
    width: window.innerWidth,
    height: window.innerHeight
};
var Game = (function () {
    function Game() {
        this.engine = new engine_core_1.PhysicsEngine(engineConfiguration);
        // function MyGame() {
        //     var width = gEngine.Core.mWidth;
        //     var height = gEngine.Core.mHeight;
        //     var up = new Rectangle(new Vec2(width / 2, 0), width, 3);
        //     var down = new Rectangle(new Vec2(width / 2, height), width, 3);
        //     var left = new Rectangle(new Vec2(0, height / 2), 3, height);
        //     var right = new Rectangle(new Vec2(width, height / 2), 3, height);
        // }
    }
    return Game;
}());
new Game();
