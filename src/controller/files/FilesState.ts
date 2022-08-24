import { ERROR_BAD_REQUEST, NOT_FOUND } from '../../config/Config.js';
import { Controller } from '../Controller.js';
import { Exception } from '../../Exception/Exception.js';
import { Request, Response } from "express"

export class FilesStateController extends Controller {
    constructor() {
        super();
    }

    override getNamespace(): string {
        return 'files/'
    }

    async getFilesState(req: Request, res: Response) {
        try {
            const files = await this.business.getFilesState();
            res.status(200).json({ data: files });
        } catch (err) {
            if (err instanceof Exception)
                throw new Exception(err.status, err.message, err.saveLog);
            else
                throw new Error(err)
        }
    }
}