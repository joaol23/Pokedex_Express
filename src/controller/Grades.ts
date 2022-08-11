import { Controller } from './Controller.js';
import { Exception } from '../Exception/Exception.js';
import { Request, Response } from "express"
import { PATH_GRADES_DATABASE } from '../config/ConfigPath.js';
import { GradesProps } from '../data/@types/Grades.js'

export class GradesController extends Controller {

    constructor() {
        super()
        this.requireMain = ['student', 'subject', 'type', 'value']
    }

    async insertGrade(req: Request, res: Response) {
        try {
            this.firtStepsController(req);
            const grades: GradesProps[] = await this.business.getData(PATH_GRADES_DATABASE, true, 'grades');
            this.data = await this.business.addIdToObject(this.data, PATH_GRADES_DATABASE);
            this.data = this.business.insertDateTime(this.data, 'timestamp');
            const newGrades = this.business.addDataToArray(this.data, grades)
            await this.business.insertData(PATH_GRADES_DATABASE, newGrades, true, 'grades');
            res.status(200).json({ data: this.data });
        } catch (err) {
            if (err instanceof Exception)
                throw new Exception(err.status, err.message, err.saveLog);
            else
                throw new Error(err)
        }
    }

    async updateGrade(req: Request, res: Response) {
        try {
            this.updateRequire();
            this.firtStepsController(req);
            const newGrade = await this.business.updateGrade(this.data.id, this.data.newGrade);
            res.status(200).json({ data: newGrade  });
        } catch (err) {
            if (err instanceof Exception)
                throw new Exception(err.status, err.message, err.saveLog);
            else
                throw new Error(err)
        }
    }

    updateRequire() {
        this.requireMain = ['id', 'newGrade'];
    }
}
