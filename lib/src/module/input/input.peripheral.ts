import {Observable} from "rxjs";
import {Controls} from "../../models/input/controls";

export class InputKeyboard {
	public keyboardInput$: Observable<number>;

	constructor() {
		this.keyboardInput$ = Observable
			.fromEvent(document.body, "keydown")
			.map((e: KeyboardEvent) => e.keyCode)
			.filter((key: number) => Object.keys(Controls).includes(key.toString()))
	}
}

export class InputMouse {
	public mouseInput$: Observable<Object>;

	constructor() {
		this.mouseInput$ = Observable
			.fromEvent(document.body, "mousemove")
			.map((e: MouseEvent) => e);
	}
}