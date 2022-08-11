import { GradesController } from "../controller/Grades.js";
import express, { Request, Response } from "express"
import { Exception } from "../Exception/Exception.js";
import { setErrorInternal } from "./Route.js";

const GradesObj = new GradesController();

export function routeGrades(app: express.Application) {
    app.route('/api/notas')
        .post(async (req: Request, res: Response) => {
            try {
                await GradesObj.insertGrade(req, res)
            } catch (err) {
                if (err instanceof Exception)
                    res.status(err.status).send({ msg: err.message });
                else
                    setErrorInternal(res, err);
            }
        })
        .put(async (req: Request, res: Response) => {
            try {
                await GradesObj.updateGrade(req, res)
            } catch (err) {
                if (err instanceof Exception)
                    res.status(err.status).send({ msg: err.message });
                else
                    setErrorInternal(res, err);
            }
        })
}