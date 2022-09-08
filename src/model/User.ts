import { Model } from "./Model.js";

export class UserModel extends Model {

    getPath() : string{
        return 'database/user.json'
    }
}
