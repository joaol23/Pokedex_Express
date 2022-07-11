import { saveLog } from "../lib/log.js";

export function sendError(error, res, req) {
    if (!res || !error) {
        throw new Error("Faltando parametros sendError");
    }

    saveLog(`Error endpoint ${req.url}`, 'endpoint-error', 'error', true);

    res.sendStatus(error);
}