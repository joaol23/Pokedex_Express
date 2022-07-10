import winston from "winston";
import { formatLog, NAME_LOG } from "../config/configLog.js";
import { getStringDate } from "./date.js";

const { combine, printf, label, timestamp } = winston.format;

function createLogger(filename, dirname) {
    return winston.createLogger({
        transports: [
            new (winston.transports.File)({ filename: filename + '.log', dirname: 'log/' + dirname })
        ],
        format: combine(
            label({ label: NAME_LOG }),
            timestamp(),
            formatLog(printf)
        )
    });
}

export function saveLog(text, dirname = '', level = 'info', isDebug = false) {
    if (!text) {
        throw new Error("Texto de log não definido pasta -> " + dirname + ". backtrace : " + new this().stack)
    }

    text = isDebug ? text + ". backtrace :\n " + new Error().stack: text

    let filename = getStringDate('-');
    const logger = createLogger(filename, dirname);
    logger.log(level, text);
}

