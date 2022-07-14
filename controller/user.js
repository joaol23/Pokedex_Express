import { ERROR_BAD_REQUEST } from '../config/Config.js';
import { UserBusiness } from '../business/User.js';

export async function createUser(data) {
    const UserObj = new UserBusiness;
    if (!data.name || !data.password) {
        return { error: ERROR_BAD_REQUEST }
    }

    const users = await UserObj.getUsers();
    const dataCrypto = UserObj.cryptoPassword(data);
    const newUsers = UserObj.addUserToArray(dataCrypto, users)

    await UserObj.insertNewUser(newUsers);

    return { status: 200, msg: 'Usuário criado com sucesso!' };
}