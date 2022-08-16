import { CONFIG_ENCRYPT, UNAUTHORIZED_REQUEST, NOT_FOUND } from '../config/Config.js';
import CryptoJS, { createHmac } from "crypto";
import { Business } from './Business.js';
import { Exception } from '../Exception/Exception.js';
import { UserProps } from '../data/@types/User.js'

export class UserBusiness extends Business {
    constructor() {
        super();
    }

    cryptoPassword(data: UserProps) {
        data.password = this.encryptPassword(data.password.toString())
        return data;
    }

    async validateUser(name: string, password: string) {
        const users = await super.getData(true);
        let userSearch = this.getUsersByName(name, users);
        if (userSearch) {
            if (this.encryptPassword(password.toString()) == userSearch.password) {
                return userSearch
            }
        }
        throw new Exception(UNAUTHORIZED_REQUEST, "Não foi possivel encontrar um usuario com essa senha, por favor tente novamente", false);
    }

    getUsersByName(name: string, users: UserProps[]) {
        return users.find(usersLogin => usersLogin.name == name)
    }

    encryptPassword(password: string) {
        return createHmac('sha256', CONFIG_ENCRYPT)
            .update(password)
            .digest('hex');
    }

    getUsersWithoutId(users: UserProps[], id: string) {
        return users.filter(user => user.id != id);
    }

    async deleteUser(id: string) {
        const users = await super.getData(true);
        const newUsers = this.getUsersWithoutId(users, id);
        return await super.insertData(newUsers, true)
    }

    canChangePasswordUser(oldPassword: string, selectedUser: UserProps) {
        if (oldPassword == "" || oldPassword == null) {
            throw new Exception(UNAUTHORIZED_REQUEST, "Não é possível atualizar a senha sem verificação", false);
        }
        if (this.encryptPassword(oldPassword) == selectedUser.password) {
            return true;
        }
        throw new Exception(UNAUTHORIZED_REQUEST, "Senha passada está incorreta", false);
    }

    async updateUser(id: string, newUser: UserProps, oldPassword = '') {
        const users = await super.getData(true);
        const indexUserSelected = super.getIndexDataByParameter('id', users, id);
        if (indexUserSelected == -1){
            throw new Exception(NOT_FOUND, "Usuário não encontrado", false);
        }

        if (newUser.hasOwnProperty('password')) {
            this.canChangePasswordUser(oldPassword.toString(), users[indexUserSelected]);
            newUser = this.cryptoPassword(newUser);
        }
        const newUsers = super.updateData(users, newUser, indexUserSelected);
        await super.insertData(newUsers, true);
        return newUsers[indexUserSelected];
    }
}
