declare const console: any;

export class Logger {

    constructor() {
        this.logPerformance();
    }

    private logPerformance() {
        console.info('logging performance');
    }

}