import { Model } from "./Model.js";

export class MenuModel extends Model {
    
    getPath() : string{
        return 'database/routes.json'
    }
}