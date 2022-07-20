import { CONFIG_ENCRYPT } from '../config/Config.js';
import CryptoJS from "crypto-js";
import { Business } from './Business.js';
import { PATH_USER_DATABASE } from '../config/ConfigPath.js';
import { Exception } from '../Exception/Exception.js';

export class UserBusiness extends Business {
    constructor() {
        super();
    }

    cryptoPassword(data) {
        data.password = CryptoJS.AES.encrypt(data.password, CONFIG_ENCRYPT).toString();
        return data;
    }

    async validateUser(name, password){
        const users = await this.getData(PATH_USER_DATABASE, true);
        let userSearch = this.getUsersByName(name, users);
        let originalPassword = this.decryptPassword(userSearch.password);
        if(password == originalPassword){
            return userSearch
        }
        throw new Exception({ message: "Não foi possivel encontrar um usuario com essa senha, por favor tente novamente", 
        status: 401 }, false);
    }

    getUsersByName(name, users){
        return users.find(usersLogin => usersLogin.name == name)
    }

    decryptPassword(password){
        let passwordDecrypt = CryptoJS.AES.decrypt(password, CONFIG_ENCRYPT);
        return passwordDecrypt.toString(CryptoJS.enc.Utf8);
    }
}
