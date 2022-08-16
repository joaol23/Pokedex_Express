import { Model } from "./Model.js";

export class MenuModel extends Model {
    
    override getPath() : string{
        return 'database/routes.json'
    }
}