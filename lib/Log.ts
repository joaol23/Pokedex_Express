import winston from "winston";
import { formatLog, NAME_LOG } from "../config/ConfigLog";
import { Exception } from "../Exception/Exception";
import { getStringDate } from "./Date";

const { combine, printf, label, timestamp } = winston.format;

function createLogger(filename: string, dirname: string) {
    return winston.createLogger({
        transports: [
            new (winston.transports.Console)({ format: winston.format.simple() }),
            new (winston.transports.File)({ filename: filename + '.log', dirname: 'log/' + dirname })
        ],
        format: combine(
            label({ label: NAME_LOG }),
            timestamp(),
            formatLog(printf)
        )
    });
}

export function saveLog(text: string, dirname = '', level = 'info', isDebug = false) {
    if (!text) {
        throw new Exception(500, "Texto de log não definido pasta -> " + dirname + ". backtrace : " + new this().stack, false)
    }

    text = isDebug ? text + ". backtrace :\n " + new Error().stack : text

    let filename = getStringDate('-');
    const logger = createLogger(filename, dirname);
    logger.log(level, text);
}

