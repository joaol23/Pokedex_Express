import fs from 'fs';
import { ERROR_BAD_REQUEST, PATH_USER_DATABASE } from '../config/config.js';
import { getUsers, addUserToArray } from '../business/user.js';

export async function createUser(data) {
    if (!data.name || !data.password) {
        return { error: ERROR_BAD_REQUEST }
    }

    const users = await getUsers();
    const newUsers = addUserToArray(data, users)

    await fs.writeFileSync(PATH_USER_DATABASE, JSON.stringify(newUsers, null, 4));

    return '';
}