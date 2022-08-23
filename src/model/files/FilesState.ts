import { Model } from "../Model.js";

export class FilesStateModel extends Model {

    override getPath() : string{
        return 'database/files-state.json'
    }
}