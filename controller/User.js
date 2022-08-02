import { ERROR_BAD_REQUEST } from '../config/Config.js';
import { Controller } from './Controller.js';
import { PATH_USER_DATABASE, PATH_FAVORITE_DATABASE } from '../config/ConfigPath.js';
import { Exception } from '../Exception/Exception.js';

export class UserController extends Controller {
    require = ['name', 'password'];
    constructor() {
        super();
    }

    async createUser(req, res) {
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
            throw new Exception({ message: err.message, status: err.status }, true);
        }
    }

    async validationUser(req, res) {
        try {
            this.setData(req.body);
            this.validateParams();
            const user = await this.business.validateUser(this.data.name, this.data.password);
            console.log(user)
            res.json({ data: user });

        } catch (err) {
            throw new Exception({ message: err.message, status: err.status }, true);
        }
    }
}
