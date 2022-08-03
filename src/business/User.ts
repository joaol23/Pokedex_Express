import { CONFIG_ENCRYPT } from '../config/Config.js';
import CryptoJS from "crypto";
import { Business } from './Business.js';
import { PATH_USER_DATABASE } from '../config/ConfigPath.js';
import { Exception } from '../Exception/Exception.js';
import { UserProps } from '../data/@types/User.js'

export class UserBusiness extends Business {
    constructor() {
        super();
    }

    cryptoPassword(data: UserProps) {
        data.password = (CryptoJS as any).AES.encrypt(data.password, CONFIG_ENCRYPT).toString();
        return data;
    }

    async validateUser(name: string, password: string) {
        const users = await super.getData(PATH_USER_DATABASE, true);
        let userSearch = this.getUsersByName(name, users);
        if (userSearch) {
            let originalPassword = this.decryptPassword(userSearch.password);
            if (password == originalPassword) {
                return userSearch
            }
        }
        throw new Exception(401, "Não foi possivel encontrar um usuario com essa senha, por favor tente novamente", false);
    }

    getUsersByName(name: string, users: UserProps[]) {
        return users.find(usersLogin => usersLogin.name == name)
    }

    decryptPassword(password: string) {
        let passwordDecrypt = (CryptoJS as any).AES.decrypt(password, CONFIG_ENCRYPT);
        return passwordDecrypt.toString((CryptoJS as any).enc.Utf8);
    }
}
