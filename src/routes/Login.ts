import { UserController } from "../controller/User.js";
import express, { Request, Response } from "express"
import { Exception } from "../Exception/Exception.js";

const UserObj = new UserController();

export function routeLogin(app: express.Application) {
    app.route("/api/create-user")
        .post(async (req: Request, res: Response) => {
            try {
                await UserObj.createUser(req, res)
            } catch (err) {
                if (err instanceof Exception)
                    res.status(err.status).send({ msg: err.message });
            }
        })
    app.post("/api/login", async (req: Request, res: Response) => {
        try {
            await UserObj.validationUser(req, res)
        } catch (err) {            
            if (err instanceof Exception)
                res.status(err.status).send({ msg: err.message });
        }
    })
}
