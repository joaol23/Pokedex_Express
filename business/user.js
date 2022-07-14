import { CONFIG_ENCRYPT, PATH_USER_DATABASE } from '../config/Config.js';
import CryptoJS from "crypto-js";
import { UserModel } from '../model/User.js';
import { Business } from './Business.js';

export class UserBusiness extends Business {
    constructor() {
        super();
        this.model = new UserModel;
    }

    async getUsers() {
        return await this.model.getData(PATH_USER_DATABASE, true);
    }

    addUserToArray(user, arrayUsers) {
        arrayUsers.push(user);
        return arrayUsers;
    }

    cryptoPassword(data) {
        data.password = CryptoJS.AES.encrypt(data.password, CONFIG_ENCRYPT).toString();
        return data;
    }

    async insertNewUser(users) {
        return await this.model.insertData(PATH_USER_DATABASE, users, true)
    }
}
