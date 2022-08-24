import express, { Request, Response } from "express"
import { Exception } from '../../Exception/Exception.js';
import { setErrorInternal } from '../Route.js';
import { FilesStateController } from "../../controller/files/FilesState.js";
const filesStateObj = new FilesStateController();

export function routeFilesState(app: express.Application) {
    app.route("/api/arquivos-estado")
        .get(async (req: Request, res: Response) => {
            try {
                filesStateObj.getFilesState(req, res)
            } catch (err) {
                if (err instanceof Exception)
                    res.status(err.status).send({ msg: err.message });
                else
                    setErrorInternal(res, err);
            }
        })
}
