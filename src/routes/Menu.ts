import express, { Request, Response } from "express"
import { Exception } from '../Exception/Exception.js';
import { setErrorInternal } from './Route.js';
import { MenuController } from '../controller/Menu.js';
const MenuObj = new MenuController();

export function routeMenu(app: express.Application) {
    app.get("/api/menu", async (req: Request, res: Response) => {
        try {
            await MenuObj.getLinksMenu(req, res)
        } catch (err) {
            if (err instanceof Exception)
                res.status(err.status).send({ msg: err.message });
            else
                setErrorInternal(res, err);
        }
    })
}
