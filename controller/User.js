import { ERROR_BAD_REQUEST } from '../config/Config.js';
import { Controller } from './Controller.js';
import { PATH_USER_DATABASE } from '../config/ConfigPath.js';
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
            const newUsers = this.business.addDataToArray(dataCrypto, users)
            await this.business.insertData(PATH_USER_DATABASE, newUsers, true);
            res.status(200).send('Usuário criado com sucesso!');
        } catch (err) {
            throw new Exception({ message: err.message, status: ERROR_BAD_REQUEST }, true);
        }
    }
}
