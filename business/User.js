import { CONFIG_ENCRYPT } from '../config/Config.js';
import CryptoJS from "crypto-js";
import { Business } from './Business.js';

export class UserBusiness extends Business {
    constructor() {
        super();
    }

    cryptoPassword(data) {
        data.password = CryptoJS.AES.encrypt(data.password, CONFIG_ENCRYPT).toString();
        return data;
    }
}
