import fs from 'fs';
import { CONFIG_ENCRYPT, PATH_USER_DATABASE } from '../config/config.js';
import CryptoJS from "crypto-js";

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

export function cryptoPassword(data) {
    data.password = CryptoJS.AES.encrypt(data.password, CONFIG_ENCRYPT).toString();
    return data;
}

export async function insertNewUser(users) {
    await fs.writeFileSync(PATH_USER_DATABASE, JSON.stringify(users, null, 4));
}