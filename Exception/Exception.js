import { saveLog as functionSaveLog } from "../lib/log.js";

export function Exception(exception, saveLog) {
    this.message = exception.message;
    this.status = exception.status;

    if (saveLog) {
        functionSaveLog(`Error: ${this.message}`, 'exception', 'error', true);
    }
}