import { Observable, Subscription } from 'rxjs';
import { Canvas } from './../canvas/engine.canvas';
import { Controls } from '../../models/input-model/controls.model';

export class InputKeyboard {
    public keyboardInput$: Observable<number>;
    constructor() {
        this.keyboardInput$ = Observable
            .fromEvent(document.body, 'keydown')
            .map((e: KeyboardEvent) => e.keyCode)
            .filter((key: number) => Object.keys(Controls).includes(key.toString()))
    }
}

export class InputMouse {
    public mouseInput$: Observable<Object>;
    constructor() {
        this.mouseInput$ = Observable
            .fromEvent(document.body, 'mousemove')
            .map((e: MouseEvent) => e);
    }
}

// devices such as leapMotion
export class inputGestures {
    public gestureInput$: Observable<Object>;
    constructor() {
        console.log('to be implemented');
    }
}
