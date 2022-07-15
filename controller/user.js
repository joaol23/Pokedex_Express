import { ERROR_BAD_REQUEST } from '../config/Config.js';
import { Controller } from './Controller.js';
import { PATH_USER_DATABASE } from '../config/ConfigPath.js';

export class UserController extends Controller {
    constructor() {
        super();
    }

    async createUser(data) {
        if (!data.name || !data.password) {
            return { error: ERROR_BAD_REQUEST }
        }

        const users = await this.business.getData(PATH_USER_DATABASE, true);
        const dataCrypto = this.business.cryptoPassword(data);
        const newUsers = this.business.addDataToArray(dataCrypto, users)

        await this.business.insertData(PATH_USER_DATABASE, newUsers, true);

        return { status: 200, msg: 'Usuário criado com sucesso!' };
    }
}