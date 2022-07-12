import { CONFIG_ENCRYPT, PATH_USER_DATABASE } from '../config/config.js';
import CryptoJS from "crypto-js";
import { User } from '../model/user.js';

export async function getUsers() {
    const UserObj = new User();
    return await UserObj.getData(PATH_USER_DATABASE);
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
    const UserObj = new User();
    return await UserObj.insertData(PATH_USER_DATABASE, users, true)
}