import {AnimationLoop} from "../animation/engine.animation-loop";
import {generateMarkup} from "./logger-markup";

declare const console: any;

export class Logger {

	private color: string;
	private lagTime: number;
	private animation: AnimationLoop;

	constructor(animationClass) {
		console.log("logging performance");
		this.animation = animationClass;
		this.lagTime = animationClass.lagTime;
		this.generateUI();
	}

	public logStats(): void {
		this.color = this.lagTime > 10 ? "red" : "green";
		console.log(this.color, "test");
		if (this.animation.engine.shapeCollection.collection.length) {
			document.querySelector(".render-info").innerHTML = generateMarkup(this);
		}
	}

	private generateUI(): void {
		const ui = document.createElement("div");
		ui.classList.add("render-info");
		ui.style.zIndex = "1";
		ui.style.position = "absolute";
		ui.style.top = "0";
		ui.style.width = `370px`;
		ui.style.right = "0";
		document.body.appendChild(ui);
	}

}
