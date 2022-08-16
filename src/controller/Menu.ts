import { ERROR_BAD_REQUEST, NOT_FOUND } from '../config/Config.js';
import { Controller } from './Controller.js';
import { Exception } from '../Exception/Exception.js';
import { Request, Response } from "express"

export class MenuController extends Controller {

    constructor() {
        super();
    }

    async getLinksMenu(req: Request, res: Response) {
        try {
            const menu = await this.business.getData(true);
            if (menu.length == 0) {
                throw new Exception(NOT_FOUND, 'Nenhum pokemon favoritado encontrado para esse usuário', false);
            }
            res.status(200).send({ data: menu });
        } catch (err) {
            if (err instanceof Exception)
                throw new Exception(err.status, err.message, err.saveLog);
            else
                throw new Error(err)
        }
    }
}