import { Model } from "./Model.js";

export class GradesModel extends Model {

    getPath() : string{
        return 'database/grades.json'
    }
}