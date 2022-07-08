import fs from 'fs';
import { ERROR_BAD_REQUEST, PATH_USER_DATABASE } from '../config/config.js';
import { getUsers, addUserToArray, cryptoPassword, insertNewUser } from '../business/user.js';



export async function createUser(data) {
    if (!data.name || !data.password) {
        return { error: ERROR_BAD_REQUEST }
    }

    const users = await getUsers();
    const dataCrypto = cryptoPassword(data);
    const newUsers = addUserToArray(dataCrypto, users)

    await insertNewUser(newUsers);

    return { status: 200, msg: 'Usuário criado com sucesso!' };
}