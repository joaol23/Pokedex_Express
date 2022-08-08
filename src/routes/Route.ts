import { ERROR_INTERNAL } from "../config/Config.js";
import { Response } from "express";

export function setErrorInternal(res: Response, err: any) {    
    console.log(err)
    res.status(ERROR_INTERNAL).send("Erro Interno");
}