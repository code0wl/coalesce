import { Observable, Subscription } from 'rxjs';
import { Canvas } from './../canvas/engine.canvas';

export class InputKeyboard {

    private canvas: HTMLCanvasElement;
    public keyboardInput$: Observable<number>;

    constructor(canvasElement) {
        this.canvas = canvasElement;
        
        this.keyboardInput$ = Observable
            .fromEvent(window, 'keydown')
            .map((e: KeyboardEvent) => e.keyCode)
    }

}
