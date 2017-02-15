import { Vector } from './modules/vector/engine.vector';
import { Draw } from './modules/drawing/engine.draw';
import { Subscription } from 'rxjs';
import { InputKeyboard, InputMouse } from './modules/input/input.peripheral';
import { Canvas } from './modules/canvas/engine.canvas';
import { Collision } from './modules/collision/engine.collision';
import { PhysicsEngineOptions } from './models/engine-model/engine.model';
import { Controls } from './models/input-model/controls.model';

export class PhysicsEngine {

    private keyboard: InputKeyboard;
    private mouse: InputMouse;
    private draw: Draw;
    private vector: Vector;
    private collision: Collision;

    constructor(options: PhysicsEngineOptions) {
        this.bootstrapEngine(options);
        this.draw = new Draw();
        this.vector = new Vector(1, 1);
    }

    private enableCollision(option) {
        if (option) {
            this.collision = new Collision();
        }
    }

    private bootstrapEngine(options: PhysicsEngineOptions): void {
        this.enableCollision(options.collision);
        this.enableKeyboard(options.keyboard);
        this.enableMouse(options.mouse);
    }

    private enableKeyboard(isEnabled: boolean): void {
        if (isEnabled) {
            this.keyboard = new InputKeyboard();
            this.keyboard.keyboardInput$
                .map((keyCode) => this.handleInput(keyCode))
                .subscribe();
        }
    }

    // move to domain specific implementation
    private handleInput(keyCode) {
        switch (keyCode) {
            case Controls.down:
                console.log('down')
                break;

            case Controls.up:
                console.log('up')
                break;

            case Controls.right:
                break;

            case Controls.left:
                break;

            case Controls.rectangle:
                this.draw.drawRectangle();
                break;

            case Controls.circle:
                this.draw.drawCircle();
                break;
        }
    }

    private enableMouse(isEnabled: boolean): void {
        if (isEnabled) {
            this.mouse = new InputMouse();
            this.mouse.mouseInput$.subscribe();
        }
    }

}
