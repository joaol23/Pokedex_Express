import { Controller } from './Controller';
import { PATH_USER_DATABASE } from '../config/ConfigPath';
import { Exception } from '../Exception/Exception';
import { Request, Response } from "express"

export class UserController extends Controller {
    require = ['name', 'password'];
    constructor() {
        super();
    }

    async createUser(req: Request, res: Response) {
        try {
            this.setData(req.body);
            this.validateParams();
            const users = await this.business.getData(PATH_USER_DATABASE, true);
            const dataCrypto = this.business.cryptoPassword(this.data);
            const newUsers = this.business.addDataToArray(dataCrypto, users)
            await this.business.insertData(PATH_USER_DATABASE, newUsers, true);
            res.status(200).send('Usuário criado com sucesso!');
        } catch (err) {
            if (err instanceof Exception)
                throw new Exception(err.status, err.message, true);
        }
    }

    async validationUser(req: Request, res: Response) {
        try {
            this.setData(req.body);
            this.validateParams();
            const user = await this.business.validateUser(this.data.name, this.data.password);
            console.log(user)
            reson({ data: user });

        } catch (err) {
            if (err instanceof Exception)
                throw new Exception(err.status, err.message, true);
        }
    }
}
