import { UserController } from "../controller/User.js";
import express, { Request, Response } from "express"
import { Exception } from "../Exception/Exception.js";

const UserObj = new UserController();

export function routeLogin(app: express.Application) {
    app.post("/api/register", (async (req: Request, res: Response) => {
        try {
            await UserObj.createUser(req, res)
        } catch (err) {
            if (err instanceof Exception)
                res.status(err.status).send({ msg: err.message });
        }
    }))

    app.route("/api/login")
        .post(async (req: Request, res: Response) => {
            try {
                await UserObj.validationUser(req, res)
            } catch (err) {
                if (err instanceof Exception)
                    res.status(err.status).send({ msg: err.message });
            }
        })
        .delete(async (req: Request, res: Response) => {
            try {
                await UserObj.deleteUser(req, res)
            } catch (err) {
                if (err instanceof Exception)
                    res.status(err.status).send({ msg: err.message });
            }
        })
}
