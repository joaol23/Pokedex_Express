import fs from 'fs';
import { PATH_USER_DATABASE } from '../config/config.js';

export async function getUsers() {
    let users = await fs.readFileSync(PATH_USER_DATABASE);
    if (users.length == 0) {
        return [];
    }
    users = await JSON.parse(users);
    return users;
}

export function addUserToArray(user, arrayUsers) {
    arrayUsers.push(user);
    return arrayUsers;
}