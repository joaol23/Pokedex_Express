import { saveLog as functionSaveLog } from "../lib/Log.js";

export class Exception extends Error {
    status = 400;
    message = '';

    constructor(status: number, message: string, saveLog: boolean) {
        super(message);

        this.status = status;

        Object.setPrototypeOf(this, Exception.prototype);
        if (saveLog) {
            functionSaveLog(`Error: ${this.message}`, 'exception', 'error', true);
        }
    }

    getErrorMessage() {
        return 'Something went wrong: ' + this.message;
    }
}