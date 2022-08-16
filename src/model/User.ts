import { Model } from "./Model.js";

export class UserModel extends Model {

    override getPath() : string{
        return 'database/user.json'
    }
}
