"use strict";
const rxjs_1 = require("rxjs");
const controls_model_1 = require("../../models/input-model/controls.model");
class InputKeyboard {
    constructor() {
        this.keyboardInput$ = rxjs_1.Observable
            .fromEvent(document.body, 'keydown')
            .map((e) => e.keyCode)
            .filter((key) => Object.keys(controls_model_1.Controls).includes(key.toString()));
    }
}
exports.InputKeyboard = InputKeyboard;
class InputMouse {
    constructor() {
        this.mouseInput$ = rxjs_1.Observable
            .fromEvent(document.body, 'mousemove')
            .map((e) => e);
    }
}
exports.InputMouse = InputMouse;
// devices such as leapMotion
class inputGestures {
    constructor() {
        console.log('to be implemented');
    }
}
exports.inputGestures = inputGestures;
//# sourceMappingURL=input.peripheral.js.map