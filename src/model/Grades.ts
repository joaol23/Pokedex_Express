import { Model } from "./Model.js";

export class GradesModel extends Model {

    override getPath() : string{
        return 'database/grades.json'
    }
}