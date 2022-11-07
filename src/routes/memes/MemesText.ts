import express, { Request, Response } from "express"
import { Exception } from '../../Exception/Exception.js';
import { setErrorInternal } from '../Route.js';
import { MemesTextController } from "../../controller/memes/MemesText.js";
const memesTextObj = new MemesTextController();

export function routeMemesText(app: express.Application) {
    app.route("/api/memes-text")
        .get(async (req: Request, res: Response) => {
            try {
                await memesTextObj.getTextMemes(req, res)
            } catch (err) {
                if (err instanceof Exception)
                    res.status(err.status).send({ msg: err.message });
                else
                    setErrorInternal(res, err);
            }
        })        
        .post(async (req: Request, res: Response) => {
            try {
                await memesTextObj.insertMemeText(req, res)
            } catch (err) {
                if (err instanceof Exception)
                    res.status(err.status).send({ msg: err.message });
                else
                    setErrorInternal(res, err);
            }
        })
}
