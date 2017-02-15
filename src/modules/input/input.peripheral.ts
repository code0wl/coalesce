import { Observable, Subscription } from 'rxjs';
import { Canvas } from './../canvas/engine.canvas';
import { Controls } from './controls.model';

export class InputKeyboard {
    public keyboardInput$: Observable<number>;
    constructor() {
        this.keyboardInput$ = Observable
            .fromEvent(window, 'keydown')
            .map((e: KeyboardEvent) => e.keyCode)
            .filter((key: number) => Object.keys(Controls).includes(key.toString()))
    }
}

export class InputMouse {
    public mouseInput$: Observable<Object>;
    constructor() {
        this.mouseInput$ = Observable
            .fromEvent(window, 'keydown')
            .map((e: KeyboardEvent) => e);
    }
}
