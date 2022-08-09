import { Controller } from './Controller.js';
import { PATH_USER_DATABASE } from '../config/ConfigPath.js';
import { Exception } from '../Exception/Exception.js';
import { Request, Response } from "express"

export class UserController extends Controller {
    requireMain = ['name', 'password'];
    constructor() {
        super();
    }

    async createUser(req: Request, res: Response) {
        try {
            this.firtStepsController(req);
            const users = await this.business.getData(PATH_USER_DATABASE, true);
            const dataCrypto = this.business.cryptoPassword(this.data);
            this.data = await this.business.addIdToObject(this.data, PATH_USER_DATABASE);
            const newUsers = this.business.addDataToArray(dataCrypto, users, PATH_USER_DATABASE)
            await this.business.insertData(PATH_USER_DATABASE, newUsers, true);
            res.status(200).json({ data: this.data });
        } catch (err) {
            if (err instanceof Exception)
                throw new Exception(err.status, err.message, err.saveLog);
            else
                throw new Error(err)
        }
    }

    async validationUser(req: Request, res: Response) {
        try {
            this.firtStepsController(req);
            const user = await this.business.validateUser(this.data.name, this.data.password);
            res.json({ data: user });
        } catch (err) {
            if (err instanceof Exception)
                throw new Exception(err.status, err.message, err.saveLog);
            else
                throw new Error(err)
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            this.setData(req.body);
            this.setRequireDelete();
            this.validateParams();
            await this.business.deleteUser(this.data.id.toString());
            res.status(200).send('Usuário excluído com sucesso!');
        } catch (err) {
            if (err instanceof Exception)
                throw new Exception(err.status, err.message, err.saveLog);
            else
                throw new Error(err)
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            this.setData(req.body);
            this.setRequireUpdate();
            this.validateParams();
            const newUser = await this.business.updateUser(this.data.id.toString(), this.data.newUser, this.data.oldPassword);
            res.status(200).json({ data: newUser });
        } catch (err) {
            if (err instanceof Exception)
                throw new Exception(err.status, err.message, err.saveLog);
            else
                throw new Error(err)
        }
    }

    setRequireDelete() {
        this.require = ['id']
    }

    setRequireUpdate() {
        this.require = ['id', 'newUser']
    }
}
