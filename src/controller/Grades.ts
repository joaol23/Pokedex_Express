import { Controller } from './Controller.js';
import { Exception } from '../Exception/Exception.js';
import { Request, Response } from "express"
import { GradesProps } from '../data/@types/Grades.js'
import { ERROR_BAD_REQUEST, NOT_FOUND } from '../config/Config.js';

export class GradesController extends Controller {

    constructor() {
        super()
        this.mainRequire()
    }

    async listGrade(req: Request, res: Response) {
        try {
            this.listRequire();
            this.firtStepsController(req, 'query');
            const method = this.business.getMethodListGrade(this.data.method);
            if (!method) {
                throw new Exception(ERROR_BAD_REQUEST, "Método não encontrado!", false)
            }
            this.setRequireByMethod(method);
            const data = await this.business[method](this.data);
            res.status(200).json({ data: data });
        } catch (err) {
            if (err instanceof Exception)
                throw new Exception(err.status, err.message, err.saveLog);
            else
                throw new Error(err)
        }
    }

    async insertGrade(req: Request, res: Response) {
        try {
            this.mainRequire();
            this.firtStepsController(req, 'body');
            const grades: GradesProps[] = await this.business.getData(true, 'grades');
            this.data = await this.business.addIdToObject(this.data);
            this.data = this.business.insertDateTime(this.data, 'timestamp');
            const newGrades = this.business.addDataToArray(this.data, grades)
            await this.business.insertData(newGrades, true, 'grades');
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
            this.firtStepsController(req, 'body');
            const newGrade = await this.business.updateGrade(this.data.id, this.data.newGrade);
            res.status(200).json({ data: newGrade });
        } catch (err) {
            if (err instanceof Exception)
                throw new Exception(err.status, err.message, err.saveLog);
            else
                throw new Error(err)
        }
    }

    async deleteGrade(req: Request, res: Response) {
        try {
            this.deleteRequire();
            this.firtStepsController(req, 'body');
            await this.business.deleteGrade(this.data.id.toString());
            res.status(200).send("Nota excluida com sucesso!");
        } catch (err) {
            if (err instanceof Exception)
                throw new Exception(err.status, err.message, err.saveLog);
            else
                throw new Error(err)
        }
    }

    mainRequire(){        
        this.requireMain = ['student', 'subject', 'type', 'value']
    }

    listRequire() {
        this.requireMain = ['method'];
    }

    updateRequire() {
        this.requireMain = ['id', 'newGrade'];
    }

    deleteRequire() {
        this.requireMain = ['id'];
    }

    setRequireByMethod(method: string) {
        const requires = {
            "getGradeById": ["id"],
            "getAllGrades": [""],
            "getFinalGrade": ["student", "subject"],
            "getAvaregeGrade": ["student", "subject"],
            "getTopThreeStudents": ["subject"]
        }

        this.requireMain = requires[method as keyof typeof requires];
        this.setRequire();
        this.validateParams();
    }
}
