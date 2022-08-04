import { Controller } from './Controller.js';
import { PATH_USER_DATABASE} from '../config/ConfigPath.js';
import { Exception } from '../Exception/Exception.js';
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
            this.data = await this.business.addIdToObject(this.data, PATH_USER_DATABASE);
            const newUsers = this.business.addDataToArray(dataCrypto, users, PATH_USER_DATABASE)
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
            res.json({ data: user });
        } catch (err) {
            if (err instanceof Exception)
                throw new Exception(err.status, err.message, true);
        }
    }
}
